/**
 * Form submission handler shared by both hosts (docs/TECHNICAL_ARCHITECTURE.md §9.2):
 *  - Vercel:            api/submit.ts
 *  - Cloudflare Pages:  functions/api/submit.ts
 *
 * Validates with the SAME Zod schemas as the browser, verifies Turnstile, and emails the enquiry via Resend.
 * Personal data is never logged.
 *
 * Imports use `.js` extensions so the file runs as native ES modules on Vercel's Node runtime.
 */
import { submissionSchema } from '../src/lib/forms/schemas.js';

export interface SubmitEnv {
  TURNSTILE_SECRET_KEY?: string;
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_FROM?: string;
  FORM_TO_QUOTE?: string;
  FORM_TO_CONTACT?: string;
  CRM_WEBHOOK_URL?: string;
}

const MAX_BYTES = 20_000;

export const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

/** Visitor IP for the Turnstile check: Cloudflare header first, then Vercel's. */
function clientIp(request: Request): string | null {
  return (
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    null
  );
}

export async function handleSubmit(request: Request, env: SubmitEnv): Promise<Response> {
  if (!request.headers.get('content-type')?.includes('application/json'))
    return json({ ok: false, error: 'Unsupported content type' }, 415);
  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json({ ok: false, error: 'Payload too large' }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, error: 'Validation failed' }, 422);
  const sub = parsed.data;

  // Honeypot: pretend success so bots learn nothing.
  if (sub.company_website) return json({ ok: true });

  if (env.TURNSTILE_SECRET_KEY) {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY);
    form.append('response', sub.token);
    const ip = clientIp(request);
    if (ip) form.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const outcome = (await res.json()) as { success?: boolean };
    if (!outcome.success) return json({ ok: false, error: 'Spam check failed' }, 403);
  }

  const to = sub.formType === 'quote' ? env.FORM_TO_QUOTE : env.FORM_TO_CONTACT;
  if (!env.EMAIL_PROVIDER_API_KEY || !env.EMAIL_FROM || !to)
    return json({ ok: false, error: 'Form not configured' }, 503);

  const rows = Object.entries(sub.data)
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(k)}</th><td>${escapeHtml(Array.isArray(v) ? v.join(', ') : String(v))}</td></tr>`,
    )
    .join('');
  const subject =
    sub.formType === 'quote'
      ? `Quote request (${sub.data.intent}): ${sub.data.category}`
      : `Website enquiry: ${sub.data.subject}`;

  const email = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: to.split(',').map((s) => s.trim()),
      reply_to: sub.data.email,
      subject,
      html: `<h2>${escapeHtml(subject)}</h2><table>${rows}</table>`,
    }),
  });
  if (!email.ok) return json({ ok: false, error: 'Email delivery failed' }, 502);

  if (env.CRM_WEBHOOK_URL) {
    // Fire-and-forget; a CRM outage must not lose the lead (the email already went out).
    fetch(env.CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    }).catch(() => {});
  }

  return json({ ok: true });
}

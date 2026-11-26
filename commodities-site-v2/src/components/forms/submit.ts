import type { ContactData, QuoteData } from '~/lib/forms/schemas';

export type SubmitResult = { ok: true } | { ok: false; error: string };

type Payload = { formType: 'quote'; data: QuoteData } | { formType: 'contact'; data: ContactData };

/**
 * Posts a form to the serverless endpoint (docs/TECHNICAL_ARCHITECTURE.md §9).
 * In local development there is no function, so the submission is logged and treated as successful.
 */
export async function submitForm(
  payload: Payload & { token: string; honeypot: string },
): Promise<SubmitResult> {
  const body = JSON.stringify({
    formType: payload.formType,
    data: payload.data,
    token: payload.token,
    company_website: payload.honeypot,
  });

  if (import.meta.env.DEV) {
    console.info('[dev] form submission (not sent):', JSON.parse(body));
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && json?.ok) return { ok: true };
    return { ok: false, error: json?.error ?? `Request failed (${res.status})` };
  } catch {
    return { ok: false, error: 'Network error' };
  }
}

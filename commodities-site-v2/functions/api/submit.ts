/**
 * POST /api/submit: Cloudflare Pages Function (alternative host; the site deploys to Vercel via api/submit.ts).
 * The logic lives in server/submit-handler.ts.
 *
 * Required env (Pages dashboard → Settings → Variables): TURNSTILE_SECRET_KEY, EMAIL_PROVIDER_API_KEY,
 * EMAIL_FROM, FORM_TO_QUOTE, FORM_TO_CONTACT. Optional: CRM_WEBHOOK_URL.
 * Rate limiting: configure a Cloudflare WAF rate-limit rule on /api/submit (e.g. 5 requests / 10 min / IP).
 */
import { handleSubmit, json, type SubmitEnv } from '../../server/submit-handler.js';

type Context = { request: Request; env: SubmitEnv };

export function onRequestPost({ request, env }: Context): Promise<Response> {
  return handleSubmit(request, env);
}

export function onRequest(): Response {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}

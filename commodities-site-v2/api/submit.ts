/**
 * POST /api/submit: Vercel Function (Node runtime). The logic lives in server/submit-handler.ts.
 *
 * Required env (Vercel → Project → Settings → Environment Variables): TURNSTILE_SECRET_KEY (optional),
 * EMAIL_PROVIDER_API_KEY, EMAIL_FROM, FORM_TO_QUOTE, FORM_TO_CONTACT. Optional: CRM_WEBHOOK_URL.
 * Rate limiting: add a Vercel Firewall rate-limit rule on /api/submit (e.g. 5 requests / 10 min / IP).
 */
import { handleSubmit, json, type SubmitEnv } from '../server/submit-handler.js';

export function POST(request: Request): Promise<Response> {
  return handleSubmit(request, process.env as SubmitEnv);
}

export function GET(): Response {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}

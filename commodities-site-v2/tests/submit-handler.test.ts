// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GET, POST } from '../api/submit';
import { handleSubmit, type SubmitEnv } from '../server/submit-handler';

const validQuote = {
  intent: 'sell',
  category: 'ferrous-metals',
  materials: ['hms'],
  description: '',
  quantity: '2.5',
  unit: 'tonnes',
  frequency: 'one-off',
  location: 'AB1 2CD',
  logistics: 'collect',
  preferredDate: '',
  firstName: 'Sam',
  lastName: 'Taylor',
  company: '',
  email: 'sam@example.com',
  phone: '+44 1234 567890',
  preferredContact: 'phone',
  consent: true,
  marketingOptIn: false,
};

const env: SubmitEnv = {
  EMAIL_PROVIDER_API_KEY: 'test-key',
  EMAIL_FROM: 'website@example.com',
  FORM_TO_QUOTE: 'sales@example.com, ops@example.com',
  FORM_TO_CONTACT: 'info@example.com',
};

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('https://site.test/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('handleSubmit', () => {
  it('rejects non-JSON, oversized, malformed and invalid requests', async () => {
    const form = new Request('https://site.test/api/submit', { method: 'POST', body: 'a=1' });
    expect((await handleSubmit(form, env)).status).toBe(415);
    expect((await handleSubmit(post('x'.repeat(20_001)), env)).status).toBe(413);
    expect((await handleSubmit(post('{oops'), env)).status).toBe(400);
    expect((await handleSubmit(post({ formType: 'quote', data: {} }), env)).status).toBe(422);
  });

  it('answers the honeypot with a fake success and sends nothing', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await handleSubmit(
      post({ formType: 'quote', data: validQuote, company_website: 'spam.biz' }),
      env,
    );
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 503 when email settings are missing', async () => {
    const res = await handleSubmit(post({ formType: 'quote', data: validQuote }), {});
    expect(res.status).toBe(503);
  });

  it('emails a quote to every FORM_TO_QUOTE address with reply-to set', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const res = await handleSubmit(post({ formType: 'quote', data: validQuote }), env);
    expect(res.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://api.resend.com/emails');
    const sent = JSON.parse(init.body);
    expect(sent.to).toEqual(['sales@example.com', 'ops@example.com']);
    expect(sent.reply_to).toBe('sam@example.com');
    expect(sent.subject).toBe('Quote request (sell): ferrous-metals');
  });

  it('verifies Turnstile with the Vercel visitor IP and blocks a failed check', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ success: false }));
    vi.stubGlobal('fetch', fetchMock);
    const res = await handleSubmit(
      post(
        { formType: 'quote', data: validQuote, token: 't' },
        { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' },
      ),
      { ...env, TURNSTILE_SECRET_KEY: 'secret' },
    );
    expect(res.status).toBe(403);
    const body = fetchMock.mock.calls[0]![1].body as FormData;
    expect(body.get('remoteip')).toBe('203.0.113.7');
  });

  it('reports a failed email delivery as 502', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })));
    const res = await handleSubmit(post({ formType: 'quote', data: validQuote }), env);
    expect(res.status).toBe(502);
  });
});

describe('Vercel function api/submit', () => {
  it('reads settings from environment variables on POST', async () => {
    for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v!);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })));
    const res = await POST(post({ formType: 'quote', data: validQuote }));
    expect(await res.json()).toEqual({ ok: true });
  });

  it('rejects GET with 405', () => {
    expect(GET().status).toBe(405);
  });
});

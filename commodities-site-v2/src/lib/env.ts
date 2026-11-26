/** Build-time constants injected by Vite `define` (see vite.config.ts). */
export const SITE_ENV = __SITE_ENV__;
export const SITE_URL = __PUBLIC_SITE_URL__.replace(/\/$/, '');
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '';

/** Draft mode shows placeholder highlights and "awaiting content" notices. Never on in production. */
export const isDraftMode = SITE_ENV !== 'production';

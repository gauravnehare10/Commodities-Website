/** Build-time constants injected by Vite `define` (see vite.config.ts). */
export const SITE_ENV = __SITE_ENV__;
export const SITE_URL = __PUBLIC_SITE_URL__.replace(/\/$/, '');
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '';

/** Any build that isn't production: search engines are told not to index it (root.tsx). */
export const isDraftMode = SITE_ENV !== 'production';

/**
 * Draft notes for editors (the "draft content" banner, "awaiting confirmation" notices,
 * placeholder highlights, empty sections waiting for data). Local dev server only, so a
 * deployed demo or staging site looks finished to visitors.
 */
export const showDraftNotes = import.meta.env.DEV && isDraftMode;

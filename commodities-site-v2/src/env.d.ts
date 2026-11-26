/// <reference types="vite/client" />

declare const __SITE_ENV__: 'development' | 'staging' | 'production';
declare const __PUBLIC_SITE_URL__: string;

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

import { reactRouter } from '@react-router/dev/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

/**
 * Site URL for canonical links and the sitemap. Falls back to the project's Vercel production
 * address (a system variable Vercel sets during builds), then to the local dev server.
 */
export const siteUrl =
  process.env.PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:5173');

export const siteDefines = {
  __SITE_ENV__: JSON.stringify(process.env.SITE_ENV ?? 'development'),
  __PUBLIC_SITE_URL__: JSON.stringify(siteUrl),
};

export default defineConfig({
  plugins: [reactRouter()],
  define: siteDefines,
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});

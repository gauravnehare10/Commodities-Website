import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts so the React Router plugin is not loaded in tests.
export default defineConfig({
  define: {
    __SITE_ENV__: JSON.stringify('development'),
    __PUBLIC_SITE_URL__: JSON.stringify('http://localhost:5173'),
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],
  },
});

import type { Config } from '@react-router/dev/config';
import { staticPaths } from './src/content/paths';

/**
 * Static, prerendered build (see docs/TECHNICAL_ARCHITECTURE.md §3).
 * Every route is rendered to HTML at build time; no server runtime is needed.
 */
export default {
  appDirectory: 'src',
  ssr: false,
  async prerender() {
    return staticPaths();
  },
} satisfies Config;

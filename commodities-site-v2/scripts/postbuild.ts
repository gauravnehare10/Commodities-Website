/**
 * Post-build steps for the static output in build/client:
 *  - sitemap.xml (indexable routes only)
 *  - robots.txt (allow on production, block elsewhere)
 *  - 404.html (from the prerendered /404 route, served by static hosts with HTTP 404)
 */
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { indexablePaths } from '../src/content/paths';

const out = join(import.meta.dirname, '..', 'build', 'client');
// Same fallback as vite.config.ts: PUBLIC_SITE_URL, then the Vercel production address, then local dev.
const siteUrl = (
  process.env.PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:5173')
).replace(/\/$/, '');
const production = process.env.SITE_ENV === 'production';
const today = new Date().toISOString().slice(0, 10);

const urls = indexablePaths()
  .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

writeFileSync(
  join(out, 'robots.txt'),
  production
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`,
);

const notFoundDir = join(out, '404');
if (existsSync(join(notFoundDir, 'index.html'))) {
  cpSync(join(notFoundDir, 'index.html'), join(out, '404.html'));
  rmSync(notFoundDir, { recursive: true });
}

console.log(
  `✔ postbuild: sitemap (${indexablePaths().length} URLs), robots (${production ? 'allow' : 'disallow'}), 404.html`,
);

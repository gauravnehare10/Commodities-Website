import { activeCategorySlugs, activeLegalPages, activeServiceSlugs, siteConfig } from './index';

/** Indexable static routes (also used for the sitemap). */
export function indexablePaths(): string[] {
  return [
    '/',
    '/about',
    '/commodities',
    ...activeCategorySlugs().map((s) => `/commodities/${s}`),
    '/services',
    ...activeServiceSlugs().map((s) => `/services/${s}`),
    '/industries',
    '/compliance',
    '/resources',
    '/resources/faq',
    '/resources/glossary',
    ...(siteConfig.features.downloads ? ['/resources/downloads'] : []),
    '/quote',
    '/contact',
    ...activeLegalPages().map((p) => `/${p.slug}`),
  ];
}

/** Everything prerendered to HTML at build time. */
export function staticPaths(): string[] {
  // "/404" renders the catch-all route; postbuild copies it to /404.html for the host.
  return [...indexablePaths(), '/thank-you', '/404'];
}

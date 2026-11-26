import { index, route, type RouteConfig } from '@react-router/dev/routes';

/** Route map: docs/WEBSITE_STRUCTURE.md §2–3 (page IDs in comments). */
export default [
  index('routes/home.tsx'), // P-01
  route('about', 'routes/about.tsx'), // P-02
  route('commodities', 'routes/commodities._index.tsx'), // P-03
  route('commodities/:category', 'routes/commodities.$category.tsx'), // P-04
  route('services', 'routes/services._index.tsx'), // P-05
  route('services/:service', 'routes/services.$service.tsx'), // P-06
  route('industries', 'routes/industries.tsx'), // P-07
  route('compliance', 'routes/compliance.tsx'), // P-08
  route('resources', 'routes/resources._index.tsx'), // P-09
  route('resources/faq', 'routes/resources.faq.tsx'), // P-09a
  route('resources/glossary', 'routes/resources.glossary.tsx'), // P-09b
  route('resources/downloads', 'routes/resources.downloads.tsx'), // P-09c
  route('quote', 'routes/quote.tsx'), // P-10
  route('thank-you', 'routes/thank-you.tsx'), // P-10b
  route('contact', 'routes/contact.tsx'), // P-11
  route('privacy-policy', 'routes/legal.tsx', { id: 'legal-privacy' }), // P-14a
  route('cookie-policy', 'routes/legal.tsx', { id: 'legal-cookies' }), // P-14b
  route('terms', 'routes/legal.tsx', { id: 'legal-terms' }), // P-14c
  route('modern-slavery-statement', 'routes/legal.tsx', { id: 'legal-modern-slavery' }), // P-14d
  route('*', 'routes/not-found.tsx'), // P-15
] satisfies RouteConfig;

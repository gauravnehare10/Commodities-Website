import type { MetaDescriptor } from 'react-router';
import { isPlaceholder, locations, siteConfig } from '~/content';
import type { Faq } from '~/content/model';
import { SITE_URL } from './env';

type MetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Extra JSON-LD objects for this page. */
  jsonLd?: object[];
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}` || '/';

/** Builds the full meta array for a route (docs/TECHNICAL_ARCHITECTURE.md §10). */
export function buildMeta({
  title,
  description,
  path,
  noindex,
  jsonLd = [],
}: MetaInput): MetaDescriptor[] {
  const fullTitle =
    path === '/' ? `${siteConfig.companyName} | ${title}` : `${title} | ${siteConfig.companyName}`;
  const url = absoluteUrl(path);
  const meta: MetaDescriptor[] = [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:locale', content: 'en_GB' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
  if (noindex) meta.push({ name: 'robots', content: 'noindex, follow' });
  for (const ld of jsonLd) meta.push({ 'script:ld+json': ld });
  return meta;
}

export type Crumb = { label: string; to: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.to),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  const answered = faqs.filter((f) => !f.answer.some(isPlaceholder));
  if (answered.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.join(' ') },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  if (isPlaceholder(siteConfig.companyName)) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@type': 'Organization', name: siteConfig.companyName },
    areaServed: siteConfig.coverage.regions.length ? siteConfig.coverage.regions : undefined,
  };
}

/** Organization + LocalBusiness: emitted only when real business data exists. */
export function organizationJsonLd(): object[] {
  if (isPlaceholder(siteConfig.companyName)) return [];
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyName,
    legalName: isPlaceholder(siteConfig.legalName) ? undefined : siteConfig.legalName,
    url: SITE_URL,
    telephone: isPlaceholder(siteConfig.primaryPhone) ? undefined : siteConfig.primaryPhone,
    email: isPlaceholder(siteConfig.primaryEmail) ? undefined : siteConfig.primaryEmail,
    sameAs: siteConfig.social.map((s) => s.url),
  };
  const businesses = locations.map((l) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${siteConfig.companyName} – ${l.name}`,
    telephone: l.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: l.address.lines.join(', '),
      addressLocality: l.address.town,
      postalCode: l.address.postcode,
      addressCountry: 'GB',
    },
    geo: l.geo
      ? { '@type': 'GeoCoordinates', latitude: l.geo.lat, longitude: l.geo.lng }
      : undefined,
  }));
  return [org, ...businesses];
}

export const compact = <T>(items: (T | null | undefined)[]) =>
  items.filter((i): i is T => i != null);

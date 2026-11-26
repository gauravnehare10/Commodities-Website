/**
 * Typed content accessors: the only API route modules use to read content.
 * A future CMS adapter would replace the implementations here (docs/TECHNICAL_ARCHITECTURE.md §16).
 */
import bulkMixedWaste from './commodities/bulk-mixed-waste';
import endOfLifeVehicles from './commodities/end-of-life-vehicles';
import ferrousMetals from './commodities/ferrous-metals';
import nonFerrousMetals from './commodities/non-ferrous-metals';
import paperCardboard from './commodities/paper-cardboard';
import plastics from './commodities/plastics';
import weee from './commodities/weee';
import wood from './commodities/wood';
import { accreditations, downloads, locations, stats, testimonials } from './business-data';
import { faqs } from './faqs';
import { glossary } from './glossary';
import { industries } from './industries';
import { legalPages } from './legal';
import {
  categoryGroups,
  PLACEHOLDER,
  serviceGroups,
  type CategoryGroup,
  type CommodityCategory,
  type Faq,
  type Material,
  type Service,
  type ServiceGroup,
} from './model';
import { services } from './services';
import { siteConfig } from './site-config';

export {
  siteConfig,
  industries,
  glossary,
  locations,
  accreditations,
  stats,
  testimonials,
  downloads,
};
export { home, defaultProcess } from './home';

export const allCategories: CommodityCategory[] = [
  ferrousMetals,
  nonFerrousMetals,
  plastics,
  paperCardboard,
  wood,
  endOfLifeVehicles,
  weee,
  bulkMixedWaste,
];

export const allServices: Service[] = services;
export const allFaqs: Faq[] = faqs;
export const allLegalPages = legalPages;

const byGroupThenOrder =
  <G extends string>(groups: readonly G[]) =>
  (a: { group: G; order: number }, b: { group: G; order: number }) =>
    groups.indexOf(a.group) - groups.indexOf(b.group) || a.order - b.order;

// ---------- Commodities ----------

export function activeCategories(): CommodityCategory[] {
  return allCategories.filter((c) => c.active).sort(byGroupThenOrder(categoryGroups));
}

export function activeCategorySlugs(): string[] {
  return activeCategories().map((c) => c.slug);
}

export function getCategory(slug: string | undefined): CommodityCategory | undefined {
  return activeCategories().find((c) => c.slug === slug);
}

export function categoriesByGroup(): { group: CategoryGroup; items: CommodityCategory[] }[] {
  return categoryGroups
    .map((group) => ({ group, items: activeCategories().filter((c) => c.group === group) }))
    .filter((g) => g.items.length > 0);
}

export function activeMaterials(category: CommodityCategory): Material[] {
  return category.materials.filter((m) => m.active);
}

export type MaterialIndexEntry = { material: Material; category: CommodityCategory };

/** Flat list used by the commodities hub search. */
export function materialIndex(): MaterialIndexEntry[] {
  return activeCategories().flatMap((category) =>
    activeMaterials(category).map((material) => ({ material, category })),
  );
}

// ---------- Services ----------

export function activeServices(): Service[] {
  return allServices.filter((s) => s.active).sort(byGroupThenOrder(serviceGroups));
}

export function activeServiceSlugs(): string[] {
  return activeServices().map((s) => s.slug);
}

export function getService(slug: string | undefined): Service | undefined {
  return activeServices().find((s) => s.slug === slug);
}

export function servicesByGroup(): { group: ServiceGroup; items: Service[] }[] {
  return serviceGroups
    .map((group) => ({ group, items: activeServices().filter((s) => s.group === group) }))
    .filter((g) => g.items.length > 0);
}

export function servicesBySlugs(slugs: string[]): Service[] {
  return slugs.map(getService).filter((s): s is Service => Boolean(s));
}

export function categoriesBySlugs(slugs: string[]): CommodityCategory[] {
  return slugs.map(getCategory).filter((c): c is CommodityCategory => Boolean(c));
}

// ---------- FAQs ----------

export function faqsByIds(ids: string[]): Faq[] {
  return ids.map((id) => allFaqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}

export function featuredFaqs(limit = 4): Faq[] {
  return allFaqs.filter((f) => f.featured).slice(0, limit);
}

// ---------- Legal ----------

export function activeLegalPages() {
  return allLegalPages.filter(
    (p) => p.slug !== 'modern-slavery-statement' || siteConfig.features.modernSlavery,
  );
}

export function getLegalPage(slug: string) {
  return activeLegalPages().find((p) => p.slug === slug);
}

// ---------- Helpers ----------

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.includes(PLACEHOLDER);
}

/** Digits-only tel: href, or undefined while the number is a placeholder. */
export function telHref(phone: string): string | undefined {
  if (isPlaceholder(phone)) return undefined;
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

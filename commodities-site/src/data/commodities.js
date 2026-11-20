/**
 * Commodity categories (docs/PROJECT_REQUIREMENTS.md §8, to be confirmed: MI-05).
 * Phase 3: slug and name only (used by navigation and routing).
 * Phase 4 adds summary, image, overview, grades, accepted/notAccepted and relatedServices
 * (data model: docs/WEBSITE_STRUCTURE.md §5).
 */
export const commodities = [
  { slug: 'ferrous-metals', name: 'Ferrous Metals' },
  { slug: 'non-ferrous-metals', name: 'Non-Ferrous Metals' },
  { slug: 'plastics', name: 'Plastics' },
  { slug: 'paper-cardboard', name: 'Paper & Cardboard' },
  { slug: 'wood', name: 'Wood' },
  { slug: 'electrical-waste', name: 'Electrical Waste' },
];

export function getCommodity(slug) {
  return commodities.find((c) => c.slug === slug);
}

import type { Industry } from './model';

/** Candidate industries (docs/WEBSITE_STRUCTURE.md §5.6), to be confirmed by the business. */
export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Engineering',
    icon: 'factory',
    summary:
      'Production offcuts, turnings, redundant machinery and packaging from manufacturing sites.',
    typicalMaterials: ['ferrous-metals', 'non-ferrous-metals', 'plastics', 'paper-cardboard'],
    services: ['collection-haulage', 'site-audits', 'processing'],
  },
  {
    slug: 'construction-demolition',
    name: 'Construction & Demolition',
    icon: 'hardhat',
    summary:
      'Structural steel, rebar, cable and mixed materials from building and demolition projects.',
    typicalMaterials: ['ferrous-metals', 'non-ferrous-metals', 'wood', 'bulk-mixed-waste'],
    services: ['site-clearances', 'collection-haulage'],
  },
  {
    slug: 'automotive',
    name: 'Automotive & Vehicle Salvage',
    icon: 'car',
    summary:
      'End-of-life vehicles, alloy wheels, batteries and parts from garages and salvage operators.',
    typicalMaterials: ['end-of-life-vehicles', 'non-ferrous-metals', 'ferrous-metals'],
    services: ['elv-depollution', 'collection-haulage'],
  },
  {
    slug: 'waste-management',
    name: 'Waste Management & Transfer Stations',
    icon: 'recycle',
    summary: 'Sorted and baled commodities, plus outlets and haulage for bulk streams.',
    typicalMaterials: [
      'ferrous-metals',
      'non-ferrous-metals',
      'plastics',
      'paper-cardboard',
      'bulk-mixed-waste',
    ],
    services: ['commodity-trading', 'waste-brokerage', 'export-shipping'],
  },
  {
    slug: 'retail-logistics',
    name: 'Retail, Logistics & Warehousing',
    icon: 'warehouse',
    summary: 'Cardboard, film, pallets and racking from distribution centres and stores.',
    typicalMaterials: ['paper-cardboard', 'plastics', 'wood', 'ferrous-metals'],
    services: ['collection-haulage', 'waste-brokerage'],
  },
  {
    slug: 'utilities-infrastructure',
    name: 'Utilities & Infrastructure',
    icon: 'zap',
    summary: 'Cable, rail, pipe and plant from network upgrades and infrastructure works.',
    typicalMaterials: ['non-ferrous-metals', 'ferrous-metals'],
    services: ['site-clearances', 'collection-haulage'],
  },
  {
    slug: 'public-sector',
    name: 'Public Sector & Emergency Services',
    icon: 'building',
    summary: 'Fleet vehicles, equipment and estate clearances with full audit trails.',
    typicalMaterials: ['end-of-life-vehicles', 'weee', 'ferrous-metals'],
    services: ['elv-depollution', 'site-audits'],
  },
];

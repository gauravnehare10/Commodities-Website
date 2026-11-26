import { defineCategory } from '../model';

/**
 * Candidate category (docs/PROJECT_REQUIREMENTS.md §9.1).
 * Material descriptions are general industry definitions. Acceptance criteria,
 * logistics and anything about how the business operates are placeholders (MI-05).
 */
export default defineCategory({
  slug: 'ferrous-metals',
  name: 'Ferrous Metals',
  group: 'metals',
  active: true,
  confirmed: false,
  order: 1,
  icon: 'ferrous',
  summary:
    'Iron and steel scrap, from heavy structural sections and rebar to light iron, cast iron and machining turnings.',
  overview: [
    'Ferrous metals contain iron, which makes them magnetic. Steel is the most widely recycled material in the world, and graded ferrous scrap is a key raw material for electric arc furnaces and foundries.',
    'Scrap is graded by thickness, size, composition and cleanliness. Well-sorted, correctly graded loads are worth more and are processed faster.',
    '[PLACEHOLDER] How the business handles ferrous metals: sites, processing, collection and outlets (MI-05).',
  ],
  keyFacts: [
    '[PLACEHOLDER] Key fact (e.g. weighbridge on site)',
    '[PLACEHOLDER] Key fact (e.g. collection available)',
  ],
  materials: [
    {
      slug: 'hms',
      name: 'Heavy Melting Scrap',
      subgroup: 'Heavy',
      codes: ['HMS 1', 'HMS 2'],
      description:
        'Thick, heavy steel such as structural sections, plate and beams, cut to size for furnace charging. HMS 1 is heavier and cleaner than HMS 2.',
      typicalSources: ['Demolition', 'Fabrication', 'Structural steel'],
      active: true,
    },
    {
      slug: 'old-arisings',
      name: 'Old Arisings',
      subgroup: 'Mixed',
      codes: ['OA'],
      description:
        'Mixed ferrous scrap from demolition, dismantling and general sources. Usually needs cutting or shearing before it can be used.',
      typicalSources: ['Demolition', 'Site clearances'],
      active: true,
    },
    {
      slug: 'oversize-oa',
      name: 'Oversize Old Arisings',
      subgroup: 'Mixed',
      codes: ['Oversize OA'],
      description:
        'Old arisings whose pieces are too large for standard sizing and need extra processing.',
      typicalSources: ['Demolition', 'Industrial dismantling'],
      active: true,
    },
    {
      slug: 'light-iron',
      name: 'Light Iron',
      subgroup: 'Light',
      description:
        'Thin-gauge steel such as sheet, light fabrications, shelving and appliance casings.',
      typicalSources: ['Manufacturing', 'Warehousing', 'Household appliances'],
      active: true,
    },
    {
      slug: 'cast-iron',
      name: 'Cast Iron',
      subgroup: 'Heavy',
      description:
        'Brittle, high-carbon iron from items such as engine blocks, radiators, manhole covers and machine bases.',
      typicalSources: ['Plumbing and heating', 'Engineering', 'Infrastructure'],
      active: true,
    },
    {
      slug: 'oversize-shearing',
      name: 'Oversize Shearing',
      subgroup: 'Heavy',
      description:
        'Long or bulky steel sections that must be sheared to size before they can be charged.',
      typicalSources: ['Demolition', 'Structural steel'],
      active: true,
    },
    {
      slug: 'rebar',
      name: 'Rebar',
      subgroup: 'Heavy',
      description:
        'Steel reinforcing bar recovered from concrete structures and construction offcuts.',
      typicalSources: ['Construction', 'Demolition'],
      active: true,
    },
    {
      slug: 'rail',
      name: 'Rail',
      subgroup: 'Heavy',
      description: 'Used steel rail track and related heavy track components.',
      typicalSources: ['Rail infrastructure'],
      active: true,
    },
    {
      slug: 'turnings',
      name: 'Steel Turnings & Swarf',
      subgroup: 'Process',
      description:
        'Steel chips and shavings from machining. They may carry cutting oils, which affects grading.',
      typicalSources: ['Machine shops', 'Engineering'],
      active: true,
    },
  ],
  acceptance: {
    accepted: ['[PLACEHOLDER] Accepted ferrous items (MI-05)'],
    notAccepted: [
      '[PLACEHOLDER] Items not accepted, e.g. sealed or pressurised containers (MI-05)',
    ],
    preparation: ['[PLACEHOLDER] Preparation guidance (MI-05)'],
  },
  logistics: {
    minimumQuantity: '[PLACEHOLDER] Minimum quantity (MI-05)',
    collection: '[PLACEHOLDER] Collection options (MI-06)',
    dropOff: '[PLACEHOLDER] Drop-off policy and opening hours (MI-07, MI-30)',
  },
  complianceNotes: [
    'In England and Wales, scrap metal dealers must hold a licence under the Scrap Metal Dealers Act 2013, verify the identity of sellers, and must not pay for scrap metal in cash.',
  ],
  relatedServices: ['collection-haulage', 'site-clearances', 'processing', 'export-shipping'],
  faqs: ['cash-payment', 'seller-id', 'how-priced', 'minimum-quantity'],
  seo: {
    title: 'Ferrous Metals Recycling & Trading',
    description:
      'Ferrous scrap grades explained: HMS, OA, light iron, cast iron, rebar, rail and turnings. Check what is accepted and request a price.',
  },
});

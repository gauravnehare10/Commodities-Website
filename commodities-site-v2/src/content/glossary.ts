import type { GlossaryEntry } from './model';

/** Industry glossary (docs/WEBSITE_STRUCTURE.md §7.1). Definitions must be approved by the business. */
export const glossary: GlossaryEntry[] = [
  {
    term: 'ATF',
    slug: 'atf',
    aliases: ['Authorised Treatment Facility'],
    definition:
      'Authorised Treatment Facility: a site permitted to depollute and dismantle end-of-life vehicles and issue Certificates of Destruction.',
    relatedCategories: ['end-of-life-vehicles'],
  },
  {
    term: 'CoD',
    slug: 'cod',
    aliases: ['Certificate of Destruction'],
    definition:
      'Certificate of Destruction: issued by an ATF through the DVLA to confirm a vehicle has been scrapped.',
    relatedCategories: ['end-of-life-vehicles'],
  },
  {
    term: 'DMR',
    slug: 'dmr',
    aliases: ['Dry Mixed Recycling'],
    definition:
      'Dry Mixed Recycling: paper, card, cans and plastics collected together and sorted later.',
    relatedCategories: ['bulk-mixed-waste'],
  },
  {
    term: 'Duty of care',
    slug: 'duty-of-care',
    aliases: [],
    definition:
      'The legal responsibility of anyone who produces, carries or handles waste to make sure it is managed safely and passed only to authorised people.',
    relatedCategories: [],
  },
  {
    term: 'ELV',
    slug: 'elv',
    aliases: ['End-of-life vehicle', 'ELVs'],
    definition:
      'End-of-life vehicle: a vehicle that is being scrapped and must be treated at an ATF.',
    relatedCategories: ['end-of-life-vehicles'],
  },
  {
    term: 'Ferrous',
    slug: 'ferrous',
    aliases: [],
    definition: 'Containing iron. Ferrous metals, such as steel and cast iron, are magnetic.',
    relatedCategories: ['ferrous-metals'],
  },
  {
    term: 'HMS',
    slug: 'hms',
    aliases: ['Heavy Melting Scrap'],
    definition:
      'Heavy Melting Scrap: thick, heavy steel cut to size for furnace charging, commonly graded HMS 1 and HMS 2.',
    relatedCategories: ['ferrous-metals'],
  },
  {
    term: 'Irony aluminium',
    slug: 'irony-aluminium',
    aliases: [],
    definition:
      'Aluminium scrap with iron or steel attached, which must be separated during processing.',
    relatedCategories: ['non-ferrous-metals'],
  },
  {
    term: 'Non-ferrous',
    slug: 'non-ferrous',
    aliases: [],
    definition:
      'Containing little or no iron. Non-ferrous metals, such as copper, aluminium, brass and lead, are not magnetic.',
    relatedCategories: ['non-ferrous-metals'],
  },
  {
    term: 'OA',
    slug: 'oa',
    aliases: ['Old Arisings'],
    definition:
      'Old Arisings: mixed ferrous scrap from demolition and general sources that usually needs processing.',
    relatedCategories: ['ferrous-metals'],
  },
  {
    term: 'OCC',
    slug: 'occ',
    aliases: ['Old Corrugated Cardboard'],
    definition:
      'Old Corrugated Cardboard: used corrugated boxes and packaging, the main cardboard recycling grade.',
    relatedCategories: ['paper-cardboard'],
  },
  {
    term: 'POPs',
    slug: 'pops',
    aliases: ['Persistent organic pollutants'],
    definition:
      'Persistent organic pollutants: harmful chemicals that break down very slowly. Waste containing them must be destroyed, not recycled.',
    relatedCategories: ['bulk-mixed-waste'],
  },
  {
    term: 'Swarf',
    slug: 'swarf',
    aliases: ['Turnings'],
    definition: 'Chips and shavings produced by machining metal.',
    relatedCategories: ['ferrous-metals', 'non-ferrous-metals'],
  },
  {
    term: 'WEEE',
    slug: 'weee',
    aliases: ['Waste Electrical and Electronic Equipment'],
    definition:
      'Waste Electrical and Electronic Equipment: discarded electrical items, regulated by the WEEE Regulations.',
    relatedCategories: ['weee'],
  },
  {
    term: 'Waste transfer note',
    slug: 'waste-transfer-note',
    aliases: [],
    definition:
      'A record of the transfer of non-hazardous waste between parties, required under the duty of care.',
    relatedCategories: [],
  },
  {
    term: 'Weighbridge ticket',
    slug: 'weighbridge-ticket',
    aliases: [],
    definition:
      'A record of a vehicle weighed loaded and empty, used to calculate the net weight of material delivered or collected.',
    relatedCategories: [],
  },
];

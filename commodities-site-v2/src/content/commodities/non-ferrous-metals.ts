import { defineCategory } from '../model';

export default defineCategory({
  slug: 'non-ferrous-metals',
  name: 'Non-Ferrous Metals',
  group: 'metals',
  active: true,
  confirmed: false,
  order: 2,
  icon: 'non-ferrous',
  summary:
    'Copper, brass, aluminium, stainless steel, lead, zinc and cable, graded by alloy, purity and cleanliness.',
  overview: [
    'Non-ferrous metals contain little or no iron. They resist corrosion, are not magnetic and are worth far more per tonne than ferrous scrap, so careful sorting has a big effect on value.',
    'Value depends on the alloy, how clean the metal is, and whether it is mixed with other materials such as insulation, solder, paint or attached steel.',
    'Non-ferrous metals are sorted by alloy in our covered bay, tested where needed and sold to UK refiners and overseas smelters.',
  ],
  keyFacts: ['Sorted by alloy in a covered bay', 'Handheld analyser for alloy testing'],
  materials: [
    {
      slug: 'dry-bright-wire',
      name: 'Dry Bright Wire',
      subgroup: 'Copper',
      description:
        'Clean, bare, unalloyed copper wire with no insulation, solder, plating or heavy oxidation.',
      typicalSources: ['Electrical contractors', 'Cable stripping'],
      active: true,
    },
    {
      slug: 'copper',
      name: 'Copper (mixed)',
      subgroup: 'Copper',
      description:
        'Unalloyed copper such as pipe and tube that may carry solder, fittings or light oxidation.',
      typicalSources: ['Plumbing', 'Heating', 'Strip-outs'],
      active: true,
    },
    {
      slug: 'cable',
      name: 'Insulated Cable',
      subgroup: 'Copper',
      description:
        'Copper or aluminium cable with insulation still attached. It is graded by the share of recoverable metal.',
      typicalSources: ['Electrical installations', 'Data centres', 'Demolition'],
      active: true,
    },
    {
      slug: 'brass',
      name: 'Brass',
      subgroup: 'Copper alloys',
      description:
        'Copper-zinc alloy from taps, valves, plumbing fittings, locks and machining turnings.',
      typicalSources: ['Plumbing', 'Engineering'],
      active: true,
    },
    {
      slug: 'aluminium',
      name: 'Aluminium',
      subgroup: 'Aluminium',
      description:
        'Aluminium sections such as extrusions, sheet and window profiles. Coatings and attachments affect the grade.',
      typicalSources: ['Glazing', 'Construction', 'Manufacturing'],
      active: true,
    },
    {
      slug: 'ali-wheels',
      name: 'Aluminium Wheels',
      subgroup: 'Aluminium',
      description: 'Alloy vehicle wheels with tyres, valves and balance weights removed.',
      typicalSources: ['Garages', 'Tyre centres', 'Vehicle salvage'],
      active: true,
    },
    {
      slug: 'irony-aluminium',
      name: 'Irony Aluminium',
      subgroup: 'Aluminium',
      description:
        'Aluminium with steel or iron attachments, such as bolted parts or inserts, that must be separated during processing.',
      typicalSources: ['Vehicle parts', 'Machinery'],
      active: true,
    },
    {
      slug: 'stainless-steel',
      name: 'Stainless Steel',
      subgroup: 'Stainless',
      description:
        'Corrosion-resistant steel alloys, commonly nickel-bearing grades, from catering equipment, sinks, tanks and process pipework.',
      typicalSources: ['Catering', 'Food processing', 'Chemical plants'],
      active: true,
    },
    {
      slug: 'lead',
      name: 'Lead',
      subgroup: 'Lead',
      description: 'Sheet, pipe and flashing lead from roofing and older plumbing.',
      typicalSources: ['Roofing', 'Refurbishment'],
      active: true,
    },
    {
      slug: 'lead-acid-batteries',
      name: 'Lead-Acid Batteries',
      subgroup: 'Lead',
      description:
        'Vehicle and industrial lead-acid batteries. These are hazardous waste and must be stored upright and handled with the correct paperwork.',
      typicalSources: ['Garages', 'Fleet operators', 'Standby power'],
      active: true,
    },
    {
      slug: 'zinc',
      name: 'Zinc',
      subgroup: 'Other',
      description: 'Zinc sheet and die-cast zinc items.',
      typicalSources: ['Roofing', 'Manufacturing'],
      active: true,
    },
  ],
  acceptance: {
    accepted: [
      'Copper, brass and bronze',
      'Aluminium sections, sheet, cans and wheels',
      'Insulated cable',
      'Stainless steel, lead and zinc',
      'Lead-acid batteries',
    ],
    notAccepted: ['Radioactive or contaminated items', 'Sealed units containing refrigerant gas'],
    preparation: [
      'Keep different alloys separate',
      'Remove steel fixings and plastic where you can',
    ],
  },
  logistics: {
    minimumQuantity: 'No minimum at the yard; 250 kg for collections',
    collection: 'Lockable cages, stillages or bulk bags',
    dropOff: 'Leeds yard, Monday to Friday 7:30am to 5pm and Saturday 8am to 12 noon',
  },
  complianceNotes: [
    'In England and Wales, scrap metal dealers must verify the identity of sellers and must not pay for scrap metal in cash (Scrap Metal Dealers Act 2013).',
  ],
  relatedServices: ['collection-haulage', 'commodity-trading', 'processing', 'export-shipping'],
  faqs: ['cash-payment', 'seller-id', 'how-priced', 'mixed-loads'],
  seo: {
    title: 'Non-Ferrous Metals Recycling & Trading',
    description:
      'Copper, brass, aluminium, stainless steel, lead, zinc and cable grades explained. Check what is accepted and request a price.',
  },
});

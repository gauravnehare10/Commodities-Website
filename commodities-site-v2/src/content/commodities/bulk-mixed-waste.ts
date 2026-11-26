import { defineCategory } from '../model';

export default defineCategory({
  slug: 'bulk-mixed-waste',
  name: 'Bulk & Mixed Waste',
  group: 'specialist',
  active: true,
  confirmed: false,
  order: 3,
  icon: 'bulk',
  summary:
    'Bulk loads of dry mixed recycling, POPs waste, glass, plasterboard and other mixed streams.',
  overview: [
    'Bulk and mixed waste streams need the right outlet, transport and paperwork. Some streams, such as waste containing persistent organic pollutants (POPs), have specific legal treatment requirements.',
    'We arrange collection and compliant outlets for bulk and mixed waste, recovering recyclable material wherever we can.',
  ],
  materials: [
    {
      slug: 'dmr',
      name: 'Dry Mixed Recycling',
      subgroup: 'Mixed',
      codes: ['DMR'],
      description:
        'A mix of dry recyclables such as paper, card, cans and plastics, collected together.',
      active: true,
    },
    {
      slug: 'pops',
      name: 'POPs Waste',
      subgroup: 'Regulated',
      codes: ['POPs'],
      description:
        'Waste containing persistent organic pollutants, such as some upholstered seating. By law it must be destroyed, for example by incineration, not landfilled or recycled.',
      active: true,
    },
    {
      slug: 'glass',
      name: 'Glass',
      subgroup: 'Mixed',
      description: 'Container and flat glass for remelting or aggregate use.',
      active: true,
    },
    {
      slug: 'plasterboard',
      name: 'Plasterboard',
      subgroup: 'Construction',
      description: 'Gypsum plasterboard offcuts. These must be kept separate from other waste.',
      typicalSources: ['Construction', 'Refurbishment'],
      active: true,
    },
  ],
  acceptance: {
    accepted: [
      'Dry mixed recycling',
      'Glass and plasterboard',
      'POPs waste such as upholstered seating',
    ],
    notAccepted: ['Asbestos', 'Clinical and liquid waste'],
  },
  complianceNotes: [
    'Waste containing POPs must be kept separate and sent for destruction. It must not be mixed with other waste.',
  ],
  relatedServices: ['waste-brokerage', 'collection-haulage', 'site-clearances'],
  faqs: ['pops-what-are', 'paperwork-duty-of-care'],
  seo: {
    title: 'Bulk & Mixed Waste Management',
    description:
      'Bulk dry mixed recycling, POPs waste, glass and plasterboard, with compliant paperwork. Request a quote.',
  },
});

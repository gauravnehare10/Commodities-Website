import { defineCategory } from '../model';

export default defineCategory({
  slug: 'paper-cardboard',
  name: 'Paper & Cardboard',
  group: 'recyclables',
  active: true,
  confirmed: false,
  order: 2,
  icon: 'fibre',
  summary:
    'Fibre grades including OCC (old corrugated cardboard), mixed paper, office paper, newspapers and shredded paper.',
  overview: [
    'Paper and cardboard ("fibre") is graded by fibre type and cleanliness. Dry, baled, well-sorted fibre goes back into paper mills as a raw material.',
    'Cardboard and paper are baled at our yard and sent to UK and European paper mills.',
  ],
  materials: [
    {
      slug: 'occ',
      name: 'Old Corrugated Cardboard',
      subgroup: 'Cardboard',
      codes: ['OCC'],
      description:
        'Used corrugated boxes and transit packaging, including double- and triple-wall board.',
      typicalSources: ['Retail', 'Warehousing', 'Manufacturing'],
      active: true,
    },
    {
      slug: 'mixed-paper',
      name: 'Mixed Paper',
      subgroup: 'Paper',
      description: 'A mix of paper grades such as office paper, mail and brochures.',
      typicalSources: ['Offices'],
      active: true,
    },
    {
      slug: 'office-paper',
      name: 'Office / White Paper',
      subgroup: 'Paper',
      description: 'Sorted white office paper, which is a higher-value fibre grade.',
      typicalSources: ['Offices', 'Print'],
      active: true,
    },
    {
      slug: 'newspapers-magazines',
      name: 'Newspapers & Magazines',
      subgroup: 'Paper',
      description: 'Unsold or used newspapers and magazines.',
      typicalSources: ['Publishing', 'Distribution'],
      active: true,
    },
    {
      slug: 'shredded-paper',
      name: 'Shredded Paper',
      subgroup: 'Paper',
      description: 'Paper from confidential shredding. It is usually bagged or baled.',
      typicalSources: ['Offices', 'Shredding services'],
      active: true,
    },
  ],
  acceptance: {
    accepted: [
      'Cardboard boxes and packaging',
      'Office and mixed paper',
      'Newspapers and magazines',
    ],
    notAccepted: ['Wet or food-contaminated paper and card', 'Waxed or plastic-coated card'],
    preparation: ['Flatten boxes and keep them dry', 'We can supply a baler for regular volumes'],
  },
  relatedServices: ['collection-haulage', 'waste-brokerage', 'commodity-trading'],
  faqs: ['mixed-loads', 'minimum-quantity'],
  seo: {
    title: 'Paper & Cardboard Recycling',
    description:
      'Fibre grades explained: OCC, mixed paper, office paper, newspapers and shredded paper. Check what is accepted and request a quote.',
  },
});

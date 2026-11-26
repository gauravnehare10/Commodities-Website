import { defineCategory } from '../model';

export default defineCategory({
  slug: 'plastics',
  name: 'Plastics',
  group: 'recyclables',
  active: true,
  confirmed: false,
  order: 1,
  icon: 'plastics',
  summary:
    'Post-industrial and post-consumer plastics sorted by polymer: PET, HDPE, PP, LDPE film, PVC, PS and mixed rigids.',
  overview: [
    'Plastics are traded by polymer type. Single-polymer, clean and baled material is easiest to recycle and has the most value. Mixed or contaminated plastic often needs further sorting.',
    '[PLACEHOLDER] How the business handles plastics (MI-05).',
  ],
  materials: [
    {
      slug: 'pet',
      name: 'PET',
      subgroup: 'Polymer',
      codes: ['Code 1'],
      description: 'Polyethylene terephthalate: drinks bottles, food trays and strapping.',
      active: true,
    },
    {
      slug: 'hdpe',
      name: 'HDPE',
      subgroup: 'Polymer',
      codes: ['Code 2'],
      description: 'High-density polyethylene: milk bottles, drums, crates and pipe.',
      active: true,
    },
    {
      slug: 'pvc',
      name: 'PVC',
      subgroup: 'Polymer',
      codes: ['Code 3'],
      description: 'Polyvinyl chloride: window frames, pipe and cable sheathing.',
      active: true,
    },
    {
      slug: 'ldpe-film',
      name: 'LDPE Film',
      subgroup: 'Polymer',
      codes: ['Code 4'],
      description: 'Low-density polyethylene stretch wrap, shrink film and bags.',
      typicalSources: ['Warehousing', 'Retail back-of-store'],
      active: true,
    },
    {
      slug: 'pp',
      name: 'PP',
      subgroup: 'Polymer',
      codes: ['Code 5'],
      description: 'Polypropylene: tubs, caps, crates and woven sacks.',
      active: true,
    },
    {
      slug: 'ps',
      name: 'PS',
      subgroup: 'Polymer',
      codes: ['Code 6'],
      description: 'Polystyrene, including expanded polystyrene packaging.',
      active: true,
    },
    {
      slug: 'mixed-rigids',
      name: 'Mixed Rigid Plastics',
      subgroup: 'Mixed',
      description: 'Mixed hard plastics, often baled, needing sorting before reprocessing.',
      active: true,
    },
  ],
  acceptance: {
    accepted: ['[PLACEHOLDER] Accepted plastics (MI-05)'],
    notAccepted: ['[PLACEHOLDER] Plastics not accepted (MI-05)'],
    preparation: ['[PLACEHOLDER] Baling and contamination guidance (MI-05)'],
  },
  relatedServices: ['collection-haulage', 'waste-brokerage', 'commodity-trading'],
  faqs: ['mixed-loads', 'minimum-quantity'],
  seo: {
    title: 'Plastic Recycling & Trading',
    description:
      'Plastic grades by polymer: PET, HDPE, PP, LDPE film, PVC, PS and mixed rigids. Check what is accepted and request a quote.',
  },
});

import { defineCategory } from '../model';

export default defineCategory({
  slug: 'end-of-life-vehicles',
  name: 'End-of-Life Vehicles',
  group: 'specialist',
  active: true,
  confirmed: false,
  order: 1,
  icon: 'elv',
  summary:
    'Scrap vehicles depolluted and recycled at an Authorised Treatment Facility, with a Certificate of Destruction issued.',
  overview: [
    'An end-of-life vehicle (ELV) is a vehicle that is being scrapped. In the UK, ELVs must be taken to an Authorised Treatment Facility (ATF), which removes fluids, batteries, tyres and other hazardous parts before the metal is recycled.',
    'The ATF issues a Certificate of Destruction (CoD) through the DVLA. This confirms the vehicle has been permanently taken off the road.',
    '[PLACEHOLDER] ATF status, permit number and how the business handles vehicles (MI-10). Do not publish this category until ATF status is confirmed.',
  ],
  materials: [
    {
      slug: 'whole-vehicles',
      name: 'Whole Vehicles',
      subgroup: 'Vehicles',
      codes: ['ELV'],
      description: 'Complete scrap cars and light vans awaiting depollution.',
      typicalSources: ['Private owners', 'Garages', 'Fleet operators'],
      active: true,
    },
    {
      slug: 'depolluted-elvs',
      name: 'Depolluted ELVs',
      subgroup: 'Vehicles',
      description: 'Vehicle shells that have already been depolluted, ready for shredding.',
      typicalSources: ['Other ATFs', 'Salvage yards'],
      active: true,
    },
  ],
  acceptance: {
    accepted: ['[PLACEHOLDER] Accepted vehicle types (MI-05)'],
    notAccepted: ['[PLACEHOLDER] Vehicles not accepted (MI-05)'],
    preparation: ['[PLACEHOLDER] Documents the owner must bring, e.g. V5C (MI-05)'],
  },
  complianceNotes: [
    'Only an Authorised Treatment Facility can issue a Certificate of Destruction for a scrapped vehicle.',
  ],
  relatedServices: ['elv-depollution', 'collection-haulage'],
  faqs: ['certificate-of-destruction', 'cash-payment'],
  seo: {
    title: 'End-of-Life Vehicle (ELV) Recycling',
    description:
      'Scrap vehicle recycling at an Authorised Treatment Facility, with depollution and a DVLA Certificate of Destruction.',
  },
});

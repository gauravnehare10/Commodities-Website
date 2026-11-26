import { defineCategory } from '../model';

export default defineCategory({
  slug: 'wood',
  name: 'Wood & Biomass',
  group: 'recyclables',
  active: true,
  confirmed: false,
  order: 3,
  icon: 'wood',
  summary: 'Waste wood graded A to C for recycling, panel-board manufacture and biomass fuel.',
  overview: [
    'In the UK, waste wood is commonly graded A to C by how clean it is. The grade decides whether it can become animal bedding, panel board or biomass fuel. Hazardous wood, such as wood treated with creosote or CCA, is handled separately.',
    'Waste wood is graded on arrival and sent for recycling, panel-board manufacture or biomass fuel.',
  ],
  materials: [
    {
      slug: 'grade-a',
      name: 'Grade A Wood',
      subgroup: 'Graded',
      description: 'Clean, untreated wood such as pallets, packaging and offcuts.',
      typicalSources: ['Distribution', 'Joinery'],
      active: true,
    },
    {
      slug: 'grade-b',
      name: 'Grade B Wood',
      subgroup: 'Graded',
      description:
        'Industrial wood that can include construction and demolition timber and some panel products.',
      typicalSources: ['Construction', 'Demolition'],
      active: true,
    },
    {
      slug: 'grade-c',
      name: 'Grade C Wood',
      subgroup: 'Graded',
      description:
        'Mixed wood including panel products such as chipboard, MDF and plywood. Usually used as biomass fuel.',
      typicalSources: ['Household waste sites', 'Mixed collections'],
      active: true,
    },
  ],
  acceptance: {
    accepted: [
      'Pallets and packaging timber (Grade A)',
      'Construction and demolition timber (Grade B)',
      'Chipboard, MDF and plywood (Grade C)',
    ],
    notAccepted: ['Wood treated with creosote or other hazardous preservatives'],
  },
  relatedServices: ['collection-haulage', 'waste-brokerage'],
  faqs: ['mixed-loads'],
  seo: {
    title: 'Wood Recycling & Biomass',
    description:
      'Waste wood grades A, B and C explained, for recycling and biomass. Check what is accepted and request a quote.',
  },
});

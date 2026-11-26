import { defineCategory } from '../model';

export default defineCategory({
  slug: 'weee',
  name: 'WEEE (Electrical Waste)',
  group: 'specialist',
  active: true,
  confirmed: false,
  order: 2,
  icon: 'weee',
  summary:
    'Commercial waste electrical and electronic equipment, from IT and office equipment to appliances and cabling.',
  overview: [
    'WEEE stands for Waste Electrical and Electronic Equipment. It contains valuable metals as well as hazardous parts, so it must be treated by suitably permitted facilities under the WEEE Regulations.',
    'Businesses have a duty of care to make sure their electrical waste goes to an authorised operator with the correct transfer paperwork.',
    '[PLACEHOLDER] WEEE permits and how the business handles electrical waste (MI-10).',
  ],
  materials: [
    {
      slug: 'it-equipment',
      name: 'IT & Telecoms Equipment',
      subgroup: 'Electronics',
      description: 'Computers, servers, networking and telecoms equipment.',
      typicalSources: ['Offices', 'Data centres'],
      active: true,
    },
    {
      slug: 'large-appliances',
      name: 'Large Appliances',
      subgroup: 'Appliances',
      description: 'Large electrical items such as commercial catering appliances and machines.',
      typicalSources: ['Catering', 'Facilities management'],
      active: true,
    },
    {
      slug: 'small-appliances',
      name: 'Small Appliances',
      subgroup: 'Appliances',
      description: 'Small electrical and electronic items, tools and devices.',
      typicalSources: ['Offices', 'Retail'],
      active: true,
    },
    {
      slug: 'display-equipment',
      name: 'Display Equipment',
      subgroup: 'Electronics',
      description:
        'Monitors and screens. Some types contain hazardous parts and need specialist treatment.',
      typicalSources: ['Offices', 'Education'],
      active: true,
    },
  ],
  acceptance: {
    accepted: ['[PLACEHOLDER] Accepted WEEE (MI-05)'],
    notAccepted: ['[PLACEHOLDER] Items not accepted (MI-05)'],
    preparation: ['[PLACEHOLDER] Data-bearing device policy (MI-05)'],
  },
  complianceNotes: [
    'Electrical waste from businesses must be moved with a waste transfer note, or a consignment note if hazardous.',
  ],
  relatedServices: ['collection-haulage', 'site-clearances'],
  faqs: ['paperwork-duty-of-care', 'weee-data'],
  seo: {
    title: 'Commercial WEEE Recycling',
    description:
      'Commercial electrical and electronic waste recycling: IT equipment, appliances and display equipment, with duty-of-care paperwork.',
  },
});

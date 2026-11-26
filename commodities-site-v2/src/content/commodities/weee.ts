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
    'Electrical waste is sorted by category at our yard and sent to approved treatment facilities, with full paperwork for every load.',
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
    accepted: [
      'IT and telecoms equipment',
      'Large and small appliances',
      'Cabling and control panels',
    ],
    notAccepted: ['Fridges and freezers', 'Loose or damaged lithium batteries'],
    preparation: ['Data-bearing devices are wiped or shredded, with a certificate for each device'],
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

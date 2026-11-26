import { defineService, type Service } from './model';

/**
 * Candidate services (docs/PROJECT_REQUIREMENTS.md §9.2). All are unconfirmed (MI-06).
 * Summaries describe the service type in neutral terms. Equipment, coverage
 * and capacity details must come from the business.
 */
export const services: Service[] = [
  defineService({
    slug: 'collection-haulage',
    name: 'Collection & Haulage',
    group: 'logistics',
    active: true,
    confirmed: false,
    order: 1,
    icon: 'truck',
    summary:
      'Scheduled or one-off collection of scrap and recyclable materials from your site, in containers suited to the material.',
    overview: [
      'Collection services move material from where it is produced to where it can be processed, either on a regular schedule or as a one-off job.',
      'Our own fleet of hook-loaders, skip wagons and grab lorries covers Yorkshire, the North West, the North East and the East Midlands. Most one-off collections can be booked within two working days.',
    ],
    includes: [
      'Containers sized to your material and space',
      'Scheduled or on-call collections',
      'Weighbridge ticket for every load',
      'Waste transfer notes and monthly reporting',
    ],
    audiences: ['manufacturing', 'construction-demolition', 'waste-management', 'retail-logistics'],
    materials: [
      'ferrous-metals',
      'non-ferrous-metals',
      'plastics',
      'paper-cardboard',
      'wood',
      'weee',
    ],
    equipment: [
      'Skips from 6 to 16 yd³',
      'Roll-on/roll-off containers from 20 to 40 yd³',
      'Stillages, cages and bulk bags',
    ],
    faqs: ['collection-areas', 'minimum-quantity'],
    seo: {
      title: 'Collection & Haulage',
      description:
        'Scheduled and one-off collection of scrap metal and recyclable materials. Request a collection quote.',
    },
  }),
  defineService({
    slug: 'site-clearances',
    name: 'Factory, Demolition & Site Clearances',
    group: 'logistics',
    active: true,
    confirmed: false,
    order: 2,
    icon: 'factory',
    summary:
      'Clearing redundant machinery, structural metal and mixed materials from factories, demolition projects and commercial sites.',
    overview: [
      'Site clearances remove redundant plant, stock and structural material so a site can be reused, sold or redeveloped, with recyclable materials recovered on the way.',
      'Every clearance starts with a site survey, method statement and risk assessment. Typical projects include factory closures, plant upgrades and strip-outs ahead of demolition.',
    ],
    includes: [
      'Site survey, method statement and risk assessment',
      'Dismantling and cutting of redundant plant',
      'Value of recovered metal credited against the job',
      'Full waste paperwork for every load',
    ],
    audiences: ['manufacturing', 'construction-demolition', 'utilities-infrastructure'],
    materials: ['ferrous-metals', 'non-ferrous-metals', 'weee', 'bulk-mixed-waste'],
    faqs: ['paperwork-duty-of-care'],
    seo: {
      title: 'Factory, Demolition & Site Clearances',
      description:
        'Clearance of redundant machinery, structural metal and mixed materials from commercial and industrial sites.',
    },
  }),
  defineService({
    slug: 'commodity-trading',
    name: 'Commodity Trading',
    group: 'trading',
    active: true,
    confirmed: false,
    order: 1,
    icon: 'handshake',
    summary:
      'Buying and selling graded secondary commodities between producers, processors, mills and end users.',
    overview: [
      'Commodity trading connects material producers with the processors, mills and manufacturers who use secondary raw materials. It agrees grade, volume, price and delivery terms on both sides.',
      'We trade ferrous and non-ferrous scrap, fibre and plastics with mills, foundries and processors in the UK and overseas. Every load is weighed, graded and documented before it is sold on.',
    ],
    includes: [
      'Prices linked to current market indices',
      'Grading to buyer specifications',
      'Spot loads or term contracts',
      'Delivery arranged to your site or port',
    ],
    audiences: ['manufacturing', 'waste-management'],
    materials: ['ferrous-metals', 'non-ferrous-metals', 'plastics', 'paper-cardboard'],
    faqs: ['buy-from-you', 'how-priced'],
    seo: {
      title: 'Commodity Trading',
      description:
        'Buying and selling graded scrap metal and secondary commodities. Enquire about supply or sale.',
    },
  }),
  defineService({
    slug: 'export-shipping',
    name: 'Export: Container & Bulk Shipping',
    group: 'trading',
    active: true,
    confirmed: false,
    order: 2,
    icon: 'ship',
    summary:
      'Containerised and bulk export of graded scrap and secondary commodities to overseas buyers.',
    overview: [
      'Export moves graded material to international buyers, either loaded into shipping containers or as bulk cargo, with the shipping and waste-shipment documents each destination needs.',
      'We ship from Hull, Immingham and Liverpool to buyers in Turkey, India, the Netherlands and Spain, on FOB or CIF terms.',
    ],
    includes: [
      'Container loading and photographic load records',
      'Pre-shipment inspection on request',
      'Customs and waste-shipment documents',
      'Booking with shipping lines',
    ],
    audiences: ['waste-management', 'manufacturing'],
    materials: ['ferrous-metals', 'non-ferrous-metals'],
    faqs: ['buy-from-you'],
    seo: {
      title: 'Scrap Metal Export: Container & Bulk',
      description: 'Containerised and bulk export of graded scrap metal and secondary commodities.',
    },
  }),
  defineService({
    slug: 'waste-brokerage',
    name: 'Waste Brokerage',
    group: 'advisory',
    active: true,
    confirmed: false,
    order: 1,
    icon: 'network',
    summary:
      'Finding compliant outlets and haulage for bulk waste streams, with one point of contact and consolidated paperwork.',
    overview: [
      'A waste broker arranges the disposal or recovery of waste for others, matching each stream with a suitable permitted outlet and haulier and managing the paperwork.',
      'We work with a network of permitted outlets and licensed hauliers across the North of England, so each stream goes to the right place at the right price.',
    ],
    includes: [
      'One point of contact for all your waste streams',
      'Outlets checked for the right permits',
      'Consolidated monthly invoice and paperwork',
      'Recycling and landfill-diversion reporting',
    ],
    audiences: ['waste-management', 'retail-logistics', 'construction-demolition'],
    materials: ['bulk-mixed-waste', 'wood', 'plastics', 'paper-cardboard'],
    faqs: ['paperwork-duty-of-care', 'pops-what-are'],
    seo: {
      title: 'Waste Brokerage',
      description:
        'Compliant outlets and haulage for bulk waste streams, with consolidated paperwork.',
    },
  }),
  defineService({
    slug: 'processing',
    name: 'Processing',
    group: 'processing',
    active: true,
    confirmed: false,
    order: 1,
    icon: 'cog',
    summary:
      'Sorting, shearing, baling and size reduction to turn mixed material into graded, furnace- or mill-ready commodities.',
    overview: [
      'Processing turns mixed or oversized material into a consistent grade that mills and smelters can use. That can mean sorting, cutting, shearing, baling or shredding.',
      'Our Leeds yard has a 600-tonne shear, a fibre and plastics baler and a covered sorting bay for non-ferrous metals.',
    ],
    includes: [
      'Sorting by grade and alloy',
      'Shearing of heavy and oversize steel',
      'Baling of light metals, fibre and plastics',
      'Grading to mill and smelter specifications',
    ],
    audiences: ['manufacturing', 'waste-management'],
    materials: ['ferrous-metals', 'non-ferrous-metals', 'plastics', 'paper-cardboard'],
    faqs: ['mixed-loads'],
    seo: {
      title: 'Scrap Processing',
      description: 'Sorting, shearing, baling and size reduction of scrap metal and recyclables.',
    },
  }),
  defineService({
    slug: 'elv-depollution',
    name: 'ELV Depollution',
    group: 'processing',
    active: true,
    confirmed: false,
    order: 2,
    icon: 'car',
    summary:
      'Depollution and recycling of end-of-life vehicles at an Authorised Treatment Facility, with Certificates of Destruction.',
    overview: [
      'Depollution removes fluids, batteries, tyres and other hazardous parts from scrap vehicles before the shell is recycled. This work must be done at an Authorised Treatment Facility.',
      'Our Leeds yard operates as an Authorised Treatment Facility, so we can depollute vehicles and issue Certificates of Destruction.',
    ],
    includes: [
      'Collection of non-running vehicles',
      'Removal of fluids, batteries, tyres and airbags',
      'Certificate of Destruction notified to the DVLA',
      'Recycling of the depolluted shell',
    ],
    audiences: ['automotive', 'public-sector'],
    materials: ['end-of-life-vehicles'],
    faqs: ['certificate-of-destruction'],
    seo: {
      title: 'ELV Depollution & Certificates of Destruction',
      description:
        'End-of-life vehicle depollution and recycling at an Authorised Treatment Facility.',
    },
  }),
  defineService({
    slug: 'site-audits',
    name: 'Site Audits & Consultancy',
    group: 'advisory',
    active: true,
    confirmed: false,
    order: 2,
    icon: 'clipboard',
    summary:
      'A review of the materials your site produces, with recommendations on segregation, containers and outlets.',
    overview: [
      'A site audit looks at what materials a site produces, how they are stored and where they go. It then recommends practical changes that improve recovery, compliance and value.',
      'An audit takes half a day on site and is free for businesses that go on to use our collection service.',
    ],
    includes: [
      'Walk-round of production and storage areas',
      'Review of current containers and contracts',
      'Written report with practical recommendations',
      'Estimate of recovery value and savings',
    ],
    audiences: ['manufacturing', 'retail-logistics', 'public-sector'],
    materials: ['ferrous-metals', 'non-ferrous-metals', 'plastics', 'paper-cardboard'],
    faqs: ['mixed-loads'],
    seo: {
      title: 'Site Audits & Recycling Consultancy',
      description: 'Site audits that improve material segregation, compliance and recovery value.',
    },
  }),
];

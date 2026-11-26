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
      '[PLACEHOLDER] Fleet, container types, coverage area and lead times (MI-06, MI-08).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
    audiences: ['manufacturing', 'construction-demolition', 'waste-management', 'retail-logistics'],
    materials: [
      'ferrous-metals',
      'non-ferrous-metals',
      'plastics',
      'paper-cardboard',
      'wood',
      'weee',
    ],
    equipment: ['[PLACEHOLDER] Container types, e.g. skips, roll-on/roll-off, stillages (MI-06)'],
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
      '[PLACEHOLDER] Scope, safety approach and typical projects (MI-06).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
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
      '[PLACEHOLDER] Commodities traded, buyer requirements and terms (MI-04, MI-19).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
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
      '[PLACEHOLDER] Export markets, ports and shipping terms (MI-08).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
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
      '[PLACEHOLDER] Broker registration and outlet network (MI-10).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
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
      '[PLACEHOLDER] Processing equipment and capacity (MI-06).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
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
      '[PLACEHOLDER] ATF status and permit number (MI-10). Do not publish until confirmed.',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
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
      '[PLACEHOLDER] Audit scope and any charges (MI-06).',
    ],
    includes: ['[PLACEHOLDER] What is included (MI-06)'],
    audiences: ['manufacturing', 'retail-logistics', 'public-sector'],
    materials: ['ferrous-metals', 'non-ferrous-metals', 'plastics', 'paper-cardboard'],
    faqs: ['mixed-loads'],
    seo: {
      title: 'Site Audits & Recycling Consultancy',
      description: 'Site audits that improve material segregation, compliance and recovery value.',
    },
  }),
];

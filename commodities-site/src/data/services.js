/**
 * Services (docs/WEBSITE_STRUCTURE.md §5, candidates from docs/PROJECT_REQUIREMENTS.md §8).
 * Descriptions explain each type of service in general terms. What THIS business includes
 * is marked '[TBC]' until confirmed (MI-06).
 * `icon` is a lucide-react icon name (https://lucide.dev/icons).
 */
import collectionImg from '../assets/images/services/collection-logistics.webp';
import tradingImg from '../assets/images/services/commodity-trading.webp';
import consultancyImg from '../assets/images/services/recycling-consultancy.webp';
import exportImg from '../assets/images/services/export.webp';
import processingImg from '../assets/images/services/processing.webp';
import clearancesImg from '../assets/images/services/site-clearances.webp';

export const services = [
  {
    id: 'collection-logistics',
    title: 'Collection & Logistics',
    summary: 'Scheduled or one-off collections of scrap and recyclable materials from your site.',
    description: [
      'Regular or one-off collections move material from where it is produced to where it can be processed, with the right container and vehicle for each load.',
    ],
    includes: [
      '[TBC] Scheduled and one-off collections',
      '[TBC] Containers suited to each material',
      '[TBC] Weighbridge tickets and transfer paperwork',
    ],
    image: collectionImg,
    imageAlt: 'Workers loading scrap metal onto a lorry',
    icon: 'Truck',
  },
  {
    id: 'site-clearances',
    title: 'Site Clearances',
    summary:
      'Clearing redundant machinery, structural metal and mixed materials from commercial sites.',
    description: [
      'Factory, demolition and commercial clearances remove redundant plant, stock and structural material so a site can be reused, sold or redeveloped, recovering recyclable materials along the way.',
    ],
    includes: [
      '[TBC] Factory and warehouse clearances',
      '[TBC] Demolition scrap removal',
      '[TBC] Recovery of recyclable materials',
    ],
    image: clearancesImg,
    imageAlt: 'An excavator clearing debris on a demolition site',
    icon: 'HardHat',
  },
  {
    id: 'commodity-trading',
    title: 'Commodity Trading',
    summary:
      'Buying and selling graded secondary materials between producers, processors and mills.',
    description: [
      'Commodity trading connects businesses that produce recyclable materials with the processors, mills and manufacturers that use them, agreeing grade, volume, price and delivery on both sides.',
    ],
    includes: [
      '[TBC] Buying graded scrap and recyclables',
      '[TBC] Supplying graded material to buyers',
      '[TBC] Agreed specifications and terms',
    ],
    image: tradingImg,
    imageAlt: 'Compressed bales of paper and cardboard ready for trading',
    icon: 'Handshake',
  },
  {
    id: 'export',
    title: 'Export',
    summary: 'Containerised and bulk shipments of graded material to overseas buyers.',
    description: [
      'Export moves graded material to international buyers, loaded into shipping containers or shipped in bulk, with the shipping and waste-shipment documents each destination requires.',
    ],
    includes: ['[TBC] Container loading', '[TBC] Bulk shipments', '[TBC] Export documentation'],
    image: exportImg,
    imageAlt: 'Aerial view of a shipping container yard',
    icon: 'Ship',
  },
  {
    id: 'processing',
    title: 'Processing',
    summary: 'Sorting, baling and shearing to turn mixed material into graded commodities.',
    description: [
      'Processing turns mixed or oversized material into a consistent grade that mills and smelters can use, through sorting, cutting, shearing or baling.',
    ],
    includes: ['[TBC] Sorting and grading', '[TBC] Baling', '[TBC] Shearing and size reduction'],
    image: processingImg,
    imageAlt: 'A worker feeding material onto a conveyor belt',
    icon: 'Factory',
  },
  {
    id: 'recycling-consultancy',
    title: 'Recycling Consultancy',
    summary: 'A review of the materials your site produces, with practical recommendations.',
    description: [
      'A site review looks at what materials are produced, how they are stored and where they go, then recommends practical changes that improve recovery, compliance and value.',
    ],
    includes: [
      '[TBC] Site visit and material review',
      '[TBC] Segregation and container advice',
      '[TBC] Written recommendations',
    ],
    image: consultancyImg,
    imageAlt: 'Two people in high-visibility vests inspecting an industrial warehouse',
    icon: 'ClipboardCheck',
  },
];

export function getService(id) {
  return services.find((s) => s.id === id);
}

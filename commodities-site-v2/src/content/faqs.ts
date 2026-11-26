import type { Faq } from './model';

/**
 * Answers that state general UK law are written in full. Answers about how
 * the business operates are placeholders until supplied (MI-19, MI-23, MI-29).
 */
export const faqs: Faq[] = [
  {
    id: 'cash-payment',
    topic: 'payments',
    featured: true,
    question: 'Can I be paid in cash for scrap metal?',
    answer: [
      'No. In England and Wales, the Scrap Metal Dealers Act 2013 bans cash payments for scrap metal. Payment is made by bank transfer or another traceable method.',
      'We pay by bank transfer. Trade-counter sales are usually paid the same day once the load is weighed and graded.',
    ],
  },
  {
    id: 'seller-id',
    topic: 'selling',
    featured: true,
    question: 'What do I need to bring when selling scrap metal?',
    answer: [
      'Scrap metal dealers must check and record the full name and address of anyone they buy from. Bring valid photo ID and proof of address.',
      'We accept a passport or photocard driving licence, plus a utility bill or bank statement from the last three months.',
    ],
  },
  {
    id: 'how-priced',
    topic: 'selling',
    featured: true,
    question: 'How is my material priced?',
    answer: [
      'Prices for secondary commodities follow global markets and depend on grade, quantity, cleanliness and location.',
      'Send us details or photos of your material and we will quote within one working day. Because markets move, quotes are valid for 7 days unless agreed otherwise.',
    ],
  },
  {
    id: 'minimum-quantity',
    topic: 'collections',
    question: 'Is there a minimum quantity?',
    answer: [
      'There is no minimum for drop-offs at our Leeds yard. For collections we usually need around 1 tonne of metal or a full container of other materials; smaller regular loads can be combined on a scheduled round.',
    ],
  },
  {
    id: 'collection-areas',
    topic: 'collections',
    featured: true,
    question: 'Which areas do you collect from?',
    answer: [
      'We collect across Yorkshire & the Humber, the North West, the North East and the East Midlands. Further afield is possible for larger loads; just ask.',
    ],
  },
  {
    id: 'mixed-loads',
    topic: 'selling',
    question: 'Can I send mixed materials together?',
    answer: [
      'Mixed loads can often be accepted, but sorting materials by grade at source usually gives a better price and quicker processing.',
      'We accept mixed metal loads and sort them at our yard. The price reflects the time needed to separate the grades and any non-metallic content.',
    ],
  },
  {
    id: 'buy-from-you',
    topic: 'buying',
    question: 'Can I buy material from you?',
    answer: [
      'Yes. We supply graded ferrous and non-ferrous scrap, baled fibre and plastics to mills, foundries and processors, by the lorry load or in containers for export. Tell us the grade, tonnage and delivery point and we will come back with availability and a price.',
    ],
  },
  {
    id: 'paperwork-duty-of-care',
    topic: 'compliance',
    question: 'What paperwork do I need?',
    answer: [
      'Under the waste duty of care, businesses must make sure their waste goes to an authorised operator. Each transfer must be recorded on a waste transfer note, or a consignment note for hazardous waste.',
      'We provide a waste transfer note (or consignment note for hazardous waste) for every collection, a weighbridge ticket for each load, and an annual summary on request.',
    ],
  },
  {
    id: 'certificate-of-destruction',
    topic: 'compliance',
    question: 'Will I get a Certificate of Destruction for my vehicle?',
    answer: [
      'A Certificate of Destruction can only be issued by an Authorised Treatment Facility. It confirms to the DVLA that the vehicle has been scrapped.',
      'Yes. Our Leeds yard is an Authorised Treatment Facility, and we notify the DVLA electronically as soon as your vehicle has been processed.',
    ],
  },
  {
    id: 'weee-data',
    topic: 'compliance',
    question: 'What happens to data on IT equipment?',
    answer: [
      'Hard drives and other data-bearing devices are either wiped with certified software or physically shredded. You receive a certificate listing serial numbers for every device.',
    ],
  },
  {
    id: 'pops-what-are',
    topic: 'compliance',
    question: 'What is POPs waste?',
    answer: [
      'POPs are persistent organic pollutants: chemicals that break down very slowly and can harm health and the environment. Some waste, such as certain upholstered domestic seating, contains POPs and must be destroyed rather than recycled or landfilled.',
    ],
  },
  {
    id: 'payment-timing',
    topic: 'payments',
    question: 'How quickly will I be paid?',
    answer: [
      'Trade-counter sales are usually paid the same day. Account customers are paid within 14 days of the end of the month, with a statement for every load.',
    ],
  },
];

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
      '[PLACEHOLDER] Payment methods and timing (MI-29).',
    ],
  },
  {
    id: 'seller-id',
    topic: 'selling',
    featured: true,
    question: 'What do I need to bring when selling scrap metal?',
    answer: [
      'Scrap metal dealers must check and record the full name and address of anyone they buy from. Bring valid photo ID and proof of address.',
      '[PLACEHOLDER] Accepted forms of ID (MI-05).',
    ],
  },
  {
    id: 'how-priced',
    topic: 'selling',
    featured: true,
    question: 'How is my material priced?',
    answer: [
      'Prices for secondary commodities follow global markets and depend on grade, quantity, cleanliness and location.',
      '[PLACEHOLDER] How quotes are given and how long they are valid (MI-19).',
    ],
  },
  {
    id: 'minimum-quantity',
    topic: 'collections',
    question: 'Is there a minimum quantity?',
    answer: ['[PLACEHOLDER] Minimum quantities per material and per collection (MI-05).'],
  },
  {
    id: 'collection-areas',
    topic: 'collections',
    featured: true,
    question: 'Which areas do you collect from?',
    answer: ['[PLACEHOLDER] Coverage area (MI-08).'],
  },
  {
    id: 'mixed-loads',
    topic: 'selling',
    question: 'Can I send mixed materials together?',
    answer: [
      'Mixed loads can often be accepted, but sorting materials by grade at source usually gives a better price and quicker processing.',
      '[PLACEHOLDER] Mixed-load policy (MI-05).',
    ],
  },
  {
    id: 'buy-from-you',
    topic: 'buying',
    question: 'Can I buy material from you?',
    answer: [
      '[PLACEHOLDER] Whether the business supplies graded material to buyers, and on what terms (MI-04).',
    ],
  },
  {
    id: 'paperwork-duty-of-care',
    topic: 'compliance',
    question: 'What paperwork do I need?',
    answer: [
      'Under the waste duty of care, businesses must make sure their waste goes to an authorised operator. Each transfer must be recorded on a waste transfer note, or a consignment note for hazardous waste.',
      '[PLACEHOLDER] Paperwork the business provides (MI-10).',
    ],
  },
  {
    id: 'certificate-of-destruction',
    topic: 'compliance',
    question: 'Will I get a Certificate of Destruction for my vehicle?',
    answer: [
      'A Certificate of Destruction can only be issued by an Authorised Treatment Facility. It confirms to the DVLA that the vehicle has been scrapped.',
      '[PLACEHOLDER] ATF status (MI-10).',
    ],
  },
  {
    id: 'weee-data',
    topic: 'compliance',
    question: 'What happens to data on IT equipment?',
    answer: ['[PLACEHOLDER] Data-bearing device policy (MI-05).'],
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
    answer: ['[PLACEHOLDER] Payment terms (MI-29).'],
  },
];

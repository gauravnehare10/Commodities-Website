import type { LegalPage } from './model';

/**
 * Demo legal text for the fictional demo company. Replace with text supplied or approved by
 * the business's legal adviser before launch (MI-24).
 */
const UPDATED = '26 November 2026';

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    updated: UPDATED,
    sections: [
      {
        heading: 'Who we are',
        body: [
          'Corvane Metals & Recycling Ltd ("we", "us") is the data controller for personal information collected through this website. You can contact us at enquiries@example.com or on 0113 496 0123.',
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'When you send an enquiry or request a quote we collect your name, company, email address, phone number and the details you give us about your material or requirements.',
          'When you sell scrap metal to us, the Scrap Metal Dealers Act 2013 requires us to verify and record your full name and address from your ID.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use your details to reply to your enquiry, prepare quotes, arrange collections and keep the records the law requires. Our lawful bases are taking steps at your request before entering into a contract, our legitimate interests in running the business, and legal obligation.',
          'We do not sell your information, and we only send marketing if you have asked us to.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiries that do not lead to business are deleted after 12 months. Transaction and waste records are kept for as long as the law requires, which is at least 3 years for scrap metal records and 2 years for waste transfer notes.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          "You can ask to see, correct or delete your information, or object to how we use it, by emailing enquiries@example.com. If you are unhappy with our response you can complain to the Information Commissioner's Office (ico.org.uk).",
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updated: UPDATED,
    sections: [
      {
        heading: 'Essential cookies',
        body: [
          'We use a small number of essential cookies and similar storage to make this website work, for example to remember your cookie choice. These do not need your consent.',
        ],
      },
      {
        heading: 'Analytics cookies',
        body: [
          'With your permission we use analytics cookies to understand how visitors use the site so we can improve it. They are only set if you choose "Accept analytics" in the cookie banner.',
          'You can change your choice at any time by clearing cookies for this site in your browser; the banner will then ask again.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    updated: UPDATED,
    sections: [
      {
        heading: 'Using this website',
        body: [
          'This website is provided by Corvane Metals & Recycling Ltd. By using it you agree to these terms.',
          'Information on the site, including descriptions of grades and services, is general guidance. It does not form an offer or a contract; quotes and terms are confirmed in writing for each enquiry.',
        ],
      },
      {
        heading: 'Prices and availability',
        body: [
          'Prices for secondary commodities change with the markets. Any price we give is valid only for the period stated on the quote.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'We take care to keep the site accurate but cannot guarantee it is free of errors or always available. Nothing in these terms limits liability that cannot be limited by law.',
        ],
      },
    ],
  },
  {
    slug: 'modern-slavery-statement',
    title: 'Modern Slavery Statement',
    updated: UPDATED,
    sections: [
      {
        heading: 'Our commitment',
        body: [
          'Corvane Metals & Recycling Ltd does not tolerate modern slavery or human trafficking in its business or supply chains.',
          'We check the identity and right to work of everyone we employ, use only licensed hauliers and permitted outlets, and expect the same standards from the businesses we buy from and sell to.',
        ],
      },
    ],
  },
];

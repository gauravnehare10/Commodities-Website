import type { LegalPage } from './model';

/** Legal content must be supplied or approved by the business's legal adviser (MI-24). */
const pending = (topic: string) => [
  {
    heading: 'Content pending',
    body: [
      `[PLACEHOLDER] ${topic} text to be supplied by the business or its legal adviser (MI-24).`,
    ],
  },
];

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    updated: '[PLACEHOLDER]',
    sections: pending('Privacy policy (UK GDPR)'),
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updated: '[PLACEHOLDER]',
    sections: pending('Cookie policy (PECR)'),
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    updated: '[PLACEHOLDER]',
    sections: pending('Website terms of use'),
  },
  {
    slug: 'modern-slavery-statement',
    title: 'Modern Slavery Statement',
    updated: '[PLACEHOLDER]',
    sections: pending('Modern slavery statement'),
  },
];

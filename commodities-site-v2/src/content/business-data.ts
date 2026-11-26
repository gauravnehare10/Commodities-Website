import type { Accreditation, Download, Location, Stat, Testimonial } from './model';

/**
 * Business-supplied records. All intentionally empty until supplied:
 * every section that uses them hides itself in production when empty.
 */

/** MI-07: depots, yards, offices. */
export const locations: Location[] = [
  {
    id: 'leeds-yard',
    name: 'Leeds yard & head office',
    type: 'yard',
    address: {
      lines: ['Unit 4, Wharfside Industrial Estate'],
      town: 'Leeds',
      postcode: 'LS10 1AB',
    },
    phone: '0113 496 0123',
    email: 'enquiries@example.com',
    hours: [
      { days: 'Monday to Friday', time: '7:30am to 5pm' },
      { days: 'Saturday', time: '8am to 12 noon' },
    ],
    facilities: [
      '60-tonne weighbridge',
      'Trade counter',
      'Covered non-ferrous bay',
      'Shear and baler',
    ],
  },
];

/** MI-10, MI-11: an item is shown only with a number or document as evidence. */
export const accreditations: Accreditation[] = [];

/** MI-12: every statistic needs a source and an as-of date. */
export const stats: Stat[] = [];

/** MI-13: written permission required (permissionConfirmed: true). */
export const testimonials: Testimonial[] = [];

/** MI-27: self-hosted PDFs under public/downloads/. */
export const downloads: Download[] = [];

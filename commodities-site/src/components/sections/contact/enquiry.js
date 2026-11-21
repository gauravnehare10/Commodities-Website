/**
 * Enquiry form logic, kept separate from the UI so it is easy to read and change.
 * docs/WEBSITE_STRUCTURE.md §4.6 (fields) and docs/TECHNICAL_ARCHITECTURE.md §7 (delivery).
 *
 * Two ways to deliver an enquiry, chosen by `formEndpoint` in src/data/company.js:
 *   ''              → EMAIL mode (demo): opens the visitor's email app with the enquiry written out,
 *                     addressed to company.email. The visitor presses Send themselves.
 *   Formspree URL   → FORMSPREE mode: posts the form to Formspree, which emails the business.
 */
import { commodities } from '../../../data/commodities';
import { enquiryTypes } from '../../../data/content';
import { isTbc } from '../../../utils/contact';

export const HONEYPOT = '_gotcha'; // Formspree's built-in spam trap field name

/** Longest message allowed. Keeps the email link well within the length mail apps accept. */
export const MESSAGE_MAX = 1500;

export const emptyEnquiry = {
  name: '',
  company: '',
  email: '',
  phone: '',
  enquiryType: '',
  commodity: '',
  quantity: '',
  message: '',
  consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

/** Returns { fieldName: message } for every invalid field (empty object when valid). */
export function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL.test(values.email.trim()))
    errors.email = 'Please enter a valid email address, like name@company.com.';
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!PHONE.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (!values.enquiryType) errors.enquiryType = 'Please choose an enquiry type.';
  if (values.message.trim().length < 10)
    errors.message = 'Please tell us a little more (at least 10 characters).';
  else if (values.message.length > MESSAGE_MAX)
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  if (!values.consent) errors.consent = 'Please tick the box so we can reply to your enquiry.';
  return errors;
}

/** Field order, used to focus the first invalid field. */
export const FIELD_ORDER = [
  'name',
  'company',
  'email',
  'phone',
  'enquiryType',
  'commodity',
  'quantity',
  'message',
  'consent',
];

/**
 * Builds a mailto: link containing the whole enquiry (EMAIL mode).
 * Mail apps expect CRLF line breaks; every part is URL-encoded.
 *
 * @param {object} values Form values (see emptyEnquiry)
 * @param {string} to Company email address ('' or '[TBC]' leaves the To field empty)
 * @returns {string} mailto: URL
 */
export function buildMailto(values, to) {
  const typeLabel = enquiryTypes.find((t) => t.value === values.enquiryType)?.label ?? '';
  const commodityLabel =
    values.commodity === 'other'
      ? 'Other / not sure'
      : (commodities.find((c) => c.slug === values.commodity)?.name ?? '');

  const subject = ['Website enquiry', [typeLabel, commodityLabel].filter(Boolean).join(' – ')]
    .filter(Boolean)
    .join(': ');

  const line = (label, value) => `${label}: ${value?.trim() ? value.trim() : '-'}`;
  const body = [
    'Enquiry sent from the website',
    '',
    line('Name', values.name),
    line('Company', values.company),
    line('Email', values.email),
    line('Phone', values.phone),
    line('Enquiry type', typeLabel),
    line('Commodity', commodityLabel),
    line('Approximate quantity', values.quantity),
    '',
    'Message:',
    values.message.trim(),
    '',
    '---',
    'The sender agreed to their details being used to respond to this enquiry.',
  ].join('\r\n');

  const recipient = isTbc(to) ? '' : encodeURIComponent(to.trim());
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens the visitor's email app with the given mailto: link. */
export function openMailApp(mailtoUrl) {
  window.location.href = mailtoUrl;
}

/**
 * Delivers the enquiry.
 * EMAIL mode (no endpoint): opens the visitor's email app and returns the mailto: link (for "Open email again").
 * FORMSPREE mode: posts the form; rejects if Formspree reports an error.
 *
 * @param {string} endpoint Formspree URL, or '' for EMAIL mode
 * @param {HTMLFormElement} formElement
 * @param {object} values Form values
 * @param {string} companyEmail Recipient for EMAIL mode
 * @returns {Promise<{ mode: 'email', mailto: string } | { mode: 'formspree' }>}
 */
export async function sendEnquiry(endpoint, formElement, values, companyEmail) {
  if (!endpoint) {
    const mailto = buildMailto(values, companyEmail);
    openMailApp(mailto);
    return { mode: 'email', mailto };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: new FormData(formElement),
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
  return { mode: 'formspree' };
}

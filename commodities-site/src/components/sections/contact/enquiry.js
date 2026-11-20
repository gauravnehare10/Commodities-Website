/**
 * Enquiry form logic, kept separate from the UI so it is easy to read and change.
 * docs/WEBSITE_STRUCTURE.md §4.6 (fields) and docs/TECHNICAL_ARCHITECTURE.md §7 (delivery).
 */

export const FORM_NAME = 'enquiry';
export const HONEYPOT = '_gotcha'; // recognised by Formspree; Netlify reads it via netlify-honeypot

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
 * Sends the enquiry to the configured form service.
 * @returns {Promise<void>} Resolves on success, rejects on failure.
 */
export async function sendEnquiry(endpoint, formElement) {
  const data = new FormData(formElement);

  if (!endpoint) {
    // Not configured yet (MI-12): log instead of sending, so the form can be tested.
    console.info(
      '[enquiry] No formEndpoint set in src/data/company.js; enquiry not sent:',
      Object.fromEntries(data),
    );
    await new Promise((r) => setTimeout(r, 500));
    return;
  }

  const response =
    endpoint === 'netlify'
      ? await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        })
      : await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

  if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
}

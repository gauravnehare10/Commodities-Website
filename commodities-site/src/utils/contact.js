/** Helpers for showing business details that may still be placeholders ('[TBC]'). */

export const isTbc = (value) => !value || String(value).includes('[TBC]');

/** `tel:` link for a phone number, or null while the number is still a placeholder. */
export function telHref(phone) {
  if (isTbc(phone)) return null;
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** `mailto:` link for an email address, or null while it is still a placeholder. */
export function mailHref(email) {
  if (isTbc(email)) return null;
  return `mailto:${email}`;
}

/** Company name without the placeholder marker, for the logo wordmark. */
export const displayName = (name) => name.replace('[TBC]', '').trim();

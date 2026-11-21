/**
 * Props that make an element fade up when it scrolls into view (see styles/animations.css).
 * Spread onto any element or React Bootstrap component, e.g. <Col {...reveal(i % 3)}>.
 *
 * @param {number} [index=0] Position in a row or list, used to stagger the delay
 * @param {number} [step=90] Milliseconds between items
 */
export function reveal(index = 0, step = 90) {
  return { 'data-reveal': '', style: { '--reveal-delay': `${index * step}ms` } };
}

/** Inline style for a staggered load-time entrance (.animate-in). */
export const delay = (ms) => ({ '--delay': `${ms}ms` });

/**
 * Responsive images for above-the-fold banners (docs/TECHNICAL_ARCHITECTURE.md §8, §10).
 *
 * Banner images live in public/images/ with fixed URLs so index.html can preload the current
 * page's banner before the JavaScript has loaded. Each has a phone-sized copy named "*-sm.webp".
 * The srcset/sizes here MUST match the preload hints in index.html, or the browser downloads twice.
 */

/** Home hero: 1200×960, phone copy 800×640. Shown at half width on desktop, full width below 992px. */
export const HERO_SIZES = '(min-width: 992px) 50vw, 100vw';

/** Page headers: 1600×700, phone copy 800×350. Always full width. */
export const BANNER_SIZES = '100vw';

/** Builds a srcset from a large image URL and its "-sm" copy. */
export function bannerSrcSet(url, smallWidth, largeWidth) {
  return `${url.replace(/\.webp$/, '-sm.webp')} ${smallWidth}w, ${url} ${largeWidth}w`;
}

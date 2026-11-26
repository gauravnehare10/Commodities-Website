/**
 * Card photography, looked up by slug (interim stock photos, see IMAGE_CREDITS.md).
 * Each image has an 800×600 file and a 400×300 copy (`*-400.webp`) for phones.
 * A slug without a file returns undefined, and the card falls back to its icon.
 */
const files = import.meta.glob<string>('../assets/images/{categories,services}/*.webp', {
  eager: true,
  import: 'default',
});

export type CardImage = { src: string; srcSet: string };

function lookup(folder: 'categories' | 'services', slug: string): CardImage | undefined {
  const src = files[`../assets/images/${folder}/${slug}.webp`];
  if (!src) return undefined;
  const small = files[`../assets/images/${folder}/${slug}-400.webp`];
  return { src, srcSet: small ? `${small} 400w, ${src} 800w` : `${src} 800w` };
}

export const categoryImage = (slug: string) => lookup('categories', slug);
export const serviceImage = (slug: string) => lookup('services', slug);

/** Phones show a 112px thumbnail; tablets two columns; desktop three or four. */
export const CARD_IMAGE_SIZES = '(max-width: 767px) 112px, (max-width: 1023px) 50vw, 400px';

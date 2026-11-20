import { company } from '../../data/company';
import { displayName } from '../../utils/contact';

/**
 * Page title and meta description. React 19 hoists <title> and <meta> into <head>
 * (docs/TECHNICAL_ARCHITECTURE.md §9, docs/WEBSITE_STRUCTURE.md §7).
 *
 * @param {string} title Page title (the company name is appended)
 * @param {string} description Meta description, 150–160 characters
 * @param {boolean} [noindex] Hide from search engines (404 page)
 */
export default function Seo({ title, description, noindex = false }) {
  const name = displayName(company.name);
  return (
    <>
      <title>{`${title} – ${name}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} – ${name}`} />
      <meta property="og:description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
    </>
  );
}

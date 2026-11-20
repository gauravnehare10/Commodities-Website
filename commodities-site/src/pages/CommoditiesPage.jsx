import { Link } from 'react-router-dom';
import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';
import { commodities } from '../data/commodities';

/** P-03 Commodities overview (docs/WEBSITE_STRUCTURE.md §4.3). Built in Phase 6. */
export default function CommoditiesPage() {
  return (
    <>
      <Seo
        title="Commodities"
        description="Ferrous and non-ferrous metals, plastics, paper and cardboard, wood and electrical waste. See the grades we handle and request a quote."
      />
      <PagePlaceholder eyebrow="Commodities" title="Our commodities" phase="Phase 6">
        <ul className="d-grid gap-2 ps-3">
          {commodities.map((c) => (
            <li key={c.slug}>
              <Link to={`/commodities/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </PagePlaceholder>
    </>
  );
}

import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';

/** P-01 Home (docs/WEBSITE_STRUCTURE.md §4.1). Built in Phase 5. */
export default function HomePage() {
  return (
    <>
      <Seo
        title="Scrap Metal & Commodities"
        description="Scrap metal and recyclable commodities: ferrous and non-ferrous metals, plastics, paper, wood and electrical waste. Collections, trading and quotes."
      />
      <PagePlaceholder eyebrow="Home" title="Home page" phase="Phase 5" />
    </>
  );
}

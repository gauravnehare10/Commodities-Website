import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';

/** P-02 About (docs/WEBSITE_STRUCTURE.md §4.2). Built in Phase 7. */
export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Who we are, how we work and the standards we follow when buying, collecting and recycling scrap metal and recyclable materials."
      />
      <PagePlaceholder eyebrow="About" title="About us" phase="Phase 7" />
    </>
  );
}

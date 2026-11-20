import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';

/** P-05 Services (docs/WEBSITE_STRUCTURE.md §4.5). Built in Phase 7. */
export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Collections and logistics, site clearances, commodity trading, export, processing and recycling consultancy for businesses."
      />
      <PagePlaceholder eyebrow="Services" title="Our services" phase="Phase 7" />
    </>
  );
}

import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';

/** P-06 Contact & enquiry (docs/WEBSITE_STRUCTURE.md §4.6). Built in Phase 8. */
export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us & Get a Quote"
        description="Get a quote for your scrap metal or recyclable material, arrange a collection or ask a question. Call us or send an enquiry."
      />
      <PagePlaceholder eyebrow="Contact" title="Get a quote" phase="Phase 8" />
    </>
  );
}

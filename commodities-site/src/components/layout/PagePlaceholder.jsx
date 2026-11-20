import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

/**
 * TEMPORARY: stands in for page content until each page is built
 * (Phases 5–9, docs/DEVELOPMENT_ROADMAP.md). Delete once every page is complete.
 */
export default function PagePlaceholder({ eyebrow, title, phase, children }) {
  return (
    <Section labelledBy="page-title">
      <SectionHeading
        id="page-title"
        as="h1"
        eyebrow={eyebrow}
        title={title}
        lead={`This page is built in ${phase}. The layout, header, footer and routing are in place.`}
      />
      {children}
      <div className="d-flex flex-wrap gap-3 mt-4">
        <Button to="/contact" arrow>
          Get a Quote
        </Button>
        <Button to="/" variant="secondary">
          Back to Home
        </Button>
      </div>
    </Section>
  );
}

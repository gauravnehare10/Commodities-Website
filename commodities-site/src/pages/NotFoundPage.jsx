import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';

/** P-08 Not found (docs/WEBSITE_STRUCTURE.md §4.7). Final version: this page is complete. */
export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found."
        noindex
      />
      <Section labelledBy="not-found-title">
        <SectionHeading
          id="not-found-title"
          as="h1"
          eyebrow="Error 404"
          title="Sorry, we can't find that page"
          lead="The page may have moved or no longer exists. These links will help you find what you need."
        />
        <div className="d-flex flex-wrap gap-3">
          <Button to="/" arrow>
            Back to Home
          </Button>
          <Button to="/commodities" variant="secondary">
            Our Commodities
          </Button>
          <Button to="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </Section>
    </>
  );
}

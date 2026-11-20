import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Seo from '../components/layout/Seo';
import ContactDetails from '../components/sections/contact/ContactDetails';
import EnquiryForm from '../components/sections/contact/EnquiryForm';
import PageHero from '../components/sections/shared/PageHero';
import Section from '../components/ui/Section';
import { pageHeroes } from '../data/content';

/** P-06 Contact & enquiry (docs/WEBSITE_STRUCTURE.md §4.6). */
export default function ContactPage() {
  const hero = pageHeroes.contact;
  return (
    <>
      <Seo
        title="Contact Us & Get a Quote"
        description="Get a quote for your scrap metal or recyclable material, arrange a collection or ask a question. Call us or send an enquiry."
      />

      {/* 1. Page header */}
      <PageHero
        title={hero.title}
        intro={hero.intro}
        image={hero.image}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      {/* 2. Enquiry form (left) and contact details (right); stacked on mobile and tablet */}
      <Section labelledBy="enquiry-title">
        <Row className="gy-5 gx-lg-5">
          <Col lg={7}>
            <h2 id="enquiry-title" className="mb-2">
              Send us an enquiry
            </h2>
            <p className="lead mb-4">
              Tell us what you have or what you need. The more detail you give, the faster we can
              quote.
            </p>
            <EnquiryForm />
          </Col>
          <Col lg={5}>
            <ContactDetails />
          </Col>
        </Row>
      </Section>
    </>
  );
}

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Seo from '../components/layout/Seo';
import CommodityCard from '../components/cards/CommodityCard';
import CtaBanner from '../components/sections/shared/CtaBanner';
import FeatureGrid from '../components/sections/shared/FeatureGrid';
import Hero from '../components/sections/home/Hero';
import ProcessSteps from '../components/sections/shared/ProcessSteps';
import ServiceCard from '../components/cards/ServiceCard';
import SplitFeature from '../components/sections/shared/SplitFeature';
import StatsStrip from '../components/sections/home/StatsStrip';
import Testimonial from '../components/sections/home/Testimonial';
import TrustBar from '../components/sections/shared/TrustBar';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { commodities } from '../data/commodities';
import { company } from '../data/company';
import { home, process, testimonials, whyUs } from '../data/content';
import { services } from '../data/services';
import { reveal } from '../utils/motion';

/** P-01 Home (docs/WEBSITE_STRUCTURE.md §4.1). */
export default function HomePage() {
  return (
    <>
      <Seo
        title="Scrap Metal & Commodities"
        description="Scrap metal and recyclable commodities: ferrous and non-ferrous metals, plastics, paper, wood and electrical waste. Collections, trading and quotes."
      />

      {/* 1. Hero */}
      <Hero {...home.hero} />

      {/* 2. Trust bar (hidden until accreditations are supplied, MI-08) */}
      <TrustBar items={company.accreditations} />

      {/* 3. Commodities preview */}
      <Section labelledBy="home-commodities-title">
        <SectionHeading
          id="home-commodities-title"
          eyebrow="Our commodities"
          title="Materials we handle"
          lead="From metals to plastics, paper, wood and electrical waste. Choose a category to see the grades and how to get a quote."
          action={
            <Button to="/commodities" variant="link">
              View all commodities
            </Button>
          }
        />
        <Row className="g-4">
          {commodities.map((c, i) => (
            <Col key={c.slug} xs={12} md={6} lg={4} {...reveal(i % 3)}>
              <CommodityCard commodity={c} />
            </Col>
          ))}
        </Row>
      </Section>

      {/* 4. About intro */}
      <Section tone="sand" labelledBy="home-about-title">
        <SplitFeature
          id="home-about-title"
          eyebrow={home.about.eyebrow}
          title={home.about.title}
          paragraphs={home.about.text}
          points={home.about.points}
          image={home.about.image}
          imageAlt={home.about.imageAlt}
          action={
            <Button to="/about" variant="secondary" arrow>
              More about us
            </Button>
          }
        />
      </Section>

      {/* 5. Services preview */}
      <Section labelledBy="home-services-title">
        <SectionHeading
          id="home-services-title"
          eyebrow="Our services"
          title="From collection to market"
          lead="Services that move your material efficiently, compliantly and at the right price."
          action={
            <Button to="/services" variant="link">
              View all services
            </Button>
          }
        />
        <Row className="g-4">
          {services.map((s, i) => (
            <Col key={s.id} xs={12} md={6} lg={4} {...reveal(i % 3)}>
              <ServiceCard service={s} />
            </Col>
          ))}
        </Row>
      </Section>

      {/* 6. How it works */}
      <Section tone="sand" labelledBy="home-process-title">
        <SectionHeading
          id="home-process-title"
          eyebrow="How it works"
          title="Four simple steps"
          lead="A clear process from your first enquiry to the final paperwork."
        />
        <ProcessSteps steps={process} />
      </Section>

      {/* 7. Why choose us */}
      <Section labelledBy="home-why-title">
        <SectionHeading
          id="home-why-title"
          eyebrow="Why choose us"
          title="A partner you can rely on"
        />
        <FeatureGrid items={whyUs} />
      </Section>

      {/* 8–9. Stats and testimonial (hidden until supplied, MI-11) */}
      <StatsStrip stats={company.stats} />
      <Testimonial items={testimonials} />

      {/* 10. Call to action */}
      <CtaBanner />
    </>
  );
}

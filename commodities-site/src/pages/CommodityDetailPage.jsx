import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import AcceptanceLists from '../components/sections/commodities/AcceptanceLists';
import CommodityCard from '../components/cards/CommodityCard';
import CtaBanner from '../components/sections/shared/CtaBanner';
import EnquiryPanel from '../components/sections/commodities/EnquiryPanel';
import GradeList from '../components/sections/commodities/GradeList';
import PageHero from '../components/sections/shared/PageHero';
import ServiceCard from '../components/cards/ServiceCard';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { commodities, getCommodity } from '../data/commodities';
import { getService } from '../data/services';
import NotFoundPage from './NotFoundPage';

/** P-04 Commodity detail: one template for every category (docs/WEBSITE_STRUCTURE.md §4.4). */
export default function CommodityDetailPage() {
  const { slug } = useParams();
  const commodity = getCommodity(slug);

  if (!commodity) return <NotFoundPage />;

  const enquiryLink = `/contact?commodity=${commodity.slug}`;
  const relatedServices = commodity.relatedServices.map(getService).filter(Boolean);
  const others = commodities.filter((c) => c.slug !== commodity.slug);

  return (
    <>
      <Seo
        title={`${commodity.name} Recycling & Trading`}
        description={`${commodity.summary} See the grades we handle and request a quote.`}
      />

      {/* 1. Page header */}
      <PageHero
        title={commodity.name}
        intro={commodity.summary}
        image={commodity.imageWide}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Commodities', to: '/commodities' },
          { label: commodity.name },
        ]}
      />

      {/* 2. Overview + enquiry panel */}
      <Section labelledBy="overview-title">
        <Row className="gy-5 gx-lg-5">
          <Col lg={8}>
            <h2 id="overview-title" className="mb-4">
              About {commodity.name.toLowerCase()}
            </h2>
            <div className="prose">
              {commodity.overview.map((p) => (
                <p key={p} className="text-secondary fs-6">
                  {p}
                </p>
              ))}
            </div>
          </Col>
          <Col lg={4}>
            <EnquiryPanel commodityName={commodity.name} to={enquiryLink} />
          </Col>
        </Row>
      </Section>

      {/* 3. Grades */}
      <Section tone="sand" labelledBy="grades-title">
        <SectionHeading
          id="grades-title"
          eyebrow="Grades"
          title="Grades we handle"
          lead="Common grades in this category. Not sure which grade you have? Describe it in your enquiry and we will help."
        />
        <GradeList grades={commodity.grades} />
      </Section>

      {/* 4. Accepted / not accepted */}
      <Section labelledBy="acceptance-title">
        <SectionHeading id="acceptance-title" eyebrow="Acceptance" title="What we accept" />
        <AcceptanceLists accepted={commodity.accepted} notAccepted={commodity.notAccepted} />
      </Section>

      {/* 5. Related services */}
      {relatedServices.length > 0 && (
        <Section tone="sand" labelledBy="related-services-title">
          <SectionHeading
            id="related-services-title"
            eyebrow="Related services"
            title="How we can help"
          />
          <Row className="g-4">
            {relatedServices.map((s) => (
              <Col key={s.id} xs={12} md={6} lg={4}>
                <ServiceCard service={s} />
              </Col>
            ))}
          </Row>
        </Section>
      )}

      {/* 6. Other commodities */}
      <Section spacing="compact" labelledBy="other-commodities-title">
        <SectionHeading id="other-commodities-title" eyebrow="Explore" title="Other commodities" />
        <Row className="g-3 g-lg-4">
          {others.map((c) => (
            <Col key={c.slug} xs={6} md={4} lg>
              <CommodityCard commodity={c} compact />
            </Col>
          ))}
        </Row>
      </Section>

      {/* 7. Call to action with the commodity pre-selected */}
      <CtaBanner
        title={`Get a quote for ${commodity.name.toLowerCase()}`}
        text="Tell us the grade, quantity and location, and we will come back with a quote."
        to={enquiryLink}
      />
    </>
  );
}

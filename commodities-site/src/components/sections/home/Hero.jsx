import { Phone, ShieldCheck } from 'lucide-react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { company } from '../../../data/company';
import { telHref } from '../../../utils/contact';
import { bannerSrcSet, HERO_SIZES } from '../../../utils/images';
import Button from '../../ui/Button';
import './home.css';

/**
 * Home page hero (docs/UI_UX_GUIDELINES.md §6, docs/WEBSITE_STRUCTURE.md §4.1 #1).
 * Desktop: text left, large image right. Mobile/tablet: text first, then image.
 * Layout uses Bootstrap grid and utilities; home.css holds only the custom visual design.
 */
export default function Hero({ eyebrow, title, lead, image, imageAlt }) {
  const tel = telHref(company.phone);
  const firstAccreditation = company.accreditations[0];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <Row className="align-items-center gy-5 gx-lg-5">
          <Col lg={6} className="d-flex flex-column gap-4">
            <p className="eyebrow mb-0">{eyebrow}</p>
            <h1 id="hero-title" className="hero__title">
              {title}
            </h1>
            <p className="lead mb-0">{lead}</p>

            {/* Full-width stacked buttons on phones, side by side from 576px */}
            <div className="d-grid d-sm-flex flex-wrap gap-3 mt-2">
              <Button to="/contact" size="lg" arrow>
                Get a Quote
              </Button>
              <Button to="/commodities" size="lg" variant="secondary">
                Our Commodities
              </Button>
            </div>

            <p className="d-flex flex-wrap align-items-center gap-2 small text-body-secondary mb-0">
              <Phone size={18} aria-hidden="true" className="text-primary" />
              <span>Prefer to talk?</span>
              {tel ? (
                <a href={tel} className="hero__call-link fw-semibold">
                  Call {company.phone}
                </a>
              ) : (
                <span className="fw-semibold text-dark">Call {company.phone}</span>
              )}
            </p>
          </Col>

          <Col lg={6}>
            <div className="position-relative">
              <img
                src={image}
                srcSet={bannerSrcSet(image, 800, 1200)}
                sizes={HERO_SIZES}
                alt={imageAlt}
                width="1200"
                height="960"
                loading="eager"
                fetchPriority="high"
                className="hero__image w-100 object-fit-cover rounded-3 shadow"
              />
              {firstAccreditation && (
                <div className="hero__badge position-absolute d-flex align-items-center gap-3 bg-white rounded-2 shadow px-3 py-2 small">
                  <ShieldCheck
                    size={22}
                    aria-hidden="true"
                    className="flex-shrink-0 text-success"
                  />
                  <span>
                    <strong className="d-block">{firstAccreditation.name}</strong>
                    {firstAccreditation.number && (
                      <span className="d-block text-body-secondary">
                        {firstAccreditation.number}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

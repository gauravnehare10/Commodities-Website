import { Phone } from 'lucide-react';
import { company } from '../../data/company';
import { cta } from '../../data/content';
import { telHref } from '../../utils/contact';
import Button from '../ui/Button';
import Section from '../ui/Section';
import './CtaBanner.css';

/**
 * Closing call to action: a rounded dark panel with a faint image (docs/UI_UX_GUIDELINES.md §6).
 * Layout uses Bootstrap utilities; CtaBanner.css holds only the custom visual details.
 *
 * @param {string} [title] Defaults to content.js `cta.title`
 * @param {string} [text]
 * @param {string} [to='/contact'] Button link (e.g. '/contact?commodity=wood')
 * @param {string} [buttonLabel='Get a Quote']
 * @param {boolean} [compact] Smaller vertical padding
 */
export default function CtaBanner({
  title = cta.title,
  text = cta.text,
  to = '/contact',
  buttonLabel = 'Get a Quote',
  compact = false,
}) {
  const tel = telHref(company.phone);
  return (
    <Section spacing="compact" labelledBy="cta-title">
      <div className="cta-banner position-relative overflow-hidden rounded-3 bg-dark text-white">
        <img
          src={cta.image}
          alt=""
          width="1600"
          height="700"
          loading="lazy"
          className="cta-banner__bg position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        />
        <div
          className={`cta-banner__inner position-relative d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-4${compact ? ' cta-banner__inner--compact' : ''}`}
        >
          <div className="cta-banner__text d-grid gap-3">
            <h2 id="cta-title" className="mb-0">
              {title}
            </h2>
            <p className="fs-5 mb-0 text-white opacity-75">{text}</p>
          </div>
          {/* Full-width button on phones, inline from 576px */}
          <div className="d-grid d-sm-flex flex-wrap align-items-center gap-3 column-gap-sm-4 flex-shrink-0">
            <Button to={to} variant="light" size="lg" arrow>
              {buttonLabel}
            </Button>
            {tel ? (
              <a
                href={tel}
                className="cta-banner__phone d-inline-flex align-items-center gap-2 fw-semibold"
              >
                <Phone size={18} aria-hidden="true" />
                {company.phone}
              </a>
            ) : (
              <span className="cta-banner__phone d-inline-flex align-items-center gap-2 fw-semibold">
                <Phone size={18} aria-hidden="true" />
                {company.phone}
              </span>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

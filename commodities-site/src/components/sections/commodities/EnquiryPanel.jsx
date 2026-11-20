import { Phone } from 'lucide-react';
import Card from 'react-bootstrap/Card';
import { company } from '../../../data/company';
import { telHref } from '../../../utils/contact';
import Button from '../../ui/Button';
import './commodities.css';

/**
 * Side card on commodity pages: "Interested in this material?" (docs/UI_UX_GUIDELINES.md §6).
 * Sticky beside the overview on desktop; a normal card on mobile and tablet.
 *
 * @param {string} commodityName
 * @param {string} to Contact link with the commodity pre-filled
 */
export default function EnquiryPanel({ commodityName, to }) {
  const tel = telHref(company.phone);
  return (
    <Card
      as="aside"
      className="enquiry-panel bg-light border-0"
      aria-label="Enquire about this material"
    >
      <Card.Body className="d-flex flex-column gap-3 p-4">
        <h2 className="fs-5 mb-0">Interested in {commodityName.toLowerCase()}?</h2>
        <p className="text-secondary mb-0">
          Tell us what you have or what you need, and we will come back with a quote.
        </p>
        <Button to={to} arrow block>
          Get a Quote
        </Button>
        <p className="d-flex align-items-center gap-2 small mb-0">
          <Phone size={16} aria-hidden="true" className="text-primary" />
          {tel ? (
            <a href={tel} className="fw-semibold">
              {company.phone}
            </a>
          ) : (
            <span className="fw-semibold">{company.phone}</span>
          )}
        </p>
      </Card.Body>
    </Card>
  );
}

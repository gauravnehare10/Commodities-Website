import { ArrowRight } from 'lucide-react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './cards.css';

/**
 * Commodity card (docs/UI_UX_GUIDELINES.md §6), built on React Bootstrap Card.
 * The whole card is clickable via Bootstrap's `stretched-link`; only the title is announced as the link.
 *
 * @param {object} commodity Item from src/data/commodities.js
 * @param {'h2'|'h3'} [headingLevel='h3']
 * @param {boolean} [compact] Small image + title only (e.g. "Other commodities")
 */
export default function CommodityCard({ commodity, headingLevel = 'h3', compact = false }) {
  const Heading = headingLevel;
  return (
    <Card
      className={`commodity-card h-100 overflow-hidden shadow-sm${compact ? ' commodity-card--compact' : ''}`}
    >
      <div className="overflow-hidden bg-light">
        <Card.Img
          variant="top"
          src={commodity.image}
          alt=""
          width="800"
          height="600"
          loading="lazy"
          className="commodity-card__image rounded-0 object-fit-cover"
        />
      </div>
      <Card.Body className={`d-flex flex-column ${compact ? 'gap-2 p-3' : 'gap-3 p-4'}`}>
        <Heading className={compact ? 'fs-6 mb-0' : 'mb-0'}>
          <Link
            to={`/commodities/${commodity.slug}`}
            className="commodity-card__link stretched-link text-reset text-decoration-none"
          >
            {commodity.name}
          </Link>
        </Heading>
        {!compact && (
          <>
            <Card.Text className="commodity-card__summary text-secondary mb-0">
              {commodity.summary}
            </Card.Text>
            <span
              className="card-arrow d-inline-flex align-items-center gap-1 mt-auto fw-semibold text-primary"
              aria-hidden="true"
            >
              View grades <ArrowRight size={16} />
            </span>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

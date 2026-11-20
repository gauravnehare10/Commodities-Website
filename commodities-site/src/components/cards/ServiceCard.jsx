import { ArrowRight } from 'lucide-react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import './cards.css';

/**
 * Service card: icon, title, summary and arrow link to the service section
 * (docs/UI_UX_GUIDELINES.md §6), built on React Bootstrap Card. Whole card is clickable.
 *
 * @param {object} service Item from src/data/services.js
 */
export default function ServiceCard({ service, headingLevel = 'h3' }) {
  const Heading = headingLevel;
  return (
    <Card className="service-card h-100">
      <Card.Body className="d-flex flex-column gap-3 px-4 py-5">
        <span className="service-card__icon d-flex align-items-center justify-content-center rounded-circle bg-light text-primary mb-2">
          <Icon name={service.icon} size={26} />
        </span>
        <Heading className="mb-0">
          <Link
            to={`/services#${service.id}`}
            className="service-card__link stretched-link text-reset text-decoration-none"
          >
            {service.title}
          </Link>
        </Heading>
        <Card.Text className="text-secondary mb-0">{service.summary}</Card.Text>
        <span
          className="card-arrow d-inline-flex align-items-center gap-1 mt-auto fw-semibold text-primary"
          aria-hidden="true"
        >
          Learn more <ArrowRight size={16} />
        </span>
      </Card.Body>
    </Card>
  );
}

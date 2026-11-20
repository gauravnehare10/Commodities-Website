import { Check } from 'lucide-react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './shared.css';

/**
 * Image and text side by side (docs/UI_UX_GUIDELINES.md §6), on the Bootstrap grid.
 * Stacks on mobile and tablet (image first); two columns from 992px.
 *
 * @param {string} id Heading id (for the parent Section's labelledBy)
 * @param {boolean} [reverse] Put the image on the right on desktop
 * @param {string[]} [paragraphs]
 * @param {string[]} [points] Optional checklist
 * @param {React.ReactNode} [action] Optional button
 */
export default function SplitFeature({
  id,
  eyebrow,
  title,
  paragraphs = [],
  points = [],
  action,
  image,
  imageAlt,
  reverse = false,
  headingLevel = 'h2',
}) {
  const Heading = headingLevel;
  return (
    <Row className="align-items-center gy-5 gx-lg-5">
      <Col lg={6} className={reverse ? 'order-lg-2' : undefined}>
        <img
          src={image}
          alt={imageAlt}
          width="1000"
          height="800"
          loading="lazy"
          className="split-feature__image w-100 object-fit-cover rounded-3"
        />
      </Col>
      <Col lg={6}>
        <div className="split-feature__content d-flex flex-column gap-3">
          {eyebrow && <p className="eyebrow mb-0">{eyebrow}</p>}
          <Heading id={id} className="mb-0">
            {title}
          </Heading>
          {paragraphs.map((p) => (
            <p key={p} className="text-secondary fs-6 mb-0">
              {p}
            </p>
          ))}
          {points.length > 0 && (
            <ul className="list-unstyled d-grid gap-3 mt-2 mb-0">
              {points.map((point) => (
                <li key={point} className="d-flex align-items-start gap-3">
                  <Check size={20} aria-hidden="true" className="flex-shrink-0 text-primary mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
      </Col>
    </Row>
  );
}

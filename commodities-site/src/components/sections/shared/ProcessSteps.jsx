import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './shared.css';

/**
 * Numbered process steps (docs/UI_UX_GUIDELINES.md §6, §9.2), on the Bootstrap grid.
 * Mobile: vertical timeline · Tablet: 2 × 2 grid · Desktop: 4 in a row with a copper top line.
 *
 * @param {{title: string, text: string}[]} steps
 */
export default function ProcessSteps({ steps }) {
  return (
    <Row as="ol" className="process-steps list-unstyled gx-4 gy-4 gy-md-5 mb-0">
      {steps.map((step, i) => (
        <Col as="li" key={step.title} xs={12} md={6} lg={3}>
          <div className="process-steps__item position-relative d-flex flex-md-column align-items-start gap-3">
            <span className="process-steps__number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="d-grid gap-2">
              <h3 className="fs-5 mb-0">
                <span className="visually-hidden">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="text-secondary mb-0">{step.text}</p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Icon from '../ui/Icon';
import './FeatureGrid.css';

/**
 * Icon + title + text grid (docs/UI_UX_GUIDELINES.md §6), on the Bootstrap grid.
 * 1 column on mobile, 2 on tablet, up to 4 on desktop.
 *
 * @param {{icon: string, title: string, text: string}[]} items
 */
export default function FeatureGrid({ items }) {
  const lgCols = items.length >= 4 ? 3 : 12 / items.length;
  return (
    <Row as="ul" className="list-unstyled g-4 g-lg-5 mb-0">
      {items.map((item) => (
        <Col as="li" key={item.title} xs={12} md={6} lg={lgCols}>
          <div className="d-flex flex-column gap-3 h-100">
            <span className="feature-grid__icon d-flex align-items-center justify-content-center rounded-2 bg-dark mb-2">
              <Icon name={item.icon} size={28} />
            </span>
            <h3 className="fs-5 mb-0">{item.title}</h3>
            <p className="text-secondary mb-0">{item.text}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
}

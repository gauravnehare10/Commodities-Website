import { CircleCheck, CircleX } from 'lucide-react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { reveal } from '../../../utils/motion';

/**
 * "We accept" / "We don't accept" cards (docs/UI_UX_GUIDELINES.md §6).
 * Side by side from 768px, stacked on phones. Bootstrap only; no custom CSS.
 *
 * @param {string[]} accepted
 * @param {string[]} notAccepted
 */
export default function AcceptanceLists({ accepted = [], notAccepted = [] }) {
  const lists = [
    { title: 'We accept', items: accepted, Icon: CircleCheck, tone: 'success' },
    { title: "We don't accept", items: notAccepted, Icon: CircleX, tone: 'danger' },
  ].filter((l) => l.items.length > 0);

  return (
    <Row className="g-4">
      {lists.map(({ title, items, Icon, tone }, i) => (
        <Col key={title} xs={12} md={6} {...reveal(i)}>
          {/* border-0 removes the card outline; border-top + border-3 adds only a coloured top accent */}
          <Card className={`h-100 shadow-sm border-0 border-top border-3 border-${tone}`}>
            <Card.Body className="p-4">
              <h3 className="fs-5 mb-3">{title}</h3>
              <ul className="list-unstyled d-grid gap-3 mb-0">
                {items.map((item) => (
                  <li key={item} className="d-flex align-items-start gap-3">
                    <Icon
                      size={20}
                      aria-hidden="true"
                      className={`flex-shrink-0 mt-1 text-${tone}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

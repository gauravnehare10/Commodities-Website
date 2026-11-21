import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Section from '../../ui/Section';
import { reveal } from '../../../utils/motion';
import './home.css';

/**
 * Key figures on a dark background (MI-11). Renders nothing until verified figures exist.
 * @param {{value: string, label: string}[]} stats
 */
export default function StatsStrip({ stats }) {
  if (!stats?.length) return null;
  return (
    <Section tone="ink" spacing="compact" labelledBy="stats-title">
      <h2 id="stats-title" className="visually-hidden">
        Key figures
      </h2>
      <Row as="dl" className="g-4 mb-0">
        {stats.map((s, i) => (
          <Col
            key={s.label}
            xs={6}
            lg={12 / Math.min(stats.length, 4)}
            className="d-flex flex-column-reverse gap-2"
            {...reveal(i)}
          >
            <dt className="fw-medium">{s.label}</dt>
            <dd className="stats-strip__value mb-0">{s.value}</dd>
          </Col>
        ))}
      </Row>
    </Section>
  );
}

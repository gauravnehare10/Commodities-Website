import { ShieldCheck } from 'lucide-react';
import Container from 'react-bootstrap/Container';

/**
 * Row of licences and accreditations (MI-08). Renders nothing until data exists.
 * Styled entirely with Bootstrap utilities (no custom CSS).
 * @param {{name: string, number?: string}[]} items
 */
export default function TrustBar({ items }) {
  if (!items?.length) return null;
  return (
    <section
      className="py-4 border-top border-bottom bg-white"
      aria-label="Licences and accreditations"
    >
      <Container>
        <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-4 column-gap-5 m-0">
          {items.map((item) => (
            <li key={item.name} className="d-flex align-items-center gap-3 small">
              <ShieldCheck size={22} aria-hidden="true" className="flex-shrink-0 text-success" />
              <span>
                <strong className="d-block">{item.name}</strong>
                {item.number && <span className="d-block text-body-secondary">{item.number}</span>}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

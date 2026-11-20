import Container from 'react-bootstrap/Container';
import './services.css';

/**
 * Row of pill links that jump to sections on the same page (docs/UI_UX_GUIDELINES.md §6).
 * Wraps onto several lines on desktop; scrolls sideways in one line on phones.
 *
 * @param {{id: string, label: string}[]} items Section ids and link labels
 * @param {string} label Accessible name for the navigation landmark
 */
export default function AnchorNav({ items, label }) {
  return (
    <nav className="anchor-nav border-bottom bg-white py-3" aria-label={label}>
      <Container>
        <ul className="anchor-nav__list list-unstyled d-flex gap-2 mb-0">
          {items.map((item) => (
            <li key={item.id} className="flex-shrink-0">
              <a href={`#${item.id}`} className="btn btn-outline-dark btn-sm rounded-pill px-3">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

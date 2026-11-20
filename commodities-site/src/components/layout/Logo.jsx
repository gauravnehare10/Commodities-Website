import { company } from '../../data/company';
import { displayName } from '../../utils/contact';
import './Logo.css';

/**
 * Interim wordmark until the real logo (SVG) is supplied (MI-02).
 * Swap the <svg> and text for the brand logo; keep the component API.
 * @param {'dark'|'light'} [tone='dark'] Use 'light' on dark backgrounds
 */
export default function Logo({ tone = 'dark' }) {
  return (
    <span className={`logo logo--${tone}`}>
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="8" className="logo__mark-bg" />
        <circle cx="16" cy="16" r="7" fill="none" className="logo__mark-ring" strokeWidth="3" />
      </svg>
      <span className="logo__text">{displayName(company.name)}</span>
    </span>
  );
}

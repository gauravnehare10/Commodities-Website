import { Link } from 'react-router';
import {
  accreditations,
  activeCategories,
  activeLegalPages,
  activeServices,
  isPlaceholder,
  siteConfig,
} from '~/content';
import { clearConsent } from '~/lib/consent';
import { ContentText } from '../ui/ContentText';
import { PhoneLink } from '../ui/PhoneLink';
import { Logo } from './Logo';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const licenceNumbers = accreditations.filter((a) => a.type === 'licence' && a.number);

  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo inverse />
          <p className={styles.blurb}>
            <ContentText>{'[PLACEHOLDER] One-line company description (MI-03).'}</ContentText>
          </p>
          <PhoneLink className={styles.contactLine} location="footer" />
          <p className={styles.contactLine}>
            <ContentText>{siteConfig.primaryEmail}</ContentText>
          </p>
        </div>

        <FooterCol title="Commodities">
          {activeCategories().map((c) => (
            <li key={c.slug}>
              <Link to={`/commodities/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {activeServices().map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/industries">Industries</Link>
          </li>
          <li>
            <Link to="/compliance">Compliance</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/resources/faq">FAQ</Link>
          </li>
          {siteConfig.features.careers && (
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          )}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/quote">Get a quote</Link>
          </li>
        </FooterCol>
      </div>

      <div className={styles.legal}>
        <div className={`container ${styles.legalInner}`}>
          <p>
            © {year} <ContentText>{siteConfig.legalName}</ContentText>
            {siteConfig.companyNumber && <> · Company No. {siteConfig.companyNumber}</>}
            {siteConfig.vatNumber && <> · VAT {siteConfig.vatNumber}</>}
            {!isPlaceholder(siteConfig.registeredAddress) && <> · {siteConfig.registeredAddress}</>}
          </p>
          {licenceNumbers.length > 0 && (
            <p>
              {licenceNumbers.map((l) => (
                <span key={l.id}>
                  {l.name}: <span className="tabular">{l.number}</span>{' '}
                </span>
              ))}
            </p>
          )}
          <ul role="list" className={styles.legalLinks}>
            {activeLegalPages().map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
            <li>
              <button type="button" className={styles.linkButton} onClick={clearConsent}>
                Cookie settings
              </button>
            </li>
            {siteConfig.social.map((s) => (
              <li key={s.platform}>
                <a href={s.url} rel="noopener noreferrer" target="_blank">
                  {s.platform[0]?.toUpperCase() + s.platform.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className={styles.colTitle}>{title}</h2>
      <ul role="list" className={styles.links}>
        {children}
      </ul>
    </div>
  );
}

import { Clock, FileText, Info, MapPin, Phone, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { siteConfig, telHref } from '~/content';
import type { Accreditation, Location, ProcessStep, Stat, Testimonial } from '~/content/model';
import { cx } from '~/lib/cx';
import { LinkButton } from '../ui/Button';
import { ContentText } from '../ui/ContentText';
import { PhoneLink } from '../ui/PhoneLink';
import styles from './Blocks.module.css';

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  if (steps.length === 0) return null;
  return (
    <ol className={styles.steps}>
      {steps.map((s, i) => (
        <li key={s.title} className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.stepTitle}>
            <span className="visually-hidden">Step {i + 1}: </span>
            {s.title}
          </h3>
          <p className={styles.stepText}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Statistics (MI-12). Every stat carries a source; renders nothing when empty. */
export function StatsBand({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;
  return (
    <dl className={styles.stats}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <dt className={styles.statLabel}>{s.label}</dt>
          <dd className={cx(styles.statValue, 'tabular')}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Accreditation badges (MI-11). Only rendered with evidence (number or document). */
export function TrustStrip({ items }: { items: Accreditation[] }) {
  const evidenced = items.filter((a) => a.number || a.document);
  if (evidenced.length === 0) return null;
  return (
    <ul role="list" className={styles.trust} aria-label="Licences and accreditations">
      {evidenced.map((a) => (
        <li key={a.id} className={styles.trustItem}>
          <ShieldCheck size={20} aria-hidden="true" />
          <span>
            <span className={styles.trustName}>{a.name}</span>
            {a.number && <span className={styles.trustNo}>{a.number}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <ul role="list" className={styles.quotes}>
      {items.map((t) => (
        <li key={t.author + t.quote.slice(0, 12)}>
          <figure className={styles.quote}>
            <blockquote>
              <p>“{t.quote}”</p>
            </blockquote>
            <figcaption>
              <strong>{t.author}</strong>
              {(t.role || t.company) && (
                <span>{[t.role, t.company].filter(Boolean).join(', ')}</span>
              )}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

type CtaProps = {
  title?: string;
  text?: string;
  quoteHref?: string;
  quoteLabel?: string;
};

/** Closing call to action on every page (WEBSITE_STRUCTURE §7 rule 5). */
export function CtaBand({
  title = 'Ready to move material?',
  text = 'Tell us what you have or what you need. We’ll come back with a quote.',
  quoteHref = '/quote',
  quoteLabel = 'Get a quote',
}: CtaProps) {
  return (
    <section className={cx(styles.cta, 'on-dark', 'ledger-grid')} aria-labelledby="cta-title">
      <div className={cx('container', styles.ctaInner)}>
        <div className={styles.ctaCopy}>
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className={styles.ctaActions}>
          <LinkButton to={quoteHref} size="lg" arrow>
            {quoteLabel}
          </LinkButton>
          {telHref(siteConfig.primaryPhone) ? (
            <PhoneLink className={styles.ctaPhone} location="cta-band" />
          ) : (
            <LinkButton to="/contact" size="lg" variant="ghostOnDark">
              Contact us
            </LinkButton>
          )}
        </div>
      </div>
    </section>
  );
}

export function Callout({
  title,
  children,
  tone = 'info',
}: {
  title?: string;
  children: ReactNode;
  tone?: 'info' | 'compliance';
}) {
  return (
    <aside className={cx(styles.callout, tone === 'compliance' && styles.calloutCompliance)}>
      {tone === 'compliance' ? (
        <ShieldCheck size={22} aria-hidden="true" />
      ) : (
        <Info size={22} aria-hidden="true" />
      )}
      <div>
        {title && <p className={styles.calloutTitle}>{title}</p>}
        {children}
      </div>
    </aside>
  );
}

export function InfoPanel({ items }: { items: { label: string; value?: string }[] }) {
  const rows = items.filter((i): i is { label: string; value: string } => Boolean(i.value));
  if (rows.length === 0) return null;
  return (
    <dl className={styles.info}>
      {rows.map((r) => (
        <div key={r.label} className={styles.infoRow}>
          <dt>{r.label}</dt>
          <dd>
            <ContentText>{r.value}</ContentText>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function LocationCard({ location }: { location: Location }) {
  const tel = telHref(location.phone);
  return (
    <article className={styles.location}>
      <p className="eyebrow">{location.type}</p>
      <h3>{location.name}</h3>
      <p className={styles.locLine}>
        <MapPin size={18} aria-hidden="true" />
        <span>
          {[...location.address.lines, location.address.town, location.address.postcode].join(', ')}
        </span>
      </p>
      <p className={styles.locLine}>
        <Phone size={18} aria-hidden="true" />
        {tel ? <a href={tel}>{location.phone}</a> : location.phone}
      </p>
      {location.hours.length > 0 && (
        <div className={styles.locLine}>
          <Clock size={18} aria-hidden="true" />
          <table className={styles.hours}>
            <caption className="visually-hidden">Opening hours</caption>
            <tbody>
              {location.hours.map((h) => (
                <tr key={h.days}>
                  <th scope="row">{h.days}</th>
                  <td className="tabular">{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {location.facilities && location.facilities.length > 0 && (
        <p className={styles.locFacilities}>{location.facilities.join(' · ')}</p>
      )}
      {location.directionsUrl && (
        <a href={location.directionsUrl} rel="noopener noreferrer" target="_blank">
          Get directions<span className="visually-hidden"> (opens in new tab)</span>
        </a>
      )}
    </article>
  );
}

export function DocLink({ href, label, sizeKb }: { href: string; label: string; sizeKb: number }) {
  return (
    <a href={href} className={styles.doc} download>
      <FileText size={18} aria-hidden="true" />
      <span>
        {label} <span className={styles.docMeta}>(PDF, {sizeKb} KB)</span>
      </span>
    </a>
  );
}

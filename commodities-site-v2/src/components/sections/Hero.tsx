import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { activeCategories, home } from '~/content';
import type { Crumb } from '~/lib/seo';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { ContentText } from '../ui/ContentText';
import { Icon } from '../ui/Icon';
import { PhoneLink } from '../ui/PhoneLink';
import styles from './Hero.module.css';

/** Home hero with sell/buy intent switch (WEBSITE_STRUCTURE §5.1 #1). */
export function HeroIntent() {
  const categories = activeCategories();
  return (
    <section className={`${styles.homeHero} ledger-grid`} aria-labelledby="hero-title">
      <div className={`container ${styles.homeGrid}`}>
        <div className={styles.homeCopy}>
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 id="hero-title" className={styles.display}>
            {home.headline}
          </h1>
          <p className="lead">
            <ContentText>{home.lead}</ContentText>
          </p>
          <div className={styles.intents} role="group" aria-label="What would you like to do?">
            <Link to="/quote?intent=sell" className={`${styles.intent} ${styles.intentSell}`}>
              <ArrowUpFromLine size={22} aria-hidden="true" />
              <span>
                <span className={styles.intentTitle}>I want to sell</span>
                <span className={styles.intentText}>Get a price for your material</span>
              </span>
            </Link>
            <Link to="/quote?intent=buy" className={styles.intent}>
              <ArrowDownToLine size={22} aria-hidden="true" />
              <span>
                <span className={styles.intentTitle}>I want to buy</span>
                <span className={styles.intentText}>Enquire about graded supply</span>
              </span>
            </Link>
          </div>
          <p className={styles.callLine}>
            Prefer to talk? <PhoneLink className={styles.callLink} location="hero" />
          </p>
        </div>

        <aside className={styles.ledger} aria-label="Material index">
          <div className={styles.ledgerHead}>
            <span>Material index</span>
            <span className="tabular">{String(categories.length).padStart(2, '0')} categories</span>
          </div>
          <ol className={styles.ledgerList}>
            {categories.map((c, i) => (
              <li key={c.slug}>
                <Link
                  to={`/commodities/${c.slug}`}
                  className={styles.ledgerRow}
                  data-group={c.group}
                >
                  <span className={styles.ledgerNo}>{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={c.icon} size={18} />
                  <span className={styles.ledgerName}>{c.name}</span>
                  <span className={styles.ledgerCount}>
                    {c.materials.filter((m) => m.active).length} gr.
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <span className={styles.regMark} aria-hidden="true" />
        </aside>
      </div>
    </section>
  );
}

type PageHeroProps = {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  accent?: 'metals' | 'recyclables' | 'specialist';
};

/** Standard inner-page hero. */
export function PageHero({ crumbs, eyebrow, title, lead, actions, aside, accent }: PageHeroProps) {
  return (
    <section
      className={`${styles.pageHero} ledger-grid`}
      data-accent={accent}
      aria-labelledby="page-title"
    >
      <div className="container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={styles.pageGrid}>
          <div className={styles.pageCopy}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 id="page-title">{title}</h1>
            {lead && <div className="lead">{lead}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
          {aside && <div className={styles.pageAside}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

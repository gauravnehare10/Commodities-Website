import { Clock, ShieldCheck } from 'lucide-react';
import { LazyQuoteForm } from '~/components/forms/LazyForms';
import { Section } from '~/components/layout/Section';
import { PageHero } from '~/components/sections/Hero';
import { ContentText } from '~/components/ui/ContentText';
import { PhoneLink } from '~/components/ui/PhoneLink';
import { siteConfig } from '~/content';
import { buildMeta } from '~/lib/seo';
import type { Route } from './+types/quote';
import styles from './page.module.css';

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Request a Quote',
    description:
      'Get a price for your scrap metal or recyclable material, enquire about buying graded material, or book a collection.',
    path: '/quote',
  });

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us about your material"
        lead="Four short steps. It takes about two minutes."
      />
      <Section>
        <div className={styles.twoCol}>
          <LazyQuoteForm />
          <aside className={`${styles.panel} ${styles.sticky}`} aria-label="Help">
            <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
              <div>
                <p className={styles.label}>Prefer to talk?</p>
                <PhoneLink className={styles.phoneLarge} location="quote-aside" />
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Clock
                  size={20}
                  aria-hidden="true"
                  style={{ flex: 'none', color: 'var(--color-patina-600)' }}
                />
                <p>
                  We usually reply within <ContentText>{siteConfig.responseTime}</ContentText>.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <ShieldCheck
                  size={20}
                  aria-hidden="true"
                  style={{ flex: 'none', color: 'var(--color-patina-600)' }}
                />
                <p>Your details are used only to respond to your request.</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

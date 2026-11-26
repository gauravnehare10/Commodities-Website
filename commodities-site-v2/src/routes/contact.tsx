import { Mail, MapPin } from 'lucide-react';
import { LazyContactForm } from '~/components/forms/LazyForms';
import { DraftNotice } from '~/components/layout/DraftBanner';
import { Section, SectionHeader } from '~/components/layout/Section';
import { Callout, LocationCard } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { ArrowLink } from '~/components/ui/Button';
import { ContentText } from '~/components/ui/ContentText';
import { PhoneLink } from '~/components/ui/PhoneLink';
import { isPlaceholder, locations, siteConfig } from '~/content';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/contact';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Contact Us',
    description:
      'Contact our team about selling, buying or collecting scrap metal and recyclable materials.',
    path: '/contact',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

export default function ContactPage() {
  const emailHref = isPlaceholder(siteConfig.primaryEmail)
    ? undefined
    : `mailto:${siteConfig.primaryEmail}`;
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title="Get in touch"
        lead="Call, email or send a message. For a price, the quote form is quickest."
      />

      <Section>
        <div className={styles.twoCol}>
          <div>
            <h2 style={{ marginBottom: 'var(--space-5)' }}>Send a message</h2>
            <LazyContactForm />
          </div>
          <aside className={styles.stack} aria-label="Contact details">
            <div className={styles.panel} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--text-h3)' }}>Contact details</h2>
              <PhoneLink className={styles.phoneLarge} location="contact" />
              <p style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <Mail size={18} aria-hidden="true" />
                {emailHref ? (
                  <a href={emailHref}>{siteConfig.primaryEmail}</a>
                ) : (
                  <ContentText>{siteConfig.primaryEmail}</ContentText>
                )}
              </p>
              <p style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                <MapPin size={18} aria-hidden="true" style={{ marginTop: 4 }} />
                <ContentText>{siteConfig.registeredAddress}</ContentText>
              </p>
            </div>
            <Callout title="Need a price?">
              <p>
                The quote form collects everything we need in one go.{' '}
                <ArrowLink to="/quote">Request a quote</ArrowLink>
              </p>
            </Callout>
          </aside>
        </div>
      </Section>

      <Section tone="raised" labelledBy="locations">
        <SectionHeader id="locations" eyebrow="Locations" title="Sites & opening hours" />
        {locations.length > 0 ? (
          <div className={styles.cards3}>
            {locations.map((l) => (
              <LocationCard key={l.id} location={l} />
            ))}
          </div>
        ) : (
          <DraftNotice>
            Depot, yard and office locations with opening hours are awaiting business input (MI-07).
          </DraftNotice>
        )}
      </Section>
    </>
  );
}

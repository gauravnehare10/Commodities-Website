import { DraftNotice } from '~/components/layout/DraftBanner';
import { Section, SectionHeader } from '~/components/layout/Section';
import { Callout, CtaBand, DocLink, TrustStrip } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { GlossaryText } from '~/components/content/GlossaryText';
import { LinkButton } from '~/components/ui/Button';
import { accreditations } from '~/content';
import { showDraftNotes } from '~/lib/env';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/compliance';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Compliance', to: '/compliance' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Compliance, Licences & Accreditations',
    description:
      'Licences, permits, accreditations and policies, with duty-of-care information and downloadable documents.',
    path: '/compliance',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export default function CompliancePage() {
  // Only evidenced items are published (PROJECT_REQUIREMENTS §13).
  const regulated = accreditations.filter(
    (a) => (a.type === 'licence' || a.type === 'permit') && (a.number || a.document),
  );
  const certs = accreditations.filter(
    (a) => (a.type === 'certification' || a.type === 'membership') && (a.number || a.document),
  );

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Compliance"
        title="Licensed, documented, accountable"
        lead="Procurement and compliance teams can find our licences, permits, accreditations and policies here."
        actions={
          <LinkButton to="/contact" size="lg" variant="secondary">
            Request our compliance pack
          </LinkButton>
        }
      />

      {(regulated.length > 0 || showDraftNotes) && (
        <Section labelledBy="licences">
          <SectionHeader id="licences" eyebrow="Regulatory" title="Licences & permits" />
          {regulated.length > 0 ? (
            // Scrollable region must be keyboard-focusable (axe: scrollable-region-focusable).
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div className={styles.tableWrap} role="region" aria-labelledby="licences" tabIndex={0}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Number</th>
                    <th scope="col">Issuer</th>
                    <th scope="col">Valid until</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {regulated.map((a) => (
                    <tr key={a.id}>
                      <th scope="row">{a.name}</th>
                      <td className="tabular" style={{ fontFamily: 'var(--font-mono)' }}>
                        {a.number ?? '—'}
                      </td>
                      <td>{a.issuer}</td>
                      <td>{a.validUntil ? dateFmt.format(new Date(a.validUntil)) : '—'}</td>
                      <td>
                        {a.document ? (
                          <DocLink
                            href={a.document.href}
                            label="Download"
                            sizeKb={a.document.sizeKb}
                          />
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DraftNotice>
              No licences or permits supplied yet (MI-10). Typical UK examples to confirm: waste
              carrier/broker/dealer registration, environmental permit or exemptions, scrap metal
              dealer licence, ATF status. Each item appears here only with a number or document as
              evidence.
            </DraftNotice>
          )}
        </Section>
      )}

      {(certs.length > 0 || showDraftNotes) && (
        <Section tone="raised" labelledBy="accreditations">
          <SectionHeader
            id="accreditations"
            eyebrow="Standards"
            title="Accreditations & memberships"
          />
          {certs.length > 0 ? (
            <TrustStrip items={certs} />
          ) : (
            <DraftNotice>
              No accreditations supplied yet (MI-11), e.g. ISO 9001 / 14001 / 45001, FORS, trade
              association memberships.
            </DraftNotice>
          )}
        </Section>
      )}

      <Section labelledBy="duty-of-care">
        <SectionHeader
          id="duty-of-care"
          eyebrow="Your obligations"
          title="Duty of care explained"
        />
        <div className="prose">
          <p>
            <GlossaryText>
              Under the waste duty of care, every business that produces, carries or handles waste
              must take reasonable steps to make sure it is managed properly and only passed to
              people authorised to take it.
            </GlossaryText>
          </p>
          <p>
            <GlossaryText>
              In practice this means checking the registration or permit of whoever takes your
              waste, describing the waste accurately, and keeping a waste transfer note (or a
              consignment note for hazardous waste) for each transfer.
            </GlossaryText>
          </p>
          <Callout tone="compliance" title="Selling scrap metal in England and Wales">
            <p>
              Under the Scrap Metal Dealers Act 2013, dealers must be licensed, must check and
              record sellers’ identity, and must not pay for scrap metal in cash.
            </p>
          </Callout>
        </div>
      </Section>

      {showDraftNotes && (
        <Section tone="raised" labelledBy="policies">
          <SectionHeader id="policies" eyebrow="Policies" title="Company policies" />
          <DraftNotice>
            Environmental, health &amp; safety, quality, modern slavery and anti-bribery policies to
            be supplied (MI-24).
          </DraftNotice>
        </Section>
      )}

      <CtaBand
        title="Need documents for a supplier review?"
        text="Ask for our compliance pack and we’ll send the licences and policies you need."
        quoteHref="/contact"
        quoteLabel="Request documents"
      />
    </>
  );
}

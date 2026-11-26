import { CircleCheck } from 'lucide-react';
import { useClientValue } from '~/hooks/useClientValue';
import { Section } from '~/components/layout/Section';
import { LinkButton } from '~/components/ui/Button';
import { ContentText } from '~/components/ui/ContentText';
import { siteConfig } from '~/content';
import { buildMeta } from '~/lib/seo';
import type { Route } from './+types/thank-you';
import styles from './page.module.css';

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Thank you',
    description: 'Your enquiry has been received.',
    path: '/thank-you',
    noindex: true,
  });

export default function ThankYou() {
  // Read after hydration: the prerendered HTML has no query string.
  const ref = useClientValue(() => new URLSearchParams(window.location.search).get('ref'), null);
  const isQuote = ref !== 'contact';
  return (
    <Section grid>
      <div className={styles.centered}>
        <CircleCheck
          size={56}
          strokeWidth={1.5}
          aria-hidden="true"
          style={{ color: 'var(--color-success-600)' }}
        />
        <h1>Thank you, we’ve received your {isQuote ? 'request' : 'message'}</h1>
        <p className="lead">
          A member of our team will get back to you within{' '}
          <ContentText>{siteConfig.responseTime}</ContentText>. If you have photos of your material,
          you can email them to <ContentText>{siteConfig.primaryEmail}</ContentText>.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <LinkButton to="/commodities">Browse commodities</LinkButton>
          <LinkButton to="/" variant="secondary">
            Back to home
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}

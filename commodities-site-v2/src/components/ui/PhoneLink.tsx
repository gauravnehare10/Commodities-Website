import { Phone } from 'lucide-react';
import { siteConfig, telHref } from '~/content';
import { track } from '~/lib/analytics';
import { ContentText } from './ContentText';

type Props = {
  phone?: string;
  location?: string;
  className?: string;
  /** Hide the number text visually (icon-only), keeping an accessible name. */
  iconOnly?: boolean;
};

/** Click-to-call link. Renders plain text while the number is still a placeholder. */
export function PhoneLink({
  phone = siteConfig.primaryPhone,
  location = 'main',
  className,
  iconOnly,
}: Props) {
  const href = telHref(phone);
  const content = (
    <>
      <Phone size={18} aria-hidden="true" />
      {iconOnly ? (
        <span className="visually-hidden">Call {phone}</span>
      ) : (
        <span className="tabular">
          <ContentText>{phone}</ContentText>
        </span>
      )}
    </>
  );
  if (!href) return <span className={className}>{content}</span>;
  return (
    <a href={href} className={className} onClick={() => track('phone_click', { location })}>
      {content}
    </a>
  );
}

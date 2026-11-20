import { ArrowRight } from 'lucide-react';
import BsButton from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Button.css';

/** Our design variants → React Bootstrap variants (themed in styles/theme.css). */
const VARIANTS = {
  primary: 'primary',
  secondary: 'outline-dark',
  light: 'light',
  link: 'link',
};

/**
 * Button (docs/UI_UX_GUIDELINES.md §6), built on React Bootstrap's Button.
 * Renders a router <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 *
 * @param {'primary'|'secondary'|'light'|'link'} [variant='primary']
 * @param {'md'|'lg'} [size='md']
 * @param {boolean} [arrow] Show a trailing arrow (always shown for the `link` variant)
 * @param {boolean} [block] Full width
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  block = false,
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const routerProps = to ? { as: Link, to } : {};
  const classes = ['site-button', block && 'w-100', className].filter(Boolean).join(' ');

  return (
    <BsButton
      variant={VARIANTS[variant] ?? 'primary'}
      size={size === 'lg' ? 'lg' : undefined}
      href={href}
      className={classes}
      {...routerProps}
      {...rest}
    >
      <span>{children}</span>
      {(arrow || variant === 'link') && (
        <ArrowRight className="site-button__arrow" size={18} aria-hidden="true" />
      )}
    </BsButton>
  );
}

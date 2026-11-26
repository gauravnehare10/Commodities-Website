import { ArrowRight } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cx } from '~/lib/cx';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'onDark' | 'ghostOnDark';
type Size = 'md' | 'lg';

type Common = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  arrow?: boolean;
  children: ReactNode;
};

const classes = ({ variant = 'primary', size = 'md', block }: Common, extra?: string) =>
  cx(styles.button, styles[variant], styles[size], block && styles.block, extra);

export function Button({
  variant,
  size,
  block,
  arrow,
  loading,
  children,
  className,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...rest}
      className={classes({ variant, size, block, children }, className)}
      aria-busy={loading || undefined}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span>{children}</span>
      {arrow && !loading && <ArrowRight className={styles.arrow} size={18} aria-hidden="true" />}
    </button>
  );
}

export function LinkButton({
  variant,
  size,
  block,
  arrow,
  children,
  className,
  ...rest
}: Common & LinkProps) {
  return (
    <Link {...rest} className={classes({ variant, size, block, children }, className)}>
      <span>{children}</span>
      {arrow && <ArrowRight className={styles.arrow} size={18} aria-hidden="true" />}
    </Link>
  );
}

/** Inline "Learn more →" style link. */
export function ArrowLink({ children, className, ...rest }: LinkProps & { children: ReactNode }) {
  return (
    <Link {...rest} className={cx(styles.arrowLink, className)}>
      <span>{children}</span>
      <ArrowRight className={styles.arrow} size={16} aria-hidden="true" />
    </Link>
  );
}

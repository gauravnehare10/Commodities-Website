import type { ReactNode } from 'react';
import { cx } from '~/lib/cx';
import styles from './Section.module.css';

type Props = {
  id?: string;
  tone?: 'default' | 'raised' | 'subtle' | 'dark';
  grid?: boolean;
  tight?: boolean;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
};

/** Vertical page section with consistent padding and tone (UI_UX_GUIDELINES §5). */
export function Section({
  id,
  tone = 'default',
  grid,
  tight,
  className,
  labelledBy,
  children,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        styles.section,
        styles[tone],
        tone === 'dark' && 'on-dark',
        grid && 'ledger-grid',
        tight && styles.tight,
        className,
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}

type HeaderProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  as?: 'h1' | 'h2';
};

export function SectionHeader({ id, eyebrow, title, lead, action, as: H = 'h2' }: HeaderProps) {
  return (
    <div className={styles.header} data-reveal="">
      <div className={styles.headerText}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <H id={id}>{title}</H>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  );
}

import { useId } from 'react';
import { Link } from 'react-router';
import { glossary, isPlaceholder } from '~/content';
import type { GlossaryEntry } from '~/content/model';
import { linkGlossary } from '~/lib/glossary-linker';
import { ContentText } from '../ui/ContentText';
import styles from './GlossaryText.module.css';

/** Renders text with industry terms explained inline (FR-11, WEBSITE_STRUCTURE §7.1). */
export function GlossaryText({ children }: { children: string }) {
  if (isPlaceholder(children)) return <ContentText>{children}</ContentText>;
  const segments = linkGlossary(children, glossary);
  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === 'string' ? seg : <GlossaryTerm key={i} entry={seg.entry} text={seg.text} />,
      )}
    </>
  );
}

/** Term button that opens a definition popover (native Popover API; keyboard and Esc support built in). */
export function GlossaryTerm({ entry, text }: { entry: GlossaryEntry; text: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const popId = `gl-${id}`;
  return (
    <>
      <button type="button" className={styles.term} popoverTarget={popId}>
        {text}
        <span className="visually-hidden"> (show definition)</span>
      </button>
      <span
        id={popId}
        popover="auto"
        role="dialog"
        aria-label={`Definition: ${entry.term}`}
        className={styles.pop}
      >
        <strong className={styles.popTerm}>{entry.term}</strong>
        <span className={styles.popDef}>{entry.definition}</span>
        <Link to={`/resources/glossary#${entry.slug}`} className={styles.popLink}>
          Open glossary
        </Link>
      </span>
    </>
  );
}

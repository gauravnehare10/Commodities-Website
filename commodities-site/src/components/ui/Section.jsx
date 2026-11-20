import Container from 'react-bootstrap/Container';
import './Section.css';

/**
 * Page section with consistent vertical rhythm and background tone.
 * Wraps its children in a React Bootstrap Container unless `contained` is false.
 *
 * @param {'white'|'sand'|'ink'} [tone='white']
 * @param {'default'|'compact'} [spacing='default']
 * @param {string} [labelledBy] id of the heading that names this section
 */
export default function Section({
  id,
  tone = 'white',
  spacing = 'default',
  labelledBy,
  contained = true,
  className = '',
  children,
}) {
  const classes = [
    'section',
    `section--${tone}`,
    spacing === 'compact' && 'section--compact',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={classes} aria-labelledby={labelledBy}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

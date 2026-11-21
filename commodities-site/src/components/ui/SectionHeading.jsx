import './SectionHeading.css';

/**
 * Eyebrow label + heading + optional lead paragraph (docs/UI_UX_GUIDELINES.md §3, §6).
 *
 * @param {string} id Heading id, used by Section `labelledBy`
 * @param {string} [eyebrow] Small uppercase label above the heading
 * @param {string} title
 * @param {string} [lead] Intro paragraph
 * @param {'left'|'center'} [align='left']
 * @param {'h1'|'h2'|'h3'} [as='h2']
 * @param {React.ReactNode} [action] Optional element (e.g. a link) shown beside the heading
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Heading = 'h2',
  action,
  className = '',
}) {
  const classes = ['section-heading', `section-heading--${align}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    // data-reveal: fades up as it scrolls into view (styles/animations.css)
    <div className={classes} data-reveal="">
      <div className="section-heading__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading id={id} className="section-heading__title">
          {title}
        </Heading>
        {lead && <p className="lead section-heading__lead">{lead}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  );
}

import { ArrowDownToLine, ArrowUpFromLine, BadgeCheck, Pause, Play } from 'lucide-react';
import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import coilsImage from '~/assets/images/hero/coils.webp';
import coilsImageSmall from '~/assets/images/hero/coils-sm.webp';
import millImage from '~/assets/images/hero/mill.webp';
import millImageSmall from '~/assets/images/hero/mill-sm.webp';
import salvageImage from '~/assets/images/hero/salvage.webp';
import salvageImageSmall from '~/assets/images/hero/salvage-sm.webp';
import yardImage from '~/assets/images/hero/yard.webp';
import yardImageSmall from '~/assets/images/hero/yard-sm.webp';
import { home } from '~/content';
import { cx } from '~/lib/cx';
import type { Crumb } from '~/lib/seo';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { ContentText } from '../ui/ContentText';
import { PhoneLink } from '../ui/PhoneLink';
import styles from './Hero.module.css';

/** Staggered entrance for the hero copy (styles/motion.css `.enter`). */
const enter = (i: number) => ({ '--enter-i': i }) as CSSProperties;

/** Home hero with sell/buy intent switch (WEBSITE_STRUCTURE §5.1 #1). */
export function HeroIntent() {
  return (
    <section className={`${styles.homeHero} ledger-grid`} aria-labelledby="hero-title">
      <div className={`container ${styles.homeGrid}`}>
        <div className={styles.homeCopy}>
          <p style={enter(0)} className="eyebrow enter">
            {home.eyebrow}
          </p>
          <h1 id="hero-title" style={enter(1)} className={cx(styles.display, 'enter')}>
            {home.headline}
          </h1>
          <p style={enter(2)} className="lead enter">
            <ContentText>{home.lead}</ContentText>
          </p>
          <div
            style={enter(3)}
            className={cx(styles.intents, 'enter')}
            role="group"
            aria-label="What would you like to do?"
          >
            <Link to="/quote?intent=sell" className={`${styles.intent} ${styles.intentSell}`}>
              <ArrowUpFromLine size={22} aria-hidden="true" />
              <span>
                <span className={styles.intentTitle}>I want to sell</span>
                <span className={styles.intentText}>Get a price for your material</span>
              </span>
            </Link>
            <Link to="/quote?intent=buy" className={styles.intent}>
              <ArrowDownToLine size={22} aria-hidden="true" />
              <span>
                <span className={styles.intentTitle}>I want to buy</span>
                <span className={styles.intentText}>Enquire about graded supply</span>
              </span>
            </Link>
          </div>
          <p style={enter(4)} className={cx(styles.callLine, 'enter')}>
            Prefer to talk? <PhoneLink className={styles.callLink} location="hero" />
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/** Slideshow story: from scrap to new steel. Captions are descriptive, not claims about the business. */
const SLIDES = [
  {
    src: yardImage,
    small: yardImageSmall,
    alt: 'Excavator sorting scrap metal in a recycling yard',
    caption: 'Sorting scrap metal',
  },
  {
    src: salvageImage,
    small: salvageImageSmall,
    alt: 'Crane in an industrial salvage yard with recovered plant and equipment',
    caption: 'Recovering industrial plant',
  },
  {
    src: millImage,
    small: millImageSmall,
    alt: 'Molten metal glowing in a foundry',
    caption: 'Melted down for new metal',
  },
  {
    src: coilsImage,
    small: coilsImageSmall,
    alt: 'Rows of new steel coils in a warehouse',
    caption: 'Back into circulation',
  },
];

/** Seconds each slide is shown; the progress bars use the same value. */
const SLIDE_SECONDS = 6;

/* Browser-only facts read without effects: false while prerendering and hydrating, real values after. */
const noopSubscribe = () => () => {};
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const motionAllowedNow = () => !window.matchMedia(REDUCED_MOTION).matches;
const subscribeMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

/**
 * Home hero visual: a cinematic slideshow (crossfade with a slow zoom, video-style progress bars
 * and a pause button) plus a quality badge (wording from the process copy).
 *
 * - Only the first slide is in the prerendered HTML (it is the LCP image); the rest are added
 *   after hydration so they don't compete with it.
 * - Autoplay starts only when the visitor hasn't asked for reduced motion, and can always be
 *   paused (WCAG 2.2.2). Each progress bar is also a button to jump to that slide.
 */
function HeroVisual() {
  const [index, setIndex] = useState(0);
  // null until the visitor presses play/pause; until then autoplay follows their motion setting
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const motionAllowed = useSyncExternalStore(subscribeMotion, motionAllowedNow, () => false);
  const playing = userPlaying ?? motionAllowed;
  const setPlaying = (fn: (p: boolean) => boolean) => setUserPlaying(fn(playing));

  const pad = (n: number) => String(n).padStart(2, '0');
  const current = SLIDES[index]!;

  return (
    <div className={styles.visual}>
      <div
        className={styles.reel}
        role="group"
        aria-roledescription="slideshow"
        aria-label="From scrap to new steel"
        data-playing={playing ? 'true' : undefined}
        style={{ '--slide-duration': `${SLIDE_SECONDS}s` } as CSSProperties}
      >
        {SLIDES.map(
          (s, i) =>
            (i === 0 || hydrated) && (
              <div
                key={s.src}
                className={cx(styles.slide, i === index && styles.slideActive)}
                aria-hidden={i !== index}
              >
                <img
                  src={s.src}
                  srcSet={`${s.small} 800w, ${s.src} 1200w`}
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  width={1200}
                  height={960}
                  alt={s.alt}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  decoding="async"
                />
              </div>
            ),
        )}

        <p key={index} className={styles.reelCaption} aria-hidden="true">
          <span className="tabular">
            {pad(index + 1)} / {pad(SLIDES.length)}
          </span>
          {current.caption}
        </p>

        <div className={styles.reelControls}>
          <button
            type="button"
            className={styles.reelToggle}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
          <ol className={styles.reelProgress}>
            {SLIDES.map((s, i) => (
              <li key={s.src}>
                <button
                  type="button"
                  className={styles.reelStep}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1} of ${SLIDES.length}: ${s.caption}`}
                  aria-current={i === index ? 'true' : undefined}
                >
                  <span
                    className={cx(
                      styles.reelFill,
                      i < index && styles.reelFillDone,
                      i === index && styles.reelFillActive,
                    )}
                    data-playing={i === index && playing ? 'true' : undefined}
                    onAnimationEnd={
                      i === index ? () => setIndex((n) => (n + 1) % SLIDES.length) : undefined
                    }
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <span className={styles.regMark} aria-hidden="true" />

      <p className={styles.badge}>
        <BadgeCheck size={22} aria-hidden="true" />
        <span>
          <span className={styles.badgeTitle}>Weighed, graded & documented</span>
          <span className={styles.badgeText}>Traceable payment and paperwork</span>
        </span>
      </p>
    </div>
  );
}

type PageHeroProps = {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  accent?: 'metals' | 'recyclables' | 'specialist';
};

/** Standard inner-page hero. */
export function PageHero({ crumbs, eyebrow, title, lead, actions, aside, accent }: PageHeroProps) {
  return (
    <section
      className={`${styles.pageHero} ledger-grid`}
      data-accent={accent}
      aria-labelledby="page-title"
    >
      <div className="container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={styles.pageGrid}>
          <div className={styles.pageCopy}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 id="page-title">{title}</h1>
            {lead && <div className="lead">{lead}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
          {aside && <div className={styles.pageAside}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

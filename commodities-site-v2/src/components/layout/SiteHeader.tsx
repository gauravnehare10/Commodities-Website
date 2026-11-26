import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { activeServices, categoriesByGroup, siteConfig } from '~/content';
import { categoryGroupLabels } from '~/content/model';
import { cx } from '~/lib/cx';
import { ArrowLink, LinkButton } from '../ui/Button';
import { ContentText } from '../ui/ContentText';
import { Icon } from '../ui/Icon';
import { PhoneLink } from '../ui/PhoneLink';
import { Logo } from './Logo';
import styles from './SiteHeader.module.css';

type MenuId = 'commodities' | 'services' | null;

const flatLinks = [
  { to: '/industries', label: 'Industries' },
  { to: '/compliance', label: 'Compliance' },
  { to: '/about', label: 'About' },
];

export function SiteHeader() {
  const [open, setOpen] = useState<MenuId>(null);
  const [compact, setCompact] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  // Close everything on navigation (state reset during render, DOM close in effect).
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpen(null);
  }
  useEffect(() => {
    drawerRef.current?.close();
  }, [location.pathname]);

  // Compact header after scrolling.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc and outside click close the desktop menus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const toggle = (id: Exclude<MenuId, null>) => setOpen((cur) => (cur === id ? null : id));
  const groups = categoriesByGroup();
  const services = activeServices();
  const inSection = (prefix: string) => location.pathname.startsWith(prefix);

  return (
    <header className={cx(styles.header, compact && styles.compact)}>
      <div className={cx('container', styles.bar)}>
        <Link to="/" className={styles.logoLink} aria-label={`${siteConfig.companyName}: home`}>
          <Logo />
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="Main">
          <ul className={styles.navList} role="list">
            <li className={styles.navItem}>
              <button
                type="button"
                className={cx(styles.navButton, inSection('/commodities') && styles.active)}
                aria-expanded={open === 'commodities'}
                aria-controls="mega-commodities"
                data-menu="commodities"
                onClick={() => toggle('commodities')}
              >
                Commodities <ChevronDown size={16} aria-hidden="true" className={styles.chevron} />
              </button>
              <div id="mega-commodities" className={styles.mega} hidden={open !== 'commodities'}>
                <div className={cx('container', styles.megaInner)}>
                  {groups.map(({ group, items }) => (
                    <div key={group} className={styles.megaCol}>
                      <p className="eyebrow">{categoryGroupLabels[group]}</p>
                      <ul role="list" className={styles.megaList}>
                        {items.map((c) => (
                          <li key={c.slug}>
                            <Link to={`/commodities/${c.slug}`} className={styles.megaLink}>
                              <span className={styles.megaIcon} data-group={c.group}>
                                <Icon name={c.icon} size={20} />
                              </span>
                              <span>
                                <span className={styles.megaName}>{c.name}</span>
                                <span className={styles.megaMeta}>
                                  {c.materials.filter((m) => m.active).length} materials &amp;
                                  grades
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className={styles.megaPromo}>
                    <p className={styles.megaPromoTitle}>Not sure what you have?</p>
                    <p>Describe your material and we’ll identify the grade.</p>
                    <ArrowLink to="/quote?intent=sell">Ask about a material</ArrowLink>
                    <ArrowLink to="/commodities">View all commodities</ArrowLink>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.navItem}>
              <button
                type="button"
                className={cx(styles.navButton, inSection('/services') && styles.active)}
                aria-expanded={open === 'services'}
                aria-controls="menu-services"
                data-menu="services"
                onClick={() => toggle('services')}
              >
                Services <ChevronDown size={16} aria-hidden="true" className={styles.chevron} />
              </button>
              <div id="menu-services" className={styles.dropdown} hidden={open !== 'services'}>
                <ul role="list">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className={styles.dropdownLink}>
                        <Icon name={s.icon} size={18} />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                  <li className={styles.dropdownFooter}>
                    <ArrowLink to="/services">All services</ArrowLink>
                  </li>
                </ul>
              </div>
            </li>
            {flatLinks.map((l) => (
              <li key={l.to} className={styles.navItem}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => cx(styles.navButton, isActive && styles.active)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <PhoneLink className={styles.phone} location="header" />
          <LinkButton to="/quote" className={styles.quoteBtn}>
            Get a quote
          </LinkButton>
          <PhoneLink className={styles.iconBtn} location="header-mobile" iconOnly />
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => drawerRef.current?.showModal()}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileDrawer drawerRef={drawerRef} />
    </header>
  );
}

function MobileDrawer({ drawerRef }: { drawerRef: React.RefObject<HTMLDialogElement | null> }) {
  const groups = categoriesByGroup();
  const services = activeServices();
  const close = () => drawerRef.current?.close();

  return (
    // Backdrop click closes the drawer; keyboard users close it with Esc (native <dialog>) or the Close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={drawerRef}
      className={styles.drawer}
      aria-label="Menu"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // backdrop click
      }}
    >
      <div className={styles.drawerInner}>
        <div className={styles.drawerHead}>
          <Logo />
          <button type="button" className={styles.iconBtn} onClick={close} aria-label="Close menu">
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile">
          <details className={styles.drawerGroup}>
            <summary>
              Commodities <ChevronDown size={18} aria-hidden="true" />
            </summary>
            {groups.map(({ group, items }) => (
              <div key={group} className={styles.drawerSub}>
                <p className="eyebrow">{categoryGroupLabels[group]}</p>
                <ul role="list">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/commodities/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={styles.drawerSub}>
              <Link to="/commodities">All commodities</Link>
            </div>
          </details>
          <details className={styles.drawerGroup}>
            <summary>
              Services <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <div className={styles.drawerSub}>
              <ul role="list">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/services">All services</Link>
                </li>
              </ul>
            </div>
          </details>
          <details className={styles.drawerGroup}>
            <summary>
              Resources <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <div className={styles.drawerSub}>
              <ul role="list">
                <li>
                  <Link to="/resources/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/resources/glossary">Glossary</Link>
                </li>
                {siteConfig.features.downloads && (
                  <li>
                    <Link to="/resources/downloads">Downloads</Link>
                  </li>
                )}
              </ul>
            </div>
          </details>
          <ul role="list" className={styles.drawerFlat}>
            {[...flatLinks, { to: '/contact', label: 'Contact' }].map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.drawerFoot}>
          <PhoneLink className={styles.drawerPhone} location="drawer" />
          <p className={styles.drawerEmail}>
            <ContentText>{siteConfig.primaryEmail}</ContentText>
          </p>
          <LinkButton to="/quote" block size="lg">
            Get a quote
          </LinkButton>
        </div>
      </div>
    </dialog>
  );
}

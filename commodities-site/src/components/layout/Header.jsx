import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { company } from '../../data/company';
import { mainNav, quoteLink } from '../../data/navigation';
import { telHref } from '../../utils/contact';
import Button from '../ui/Button';
import Logo from './Logo';
import './Header.css';

/**
 * Sticky site header (docs/UI_UX_GUIDELINES.md §6, docs/WEBSITE_STRUCTURE.md §3.1).
 * Desktop (≥ 992px): inline navigation, phone and "Get a Quote".
 * Mobile and tablet (< 992px): phone icon, menu button, and an Offcanvas menu
 * (full-screen on phones, 400px panel on tablets). Esc, focus trap and scroll lock are built in.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes (state reset during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Add a shadow once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tel = telHref(company.phone);
  const closeMenu = () => setMenuOpen(false);
  // On Home, the header is transparent over the hero until the page scrolls.
  const overHero = pathname === '/' && !scrolled;
  const headerClass = [
    'site-header',
    scrolled && 'site-header--scrolled',
    overHero && 'site-header--over-hero',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Navbar
      as="header"
      role="banner"
      expand="lg"
      sticky="top"
      expanded={menuOpen}
      onToggle={setMenuOpen}
      className={headerClass}
    >
      <Container className="site-header__inner">
        <Navbar.Brand as={Link} to="/" className="site-header__brand" aria-label="Home">
          <Logo />
        </Navbar.Brand>

        {/* Mobile/tablet quick actions (hidden on desktop) */}
        <div className="site-header__mobile-actions d-lg-none">
          <a
            href={tel ?? '/contact'}
            className="site-header__icon-btn"
            aria-label={tel ? `Call us on ${company.phone}` : 'Contact us'}
          >
            <Phone size={20} aria-hidden="true" />
          </a>
          <Navbar.Toggle aria-controls="site-menu" className="site-header__toggle" />
        </div>

        <Navbar.Offcanvas
          id="site-menu"
          placement="end"
          aria-labelledby="site-menu-title"
          className="site-menu"
        >
          <Offcanvas.Header closeButton closeVariant="white" className="site-menu__header">
            <Offcanvas.Title id="site-menu-title" className="visually-hidden">
              Menu
            </Offcanvas.Title>
            <Logo tone="light" />
          </Offcanvas.Header>

          <Offcanvas.Body className="site-menu__body">
            <Nav as="nav" aria-label="Main" className="site-nav">
              {mainNav.map((item) => (
                <Nav.Link
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  end={item.to === '/'}
                  className="site-nav__link"
                  onClick={closeMenu}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>

            <div className="site-header__actions">
              {tel ? (
                <a href={tel} className="site-header__phone">
                  <Phone size={18} aria-hidden="true" />
                  <span>{company.phone}</span>
                </a>
              ) : (
                <span className="site-header__phone">
                  <Phone size={18} aria-hidden="true" />
                  <span>{company.phone}</span>
                </span>
              )}
              <Button to={quoteLink.to} onClick={closeMenu} className="site-header__cta">
                {quoteLink.label}
              </Button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

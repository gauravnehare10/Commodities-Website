import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { commodities } from '../../data/commodities';
import { company } from '../../data/company';
import { footerCompanyLinks } from '../../data/navigation';
import { isTbc, mailHref, telHref } from '../../utils/contact';
import Logo from './Logo';
import './Footer.css';

/**
 * Site footer (docs/WEBSITE_STRUCTURE.md §3.2).
 * Four columns on desktop, two on tablet, one on mobile.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const tel = telHref(company.phone);
  const mail = mailHref(company.email);

  return (
    <footer className="site-footer">
      <Container>
        {/* gx-4: row gutters must stay within the 20px phone container padding */}
        <Row className="gx-4 gy-5 site-footer__grid">
          <Col xs={12} md={6} lg={4}>
            <Link to="/" className="site-footer__brand" aria-label="Home">
              <Logo tone="light" />
            </Link>
            <p className="site-footer__tagline">{company.tagline}</p>
            {company.accreditations.length > 0 && (
              <ul className="site-footer__accreditations list-unstyled">
                {company.accreditations.map((a) => (
                  <li key={a.name}>
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>
                      {a.name}
                      {a.number && <span className="site-footer__muted"> · {a.number}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h2 className="site-footer__heading">Commodities</h2>
            <ul className="site-footer__links list-unstyled">
              {commodities.map((c) => (
                <li key={c.slug}>
                  <Link to={`/commodities/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} md={6} lg={2}>
            <h2 className="site-footer__heading">Company</h2>
            <ul className="site-footer__links list-unstyled">
              {footerCompanyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__contact list-unstyled">
              <li>
                <Phone size={18} aria-hidden="true" />
                {tel ? <a href={tel}>{company.phone}</a> : <span>{company.phone}</span>}
              </li>
              <li>
                <Mail size={18} aria-hidden="true" />
                {mail ? <a href={mail}>{company.email}</a> : <span>{company.email}</span>}
              </li>
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>{company.address}</span>
              </li>
              <li>
                <Clock size={18} aria-hidden="true" />
                <span>
                  {company.openingHours.map((h) => (
                    <span key={h.days} className="d-block">
                      {h.days}: {h.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="site-footer__bottom">
          <p>
            © {year} {company.legalName}
            {company.companyNumber && <> · Company No. {company.companyNumber}</>}
            {company.vatNumber && <> · VAT No. {company.vatNumber}</>}
          </p>
          <p>
            {isTbc(company.registeredAddress) ? '' : 'Registered office: '}
            {company.registeredAddress}
          </p>
          {company.social.length > 0 && (
            <ul className="site-footer__social list-unstyled">
              {company.social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}

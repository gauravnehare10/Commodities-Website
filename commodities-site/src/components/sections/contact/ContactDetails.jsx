import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { company } from '../../../data/company';
import { isTbc, mailHref, telHref } from '../../../utils/contact';
import './contact.css';

/**
 * Contact details card: phone, email, address with a directions link, opening hours
 * (docs/WEBSITE_STRUCTURE.md §4.6). Reads company.js directly. No embedded map script.
 */
export default function ContactDetails() {
  const tel = telHref(company.phone);
  const mail = mailHref(company.email);
  const directions = isTbc(company.address)
    ? null
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;

  return (
    <Card
      as="aside"
      className="contact-details bg-light border-0"
      aria-labelledby="contact-details-title"
    >
      <Card.Body className="d-flex flex-column gap-4 p-4 p-md-5">
        <h2 id="contact-details-title" className="h3 mb-0">
          Contact details
        </h2>

        <ul className="list-unstyled d-grid gap-4 mb-0">
          <DetailRow icon={Phone} label="Phone">
            {tel ? (
              <a href={tel} className="fw-semibold">
                {company.phone}
              </a>
            ) : (
              <span className="fw-semibold">{company.phone}</span>
            )}
          </DetailRow>
          <DetailRow icon={Mail} label="Email">
            {mail ? (
              <a href={mail} className="fw-semibold text-break">
                {company.email}
              </a>
            ) : (
              <span className="fw-semibold">{company.email}</span>
            )}
          </DetailRow>
          <DetailRow icon={MapPin} label="Address">
            <span className="d-block">{company.address}</span>
            {directions && (
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-flex align-items-center gap-1 small fw-semibold mt-1"
              >
                <Navigation size={14} aria-hidden="true" />
                Get directions
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            )}
          </DetailRow>
          <DetailRow icon={Clock} label="Opening hours">
            <Table size="sm" borderless className="contact-hours mb-0 bg-transparent">
              <caption className="visually-hidden">Opening hours</caption>
              <tbody>
                {company.openingHours.map((h) => (
                  <tr key={h.days}>
                    <th scope="row" className="fw-normal ps-0">
                      {h.days}
                    </th>
                    <td className="text-end pe-0 fw-semibold">{h.hours}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </DetailRow>
        </ul>

        {company.areasServed.length > 0 && (
          <p className="small text-secondary mb-0">
            <strong className="text-dark">Areas we serve:</strong> {company.areasServed.join(', ')}
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

function DetailRow({ icon: IconComponent, label, children }) {
  return (
    <li className="d-flex align-items-start gap-3">
      <span className="contact-icon d-flex align-items-center justify-content-center rounded-circle bg-white text-primary flex-shrink-0">
        <IconComponent size={20} aria-hidden="true" />
      </span>
      <div className="flex-grow-1 min-w-0">
        <p className="small text-body-secondary mb-1">{label}</p>
        {children}
      </div>
    </li>
  );
}

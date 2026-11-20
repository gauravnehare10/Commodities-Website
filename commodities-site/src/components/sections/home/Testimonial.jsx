import { Quote } from 'lucide-react';
import Section from '../../ui/Section';
import './home.css';

/**
 * Customer quote (MI-11). Shows the first testimonial; renders nothing until
 * real quotes are supplied with permission.
 * @param {{quote: string, author: string, company?: string}[]} items
 */
export default function Testimonial({ items }) {
  if (!items?.length) return null;
  const t = items[0];
  return (
    <Section tone="sand" labelledBy="testimonial-title">
      <h2 id="testimonial-title" className="visually-hidden">
        What our customers say
      </h2>
      <figure className="testimonial d-flex flex-column align-items-center gap-4 mx-auto mb-0 text-center">
        <Quote size={40} aria-hidden="true" className="text-primary" />
        <blockquote className="testimonial__quote mb-0">
          <p className="mb-0">{t.quote}</p>
        </blockquote>
        <figcaption className="d-grid text-body-secondary">
          <strong className="text-dark">{t.author}</strong>
          {t.company && <span>{t.company}</span>}
        </figcaption>
      </figure>
    </Section>
  );
}

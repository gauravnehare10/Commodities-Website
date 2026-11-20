import { CircleCheck, Mail, Phone } from 'lucide-react';
import { cloneElement, useEffect, useRef, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useSearchParams } from 'react-router-dom';
import { commodities, getCommodity } from '../../../data/commodities';
import { company } from '../../../data/company';
import { enquiryTypes } from '../../../data/content';
import { mailHref, telHref } from '../../../utils/contact';
import Button from '../../ui/Button';
import { emptyEnquiry, FIELD_ORDER, FORM_NAME, HONEYPOT, sendEnquiry, validate } from './enquiry';
import './contact.css';

/**
 * Enquiry form (docs/WEBSITE_STRUCTURE.md §4.6, docs/TECHNICAL_ARCHITECTURE.md §7).
 * React Bootstrap form controls; validation messages appear below each field.
 * `?commodity=<slug>` in the URL pre-selects the commodity.
 */
export default function EnquiryForm() {
  const [searchParams] = useSearchParams();
  const prefill = getCommodity(searchParams.get('commodity'))?.slug ?? '';

  const [values, setValues] = useState({ ...emptyEnquiry, commodity: prefill });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // after the first submit, validate as the user types
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef(null);
  const successRef = useRef(null);

  // Move focus to the thank-you message so screen-reader users hear it.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const update = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`enquiry-${firstInvalid}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await sendEnquiry(company.formEndpoint, formRef.current);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="enquiry-success bg-light rounded-3 p-4 p-md-5"
        role="status"
      >
        <CircleCheck size={40} aria-hidden="true" className="text-success mb-3" />
        <h2 className="h3 mb-2">Thank you, your enquiry has been sent</h2>
        <p className="text-secondary mb-4">
          Our team will get back to you within {company.responseTime}. If your enquiry is urgent,
          please call us on {company.phone}.
        </p>
        <Button to="/commodities" variant="secondary" arrow>
          Browse our commodities
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const tel = telHref(company.phone);
  const mail = mailHref(company.email);

  return (
    <Form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      name={FORM_NAME}
      method="post"
      data-netlify="true"
      netlify-honeypot={HONEYPOT}
      aria-describedby="enquiry-required-note"
    >
      {/* Netlify Forms needs the form name in the submitted data */}
      <input type="hidden" name="form-name" value={FORM_NAME} />

      {/* Spam trap: hidden from people, often filled in by bots */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="enquiry-hp">Leave this field empty</label>
        <input
          id="enquiry-hp"
          type="text"
          name={HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
          className="visually-hidden"
        />
      </div>

      <p id="enquiry-required-note" className="small text-body-secondary mb-4">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      {/* Announces the number of errors after a failed submit */}
      <p className="visually-hidden" aria-live="polite">
        {submitted && errorCount > 0
          ? `There ${errorCount === 1 ? 'is 1 error' : `are ${errorCount} errors`} in the form.`
          : ''}
      </p>

      <Row className="g-3 g-md-4">
        <Col xs={12} md={6}>
          <Field name="name" label="Full name" required error={errors.name}>
            <Form.Control
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </Field>
        </Col>
        <Col xs={12} md={6}>
          <Field name="company" label="Company" error={errors.company}>
            <Form.Control
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </Field>
        </Col>
        <Col xs={12} md={6}>
          <Field name="email" label="Email" required error={errors.email}>
            <Form.Control
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </Field>
        </Col>
        <Col xs={12} md={6}>
          <Field name="phone" label="Phone" required error={errors.phone}>
            <Form.Control
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              value={values.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </Field>
        </Col>
        <Col xs={12} md={6}>
          <Field name="enquiryType" label="Enquiry type" required error={errors.enquiryType}>
            <Form.Select
              name="enquiryType"
              required
              value={values.enquiryType}
              onChange={(e) => update('enquiryType', e.target.value)}
            >
              <option value="">Choose an option</option>
              {enquiryTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Form.Select>
          </Field>
        </Col>
        <Col xs={12} md={6}>
          <Field name="commodity" label="Commodity" error={errors.commodity}>
            <Form.Select
              name="commodity"
              value={values.commodity}
              onChange={(e) => update('commodity', e.target.value)}
            >
              <option value="">Choose a commodity (optional)</option>
              {commodities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
              <option value="other">Other / not sure</option>
            </Form.Select>
          </Field>
        </Col>
        <Col xs={12}>
          <Field
            name="quantity"
            label="Approximate quantity"
            hint="For example, 5 tonnes per month or one skip"
            error={errors.quantity}
          >
            <Form.Control
              name="quantity"
              value={values.quantity}
              onChange={(e) => update('quantity', e.target.value)}
            />
          </Field>
        </Col>
        <Col xs={12}>
          <Field name="message" label="Message" required error={errors.message}>
            <Form.Control
              as="textarea"
              rows={5}
              name="message"
              required
              minLength={10}
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
            />
          </Field>
        </Col>
        <Col xs={12}>
          <Form.Check
            id="enquiry-consent"
            className="enquiry-consent"
            name="consent"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            isInvalid={Boolean(errors.consent)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'enquiry-consent-error' : undefined}
            label={
              <>
                I agree to my details being used to respond to this enquiry, as described in the{' '}
                <Link to="/privacy" target="_blank" rel="noopener">
                  privacy policy<span className="visually-hidden"> (opens in a new tab)</span>
                </Link>
                .{' '}
                <span className="text-danger" aria-hidden="true">
                  *
                </span>
              </>
            }
          />
          {errors.consent && (
            <div id="enquiry-consent-error" className="invalid-feedback d-block">
              {errors.consent}
            </div>
          )}
        </Col>
      </Row>

      {status === 'error' && (
        <Alert variant="danger" className="mt-4 mb-0" role="alert">
          <strong>Sorry, your enquiry could not be sent.</strong> Please try again, or contact us
          directly:
          <span className="d-flex flex-wrap gap-3 mt-2">
            <span className="d-inline-flex align-items-center gap-2">
              <Phone size={16} aria-hidden="true" />
              {tel ? <a href={tel}>{company.phone}</a> : company.phone}
            </span>
            <span className="d-inline-flex align-items-center gap-2">
              <Mail size={16} aria-hidden="true" />
              {mail ? <a href={mail}>{company.email}</a> : company.email}
            </span>
          </span>
        </Alert>
      )}

      <div className="d-grid d-sm-flex mt-4">
        <Button
          type="submit"
          size="lg"
          arrow={status !== 'sending'}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <Spinner animation="border" size="sm" aria-hidden="true" className="me-2" />
              Sending…
            </>
          ) : (
            'Send enquiry'
          )}
        </Button>
      </div>
    </Form>
  );
}

/**
 * Label + control + hint + error for one field. Gives the control its id,
 * invalid state and aria-describedby so errors are read out by screen readers.
 */
function Field({ name, label, required = false, hint, error, children }) {
  const id = `enquiry-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <Form.Group controlId={id}>
      <Form.Label>
        {label}
        {required && (
          <span className="text-danger ms-1" aria-hidden="true">
            *
          </span>
        )}
      </Form.Label>
      {/* Pass validation props to the single child control */}
      {/* isInvalid adds Bootstrap's red styling; aria-invalid tells screen readers */}
      {cloneControl(children, {
        isInvalid: Boolean(error),
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}
      {hint && (
        <Form.Text id={hintId} className="d-block text-body-secondary">
          {hint}
        </Form.Text>
      )}
      {error && (
        <Form.Control.Feedback id={errorId} type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

function cloneControl(child, props) {
  return cloneElement(child, props);
}

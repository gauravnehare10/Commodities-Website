import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { track } from '~/lib/analytics';
import {
  contactSchema,
  contactSubjectLabels,
  contactSubjects,
  type ContactData,
  type ContactInput,
} from '~/lib/forms/schemas';
import { Button } from '../ui/Button';
import { Checkbox, Select, TextArea, TextInput } from '../ui/Form';
import { PhoneLink } from '../ui/PhoneLink';
import { FormErrorSummary } from './FormErrorSummary';
import styles from './Forms.module.css';
import { submitForm } from './submit';
import { Turnstile } from './Turnstile';

const fid = (n: keyof ContactInput) => `c-${n}`;

/** General contact form (FR-08, WEBSITE_STRUCTURE §5.10). */
export function ContactForm() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{ id: string; message: string }[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', company: '', email: '', phone: '', subject: 'general', message: '' },
  });
  const { errors, isSubmitting } = formState;
  const err = (n: keyof ContactInput) => errors[n]?.message as string | undefined;

  const onValid = async (data: ContactData) => {
    setSubmitError(null);
    setSummary([]);
    const res = await submitForm({ formType: 'contact', data, token, honeypot });
    if (res.ok) {
      track('contact_submit', { subject: data.subject });
      navigate('/thank-you?ref=contact');
    } else setSubmitError(res.error);
  };

  const onInvalid = (errs: typeof errors) => {
    const items = (Object.keys(errs) as (keyof ContactInput)[]).map((k) => ({
      id: fid(k),
      message: String(errs[k]?.message ?? 'Invalid value'),
    }));
    setSummary(items);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  return (
    <form className={styles.form} noValidate onSubmit={(e) => handleSubmit(onValid, onInvalid)(e)}>
      <FormErrorSummary ref={summaryRef} items={summary} />
      <div className={styles.fields}>
        <TextInput
          id={fid('name')}
          label="Name"
          required
          autoComplete="name"
          error={err('name')}
          {...register('name')}
        />
        <TextInput
          id={fid('company')}
          label="Company"
          autoComplete="organization"
          {...register('company')}
        />
        <div className={styles.row2}>
          <TextInput
            id={fid('email')}
            label="Email"
            type="email"
            required
            autoComplete="email"
            error={err('email')}
            {...register('email')}
          />
          <TextInput
            id={fid('phone')}
            label="Phone"
            type="tel"
            autoComplete="tel"
            error={err('phone')}
            {...register('phone')}
          />
        </div>
        <Select
          id={fid('subject')}
          label="Subject"
          required
          options={contactSubjects.map((s) => ({ value: s, label: contactSubjectLabels[s] }))}
          {...register('subject')}
        />
        <TextArea
          id={fid('message')}
          label="Message"
          required
          error={err('message')}
          {...register('message')}
        />
        <Checkbox
          id={fid('consent')}
          label={
            <>
              I have read the{' '}
              <Link to="/privacy-policy" target="_blank">
                privacy policy
              </Link>{' '}
              and agree to my details being used to respond to this enquiry. (required)
            </>
          }
          error={err('consent')}
          {...register('consent')}
        />
        <Turnstile onToken={setToken} />
      </div>

      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="contact_company_website">Leave this field empty</label>
        <input
          id="contact_company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitError && (
        <div className={styles.submitError} role="alert">
          <p>
            <strong>Sorry, we couldn’t send your message.</strong> Please try again, or call us on{' '}
            <PhoneLink className={styles.inlinePhone} location="contact-error" />.
          </p>
        </div>
      )}

      <div className={styles.nav}>
        <Button type="submit" size="lg" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}

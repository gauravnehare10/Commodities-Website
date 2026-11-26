import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDownToLine, ArrowUpFromLine, Mail, Phone, Truck } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { activeCategories, getCategory, getService, siteConfig } from '~/content';
import { track } from '~/lib/analytics';
import { cx } from '~/lib/cx';
import {
  frequencies,
  frequencyLabels,
  intentLabels,
  intents,
  logisticsLabels,
  logisticsOptions,
  quoteSchema,
  quoteSteps,
  units,
  type QuoteData,
  type QuoteInput,
} from '~/lib/forms/schemas';
import { Button } from '../ui/Button';
import { Checkbox, RadioCards, Select, TextArea, TextInput } from '../ui/Form';
import { PhoneLink } from '../ui/PhoneLink';
import { FormErrorSummary } from './FormErrorSummary';
import styles from './Forms.module.css';
import { submitForm } from './submit';
import { Turnstile } from './Turnstile';

const DRAFT_KEY = 'quote-draft-v1';
const REVIEW = quoteSteps.length;
type FieldName = keyof QuoteInput;

const fieldId = (name: FieldName) => `q-${name}`;
const intentIcons = {
  sell: <ArrowUpFromLine size={24} />,
  buy: <ArrowDownToLine size={24} />,
  collection: <Truck size={24} />,
};

/** Multi-step quote request (FR-07, WEBSITE_STRUCTURE §5.9). */
export function QuoteForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [token, setToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{ id: string; message: string }[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const categories = activeCategories();

  const form = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      category: '',
      materials: [],
      description: '',
      quantity: '',
      unit: 'tonnes',
      frequency: 'one-off',
      location: '',
      logistics: 'collect',
      preferredDate: '',
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      preferredContact: 'phone',
      marketingOptIn: false,
    },
  });
  const { register, trigger, handleSubmit, getValues, setValue, reset, control, getFieldState } =
    form;
  const { errors, isSubmitting } = form.formState;
  const intent = useWatch({ control, name: 'intent' });
  const categorySlug = useWatch({ control, name: 'category' });
  const selectedCategory = getCategory(categorySlug);

  // Restore draft, then apply URL pre-fill (runs after hydration so prerendered HTML stays stable).
  useEffect(() => {
    let draft: Partial<QuoteInput> = {};
    try {
      draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? '{}') as Partial<QuoteInput>;
    } catch {
      /* storage unavailable */
    }
    const prefill: Partial<QuoteInput> = {};
    const qIntent = searchParams.get('intent');
    if (qIntent && (intents as readonly string[]).includes(qIntent))
      prefill.intent = qIntent as QuoteInput['intent'];
    const qCategory = searchParams.get('category');
    if (qCategory && getCategory(qCategory)) prefill.category = qCategory;
    const qMaterial = searchParams.get('material');
    if (qMaterial && prefill.category) prefill.materials = [qMaterial];
    const service = getService(searchParams.get('service') ?? undefined);
    if (service && !draft.description) prefill.description = `Service: ${service.name}\n`;
    if (service && !prefill.intent) prefill.intent = 'collection';

    reset({ ...getValues(), ...draft, ...prefill }, { keepDefaultValues: true });
    if (prefill.intent) setStep(1);
    track('quote_start', { intent: prefill.intent });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist draft (excluding consent) for this browser tab.
  useEffect(() => {
    const sub = form.watch((values) => {
      const { consent: _consent, ...rest } = values;
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
      } catch {
        /* ignore */
      }
    });
    return () => sub.unsubscribe();
  }, [form]);

  // Move focus to the step heading after navigation between steps.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const showSummary = useCallback(
    (fields: readonly FieldName[]) => {
      const items = fields
        .map((f) => ({ id: fieldId(f), message: getFieldState(f).error?.message }))
        .filter((i): i is { id: string; message: string } => Boolean(i.message));
      setSummary(items);
      requestAnimationFrame(() => summaryRef.current?.focus());
    },
    [getFieldState],
  );

  const next = async () => {
    const fields = quoteSteps[step]?.fields ?? [];
    if (await trigger(fields as unknown as FieldName[])) {
      track('quote_step_complete', { step: step + 1 });
      setSummary([]);
      setStep((s) => s + 1);
    } else {
      showSummary(fields);
    }
  };

  const back = () => {
    setSummary([]);
    setStep((s) => Math.max(0, s - 1));
  };

  const onValid = async (data: QuoteData) => {
    setSubmitError(null);
    const res = await submitForm({ formType: 'quote', data, token, honeypot });
    if (res.ok) {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      track('quote_submit', { intent: data.intent, category: data.category });
      navigate('/thank-you?ref=quote');
    } else {
      setSubmitError(res.error);
    }
  };

  const onInvalid = () => {
    const firstBad = quoteSteps.findIndex((s) => s.fields.some((f) => getFieldState(f).error));
    if (firstBad >= 0) {
      setStep(firstBad);
      showSummary(quoteSteps[firstBad]!.fields);
    }
  };

  const title =
    step === REVIEW
      ? 'Check your request'
      : step === 0
        ? 'What would you like to do?'
        : step === 1
          ? intent === 'buy'
            ? 'What material are you looking for?'
            : 'What material do you have?'
          : step === 2
            ? 'Quantity & location'
            : 'Your details';

  const err = (name: FieldName) => errors[name]?.message as string | undefined;
  const values = getValues();

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onValid, onInvalid)}>
      <Stepper current={step} />

      <h2 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
        {title}
      </h2>

      <FormErrorSummary ref={summaryRef} items={summary} />

      {step === 0 && (
        <RadioCards
          legend={<span className="visually-hidden">Choose an option</span>}
          name="intent"
          error={err('intent')}
          id={fieldId('intent')}
          inputProps={register('intent')}
          options={intents.map((i) => ({
            value: i,
            title: intentLabels[i].title,
            text: intentLabels[i].text,
            icon: intentIcons[i],
          }))}
        />
      )}

      {step === 1 && (
        <div className={styles.fields}>
          <Select
            id={fieldId('category')}
            label="Material category"
            required
            placeholder="Select a category"
            error={err('category')}
            options={[
              ...categories.map((c) => ({ value: c.slug, label: c.name })),
              { value: 'other', label: 'Other / not sure' },
            ]}
            {...register('category', { onChange: () => setValue('materials', []) })}
          />
          {selectedCategory && (
            <fieldset id={fieldId('materials')} className={styles.checkGroup}>
              <legend className={styles.groupLegend}>
                Specific materials or grades <span className={styles.optional}>(optional)</span>
              </legend>
              <div className={styles.checkGrid}>
                {selectedCategory.materials
                  .filter((m) => m.active)
                  .map((m) => (
                    <label key={m.slug} className={styles.checkChip}>
                      <input type="checkbox" value={m.slug} {...register('materials')} />
                      <span>{m.name}</span>
                    </label>
                  ))}
              </div>
            </fieldset>
          )}
          <TextArea
            id={fieldId('description')}
            label="Describe the material"
            hint="Condition, form (loose, baled, in containers), any contamination. You can email photos after submitting."
            error={err('description')}
            {...register('description')}
          />
        </div>
      )}

      {step === 2 && (
        <div className={styles.fields}>
          <div className={styles.row2}>
            <TextInput
              id={fieldId('quantity')}
              label="Approximate quantity"
              required
              inputMode="decimal"
              error={err('quantity')}
              {...register('quantity')}
            />
            <Select
              id={fieldId('unit')}
              label="Unit"
              required
              options={units.map((u) => ({ value: u, label: u }))}
              {...register('unit')}
            />
          </div>
          <Select
            id={fieldId('frequency')}
            label="How often?"
            required
            options={frequencies.map((f) => ({ value: f, label: frequencyLabels[f] }))}
            {...register('frequency')}
          />
          <TextInput
            id={fieldId('location')}
            label={intent === 'buy' ? 'Delivery location' : 'Material location'}
            hint="Town or postcode"
            required
            autoComplete="postal-code"
            error={err('location')}
            {...register('location')}
          />
          <RadioCards
            legend="Logistics"
            name="logistics"
            columns={3}
            id={fieldId('logistics')}
            inputProps={register('logistics')}
            options={logisticsOptions.map((l) => ({ value: l, title: logisticsLabels[l] }))}
          />
          <TextInput
            id={fieldId('preferredDate')}
            label="Preferred date"
            type="date"
            {...register('preferredDate')}
          />
        </div>
      )}

      {step === 3 && (
        <div className={styles.fields}>
          <div className={styles.row2}>
            <TextInput
              id={fieldId('firstName')}
              label="First name"
              required
              autoComplete="given-name"
              error={err('firstName')}
              {...register('firstName')}
            />
            <TextInput
              id={fieldId('lastName')}
              label="Last name"
              required
              autoComplete="family-name"
              error={err('lastName')}
              {...register('lastName')}
            />
          </div>
          <TextInput
            id={fieldId('company')}
            label="Company"
            autoComplete="organization"
            {...register('company')}
          />
          <div className={styles.row2}>
            <TextInput
              id={fieldId('email')}
              label="Email"
              type="email"
              required
              autoComplete="email"
              error={err('email')}
              {...register('email')}
            />
            <TextInput
              id={fieldId('phone')}
              label="Phone"
              type="tel"
              required
              autoComplete="tel"
              error={err('phone')}
              {...register('phone')}
            />
          </div>
          <RadioCards
            legend="Preferred contact method"
            name="preferredContact"
            columns={2}
            id={fieldId('preferredContact')}
            inputProps={register('preferredContact')}
            options={[
              { value: 'phone', title: 'Phone', icon: <Phone size={20} /> },
              { value: 'email', title: 'Email', icon: <Mail size={20} /> },
            ]}
          />
          <Checkbox
            id={fieldId('consent')}
            label={
              <>
                I have read the{' '}
                <Link to="/privacy-policy" target="_blank">
                  privacy policy
                </Link>{' '}
                and agree to my details being used to respond to this request. (required)
              </>
            }
            error={err('consent')}
            {...register('consent')}
          />
          <Checkbox
            id={fieldId('marketingOptIn')}
            label="Send me occasional updates. You can unsubscribe at any time."
            {...register('marketingOptIn')}
          />
        </div>
      )}

      {step === REVIEW && (
        <div className={styles.review}>
          {quoteSteps.map((s, i) => (
            <section key={s.id} className={styles.reviewBlock} aria-labelledby={`review-${s.id}`}>
              <div className={styles.reviewHead}>
                <h3 id={`review-${s.id}`}>{s.label}</h3>
                <button type="button" className={styles.editBtn} onClick={() => setStep(i)}>
                  Edit <span className="visually-hidden">{s.label}</span>
                </button>
              </div>
              <dl className={styles.reviewList}>
                {reviewRows(s.id, values).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v || '—'}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
          <Turnstile onToken={setToken} />
        </div>
      )}

      {/* Honeypot: hidden from people, often filled by bots */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitError && (
        <div className={styles.submitError} role="alert">
          <p>
            <strong>Sorry, we couldn’t send your request.</strong> Please try again, or call us on{' '}
            <PhoneLink className={styles.inlinePhone} location="quote-error" />.
          </p>
        </div>
      )}

      <div className={cx(styles.nav, step === 0 && styles.navEnd)}>
        {step > 0 && (
          <Button type="button" variant="secondary" onClick={back}>
            Back
          </Button>
        )}
        {step < REVIEW ? (
          <Button type="button" onClick={next} arrow>
            Continue
          </Button>
        ) : (
          <Button type="submit" size="lg" loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send request'}
          </Button>
        )}
      </div>
      <p className={styles.footnote}>
        We’ll use your details only to respond to this request. See our{' '}
        <Link to="/privacy-policy">privacy policy</Link>.{' '}
        {!siteConfig.responseTime.includes('[PLACEHOLDER]') && (
          <>We usually reply within {siteConfig.responseTime}.</>
        )}
      </p>
    </form>
  );
}

function reviewRows(stepId: string, v: Partial<QuoteInput>): [string, string][] {
  switch (stepId) {
    case 'intent':
      return [['Request', v.intent ? intentLabels[v.intent].title : '']];
    case 'material': {
      const cat = getCategory(v.category);
      const mats = (v.materials ?? []).map(
        (m) => cat?.materials.find((x) => x.slug === m)?.name ?? m,
      );
      return [
        ['Category', cat?.name ?? (v.category === 'other' ? 'Other / not sure' : '')],
        ['Materials', mats.join(', ')],
        ['Description', v.description ?? ''],
      ];
    }
    case 'logistics':
      return [
        ['Quantity', v.quantity ? `${v.quantity} ${v.unit}` : ''],
        ['Frequency', v.frequency ? frequencyLabels[v.frequency] : ''],
        ['Location', v.location ?? ''],
        ['Logistics', v.logistics ? logisticsLabels[v.logistics] : ''],
        ['Preferred date', v.preferredDate ?? ''],
      ];
    case 'contact':
      return [
        ['Name', [v.firstName, v.lastName].filter(Boolean).join(' ')],
        ['Company', v.company ?? ''],
        ['Email', v.email ?? ''],
        ['Phone', v.phone ?? ''],
        ['Contact by', v.preferredContact ?? ''],
      ];
    default:
      return [];
  }
}

function Stepper({ current }: { current: number }) {
  const total = quoteSteps.length;
  const shown = Math.min(current + 1, total);
  return (
    <div className={styles.stepper}>
      <p className={styles.stepCount}>
        {current === REVIEW ? 'Review' : `Step ${shown} of ${total}`}
      </p>
      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${(Math.min(current, total) / total) * 100}%` }} />
      </div>
      <ol className={styles.stepList}>
        {quoteSteps.map((s, i) => (
          <li
            key={s.id}
            className={cx(i < current && styles.done, i === current && styles.current)}
            aria-current={i === current ? 'step' : undefined}
          >
            <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

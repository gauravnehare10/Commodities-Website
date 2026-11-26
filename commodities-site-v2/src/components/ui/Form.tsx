import { CircleAlert } from 'lucide-react';
import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from '~/lib/cx';
import styles from './Form.module.css';

type FieldMeta = {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
};

function useFieldIds(id?: string) {
  const auto = useId();
  const base = id ?? auto;
  return { id: base, hintId: `${base}-hint`, errorId: `${base}-error` };
}

function describedBy(hint: unknown, error: unknown, ids: { hintId: string; errorId: string }) {
  return cx(hint ? ids.hintId : undefined, error ? ids.errorId : undefined) || undefined;
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
      {required ? (
        <span className={styles.req}> (required)</span>
      ) : (
        <span className={styles.opt}> (optional)</span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={styles.error}>
      <CircleAlert size={16} aria-hidden="true" />
      {message}
    </p>
  );
}

export function TextInput({
  label,
  hint,
  error,
  required,
  className,
  id: idProp,
  ref,
  ...rest
}: FieldMeta & InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  const ids = useFieldIds(idProp);
  return (
    <div className={cx(styles.field, className)}>
      <Label htmlFor={ids.id} required={required}>
        {label}
      </Label>
      {hint && (
        <p id={ids.hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <input
        {...rest}
        ref={ref}
        id={ids.id}
        className={cx(styles.control, error && styles.invalid)}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(hint, error, ids)}
      />
      <FieldError id={ids.errorId} message={error} />
    </div>
  );
}

export function TextArea({
  label,
  hint,
  error,
  required,
  className,
  id: idProp,
  ref,
  ...rest
}: FieldMeta & TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: Ref<HTMLTextAreaElement> }) {
  const ids = useFieldIds(idProp);
  return (
    <div className={cx(styles.field, className)}>
      <Label htmlFor={ids.id} required={required}>
        {label}
      </Label>
      {hint && (
        <p id={ids.hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <textarea
        rows={5}
        {...rest}
        ref={ref}
        id={ids.id}
        className={cx(styles.control, styles.textarea, error && styles.invalid)}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(hint, error, ids)}
      />
      <FieldError id={ids.errorId} message={error} />
    </div>
  );
}

export function Select({
  label,
  hint,
  error,
  required,
  className,
  id: idProp,
  options,
  placeholder,
  ref,
  ...rest
}: FieldMeta &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
    placeholder?: string;
    ref?: Ref<HTMLSelectElement>;
  }) {
  const ids = useFieldIds(idProp);
  return (
    <div className={cx(styles.field, className)}>
      <Label htmlFor={ids.id} required={required}>
        {label}
      </Label>
      {hint && (
        <p id={ids.hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <select
        {...rest}
        ref={ref}
        id={ids.id}
        className={cx(styles.control, styles.select, error && styles.invalid)}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(hint, error, ids)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={ids.errorId} message={error} />
    </div>
  );
}

export function Checkbox({
  label,
  error,
  className,
  id: idProp,
  ref,
  ...rest
}: Omit<FieldMeta, 'required' | 'hint'> &
  InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  const ids = useFieldIds(idProp);
  return (
    <div className={cx(styles.checkField, className)}>
      <div className={styles.checkRow}>
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          id={ids.id}
          className={styles.checkbox}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? ids.errorId : undefined}
        />
        <label htmlFor={ids.id} className={styles.checkLabel}>
          {label}
        </label>
      </div>
      <FieldError id={ids.errorId} message={error} />
    </div>
  );
}

/** Large tappable radio cards (UI_UX_GUIDELINES §6.8). Pass register() props via inputProps. */
export function RadioCards({
  id,
  legend,
  name,
  options,
  error,
  inputProps,
  columns = 3,
}: {
  id?: string;
  legend: ReactNode;
  name: string;
  options: { value: string; title: string; text?: string; icon?: ReactNode }[];
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> };
  columns?: 2 | 3;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset
      id={id}
      tabIndex={id ? -1 : undefined}
      className={styles.fieldset}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={styles.legend}>{legend}</legend>
      <div className={cx(styles.radioCards, columns === 2 && styles.twoCol)}>
        {options.map((o) => (
          <label key={o.value} className={styles.radioCard}>
            <input {...inputProps} type="radio" value={o.value} className={styles.radioInput} />
            <span className={styles.radioBody}>
              {o.icon}
              <span className={styles.radioTitle}>{o.title}</span>
              {o.text && <span className={styles.radioText}>{o.text}</span>}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

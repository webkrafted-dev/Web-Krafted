const base =
  "form-field-motion w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-lime/25";

export function FieldShell({ id, label, required, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-1.5 font-heading text-[13px] font-semibold text-navy">
        {label}
        {required ? (
          <span className="text-[11px] font-medium text-charcoal/50">
            <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </span>
        ) : (
          <span className="text-[11px] font-normal text-charcoal/45">optional</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[12.5px] font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ id, label, error, hint, required, ...props }) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${base} ${error ? "border-red-400" : "border-mist/80 focus:border-navy/40"}`}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({ id, label, error, hint, required, rows = 5, ...props }) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${base} resize-y ${error ? "border-red-400" : "border-mist/80 focus:border-navy/40"}`}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({ id, label, error, hint, required, options, placeholder, ...props }) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${base} appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10 ${
          error ? "border-red-400" : "border-mist/80 focus:border-navy/40"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231F2937' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function ErrorSummary({ errors, summaryRef }) {
  const messages = Object.values(errors).filter(Boolean);
  if (messages.length === 0) return null;
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      role="alert"
      className="rounded-lg border border-red-300 bg-red-50 p-4"
    >
      <p className="font-heading text-sm font-semibold text-red-800">
        Please check {messages.length === 1 ? "this field" : "these fields"} before sending:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[13.5px] text-red-800">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

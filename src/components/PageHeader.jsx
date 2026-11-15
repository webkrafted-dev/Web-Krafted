export default function PageHeader({ eyebrow, title, description, children, tone = "dark" }) {
  const dark = tone === "dark";
  const hasDetails = Boolean(description || children);
  return (
    <section
      className={`relative overflow-hidden border-b ${dark ? "border-white/10 bg-ink text-paper" : "border-navy/10 bg-paper text-navy"}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(900px 420px at 85% 0%, rgba(184,255,59,0.12), transparent 55%), linear-gradient(180deg, rgba(11,31,59,0.35), transparent 60%)"
            : "radial-gradient(900px 420px at 85% 0%, rgba(11,31,59,0.06), transparent 55%)",
        }}
      />
      <div
        className={`shell relative grid gap-8 py-16 sm:py-20 lg:py-24 ${
          hasDetails ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end lg:gap-16" : ""
        }`}
      >
        <div>
          {eyebrow && (
            <span className={`eyebrow ${dark ? "text-lime" : "text-navy/60"}`}>
              <span className={`h-px w-7 ${dark ? "bg-lime/80" : "bg-lime-deep"}`} aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1
            className={`mt-5 max-w-4xl font-heading text-balance text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em] ${
              dark ? "text-paper" : "text-navy"
            }`}
          >
            {title}
          </h1>
        </div>
        {hasDetails && (
          <div className={`max-w-2xl border-l-2 pl-5 sm:pl-6 ${dark ? "border-lime/55" : "border-lime-deep/65"}`}>
            {description && (
              <p className={`text-[1.02rem] leading-relaxed sm:text-[1.12rem] ${dark ? "text-mist" : "text-charcoal/75"}`}>
                {description}
              </p>
            )}
            {children}
          </div>
        )}
      </div>
      <div aria-hidden="true" className="hairline" />
    </section>
  );
}
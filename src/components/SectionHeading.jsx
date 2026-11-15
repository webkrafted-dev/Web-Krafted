export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className = "",
  children = null,
}) {
  const isDark = tone === "dark";
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${isDark ? "text-lime" : "text-navy/60"}`}>
          <span className={`h-px w-7 ${isDark ? "bg-lime/80" : "bg-lime-deep"}`} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-5 font-heading text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] ${
          isDark ? "text-paper" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-[1.02rem] leading-relaxed sm:text-[1.08rem] ${isDark ? "text-mist" : "text-charcoal/75"}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

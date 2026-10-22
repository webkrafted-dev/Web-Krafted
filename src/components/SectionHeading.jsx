export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className = "",
  children,
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${isDark ? "text-mist" : "text-charcoal/60"}`}>
          <span className="h-px w-6 bg-lime" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-heading text-3xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] ${
          isDark ? "text-paper" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[17px] leading-relaxed ${isDark ? "text-mist" : "text-charcoal/75"}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
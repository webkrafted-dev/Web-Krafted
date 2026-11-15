import { Link } from "react-router-dom";

const styles = {
  primary: "bg-lime text-navy hover:bg-[#c9ff66] shadow-glow border border-lime/40",
  outlineDark: "border border-white/20 text-paper hover:border-lime/70 hover:text-lime bg-white/[0.02]",
  outlineLight: "border border-navy/15 text-navy hover:border-navy hover:bg-navy hover:text-paper bg-white",
  link: "text-navy underline decoration-lime decoration-2 underline-offset-4 hover:decoration-navy",
  linkDark: "text-paper underline decoration-lime decoration-2 underline-offset-4 hover:decoration-paper",
};

const base =
  "motion-cta group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-semibold tracking-[0.01em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-60";

export default function CTA({
  to,
  href = undefined,
  children,
  variant = "primary",
  className = "",
  icon = null,
  ...props
}) {
  const linkOnly = variant === "link" || variant === "linkDark";
  const cls = `${linkOnly ? "motion-cta inline-flex items-center gap-2 font-heading text-sm font-semibold" : base} ${styles[variant]} ${className}`;
  const iconNode = icon ? <span className="motion-arrow inline-flex">{icon}</span> : null;

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
        {iconNode}
      </a>
    );
  }

  return (
    <Link to={to} className={cls} {...props}>
      {children}
      {iconNode}
    </Link>
  );
}

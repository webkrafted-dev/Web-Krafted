import { Link } from "react-router-dom";

const styles = {
  primary:
    "bg-lime text-navy hover:bg-lime-deep hover:-translate-y-0.5 shadow-[0_10px_24px_-14px_rgba(11,31,59,0.55)]",
  outlineDark: "border border-mist/40 text-paper hover:border-lime hover:text-lime",
  outlineLight: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-paper",
  link: "text-navy underline decoration-lime decoration-2 underline-offset-4 hover:decoration-navy",
  linkDark: "text-paper underline decoration-lime decoration-2 underline-offset-4 hover:decoration-paper",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-heading text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none";

export default function CTA({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  icon = null,
  ...props
}) {
  const cls = `${variant === "link" || variant === "linkDark" ? "inline-flex items-center gap-2 font-heading text-sm font-semibold" : base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link to={to} className={cls} {...props}>
      {children}
      {icon}
    </Link>
  );
}
import { Link } from "react-router-dom";

export default function Wordmark({ tone = "dark", className = "" }) {
  const onDark = tone === "dark";
  const label = onDark ? "text-paper" : "text-navy";
  const sub = onDark ? "text-mist/70" : "text-charcoal/55";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 rounded-md ${className}`}
      aria-label="WK Web Krafted Studios — home"
    >
      <span
        className={`flex items-baseline font-heading text-[20px] font-extrabold uppercase leading-none tracking-[0.01em] ${label}`}
        aria-hidden="true"
      >
        W
        <span className="mx-px inline-block text-lime transition-transform duration-200 group-hover:-translate-y-0.5">
          /
        </span>
        K
      </span>
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-heading text-[11px] font-semibold uppercase tracking-[0.34em] ${label}`}>
          Studios
        </span>
        <span className={`mt-1 text-[8px] font-medium uppercase tracking-[0.2em] ${sub}`}>
          Web Krafted Studios
        </span>
      </span>
    </Link>
  );
}
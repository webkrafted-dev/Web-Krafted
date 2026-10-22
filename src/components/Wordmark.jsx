import { Link } from "react-router-dom";

export default function Wordmark({ tone = "dark", className = "" }) {
  const onDark = tone === "dark";
  const label = onDark ? "text-paper" : "text-navy";
  const sub = onDark ? "text-mist/70" : "text-charcoal/55";
  const mark = onDark ? "#F7F8FA" : "#0B1F3B";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 rounded-md ${className}`}
      aria-label="WK Web Krafted Studios — home"
    >
      <svg viewBox="0 0 58 34" className="h-[30px] w-[51px] shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true">
        <path d="M2 4.5h8.1l5.4 15.1L21 4.5h7.7l5.3 15.1 5.5-15.1h8.1L36.5 29h-7.1l-4.6-10-4.6 10h-7.1L2 4.5Z" fill={mark} />
        <path d="m39 24 7.4-11L56 29H41.3L39 24Z" fill="#B8FF3B" />
      </svg>
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-heading text-[10px] font-semibold uppercase tracking-[0.38em] ${label}`}>
          Studios
        </span>
        <span className={`mt-1.5 font-body text-[7px] font-medium uppercase tracking-[0.22em] ${sub}`}>
          Web Krafted Studios
        </span>
      </span>
    </Link>
  );
}

import { Link } from "react-router-dom";

export default function Wordmark({ tone = "dark", className = "", onClick = undefined }) {
  const onDark = tone === "dark";
  const label = onDark ? "text-paper" : "text-navy";
  const sub = onDark ? "text-mist/70" : "text-charcoal/55";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 rounded-md ${className}`}
      aria-label="WK Studios — Web Krafted Studios home"
      onClick={onClick}
    >
      <img
        src={onDark ? "/wk-mark-on-dark.png" : "/wk-mark-on-light.png"}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="h-auto w-[72px] shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none"
      />
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-heading text-[11px] font-semibold uppercase tracking-[0.42em] ${label}`}>
          Studios
        </span>
        <span className={`mt-1.5 font-body text-[7px] font-medium uppercase tracking-[0.26em] ${sub}`}>
          Web Krafted Studios
        </span>
      </span>
    </Link>
  );
}

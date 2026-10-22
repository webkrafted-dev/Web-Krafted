import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServiceBlock({ service, index }) {
  return (
    <article id={service.slug} className="scroll-mt-24 border-t border-mist/80 py-10 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy text-lime">
              <ServiceIcon name={service.icon} />
            </span>
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/45">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h2 className="mt-5 font-heading text-2xl font-bold leading-tight tracking-[-0.02em] text-navy sm:text-[1.7rem]">
            {service.title}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-charcoal/75">{service.oneLine}</p>
          <Link
            to={`/contact?type=${encodeURIComponent(service.projectType)}`}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-navy px-5 py-3 font-heading text-[13px] font-semibold text-paper transition-colors hover:bg-navy-soft"
          >
            Start a Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/50">
              Who it helps
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-charcoal/75">{service.whoFor}</p>
          </div>
          <div>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/50">
              The challenge
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-charcoal/75">{service.problem}</p>
          </div>
          <div>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/50">
              What is included
            </h3>
            <ul className="mt-2 space-y-2">
              {service.included.map((item) => (
                <li key={item} className="flex gap-2 text-[13.5px] leading-relaxed text-charcoal/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/50">
              Scope &amp; timing
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-charcoal/75">{service.scope}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal/60">
              Typical timeline: {service.timeline}.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

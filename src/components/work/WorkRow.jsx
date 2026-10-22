import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ConceptBadge from "@/components/ConceptBadge";
import BrowserMockup from "@/components/BrowserMockup";

export default function WorkRow({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <article className="border-t border-mist/80 py-10 first:border-t-0 first:pt-0 lg:py-14">
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <BrowserMockup
          variant={project.mockup}
          label={`Abstract layout preview for the ${project.name} concept project`}
        />

        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <ConceptBadge tone="light" />
            <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal/55">
              {project.category}
            </span>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold tracking-[-0.02em] text-navy sm:text-[1.9rem]">
            {project.name}
          </h2>
          <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-charcoal/75">{project.summary}</p>

          <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2 text-[13.5px] leading-relaxed text-charcoal/70">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-lime-deep" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            to={`/work/${project.slug}`}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-navy/20 px-5 py-3 font-heading text-[13px] font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
          >
            View case study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
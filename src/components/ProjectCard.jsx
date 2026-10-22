import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BrowserMockup from "@/components/BrowserMockup";
import ConceptBadge from "@/components/ConceptBadge";

export default function ProjectCard({ project, tone = "dark", delay = 0 }) {
  const dark = tone === "dark";
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border p-3 transition-all duration-200 ${
        dark
          ? "border-white/10 bg-white/[0.03] hover:border-lime/40 hover:bg-white/[0.055]"
          : "border-mist/80 bg-white hover:border-navy/25 hover:shadow-[0_20px_50px_-40px_rgba(11,31,59,0.5)]"
      }`}
    >
      <BrowserMockup
        variant={project.mockup}
        label={`Abstract layout preview for the ${project.name} concept project`}
      />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <ConceptBadge tone={dark ? "dark" : "light"} />
          <span
            className={`font-heading text-[10px] font-semibold uppercase tracking-[0.16em] ${
              dark ? "text-mist" : "text-charcoal/55"
            }`}
          >
            {project.category}
          </span>
        </div>
        <h3
          className={`mt-3 font-heading text-xl font-semibold tracking-tight ${
            dark ? "text-paper" : "text-navy"
          }`}
        >
          {project.name}
        </h3>
        <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-mist" : "text-charcoal/75"}`}>
          {project.tagline}
        </p>
        <Link
          to={`/work/${project.slug}`}
          className={`mt-5 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold ${
            dark
              ? "text-paper transition-colors group-hover:text-lime"
              : "text-navy transition-colors group-hover:text-navy/70"
          }`}
        >
          View case study
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
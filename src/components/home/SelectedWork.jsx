import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BrowserMockup from "@/components/BrowserMockup";
import ConceptBadge from "@/components/ConceptBadge";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  const featured = projects.slice(0, 3);
  return (
    <section className="section relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_10%_20%,rgba(19,47,84,0.35),transparent_60%)]"
      />
      <div className="shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="Selected concept work"
            title="Design studies with real intent"
            description="Concept projects created to demonstrate our approach across hospitality, consulting, sport, creators, and community — clearly presented as illustrative work, not client commissions."
          />
          <Link to="/work" className="motion-cta inline-flex items-center gap-2 font-heading text-sm font-semibold text-lime">
            View all work <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08} className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <Link
                to={`/work/${project.slug}`}
                className="group relative block overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3 transition-all duration-500 hover:border-lime/30 hover:bg-white/[0.05]"
              >
                <div className="overflow-hidden rounded-[1.15rem] transition-transform duration-500 group-hover:scale-[1.01]">
                  <BrowserMockup variant={project.mockup} label={`Concept preview for ${project.name}`} />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <ConceptBadge tone="dark" />
                    <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/70">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-paper">{project.name}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-mist">{project.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-lime">
                    View case study{" "}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";
import BrowserMockup from "@/components/BrowserMockup";
import ConceptBadge from "@/components/ConceptBadge";
import { projects } from "@/data/projects";

function Section({ title, children }) {
  return (
    <section className="border-t border-mist/80 py-8 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/50">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed text-charcoal/80">{children}</div>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  usePageMeta(
    project ? `${project.name} — concept project — WK Web Krafted Studios` : "Project not found",
    project ? project.summary : "This concept project could not be found."
  );

  if (!project) {
    return (
      <section className="bg-paper py-20">
        <div className="shell">
          <p className="eyebrow text-charcoal/60">Project not found</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-navy">That case study is unavailable.</h1>
          <Link to="/work" className="mt-6 inline-flex items-center gap-2 font-semibold text-navy">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to work
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="bg-navy py-12 text-paper sm:py-16">
        <div className="shell">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-lime"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All work
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ConceptBadge tone="dark" />
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
              {project.category}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-mist">{project.tagline}</p>
        </div>
      </header>

      <section className="bg-paper py-10 sm:py-14">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <BrowserMockup
            variant={project.mockup}
            label={`Illustrative ${project.category.toLowerCase()} website preview for the ${project.name} concept project`}
          />
          <div className="self-center">
            <span className="eyebrow text-charcoal/60">
              <span className="h-px w-6 bg-lime" aria-hidden="true" />
              The brief
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-navy">
              {project.objective}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-charcoal/75">{project.summary}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <aside className="h-fit rounded-xl bg-paper p-5 sm:p-6">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/50">
              Project notes
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal/75">{project.audience}</p>
            <div className="mt-5 border-t border-mist/80 pt-4">
              <p className="text-[13px] leading-relaxed text-charcoal/65">
                This is a fictional concept project created to demonstrate design and development approach.
                It is not commissioned client work.
              </p>
            </div>
          </aside>

          <div>
            <Section title="Design approach">
              <ul className="list-disc space-y-2 pl-5 marker:text-lime-deep">
                {project.design.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="Development">
              <ul className="list-disc space-y-2 pl-5 marker:text-lime-deep">
                {project.development.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="Key features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </section>

      <section className="bg-paper py-10">
        <div className="shell flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <Link to="/work" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all work
          </Link>
          <Link
            to={`/work/${nextProject.slug}`}
            className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy"
          >
            Next concept: {nextProject.name}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 font-heading text-sm font-semibold text-paper"
          >
            Discuss a project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

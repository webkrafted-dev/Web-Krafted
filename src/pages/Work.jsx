import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import WorkRow from "@/components/work/WorkRow";
import FinalCta from "@/components/home/FinalCta";
import { projects } from "@/data/projects";

export default function Work() {
  usePageMeta(
    "Work — WK Web Krafted Studios",
    "Three concept projects demonstrating our design and development approach: a sports academy, a restaurant, and a consulting firm."
  );

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected concept work"
        description="Concept projects created to demonstrate our design and development approach. They are not commissioned client work."
      />

      <section className="section bg-paper">
        <div className="shell">
          <div className="mb-10 rounded-xl border border-navy/10 bg-white p-5 sm:p-6">
            <p className="text-[14px] leading-relaxed text-charcoal/75">
              <span className="font-heading font-semibold text-navy">A note on these projects.</span> Summit
              Sports Academy, Ember &amp; Oak, and Northline Consulting are fictional brands. Each site was
              designed and built by WK Studios as a demonstration of approach, layout, and front-end craft —
              not as client commissions. There are no client quotes, results, or metrics here, because there
              are no clients behind these concepts.
            </p>
          </div>

          {projects.map((project, index) => (
            <WorkRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import WorkRow from "@/components/work/WorkRow";
import FinalCta from "@/components/home/FinalCta";
import { projects } from "@/data/projects";
import ConcavePreviewGallery from "@/components/work/ConcavePreviewGallery";

export default function Work() {
  usePageMeta(
    "Work — WK Web Krafted Studios",
    "Five fictional website concepts demonstrating our approach across small business, creators, portfolios, sports clubs, professional services, and community events."
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
              <span className="font-heading font-semibold text-navy">A note on these concepts.</span> Summit
              Sports Academy, Ember &amp; Oak, Northline Consulting, Lena Rowe, and Fieldnote Market are
              fictional brands spanning business, creator, portfolio, club, and community-event websites.
              Each demonstration is designed and built by WK Studios — not commissioned client work. There
              are no client quotes, results, or metrics because there are no clients behind these concepts.
            </p>
          </div>

          <ConcavePreviewGallery />

          {projects.map((project, index) => (
            <WorkRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}

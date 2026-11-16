import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import WorkRow from "@/components/work/WorkRow";
import FinalCta from "@/components/home/FinalCta";
import { projects } from "@/data/projects";
import ChromaGrid from "@/components/ChromaGrid";
import CircularProjectCarousel from "@/components/work/CircularProjectCarousel";
import { conceptCarousel } from "@/data/conceptCarousel";

const chromaItems = conceptCarousel.map((item) => ({
  image: item.src,
  alt: item.alt,
  title: item.title,
  subtitle: item.subtitle,
  accent: item.accent,
  url: item.href,
}));

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

          <CircularProjectCarousel />

          <section className="mt-14 sm:mt-20" aria-labelledby="all-concepts-title">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-navy/60">
                  <span className="h-px w-7 bg-lime-deep" aria-hidden="true" />
                  Browse all concepts
                </p>
                <h2 id="all-concepts-title" className="mt-3 font-heading text-2xl font-semibold leading-tight text-navy sm:text-3xl">
                  Every project, at a glance.
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-charcoal/70">
                Move across a preview to reveal its colour, or select a project to open its case study.
              </p>
            </div>
            <ChromaGrid
              items={chromaItems}
              columns={3}
              minCardWidth={180}
              gap={12}
              radius={260}
              reveal="spotlight"
              aspectRatio="3 / 2"
              cardRadius={22}
              showInfo
              frame={false}
              softness={0.6}
              damping={0.45}
              fadeOut={0.6}
              grayscale={1}
              dim={0.12}
              glow={0.5}
              borderGlow={1}
              theme="light"
            />
          </section>

          {projects.map((project, index) => (
            <WorkRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}

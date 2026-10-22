import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/home/FinalCta";
import { Compass, MessageSquare, ShieldCheck } from "lucide-react";

const approach = [
  {
    title: "Precision",
    text: "Layouts are built on a consistent grid, type scale, and spacing system. Decisions are deliberate, not decorative — every element earns its place on the page.",
    icon: Compass,
  },
  {
    title: "Clear communication",
    text: "Plain-language updates at each stage. You will always know what is being worked on, what is waiting on you, and what happens next.",
    icon: MessageSquare,
  },
  {
    title: "Reliable delivery",
    text: "A written scope, an agreed timeline, and a build that is tested before it goes live. No vanishing acts and no unfinished pages.",
    icon: ShieldCheck,
  },
];

const clientSteps = [
  {
    title: "Discovery",
    text: "We start with your idea, your audience, and the requirements that matter. No assumptions about what you or your project needs.",
  },
  {
    title: "Clear scope",
    text: "You receive a written proposal covering pages, features, timeline, and price. Work begins once it is agreed.",
  },
  {
    title: "Design & build",
    text: "The site is designed and developed for real content, real devices, and the people who will use it.",
  },
  {
    title: "Review & handover",
    text: "We test the agreed flows, make the included revisions, and hand over the files and accounts in your control.",
  },
];

export default function About() {
  usePageMeta(
    "About — WK Web Krafted Studios",
    "Learn about WK Web Krafted Studios: a clear, collaborative approach to thoughtful website design and development."
  );

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Thoughtful work, clear process, no guesswork"
        description="WK Web Krafted Studios helps businesses, individuals, creators, clubs, and organisations turn their ideas into useful online experiences. The process is collaborative, the scope is written down, and the finished site belongs to you."
      />

      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title="Care in the details. Clarity at every step."
            description="Good digital work is not just a polished screen. It is a clear message, an intentional user journey, and a dependable process from the first conversation through handover."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {approach.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-mist/80 bg-white p-5 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy text-lime">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal/75">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="eyebrow text-charcoal/60">
              <span className="h-px w-6 bg-lime" aria-hidden="true" />
              Working together
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-[-0.02em] text-navy sm:text-4xl">
              A process you can follow
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-charcoal/75">
              You will know what happens next, what is needed from you, and what is included before the
              project starts.
            </p>
          </div>
          <ol className="divide-y divide-mist/80 border-y border-mist/80">
            {clientSteps.map((step, index) => (
              <li key={step.title} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-4">
                <span className="font-heading text-sm font-semibold text-lime-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-charcoal/75">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

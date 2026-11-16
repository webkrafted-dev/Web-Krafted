import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/Reveal";
import ElectricLogo from "@/components/ElectricLogo";
import { useReducedMotion } from "framer-motion";
import { Compass, MessageSquare, ShieldCheck } from "lucide-react";

const approach = [
  { title: "Precision", text: "Layouts are built on consistent systems, clear hierarchy, and deliberate choices — so every element earns its place.", icon: Compass },
  { title: "Clear communication", text: "Plain-language updates at each stage. You know what is happening, what is needed, and what comes next.", icon: MessageSquare },
  { title: "Reliable delivery", text: "A written scope, an agreed timeline, and careful testing before launch. No unfinished pages or guesswork.", icon: ShieldCheck },
];

const clientSteps = [
  { title: "Discovery", text: "We start with your idea, audience, and requirements — without assumptions." },
  { title: "Clear scope", text: "You receive a written proposal covering pages, features, timeline, and price before work begins." },
  { title: "Design & build", text: "The site is shaped for real content, real devices, and the people who will use it." },
  { title: "Review & handover", text: "We test agreed flows, complete included revisions, and hand over files and accounts in your control." },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  usePageMeta(
    "About — WK Web Krafted Studios",
    "About WK Web Krafted Studios: a clear, collaborative approach to thoughtful website design and development."
  );

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Thoughtful work, clear process"
        description="WK Web Krafted Studios helps businesses, individuals, creators, clubs, and organisations turn ideas into useful online experiences. The process is collaborative, the scope is written down, and the finished site belongs to you."
      />

      <section className="section bg-paper text-navy">
        <div className="shell">
          <SectionHeading tone="light" eyebrow="How we work" title="Care in the details. Clarity at every step." description="Good digital work is not just a polished screen. It is a clear message, an intentional journey, and a dependable process from first conversation through handover." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {approach.map(({ title, text, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <article className="h-full rounded-[1.25rem] border border-navy/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(11,31,59,0.3)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-lime"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-charcoal/75">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-paper">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-lime"><span className="h-px w-7 bg-lime/80" aria-hidden="true" />Working together</p>
            <div className="mt-5 flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0" aria-hidden="true">
                <img src="/wk-mark-on-dark.png" alt="" className="absolute inset-4 h-12 w-12 object-contain" />
                {!prefersReducedMotion && (
                  <div className="absolute inset-0">
                    <ElectricLogo
                      src="/wk-mark-on-dark.png"
                      color="#b8ff3b"
                      glowColor="#8fd400"
                      scale={0.58}
                      strands={3}
                      bend={0.45}
                      crackle={0.8}
                      arcs={1}
                      speed={1}
                      interactive
                      intensity={0.7}
                      glow={0.8}
                      thickness={1.2}
                      flicker={0.2}
                      fill={0}
                      cursorIntensity={0.5}
                      cursorRadius={75}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}
              </div>
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-[-0.03em] text-paper sm:text-4xl">A process you can follow</h2>
            </div>
            <p className="mt-4 text-[1rem] leading-relaxed text-mist">You will know what happens next, what is needed from you, and what is included before the project starts.</p>
          </Reveal>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {clientSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <li className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
                  <span className="font-mono text-sm font-semibold tracking-[0.2em] text-lime/90">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-paper">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

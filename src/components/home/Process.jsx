import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const steps = [
  { title: "Discovery", text: "We learn your goals, audience, content, and what success looks like for the project." },
  { title: "Scope & Agreement", text: "You receive a clear written scope, timeline, and terms before any build work begins." },
  { title: "Design & Feedback", text: "We shape the visual direction and key screens, then refine them with your feedback." },
  { title: "Build & Testing", text: "The site is developed responsively and checked across devices, flows, and details." },
  { title: "Launch & Handover", text: "We launch carefully and hand over what you need to run and grow the site with confidence." },
];

export default function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="section bg-paper text-navy">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Process"
          title="A clear path from idea to launch"
          description="A straightforward process designed to keep decisions visible, momentum steady, and the final result aligned with what matters."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ol className="space-y-2">
            {steps.map((step, index) => {
              const selected = active === index;
              return (
                <li key={step.title}>
                  <Reveal delay={index * 0.04}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={selected}
                      className={`group flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-300 ${selected ? "border-navy/20 bg-white shadow-[0_18px_40px_-30px_rgba(11,31,59,0.4)]" : "border-transparent hover:border-navy/10 hover:bg-white/70"}`}
                    >
                      <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full font-heading text-[11px] font-semibold ${selected ? "bg-lime text-navy" : "bg-navy/5 text-navy/60"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-heading text-lg font-semibold tracking-[-0.02em] text-navy">{step.title}</span>
                        <span className={`mt-1 block text-sm leading-relaxed ${selected ? "text-charcoal/75" : "text-charcoal/55"}`}>{step.text}</span>
                      </span>
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <Reveal delay={0.1} className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-navy/10 bg-navy p-8 text-paper sm:p-10">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(500px_260px_at_80%_20%,rgba(184,255,59,0.18),transparent_60%)]" />
            <p className="eyebrow text-lime"><span className="h-px w-7 bg-lime/80" aria-hidden="true" />Current focus</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-mist/60">Step {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p>
            <h3 className="mt-4 font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-paper sm:text-5xl">{steps[active].title}</h3>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-mist">{steps[active].text}</p>
            <div className="mt-10 h-px w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-lime transition-all duration-500" style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
            </div>
            <p className="mt-4 text-sm text-mist/70">You always know what is happening, what comes next, and what is needed from you.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const steps = [
  {
    title: "Discovery",
    text: "We learn your goals, audience, and requirements.",
  },
  {
    title: "Scope & Agreement",
    text: "A clear proposal, timeline, and terms before anything starts.",
  },
  {
    title: "Design & Feedback",
    text: "You review the design and we refine it together.",
  },
  {
    title: "Development & Testing",
    text: "Built responsive and tested across devices and browsers.",
  },
  {
    title: "Launch & Handover",
    text: "We go live and hand over everything you need to run the site.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeading
          eyebrow="Process"
          title="How we work"
          description="A straightforward five-step process, so you always know what is happening and what comes next."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[22px] top-0 h-full w-px bg-mist md:left-0 md:right-0 md:top-[22px] md:h-px md:w-full"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[22px] hidden h-px origin-left bg-lime transition-transform duration-500 md:block"
            style={{ transform: `scaleX(${activeStep / (steps.length - 1)})` }}
          />
          <ol className="relative grid gap-9 md:grid-cols-5 md:gap-5">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.06}>
                  <div className="flex items-start gap-4 md:block">
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-pressed={activeStep === index}
                      aria-label={`Select step ${index + 1}: ${step.title}`}
                      className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border font-heading text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2 ${
                        activeStep === index
                          ? "border-lime bg-lime text-navy shadow-[0_0_0_5px_rgba(184,255,59,0.18)]"
                          : "border-mist bg-white text-charcoal/60 hover:border-lime-deep/60 hover:text-navy"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                    <div className="md:mt-5 md:pr-4">
                      <h3 className="font-heading text-[15px] font-semibold text-navy">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-heading text-xs font-medium text-charcoal/55" aria-live="polite">
            Selected step <span className="ml-1 font-semibold text-lime-deep">{String(activeStep + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-mist">/</span>
            {steps.length} <span className="mx-2 text-mist">—</span>
            <span className="font-semibold text-navy">{steps[activeStep].title}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

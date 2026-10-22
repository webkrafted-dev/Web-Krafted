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
          <ol className="relative grid gap-9 md:grid-cols-5 md:gap-5">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.06}>
                  <div className="flex items-start gap-4 md:block">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-lime-deep/60 bg-lime font-heading text-sm font-bold text-navy">
                      {index + 1}
                    </span>
                    <div className="md:mt-5 md:pr-4">
                      <h3 className="font-heading text-[15px] font-semibold text-navy">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
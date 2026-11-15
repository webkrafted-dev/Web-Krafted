import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";

const points = [
  { icon: "Compass", title: "Thoughtful direction", text: "Design decisions are guided by purpose, audience, and clarity — not decoration for its own sake." },
  { icon: "MessageSquare", title: "Clear communication", text: "Plain updates at each stage so you always know what is happening and what comes next." },
  { icon: "MonitorSmartphone", title: "Built for every device", text: "Layouts, typography, and interactions are shaped to feel considered on phones, tablets, and desktops." },
  { icon: "Sparkles", title: "Care in the details", text: "Spacing, motion, accessibility, and performance receive the same attention as the visual impression." },
];

export default function WhyUs() {
  return (
    <section className="section relative overflow-hidden bg-navy-deep text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_90%_10%,rgba(184,255,59,0.1),transparent_55%)]" />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="Why WK Studios"
            title="A studio built on craft, clarity, and care"
            description="No inflated claims. Just considered design, dependable delivery, and websites made to communicate clearly and feel distinct."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05}>
                <article className="panel h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-lime/20 bg-lime/10 text-lime">
                    <ServiceIcon name={point.icon} />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold tracking-[-0.02em] text-paper">{point.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{point.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

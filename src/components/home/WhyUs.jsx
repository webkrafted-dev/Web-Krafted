import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";

const points = [
  {
    icon: "Compass",
    title: "Thoughtful design",
    text: "Every layout decision has a reason: clarity for your visitor and a clear path to getting in touch.",
  },
  {
    icon: "MessageSquare",
    title: "Clear communication",
    text: "Plain-language updates at each stage, so you always know what is happening and what is needed from you.",
  },
  {
    icon: "MonitorSmartphone",
    title: "Responsive on every device",
    text: "Built and tested for phones, tablets, and desktops, because that is where your visitors actually are.",
  },
  {
    icon: "Sparkles",
    title: "Attention to detail",
    text: "Spacing, type, form behaviour, accessibility, and loading speed all get the same care as the visuals.",
  },
];

export default function WhyUs() {
  return (
    <section className="section bg-navy">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="Why WK Studios"
            title="A studio built around care and clarity"
            description="No hype, no inflated claims. Just considered work, honest conversations, and websites that do their job."
          />

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {points.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05}>
                <div className="border-t border-white/10 pt-5">
                  <ServiceIcon name={point.icon} className="h-5 w-5 text-lime" />
                  <h3 className="mt-4 font-heading text-base font-semibold text-paper">{point.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
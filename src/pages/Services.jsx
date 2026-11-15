import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import ServiceBlock from "@/components/services/ServiceBlock";
import PricingSection from "@/components/services/PricingSection";
import PricingFaq from "@/components/services/PricingFaq";
import FinalCta from "@/components/home/FinalCta";
import { services } from "@/data/services";
import Reveal from "@/components/Reveal";

export default function Services() {
  usePageMeta(
    "Services — WK Web Krafted Studios",
    "Website design and development for businesses, portfolios, creators, communities, events, e-commerce, and custom web apps. Clear scope and considered delivery."
  );

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Websites shaped around purpose"
        description="Business websites, landing pages, portfolios, creator pages, community and event sites, shops, and custom web apps — planned and built around what each audience needs to understand and do."
      />

      <div className="bg-paper text-navy">
        <div className="shell">
          <div className="grid gap-6 border-b border-navy/10 py-12 sm:grid-cols-3">
            {[
              { title: "In plain language", text: "We plan, design, and build websites — then help you look after them." },
              { title: "How it starts", text: "A short conversation, a clear written scope, and a timeline you can plan around." },
              { title: "What you get", text: "A responsive site that works on every device, with accounts and files in your hands." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div>
                  <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">{item.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-charcoal/75">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {services.map((service, index) => (
            <ServiceBlock key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>

      <PricingSection />
      <PricingFaq />
      <FinalCta />
    </>
  );
}

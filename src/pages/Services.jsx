import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import ServiceBlock from "@/components/services/ServiceBlock";
import PricingSection from "@/components/services/PricingSection";
import PricingFaq from "@/components/services/PricingFaq";
import FinalCta from "@/components/home/FinalCta";
import { services } from "@/data/services";

export default function Services() {
  usePageMeta(
    "Services & pricing — WK Web Krafted Studios",
    "Business websites, personal portfolios, creator link pages, community and event sites, e-commerce, web apps, and ongoing care. Clear launch pricing for different project types."
  );

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Websites for businesses, personal projects, and everything between"
        description="Business websites remain a key part of our work. We also build personal portfolios, creator link pages, club and community sites, event and leisure pages, shops, and custom web apps—shaped around each project's purpose and audience."
      />

      <div className="bg-paper">
        <div className="shell">
          <div className="grid gap-6 border-b border-mist/80 py-10 sm:grid-cols-3 lg:py-12">
            <div>
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">
                In plain language
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal/75">
                We plan, design, and build websites — then help you look after them.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">
                How it starts
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal/75">
                A short conversation, a clear written scope, and a timeline you can plan around.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">
                What you get
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal/75">
                A responsive site that works on every device, with the accounts and files in your hands.
              </p>
            </div>
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

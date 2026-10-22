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
    "Website design and development, landing pages, business websites, e-commerce, web applications, UI/UX design, and maintenance. Clear, indicative pricing."
  );

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Websites designed around how your business actually works"
        description="We design and build websites for organisations of every shape: a restaurant, a retailer, a consultancy, a club, a nonprofit, a creator, or a small team with a big idea. Whatever the business, the work starts the same way — understanding what you need to say, to whom, and what should happen next."
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
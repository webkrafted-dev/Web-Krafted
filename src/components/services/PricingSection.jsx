import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import SectionHeading from "@/components/SectionHeading";

const maintenanceTier = pricingTiers.find((tier) => tier.slug === "maintenance");
const projectTiers = pricingTiers.filter((tier) => tier.slug !== "maintenance");

function InquiryLink({ tier, featured = false }) {
  return (
    <Link
      to={`/contact?type=${encodeURIComponent(tier.projectType)}`}
      className={`mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-heading text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2 ${
        featured
          ? "bg-lime text-navy hover:-translate-y-0.5 hover:bg-lime-deep"
          : "border border-navy/15 text-navy hover:-translate-y-0.5 hover:border-navy/35 hover:bg-paper"
      }`}
    >
      Ask about this service
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function PricingSection() {
  if (!maintenanceTier) return null;

  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title="A clear price menu"
          description="Website projects are scoped and quoted individually. Ongoing website care has a clear monthly starting price."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:gap-5">
          <article className="relative flex flex-col overflow-hidden rounded-2xl bg-navy p-6 text-paper shadow-[0_24px_55px_-42px_rgba(11,31,59,0.75)] sm:p-8">
            <span aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-lime/20" />
            <span aria-hidden="true" className="absolute -right-7 -top-7 h-28 w-28 rounded-full border border-lime/15" />
            <div className="relative flex h-full flex-col">
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
                Ongoing website care
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {maintenanceTier.name}
              </h3>
              <p className="mt-3 font-heading text-[2rem] font-bold leading-tight tracking-[-0.04em] text-lime sm:text-[2.55rem]">
                {maintenanceTier.price}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-mist/90">{maintenanceTier.summary}</p>
              <p className="mt-3 font-heading text-[11px] font-medium text-mist/70">{maintenanceTier.timeline}</p>
              <ul className="mt-6 space-y-3 border-t border-white/15 pt-5">
                {maintenanceTier.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-mist">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <InquiryLink tier={maintenanceTier} featured />
            </div>
          </article>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {projectTiers.map((tier, index) => (
              <article
                key={tier.slug}
                className="group flex flex-col rounded-2xl border border-mist/80 bg-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[0_18px_40px_-34px_rgba(11,31,59,0.55)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">
                    Project {String(index + 1).padStart(2, "0")}
                  </p>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold leading-snug tracking-tight text-navy">{tier.name}</h3>
                <p className="mt-3 font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">{tier.price}</p>
                <p className="mt-1 text-[11px] font-medium text-charcoal/60">{tier.timeline}</p>
                <p className="mt-4 text-[13px] leading-relaxed text-charcoal/75">{tier.summary}</p>
                <ul className="mb-5 mt-4 space-y-2 border-t border-mist/80 pt-4">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-charcoal/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-deep" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <InquiryLink tier={tier} />
              </article>
            ))}
          </div>
        </div>

        <p className="mt-7 max-w-3xl text-[13px] leading-relaxed text-charcoal/60">
          Each website project gets a written scope and quote before work begins. Hosting, domain registration, and third-party service fees are separate from the prices shown.
        </p>
      </div>
    </section>
  );
}

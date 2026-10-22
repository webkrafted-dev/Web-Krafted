import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { pricingTiers } from "@/data/pricing";

const maintenanceTier = pricingTiers.find((tier) => tier.slug === "maintenance");
const projectTiers = pricingTiers.filter((tier) => tier.slug !== "maintenance");

function InquiryLink({ tier, featured = false }) {
  return (
    <Link
      to={`/contact?type=${encodeURIComponent(tier.projectType)}`}
      className={`motion-cta mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-heading text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2 ${
        featured
          ? "bg-lime text-navy hover:-translate-y-0.5 hover:bg-lime-deep"
          : "border border-navy/15 text-navy hover:-translate-y-0.5 hover:border-navy/35 hover:bg-white"
      }`}
    >
      Discuss this package
      <ArrowRight className="motion-arrow h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function PricingSection() {
  if (!maintenanceTier || projectTiers.length === 0) return null;

  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Launch pricing"
            title="A clear price menu"
            description="Choose by scope, not by client type: a link-in-bio page, portfolio, community site, or business website can all fit these ranges."
          />
          <p className="pb-1 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/55">
            Prices in USD · one-time unless marked monthly
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projectTiers.map((tier, index) => (
            <Reveal key={tier.slug} delay={index * 0.055} className="h-full">
              <article className="motion-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mist/80 bg-paper p-5 shadow-[0_12px_34px_-32px_rgba(11,31,59,0.65)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_24px_52px_-36px_rgba(11,31,59,0.5)] motion-reduce:transform-none sm:p-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.17em] text-charcoal/50">
                    Package {String(index + 1).padStart(2, "0")}
                  </p>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
                </div>
                <h3 className="mt-3 min-h-[3.2rem] font-heading text-lg font-semibold leading-snug tracking-tight text-navy">
                  {tier.name}
                </h3>
                <p className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.045em] text-navy sm:text-[2rem]">
                  {tier.price}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-charcoal/45">
                  USD · one-time project fee
                </p>
                <p className="mt-4 min-h-[2.8rem] text-[13px] font-medium leading-relaxed text-charcoal/80">
                  {tier.audience}
                </p>
                <p className="mt-2 min-h-[3.2rem] text-[13px] leading-relaxed text-charcoal/65">
                  {tier.summary}
                </p>
                <ul className="mb-5 mt-4 space-y-2.5 border-t border-mist/80 pt-4">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[12px] leading-relaxed text-charcoal/75">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-deep" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <InquiryLink tier={tier} />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <aside className="relative mt-6 overflow-hidden rounded-2xl bg-navy p-6 text-paper shadow-[0_22px_56px_-38px_rgba(11,31,59,0.65)] sm:p-8">
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full border border-lime/15" />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_1.1fr_auto] lg:items-center">
              <div>
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
                  Ongoing website care
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  {maintenanceTier.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mist/85">{maintenanceTier.summary}</p>
              </div>
              <ul className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {maintenanceTier.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-mist">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <div className="lg:text-right">
                  <p className="font-heading text-2xl font-bold tracking-tight text-lime">{maintenanceTier.price}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-mist/60">USD · monthly</p>
                </div>
                <InquiryLink tier={maintenanceTier} featured />
              </div>
            </div>
          </aside>
        </Reveal>

        <p className="mt-6 max-w-4xl text-[12.5px] leading-relaxed text-charcoal/60">
          Complex projects receive a custom quote; some may exceed the listed range considerably. We confirm the exact scope and project fee before work begins. Hosting, domains, and third-party service charges are separate where applicable.
        </p>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Services"
            title="What would you like to put online?"
            description="Business websites remain a big part of our work—alongside personal portfolios, creator link pages, clubs, community and event sites, leisure projects, online shops, and custom apps."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 border-b border-navy/20 pb-1 font-heading text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            Explore services
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.04} className="h-full">
              <Link
                to={`/services#${service.slug}`}
                className="motion-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-mist/80 bg-white p-6 shadow-[0_12px_34px_-32px_rgba(11,31,59,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_22px_48px_-34px_rgba(11,31,59,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-lime/15 bg-navy text-lime shadow-[0_8px_18px_-12px_rgba(11,31,59,0.8)]">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="font-heading text-[11px] font-semibold tracking-[0.16em] text-charcoal/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug tracking-tight text-navy transition-colors group-hover:text-navy-soft">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-charcoal/75">{service.oneLine}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-navy">
                  Learn more
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

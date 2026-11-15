import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/data/services";

export default function ServicesGrid() {
  const handlePointerMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="section relative bg-paper text-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent"
      />
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            eyebrow="Services"
            title="What do you want to put into the world?"
            description="From focused landing pages and business sites to portfolios, creator hubs, community spaces, shops, and custom web apps — each build is shaped around purpose, audience, and clarity."
          />
          <Link to="/services" className="motion-cta inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy">
            Explore all services <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.04} className={index < 3 ? "lg:col-span-4" : "lg:col-span-4"}>
              <Link
                to={`/services#${service.slug}`}
                onPointerMove={handlePointerMove}
                className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[1.25rem] border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_30px_70px_-45px_rgba(11,31,59,0.5)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-lime-deep transition-transform duration-500 group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--sx, 50%) var(--sy, 50%), rgba(184,255,59,0.18), transparent 55%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-lime ring-1 ring-navy/10">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-6 font-heading text-xl font-semibold leading-tight tracking-[-0.02em] text-navy">
                  {service.title}
                </h3>
                <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-charcoal/75">{service.oneLine}</p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-navy">
                  Learn more{" "}
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

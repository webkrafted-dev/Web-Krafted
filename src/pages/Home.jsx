import { useEffect, useState } from "react";
import usePageMeta from "@/hooks/usePageMeta";
import { insightsSeed } from "@/data/insightsSeed";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import SelectedWork from "@/components/home/SelectedWork";
import Process from "@/components/home/Process";
import WhyUs from "@/components/home/WhyUs";
import PricingTeaser from "@/components/home/PricingTeaser";
import InsightsPreview from "@/components/home/InsightsPreview";
import FinalCta from "@/components/home/FinalCta";
import OrbitalTextGlobe from "@/components/brand/OrbitalTextGlobe";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

export default function Home() {
  usePageMeta(
    "WK Web Krafted Studios — Web design & development",
    "Thoughtfully designed websites for businesses, creators, individuals, clubs, and communities. Business sites, portfolios, creator link pages, events, e-commerce, and custom web apps."
  );

  const [posts, setPosts] = useState(isSupabaseConfigured ? [] : insightsSeed);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    supabase
      .from("posts")
      .select("title, slug, excerpt, category, read_time, published_date")
      .eq("published", true)
      .order("published_date", { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (error) throw error;
        if (active) setPosts(data || []);
      })
      .catch((error) => {
        console.error("Unable to load published insight previews:", error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <ServicesGrid />
      <section className="relative isolate overflow-hidden bg-navy py-16 text-paper sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(ellipse at 77% 50%, rgba(184,255,59,0.11), transparent 38%)" }}
        />
        <div className="shell relative z-10 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <span className="eyebrow text-lime">
              <span className="h-px w-8 bg-lime" aria-hidden="true" />
              One studio · Many contexts
            </span>
            <h2 className="mt-5 max-w-xl font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.7rem]">
              Different worlds.
              <br />
              <span className="text-lime">One thoughtful build.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-mist sm:text-[17px]">
              From local businesses and online shops to independent portfolios, creator pages, clubs, communities, and events, we shape each site around what its people need to find and do.
            </p>
            <div className="mt-7 flex flex-wrap gap-2" aria-label="Website types">
              {["Business", "Creator", "Portfolio", "Community", "Events", "Personal"].map((label) => (
                <span key={label} className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium tracking-wide text-paper/85">
                  {label}
                </span>
              ))}
            </div>
            <Link
              to="/work"
              className="motion-cta mt-8 inline-flex items-center gap-2 border-b border-lime/70 pb-1 text-sm font-semibold text-paper hover:text-lime focus-visible:outline-lime"
            >
              Explore the concept sites <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <OrbitalTextGlobe />
        </div>
      </section>
      <SelectedWork />
      <Process />
      <WhyUs />
      <PricingTeaser />
      <InsightsPreview posts={posts} />
      <FinalCta />
    </>
  );
}

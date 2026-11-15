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
import Reveal from "@/components/Reveal";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  usePageMeta(
    "WK Web Krafted Studios - Premium web design & development",
    "Distinctive, high-performing websites for businesses, creators, communities, events, and individuals. Ideas. Websites. Real Impact."
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
      <SelectedWork />
      <section className="section relative overflow-hidden bg-paper text-navy">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow text-navy/60">
              <span className="h-px w-7 bg-lime-deep" aria-hidden="true" />
              One studio - Many contexts
            </p>
            <h2 className="mt-5 max-w-2xl font-heading text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-navy">
              Different audiences. Different goals. <span className="text-navy/45">The same standard of care.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-charcoal/75">
              Whether it's a local business, a portfolio, a creator link page, a club, a community event, or a custom
              application, we focus on what people need to understand, trust, and do.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Website contexts">
              {["Business", "Creator", "Portfolio", "Community", "Events", "Personal", "E-commerce"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[11px] font-medium tracking-wide text-navy/80"
                >
                  {label}
                </span>
              ))}
            </div>
            <Link to="/work" className="motion-cta mt-7 inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy">
              Explore concept work <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
      <Process />
      <WhyUs />
      <PricingTeaser />
      <InsightsPreview posts={posts} />
      <FinalCta />
    </>
  );
}

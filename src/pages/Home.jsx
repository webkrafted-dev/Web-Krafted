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
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function Home() {
  usePageMeta(
    "WK Web Krafted Studios — Web design & development",
    "Thoughtfully designed websites that help businesses communicate clearly, build trust, and grow online. Custom sites, landing pages, e-commerce, and web apps."
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
      <Process />
      <WhyUs />
      <PricingTeaser />
      <InsightsPreview posts={posts} />
      <FinalCta />
    </>
  );
}

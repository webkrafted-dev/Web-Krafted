import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import { insightsSeed } from "@/data/insightsSeed";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function PostCard({ post }) {
  return (
    <article className="h-full">
      <Link
        to={`/insights/${post.slug}`}
        className="group flex h-full flex-col rounded-xl border border-mist/70 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[0_18px_44px_-34px_rgba(11,31,59,0.45)]"
      >
        <div className="flex flex-wrap items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.16em]">
          <span className="rounded-full bg-navy px-2.5 py-1 text-lime">{post.category || "Insights"}</span>
          <span className="text-charcoal/50">{post.read_time}</span>
        </div>
        <h2 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-tight text-navy group-hover:underline group-hover:decoration-lime group-hover:decoration-2 group-hover:underline-offset-4">
          {post.title}
        </h2>
        <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-charcoal/70">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-xs text-charcoal/55">
          <span>{formatDate(post.published_date)}</span>
          <ArrowUpRight className="h-4 w-4 text-navy" aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}

export default function Insights() {
  usePageMeta("Insights — WK Web Krafted Studios", "Practical ideas about websites, design, and building a stronger online presence.");
  const [posts, setPosts] = useState(isSupabaseConfigured ? [] : insightsSeed);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    supabase
      .from("posts")
      .select("title, slug, excerpt, category, read_time, published_date")
      .eq("published", true)
      .order("published_date", { ascending: false })
      .then(({ data, error }) => {
        if (error) throw error;
        if (active) setPosts(data || []);
      })
      .catch((error) => {
        console.error("Unable to load published insights:", error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHeader eyebrow="Ideas & insights" title="Thoughtful advice for a better web presence." />
      <section className="section">
        <div className="shell">
          {loading ? (
            <p className="text-sm text-charcoal/60" role="status">Loading insights...</p>
          ) : posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <p className="rounded-xl border border-mist bg-white p-6 text-sm text-charcoal/65">
              There are no published insights yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

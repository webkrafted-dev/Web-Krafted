import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState(isSupabaseConfigured ? [] : insightsSeed);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const requestedCategory = searchParams.get("category");
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : "All";
  const visiblePosts = activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

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
            <>
              {categories.length > 0 && (
                <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter insights by category">
                  {["All", ...categories].map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSearchParams(category === "All" ? {} : { category }, { replace: true })}
                        className={`min-h-10 cursor-pointer rounded-full border px-4 py-2 font-heading text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2 ${
                          isActive
                            ? "border-navy bg-navy text-paper"
                            : "border-mist bg-white text-charcoal/70 hover:border-navy/30 hover:text-navy"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
                {visiblePosts.length ? (
                  visiblePosts.map((post) => <PostCard key={post.slug} post={post} />)
                ) : (
                  <p className="rounded-xl border border-mist bg-white p-6 text-sm text-charcoal/65">
                    There are no articles in this category yet.
                  </p>
                )}
              </div>
            </>
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

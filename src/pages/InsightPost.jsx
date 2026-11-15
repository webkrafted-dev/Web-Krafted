import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";
import { insightsSeed } from "@/data/insightsSeed";
import { supabase } from "@/lib/supabase";
import ReadingProgress from "@/components/ReadingProgress";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const markdownComponents = {
  h2: (props) => <h2 className="mt-10 font-heading text-[1.45rem] font-bold leading-snug tracking-[-0.02em] text-navy" {...props} />,
  h3: (props) => <h3 className="mt-8 font-heading text-lg font-semibold text-navy" {...props} />,
  p: (props) => <p className="mt-4 text-[16.5px] leading-[1.75] text-charcoal/85" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[16.5px] leading-[1.75] text-charcoal/85" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[16.5px] leading-[1.75] text-charcoal/85" {...props} />,
  li: (props) => <li className="pl-1 marker:text-lime-deep" {...props} />,
  strong: (props) => <strong className="font-semibold text-navy" {...props} />,
  a: (props) => <a className="font-medium text-navy underline decoration-lime-deep decoration-2 underline-offset-4" {...props} />,
  blockquote: (props) => <blockquote className="mt-6 border-l-2 border-lime-deep pl-4 text-[16.5px] italic leading-relaxed text-charcoal/75" {...props} />,
};

export default function InsightPost() {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const [post, setPost] = useState(supabase ? null : insightsSeed.find((item) => item.slug === slug) || null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    supabase.from("posts").select("*").eq("slug", slug).eq("published", true).maybeSingle()
      .then(({ data, error }) => { if (error) throw error; if (active) setPost(data); })
      .catch((error) => { console.error("Unable to load the insight:", error.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  usePageMeta(post?.title ? `${post.title} — WK Web Krafted Studios` : "Insight — WK Web Krafted Studios", post?.excerpt || "Ideas about websites, design, and building a stronger online presence.");

  if (loading) return <div className="shell section text-sm text-charcoal/60 bg-paper min-h-[40vh]" role="status">Loading article...</div>;

  if (!post) {
    return (
      <section className="section bg-paper text-navy min-h-[50vh]">
        <div className="shell">
          <h1 className="font-heading text-3xl font-semibold text-navy">Article not found</h1>
          <Link to="/insights" className="mt-5 inline-flex items-center gap-2 font-semibold text-navy underline decoration-lime-deep decoration-2 underline-offset-4"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to insights</Link>
        </div>
      </section>
    );
  }

  return (
    <article ref={pageRef} className="bg-paper text-navy">
      <ReadingProgress targetRef={pageRef} />
      <header className="border-b border-navy/10 bg-ink text-paper">
        <div className="shell py-16 sm:py-20">
          <Link to="/insights" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-mist hover:text-lime"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All insights</Link>
          <p className="mt-8 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-lime">{post.category || "Insights"}</p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-paper sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-mist/80">{formatDate(post.published_date)}{post.read_time ? ` · ${post.read_time}` : ""}</p>
          {post.excerpt && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-mist">{post.excerpt}</p>}
        </div>
      </header>
      <div className="shell max-w-4xl py-12 sm:py-16">
        {post.content ? <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown> : <p className="rounded-xl border border-navy/10 bg-white p-5 text-sm text-charcoal/70">This article is being prepared. Please check back soon.</p>}
      </div>
    </article>
  );
}

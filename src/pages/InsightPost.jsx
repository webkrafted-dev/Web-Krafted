import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";
import { insightsSeed } from "@/data/insightsSeed";
import { supabase } from "@/lib/supabase";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const markdownComponents = {
  h2: (props) => (
    <h2 className="mt-10 font-heading text-[1.45rem] font-bold leading-snug tracking-[-0.01em] text-navy" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 font-heading text-lg font-semibold text-navy" {...props} />,
  p: (props) => <p className="mt-4 text-[16.5px] leading-[1.75] text-charcoal/85" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[16.5px] leading-[1.75] text-charcoal/85" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[16.5px] leading-[1.75] text-charcoal/85" {...props} />,
  li: (props) => <li className="pl-1 marker:text-lime-deep" {...props} />,
  strong: (props) => <strong className="font-semibold text-navy" {...props} />,
  a: (props) => <a className="font-medium text-navy underline decoration-lime decoration-2 underline-offset-4" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 border-lime pl-4 text-[16.5px] italic leading-relaxed text-charcoal/75" {...props} />
  ),
};

export default function InsightPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(supabase ? null : insightsSeed.find((item) => item.slug === slug) || null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) throw error;
        if (active) setPost(data);
      })
      .catch((error) => {
        console.error("Unable to load the insight:", error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  usePageMeta(
    post?.title ? `${post.title} — WK Web Krafted Studios` : "Insight — WK Web Krafted Studios",
    post?.excerpt || "Ideas about websites, design, and building a stronger online presence."
  );

  if (loading) {
    return <div className="shell section text-sm text-charcoal/60" role="status">Loading article...</div>;
  }

  if (!post) {
    return (
      <section className="shell section">
        <h1 className="font-heading text-3xl font-semibold text-navy">Article not found</h1>
        <Link to="/insights" className="mt-5 inline-flex items-center gap-2 font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to insights
        </Link>
      </section>
    );
  }

  return (
    <article className="shell section max-w-4xl">
      <Link to="/insights" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All insights
      </Link>
      <header className="mt-10 border-b border-mist/80 pb-8">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-lime-deep">{post.category || "Insights"}</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-charcoal/60">
          {formatDate(post.published_date)}{post.read_time ? ` · ${post.read_time}` : ""}
        </p>
        {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{post.excerpt}</p>}
      </header>
      {post.content ? (
        <div className="mt-8">
          <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
        </div>
      ) : (
        <p className="mt-8 rounded-lg border border-mist bg-white p-5 text-sm text-charcoal/70">
          This article is being prepared. Please check back soon.
        </p>
      )}
    </article>
  );
}

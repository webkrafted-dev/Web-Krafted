import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function InsightsPreview({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-lime-deep">Ideas &amp; insights</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Useful thinking for your next digital move.
            </h2>
          </div>
          <Link to="/insights" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4">
            All insights <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} to={`/insights/${post.slug}`} className="group rounded-xl border border-mist/70 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-lime-deep">{post.category || "Insights"}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-navy group-hover:underline">{post.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

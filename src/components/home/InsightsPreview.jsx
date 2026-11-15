import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function InsightsPreview({ posts = [] }) {
  if (!posts.length) return null;
  return (
    <section className="section bg-ink text-paper">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="Ideas & insights"
            title="Thinking that supports better websites"
            description="Practical notes on planning, design, content, and building an online presence that works clearly."
          />
          <Link to="/insights" className="motion-cta inline-flex items-center gap-2 font-heading text-sm font-semibold text-lime">
            All insights <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <Link
                to={`/insights/${post.slug}`}
                className="group flex h-full flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime/25 hover:bg-white/[0.05]"
              >
                <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-lime/90">{post.category || "Insights"}</span>
                <h3 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-[-0.02em] text-paper group-hover:text-lime transition-colors">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-[12px] font-semibold text-mist/80 group-hover:text-lime">
                  Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Compass, Flame, Mountain } from "lucide-react";

const mockupStyles = {
  sports: {
    brand: "SUMMIT",
    category: "SPORTS & COMMUNITY",
    hero: "bg-[#0b1f3b]",
    accentText: "text-[#caff70]",
    button: "bg-[#b8ff3b] text-[#0b1f3b]",
    mark: "bg-[#0b1f3b] text-[#caff70]",
    markIcon: Mountain,
    image: "/images/concepts/summit-sports.webp",
    headline: "Find your place on the team.",
    detail: "Teams, fixtures and club life in one clear view.",
    action: "Join the club",
    navigation: ["Teams", "Fixtures", "Club"],
    features: [
      { title: "Find a team", detail: "A place to play" },
      { title: "Match day", detail: "Fixtures & results" },
      { title: "Get involved", detail: "Join the academy" },
    ],
    overlay: "rgba(7, 22, 40, .96), rgba(7, 22, 40, .82)",
    index: "01",
  },
  restaurant: {
    brand: "EMBER & OAK",
    category: "FOOD & HOSPITALITY",
    hero: "bg-[#29211e]",
    accentText: "text-[#f6ca81]",
    button: "bg-[#f4d49c] text-[#30231a]",
    mark: "bg-[#30231a] text-[#f4d49c]",
    markIcon: Flame,
    image: "/images/concepts/ember-oak.webp",
    headline: "A table worth gathering around.",
    detail: "Seasonal menus, thoughtful plates, local warmth.",
    action: "Explore the menu",
    navigation: ["Menu", "Our story", "Visit"],
    features: [
      { title: "Seasonal menu", detail: "Thoughtful, local plates" },
      { title: "Our story", detail: "A neighbourhood table" },
      { title: "Plan a visit", detail: "Hours & directions" },
    ],
    overlay: "rgba(28, 20, 17, .96), rgba(28, 20, 17, .76)",
    index: "02",
  },
  consulting: {
    brand: "NORTHLINE",
    category: "PROFESSIONAL SERVICES",
    hero: "bg-[#142235]",
    accentText: "text-[#a8dff4]",
    button: "bg-[#c8edfa] text-[#142235]",
    mark: "bg-[#142235] text-[#a8dff4]",
    markIcon: Compass,
    image: "/images/concepts/northline-consulting.webp",
    headline: "Make the next move with clarity.",
    detail: "Complex decisions, explained in plain language.",
    action: "Explore services",
    navigation: ["Services", "Approach", "Insights"],
    features: [
      { title: "Strategy", detail: "A clearer direction" },
      { title: "Expertise", detail: "Focused support" },
      { title: "Insights", detail: "Ideas worth sharing" },
    ],
    overlay: "rgba(12, 25, 43, .96), rgba(12, 25, 43, .78)",
    index: "03",
  },
};

function FeatureCard({ title, detail }) {
  return (
    <div className="min-w-0 rounded-md border border-mist/70 bg-white px-2 py-2 sm:px-2.5">
      <span className="block truncate font-heading text-[8px] font-semibold text-navy sm:text-[9px]">
        {title}
      </span>
      <span className="mt-0.5 block truncate text-[7px] leading-relaxed text-charcoal/55 sm:text-[8px]">
        {detail}
      </span>
    </div>
  );
}

export default function BrowserMockup({ variant = "sports", label = "", priority = false }) {
  const preview = mockupStyles[variant] ?? mockupStyles.sports;
  const BrandIcon = preview.markIcon;
  const imageLabel = label || `Illustrative ${preview.category.toLowerCase()} website concept for ${preview.brand}. ${preview.headline}`;

  return (
    <div
      role="img"
      aria-label={imageLabel}
      className="overflow-hidden rounded-xl border border-navy/15 bg-navy-soft p-2 shadow-[0_26px_60px_-32px_rgba(11,31,59,0.55)] sm:p-2.5"
    >
      <div className="overflow-hidden rounded-lg bg-paper">
        <div className="flex items-center gap-1.5 border-b border-mist/70 bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd166]" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#06d6a0]" aria-hidden="true" />
          <span className="ml-2 flex h-4 flex-1 items-center rounded-full border border-mist/60 bg-paper px-2 font-mono text-[8px] text-charcoal/45">
            Illustrative website concept
          </span>
          <span className="ml-1 hidden font-mono text-[8px] text-charcoal/40 sm:inline">WK / {preview.index}</span>
        </div>

        <div className="p-2.5 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${preview.mark}`} aria-hidden="true">
                <BrandIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <span className="truncate font-heading text-[9px] font-bold tracking-[0.09em] text-navy sm:text-[10px]">
                {preview.brand}
              </span>
            </div>
            <div aria-hidden="true" className="hidden items-center gap-3 font-heading text-[8px] text-charcoal/55 sm:flex">
              {preview.navigation.map((item) => <span key={item}>{item}</span>)}
            </div>
            <span className={`shrink-0 rounded px-2 py-1 font-heading text-[8px] font-semibold ${preview.button}`}>
              {preview.action}
            </span>
          </div>

          <div className={`relative mt-3 isolate min-h-[138px] overflow-hidden rounded-lg px-3 py-4 sm:min-h-[184px] sm:px-5 sm:py-5 ${preview.hero}`}>
            <img
              src={preview.image}
              alt=""
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: `linear-gradient(90deg, ${preview.overlay}, transparent 100%), linear-gradient(0deg, rgba(8, 17, 29, .34), transparent 66%)`,
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-[76%] sm:max-w-[62%]">
              <p className={`font-heading text-[7px] font-semibold uppercase tracking-[0.16em] sm:text-[9px] ${preview.accentText}`}>
                {preview.category}
              </p>
              <h3 className="mt-2 font-heading text-sm font-semibold leading-[1.12] tracking-tight text-white sm:mt-2.5 sm:text-xl">
                {preview.headline}
              </h3>
              <p className="mt-1.5 max-w-[28ch] text-[8px] leading-relaxed text-white/75 sm:mt-2 sm:text-[11px]">
                {preview.detail}
              </p>
              <span className={`mt-3 inline-flex items-center rounded px-2.5 py-1.5 font-heading text-[8px] font-semibold sm:mt-4 sm:text-[9px] ${preview.button}`}>
                {preview.action}
              </span>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:mt-3 sm:gap-2">
            {preview.features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
          </div>
          <div className="mt-2.5 flex items-center justify-between border-t border-mist/70 pt-2 font-mono text-[7px] uppercase tracking-[0.12em] text-charcoal/45 sm:mt-3 sm:pt-2.5 sm:text-[8px]">
            <span>Designed for real life</span>
            <span>Concept {preview.index}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

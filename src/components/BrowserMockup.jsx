const mockupStyles = {
  sports: {
    brand: "SUMMIT",
    category: "SPORTS & COMMUNITY",
    hero: "bg-navy",
    accent: "text-lime",
    button: "bg-lime text-navy",
    headline: "Find your place on the team.",
    detail: "Teams, fixtures and club life in one clear view.",
    action: "Join the club",
    navigation: ["Teams", "Fixtures", "About"],
    tiles: ["Teams", "Fixtures", "Club news"],
    art: "field",
    glow: "rgba(184, 255, 59, 0.25)",
    scene: "#0b1f3b",
  },
  restaurant: {
    brand: "EMBER & OAK",
    category: "FOOD & HOSPITALITY",
    hero: "bg-stone-900",
    accent: "text-amber-300",
    button: "bg-amber-200 text-stone-900",
    headline: "A table worth gathering around.",
    detail: "Seasonal menus, thoughtful plates, local warmth.",
    action: "Explore the menu",
    navigation: ["Menu", "Our story", "Visit"],
    tiles: ["The menu", "Our story", "Find us"],
    art: "plate",
    glow: "rgba(251, 146, 60, 0.28)",
    scene: "#29211e",
  },
  consulting: {
    brand: "NORTHLINE",
    category: "PROFESSIONAL SERVICES",
    hero: "bg-slate-900",
    accent: "text-sky-300",
    button: "bg-sky-200 text-slate-900",
    headline: "Make the next move with clarity.",
    detail: "Complex decisions, explained in plain language.",
    action: "Explore services",
    navigation: ["Services", "Approach", "Insights"],
    tiles: ["Strategy", "Expertise", "Insights"],
    art: "skyline",
    glow: "rgba(125, 211, 252, 0.24)",
    scene: "#1e293b",
  },
};

function SceneArt({ type, accent }) {
  if (type === "field") {
    return (
      <div className="absolute inset-y-0 right-0 flex aspect-square items-center justify-center" aria-hidden="true">
        <div className="grid aspect-square w-[82%] place-items-center rounded-full border border-white/15">
          <div className="grid aspect-square w-[62%] place-items-center rounded-full border border-white/15">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />
          </div>
        </div>
        <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
      </div>
    );
  }

  if (type === "plate") {
    return (
      <div className="absolute inset-y-0 right-0 flex aspect-square items-center justify-center" aria-hidden="true">
        <div className="grid aspect-square w-[76%] place-items-center rounded-full border border-white/15 bg-white/[0.04] shadow-[0_0_28px_rgba(0,0,0,0.18)]">
          <div className="grid aspect-square w-[66%] place-items-center rounded-full border-[5px] border-white/10">
            <span className="h-[36%] w-[36%] rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
          </div>
        </div>
        <span className="absolute right-[19%] top-[18%] h-2 w-2 rounded-full bg-amber-200/80" />
      </div>
    );
  }

  return (
    <div className="absolute inset-y-0 right-0 flex w-[43%] items-end justify-center gap-1.5 px-1" aria-hidden="true">
      <span className="h-[45%] w-1/5 rounded-t-sm border border-white/10 bg-white/[0.04]" />
      <span className="h-[70%] w-1/5 rounded-t-sm border border-white/10 bg-white/[0.07]" />
      <span className="h-[92%] w-1/5 rounded-t-sm border border-white/10 bg-white/[0.11]" />
      <span className="h-[58%] w-1/5 rounded-t-sm border border-white/10 bg-white/[0.06]" />
      <span className="absolute bottom-[40%] right-[8%] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
    </div>
  );
}

function Tile({ children, accent }) {
  return (
    <div className="rounded-md border border-navy/5 bg-white/80 px-2 py-1.5">
      <span className="block truncate font-heading text-[8px] font-semibold text-navy/75 sm:text-[9px]">{children}</span>
      <span className="mt-1 block h-1 w-2/3 rounded-full" style={{ backgroundColor: accent, opacity: 0.65 }} aria-hidden="true" />
    </div>
  );
}

export default function BrowserMockup({ variant = "sports", label = "" }) {
  const preview = mockupStyles[variant] ?? mockupStyles.sports;
  const imageLabel = label || `Illustrative ${preview.category.toLowerCase()} website concept preview for ${preview.brand}. ${preview.headline}`;
  const accentColor = variant === "restaurant" ? "#fcd34d" : variant === "consulting" ? "#bae6fd" : "#b8ff3b";

  return (
    <div
      role="img"
      aria-label={imageLabel}
      className="overflow-hidden rounded-xl border border-navy/15 bg-navy-soft p-2 shadow-[0_26px_60px_-32px_rgba(11,31,59,0.55)]"
    >
      <div className="overflow-hidden rounded-lg bg-paper">
        <div className="flex items-center gap-1.5 border-b border-mist/70 bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd166]" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#06d6a0]" aria-hidden="true" />
          <span className="ml-2 flex h-4 flex-1 items-center rounded-full border border-mist/60 bg-paper px-2 font-mono text-[8px] text-charcoal/45">
            Illustrative website concept
          </span>
          <span className="ml-1 hidden font-mono text-[8px] text-charcoal/40 sm:inline">WK / 0{variant === "sports" ? "1" : variant === "restaurant" ? "2" : "3"}</span>
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${preview.hero} ${preview.accent} font-heading text-[10px] font-bold`} aria-hidden="true">
                {preview.brand.slice(0, 1)}
              </span>
              <span className="truncate font-heading text-[9px] font-bold tracking-[0.09em] text-navy sm:text-[10px]">
                {preview.brand}
              </span>
            </div>
            <div className="hidden items-center gap-3 font-heading text-[8px] text-charcoal/50 sm:flex">
              {preview.navigation.map((item) => <span key={item}>{item}</span>)}
            </div>
            <span className={`shrink-0 rounded px-2 py-1 font-heading text-[8px] font-semibold ${preview.button}`}>
              {preview.action}
            </span>
          </div>

          <div className={`relative mt-3 min-h-[114px] overflow-hidden rounded-lg ${preview.hero} px-3 py-3 sm:min-h-[132px] sm:px-4 sm:py-4`}>
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 76% 46%, ${preview.glow}, transparent 42%), linear-gradient(120deg, ${preview.scene}, #101827)` }}
              aria-hidden="true"
            />
            <SceneArt type={preview.art} accent={accentColor} />
            <div className="relative z-10 max-w-[68%]">
              <p className={`font-heading text-[7px] font-semibold uppercase tracking-[0.16em] sm:text-[8px] ${preview.accent}`}>
                {preview.category}
              </p>
              <h3 className="mt-1.5 font-heading text-xs font-semibold leading-tight text-white sm:mt-2 sm:text-[15px]">
                {preview.headline}
              </h3>
              <p className="mt-1.5 text-[8px] leading-relaxed text-white/65 sm:text-[9px]">
                {preview.detail}
              </p>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {preview.tiles.map((tile) => <Tile key={tile} accent={accentColor}>{tile}</Tile>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bar({ className = "" }) {
  return <span className={`block rounded-full ${className}`} aria-hidden="true" />;
}

const mockupStyles = {
  sports: {
    accent: "bg-lime",
    hero: "bg-navy",
    card: "bg-lime/70",
  },
  restaurant: {
    accent: "bg-amber-600",
    hero: "bg-stone-800",
    card: "bg-orange-200",
  },
  consulting: {
    accent: "bg-sky-700",
    hero: "bg-slate-800",
    card: "bg-sky-200",
  },
};

export default function BrowserMockup({ variant = "sports", label = "" }) {
  const style = mockupStyles[variant] ?? mockupStyles.sports;

  return (
    <div
      role="img"
      aria-label={label || "Abstract browser mockup of the concept layout"}
      className="overflow-hidden rounded-xl border border-navy/15 bg-navy-soft p-2 shadow-[0_26px_60px_-32px_rgba(11,31,59,0.55)]"
    >
      <div className="overflow-hidden rounded-lg bg-paper">
        <div className="flex items-center gap-1.5 border-b border-mist/70 bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
          <span className="ml-2 h-3 flex-1 rounded-full border border-mist/60 bg-paper" />
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <Bar className="h-2 w-12 bg-navy" />
            <div className="hidden gap-1.5 sm:flex">
              <Bar className="h-1.5 w-6 bg-mist" />
              <Bar className="h-1.5 w-6 bg-mist" />
              <Bar className="h-1.5 w-6 bg-mist" />
            </div>
            <Bar className={`h-4 w-14 rounded-md ${style.accent}`} />
          </div>

          <div className={`mt-4 rounded-lg ${style.hero} p-4 sm:p-5`}>
            <Bar className="h-2 w-1/3 bg-white/80" />
            <Bar className="mt-2 h-2 w-2/3 bg-white/50" />
            <Bar className="mt-4 h-5 w-20 rounded-md bg-white" />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className={`h-12 rounded-md ${style.card}`} />
            <div className="h-12 rounded-md bg-mist/70" />
            <div className="h-12 rounded-md bg-navy/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
      <div
        className="absolute -left-4 top-10 hidden h-28 w-px bg-lime/70 sm:block"
        aria-hidden="true"
      />

      <div className="rounded-2xl border border-white/10 bg-navy-soft p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]">
        <div className="overflow-hidden rounded-xl bg-paper">
          <div className="flex items-center gap-1.5 border-b border-mist/70 bg-white px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
            <span className="h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
            <span className="h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
            <span className="ml-2 h-3 flex-1 rounded-full border border-mist/60 bg-paper" />
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="h-2 w-14 rounded-full bg-navy" aria-hidden="true" />
              <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
                <span className="h-1.5 w-7 rounded-full bg-mist" />
                <span className="h-1.5 w-7 rounded-full bg-mist" />
                <span className="h-1.5 w-7 rounded-full bg-mist" />
              </span>
              <span className="h-4 w-14 rounded-md bg-lime" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
              <div className="py-3">
                <span className="block h-2 w-1/3 rounded-full bg-lime" aria-hidden="true" />
                <span className="mt-3 block h-3 w-full rounded-full bg-navy" aria-hidden="true" />
                <span className="mt-2 block h-3 w-4/5 rounded-full bg-navy/75" aria-hidden="true" />
                <span className="mt-4 block h-2 w-2/3 rounded-full bg-mist" aria-hidden="true" />
                <span className="mt-2 block h-2 w-1/2 rounded-full bg-mist" aria-hidden="true" />
                <span className="mt-5 block h-7 w-24 rounded-md bg-navy" aria-hidden="true" />
              </div>
              <div className="grid aspect-square place-items-center rounded-xl bg-navy p-5">
                <div className="grid h-full w-full place-items-center rounded-lg border border-lime/30">
                  <span className="font-heading text-4xl font-bold tracking-tight text-lime sm:text-5xl">
                    WK
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-mist/70 pt-4">
              <span className="h-10 rounded-md bg-navy/5" aria-hidden="true" />
              <span className="h-10 rounded-md bg-navy/5" aria-hidden="true" />
              <span className="h-10 rounded-md bg-navy/5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 right-2 rounded-lg border border-white/10 bg-navy-soft px-4 py-3 shadow-xl sm:right-6">
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
          Built with purpose
        </p>
        <p className="mt-1 font-heading text-sm font-semibold text-paper">Clear. Useful. Yours.</p>
      </div>
    </div>
  );
}

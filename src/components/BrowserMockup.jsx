import { ArrowRight, ArrowUpRight, LockKeyhole, Menu } from "lucide-react";

const concepts = {
  sports: {
    domain: "summitacademy.co",
    image: "/images/concepts/summit-sports.webp",
    imagePosition: "object-[68%_60%]",
    category: "sports and community",
    brand: "Summit Sports Academy",
  },
  restaurant: {
    domain: "emberandoak.co",
    image: "/images/concepts/ember-oak.webp",
    imagePosition: "object-[67%_50%]",
    category: "food and hospitality",
    brand: "Ember & Oak",
  },
  consulting: {
    domain: "northlineadvisory.co",
    image: "/images/concepts/northline-consulting.webp",
    imagePosition: "object-[76%_50%]",
    category: "professional services",
    brand: "Northline Consulting",
  },
  creator: {
    domain: "lenarowe.studio",
    image: "/images/concepts/creator-studio.webp",
    imagePosition: "object-[70%_47%]",
    category: "creative portfolio",
    brand: "Lena Rowe",
  },
  market: {
    domain: "fieldnotemarket.org",
    image: "/images/concepts/community-market.webp",
    imagePosition: "object-[65%_48%]",
    category: "community market and events",
    brand: "Fieldnote Market",
  },
};

function BrowserChrome({ domain }) {
  return (
    <div className="flex h-8 items-center gap-2 border-b border-[#d9dee5] bg-[#f3f5f7] px-3">
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f27c72]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#eab95e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#72b993]" />
      </div>
      <div className="mx-auto flex h-5 min-w-0 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md border border-[#e2e6eb] bg-white px-2 text-[9px] text-[#647181]">
        <LockKeyhole className="h-2.5 w-2.5 shrink-0 text-[#7f8b98]" aria-hidden="true" />
        <span className="truncate font-mono">{domain}</span>
      </div>
      <span className="w-5 shrink-0" aria-hidden="true" />
    </div>
  );
}

function PreviewPhoto({ concept, priority }) {
  return (
    <div className="concept-hero-photo bg-[#dfe5e7]">
      <img
        src={concept.image}
        alt=""
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${concept.imagePosition} transition-transform duration-700 group-hover:scale-[1.025]`}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
    </div>
  );
}

function SummitPreview({ concept, priority }) {
  return (
    <div className="bg-[#f6f7f2] text-[#112538]">
      <div className="flex items-center justify-center gap-2 bg-[#c9ef54] px-3 py-1.5 text-center font-heading text-[8px] font-semibold uppercase tracking-[0.12em] text-[#112538]">
        <span>New season, new stories</span>
        <span aria-hidden="true">·</span>
        <span>Find your team</span>
      </div>
      <header className="concept-site-nav flex items-center justify-between gap-2 border-b border-[#e6e9e2] bg-white px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-[#10283e] font-heading text-[13px] font-bold text-[#c9ef54]">S</span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-heading text-[9px] font-bold uppercase tracking-[0.1em] text-[#10283e]">SUMMIT</span>
            <span className="mt-1 block truncate text-[8px] font-semibold uppercase tracking-[0.16em] text-[#74808a]">Sports academy</span>
          </span>
        </div>
        <nav className="concept-nav-links items-center gap-3 font-heading text-[8px] font-medium text-[#3c4c5c]" aria-hidden="true">
          <span>Academy</span><span>Teams</span><span>Fixtures</span><span>Club life</span>
        </nav>
        <span className="shrink-0 rounded-sm bg-[#10283e] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-white">Join the academy</span>
        <span className="concept-menu-toggle text-[#10283e]" aria-hidden="true"><Menu className="h-4 w-4" /></span>
      </header>

      <main>
        <section className="concept-hero-split bg-[#10283e]">
          <div className="flex flex-col justify-center px-4 py-4 text-white sm:px-5">
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.18em] text-[#c9ef54]">More than match day</p>
            <h2 className="mt-2 max-w-[16ch] font-heading text-[17px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[21px]">
              Find your place on the pitch.
            </h2>
            <p className="mt-2 max-w-[35ch] text-[9px] leading-[1.55] text-white/75 sm:text-[9px]">
              A welcoming academy for young players to learn, compete, and grow together.
            </p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-sm bg-[#c9ef54] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-[#10283e]">
              Explore the academy <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <PreviewPhoto concept={concept} priority={priority} />
        </section>

        <section className="grid grid-cols-[1.2fr_0.8fr] items-center gap-2 border-b border-[#e6e9e2] bg-white px-3 py-2.5">
          <div>
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.16em] text-[#71808b]">Up next</p>
            <p className="mt-1 font-heading text-[9px] font-semibold text-[#10283e]">Summit U18 <span className="px-1 font-normal text-[#89939b]">vs</span> Westfield</p>
            <p className="mt-0.5 text-[8px] text-[#71808b]">Saturday · Kick-off 10:30</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 font-heading text-[8px] font-semibold text-[#34516a]">Fixtures <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></span>
        </section>
        <section className="grid grid-cols-3 gap-2 bg-[#f6f7f2] px-3 py-2.5">
          <div><p className="font-heading text-[8px] font-semibold text-[#10283e]">Junior teams</p><p className="mt-0.5 text-[8px] leading-relaxed text-[#71808b]">Find the right age group</p></div>
          <div className="border-l border-[#dfe4dc] pl-2"><p className="font-heading text-[8px] font-semibold text-[#10283e]">Club calendar</p><p className="mt-0.5 text-[8px] leading-relaxed text-[#71808b]">Training and fixtures</p></div>
          <div className="border-l border-[#dfe4dc] pl-2"><p className="font-heading text-[8px] font-semibold text-[#10283e]">Get involved</p><p className="mt-0.5 text-[8px] leading-relaxed text-[#71808b]">Meet the club community</p></div>
        </section>
      </main>
    </div>
  );
}

function EmberPreview({ concept, priority }) {
  return (
    <div className="bg-[#f5efe6] text-[#35271f]">
      <div className="flex items-center justify-center gap-2 bg-[#35271f] px-3 py-1.5 text-center text-[8px] font-medium uppercase tracking-[0.14em] text-[#e6c28c]">
        <span>A neighbourhood kitchen</span><span aria-hidden="true">·</span><span>Open for dinner</span>
      </div>
      <header className="concept-site-nav flex items-center justify-between gap-2 border-b border-[#e9dfd2] bg-[#fffdf9] px-3 py-2.5">
        <div className="min-w-0">
          <span className="block truncate font-serif text-[14px] leading-none tracking-[-0.04em] text-[#3b2c22]">ember <span className="text-[#b6783e]">&amp;</span> oak</span>
          <span className="mt-1 block font-heading text-[8px] font-semibold uppercase tracking-[0.2em] text-[#887466]">Wood-fired kitchen</span>
        </div>
        <nav className="concept-nav-links items-center gap-3 font-heading text-[8px] text-[#66584e]" aria-hidden="true">
          <span>Menu</span><span>Our story</span><span>Visit</span>
        </nav>
        <span className="shrink-0 border border-[#7d5635] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-[#69472d]">Book a table</span>
        <span className="concept-menu-toggle text-[#49372b]" aria-hidden="true"><Menu className="h-4 w-4" /></span>
      </header>

      <main>
        <section className="concept-hero-split bg-[#f5efe6]">
          <div className="flex flex-col justify-center px-4 py-4 sm:px-5">
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.17em] text-[#a36d3b]">Seasonal · Local · Over fire</p>
            <h2 className="mt-2 max-w-[17ch] font-serif text-[19px] leading-[1.02] tracking-[-0.035em] text-[#35271f] sm:text-[24px]">
              Good food. Good company.
            </h2>
            <p className="mt-2 max-w-[34ch] text-[9px] leading-[1.6] text-[#68594d] sm:text-[9px]">
              A neighbourhood table for long lunches, easy evenings, and whatever the season brings.
            </p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 bg-[#35271f] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-[#fffaf1]">
              Explore the menu <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <PreviewPhoto concept={concept} priority={priority} />
        </section>

        <section className="bg-[#fffdf9] px-3 py-2.5">
          <div className="flex items-center justify-between border-b border-[#e9dfd2] pb-1.5">
            <p className="font-serif text-[11px] text-[#35271f]">A taste of the season</p>
            <span className="font-heading text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a36d3b]">The menu</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div><p className="font-serif text-[9px] text-[#49372b]">Wood-fired sourdough</p><p className="mt-0.5 text-[8px] text-[#887466]">Cultured butter · sea salt</p></div>
            <div className="border-l border-[#e9dfd2] pl-2"><p className="font-serif text-[9px] text-[#49372b]">Market fish</p><p className="mt-0.5 text-[8px] text-[#887466]">Today’s catch · garden herbs</p></div>
            <div className="border-l border-[#e9dfd2] pl-2"><p className="font-serif text-[9px] text-[#49372b]">Apple tart</p><p className="mt-0.5 text-[8px] text-[#887466]">Brown butter · crème fraîche</p></div>
          </div>
        </section>
      </main>
    </div>
  );
}

function NorthlinePreview({ concept, priority }) {
  return (
    <div className="bg-[#f4f7f9] text-[#1e3144]">
      <div className="flex items-center justify-between bg-[#e8f0f4] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#567185]">
        <span>Independent advisory</span><span>Strategy · Operations · Growth</span>
      </div>
      <header className="concept-site-nav flex items-center justify-between gap-2 border-b border-[#e3e9ed] bg-white px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative h-6 w-6 shrink-0 border border-[#92b2c1]">
            <span className="absolute bottom-[4px] left-[4px] h-[2px] w-3 bg-[#356882]" />
            <span className="absolute bottom-[8px] left-[4px] h-[2px] w-4 bg-[#6e9aad]" />
            <span className="absolute bottom-[12px] left-[4px] h-[2px] w-2 bg-[#aac5d0]" />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-heading text-[9px] font-semibold tracking-[0.12em] text-[#1e3144]">NORTHLINE</span>
            <span className="mt-1 block truncate text-[8px] font-medium uppercase tracking-[0.14em] text-[#718596]">Consulting</span>
          </span>
        </div>
        <nav className="concept-nav-links items-center gap-3 font-heading text-[8px] text-[#536879]" aria-hidden="true">
          <span>Expertise</span><span>Approach</span><span>Insights</span>
        </nav>
        <span className="shrink-0 bg-[#28556e] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-white">Talk to our team</span>
        <span className="concept-menu-toggle text-[#28556e]" aria-hidden="true"><Menu className="h-4 w-4" /></span>
      </header>

      <main>
        <section className="concept-hero-split bg-[#f4f7f9]">
          <div className="flex flex-col justify-center px-4 py-4 sm:px-5">
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.16em] text-[#477890]">A clearer way forward</p>
            <h2 className="mt-2 max-w-[18ch] font-heading text-[17px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#1e3144] sm:text-[21px]">
              Clarity for decisions that shape what’s next.
            </h2>
            <p className="mt-2 max-w-[34ch] text-[9px] leading-[1.6] text-[#586d7d] sm:text-[9px]">
              Practical strategy and calm, focused support for complex moments of change.
            </p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 bg-[#28556e] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-white">
              Explore our approach <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <PreviewPhoto concept={concept} priority={priority} />
        </section>

        <section className="border-t border-[#e3e9ed] bg-white px-3 py-2.5">
          <div className="flex items-center justify-between">
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.16em] text-[#557184]">Where we help</p>
            <span className="inline-flex items-center gap-1 font-heading text-[8px] font-semibold text-[#477890]">Our expertise <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" /></span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="border-t-2 border-[#7ca9bb] pt-1.5"><p className="font-heading text-[8px] font-semibold text-[#1e3144]">Business strategy</p><p className="mt-0.5 text-[8px] text-[#718596]">Direction and choices</p></div>
            <div className="border-t-2 border-[#a8c4ce] pt-1.5"><p className="font-heading text-[8px] font-semibold text-[#1e3144]">Operating models</p><p className="mt-0.5 text-[8px] text-[#718596]">People and process</p></div>
            <div className="border-t-2 border-[#c8d9df] pt-1.5"><p className="font-heading text-[8px] font-semibold text-[#1e3144]">Transformation</p><p className="mt-0.5 text-[8px] text-[#718596]">Change that holds</p></div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CreatorPreview({ concept, priority }) {
  return (
    <div className="bg-[#f5f2ed] text-[#202a32]">
      <div className="flex items-center justify-between bg-[#252c31] px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#f5f2ed]">
        <span>Independent photographer</span><span>Available for select projects</span>
      </div>
      <header className="concept-site-nav flex items-center justify-between gap-2 border-b border-[#e6e1d9] bg-[#fbfaf7] px-3 py-2.5">
        <div className="min-w-0">
          <span className="block truncate font-serif text-[15px] leading-none tracking-[-0.04em] text-[#202a32]">Lena Rowe</span>
          <span className="mt-1 block font-heading text-[8px] font-medium uppercase tracking-[0.16em] text-[#7b827f]">Photographer &amp; image-maker</span>
        </div>
        <nav className="concept-nav-links items-center gap-3 font-heading text-[8px] text-[#535b5b]" aria-hidden="true">
          <span>Selected work</span><span>About</span><span>Journal</span>
        </nav>
        <span className="shrink-0 border border-[#4e615d] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-[#344541]">Make an enquiry</span>
        <span className="concept-menu-toggle text-[#344541]" aria-hidden="true"><Menu className="h-4 w-4" /></span>
      </header>

      <main>
        <section className="concept-hero-split bg-[#f5f2ed]">
          <div className="flex flex-col justify-center px-4 py-4 sm:px-5">
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.18em] text-[#a15e47]">Portrait · Place · Everyday</p>
            <h2 className="mt-2 max-w-[16ch] font-serif text-[20px] leading-[1.02] tracking-[-0.035em] text-[#202a32] sm:text-[25px]">
              Images for the things that matter.
            </h2>
            <p className="mt-2 max-w-[34ch] text-[9px] leading-[1.6] text-[#626966]">
              Thoughtful photographs for people, places and ideas with a story to tell.
            </p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 bg-[#344541] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-white">
              Explore selected work <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <PreviewPhoto concept={concept} priority={priority} />
        </section>
        <section className="grid grid-cols-3 gap-2 border-t border-[#e6e1d9] bg-[#fbfaf7] px-3 py-2.5">
          <div><p className="font-serif text-[10px] text-[#202a32]">People</p><p className="mt-0.5 text-[8px] text-[#747b77]">Portraits with room to breathe</p></div>
          <div className="border-l border-[#e6e1d9] pl-2"><p className="font-serif text-[10px] text-[#202a32]">Places</p><p className="mt-0.5 text-[8px] text-[#747b77]">Details worth noticing</p></div>
          <div className="border-l border-[#e6e1d9] pl-2"><p className="font-serif text-[10px] text-[#202a32]">Projects</p><p className="mt-0.5 text-[8px] text-[#747b77]">A considered archive</p></div>
        </section>
      </main>
    </div>
  );
}

function MarketPreview({ concept, priority }) {
  return (
    <div className="bg-[#f1f2e9] text-[#18382d]">
      <div className="flex items-center justify-center gap-2 bg-[#d9e1c7] px-3 py-1.5 text-center font-heading text-[8px] font-semibold uppercase tracking-[0.14em] text-[#315641]">
        <span>Next market</span><span aria-hidden="true">·</span><span>Saturday, 10am–3pm</span>
      </div>
      <header className="concept-site-nav flex items-center justify-between gap-2 border-b border-[#e3e5d8] bg-[#fbfaf4] px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#315641] font-serif text-[15px] text-[#f1f2e9]">F</span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-heading text-[9px] font-bold tracking-[0.14em] text-[#18382d]">FIELDNOTE</span>
            <span className="mt-1 block truncate text-[8px] font-medium uppercase tracking-[0.13em] text-[#778174]">Local makers market</span>
          </span>
        </div>
        <nav className="concept-nav-links items-center gap-3 font-heading text-[8px] text-[#49634f]" aria-hidden="true">
          <span>Market dates</span><span>Makers</span><span>Our story</span>
        </nav>
        <span className="shrink-0 bg-[#315641] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-white">Plan a visit</span>
        <span className="concept-menu-toggle text-[#315641]" aria-hidden="true"><Menu className="h-4 w-4" /></span>
      </header>

      <main>
        <section className="concept-hero-split bg-[#e8ecde]">
          <div className="flex flex-col justify-center px-4 py-4 sm:px-5">
            <p className="font-heading text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9b6d33]">Good things, made close to home</p>
            <h2 className="mt-2 max-w-[17ch] font-serif text-[20px] leading-[1.02] tracking-[-0.03em] text-[#18382d] sm:text-[25px]">
              Local makers. Good things.
            </h2>
            <p className="mt-2 max-w-[34ch] text-[9px] leading-[1.6] text-[#586a59]">
              Meet the independent makers, growers and neighbours behind the market.
            </p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 bg-[#315641] px-2.5 py-1.5 font-heading text-[8px] font-semibold text-white">
              See what’s on <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <PreviewPhoto concept={concept} priority={priority} />
        </section>
        <section className="grid grid-cols-3 gap-2 border-t border-[#e3e5d8] bg-[#fbfaf4] px-3 py-2.5">
          <div><p className="font-heading text-[8px] font-semibold uppercase tracking-[0.1em] text-[#315641]">This weekend</p><p className="mt-0.5 text-[8px] text-[#778174]">Dates and opening hours</p></div>
          <div className="border-l border-[#e3e5d8] pl-2"><p className="font-heading text-[8px] font-semibold uppercase tracking-[0.1em] text-[#315641]">The makers</p><p className="mt-0.5 text-[8px] text-[#778174]">Meet the local community</p></div>
          <div className="border-l border-[#e3e5d8] pl-2"><p className="font-heading text-[8px] font-semibold uppercase tracking-[0.1em] text-[#315641]">Getting here</p><p className="mt-0.5 text-[8px] text-[#778174]">Map, access and parking</p></div>
        </section>
      </main>
    </div>
  );
}

export default function BrowserMockup({ variant = "sports", label = "", priority = false }) {
  const concept = concepts[variant] ?? concepts.sports;
  const imageLabel = label || `Fictional ${concept.category} website concept preview for ${concept.brand}`;

  return (
    <div
      role="img"
      aria-label={imageLabel}
      className={`group overflow-hidden rounded-xl border border-navy/15 bg-[#e6ebf0] p-1.5 shadow-[0_26px_60px_-32px_rgba(11,31,59,0.55)] sm:p-2`}
      data-concept={variant}
    >
      <div className="overflow-hidden rounded-lg border border-[#d9dee5] bg-white">
        <BrowserChrome domain={concept.domain} />
        <div className="concept-preview-window">
          {variant === "restaurant" ? (
            <EmberPreview concept={concept} priority={priority} />
          ) : variant === "consulting" ? (
            <NorthlinePreview concept={concept} priority={priority} />
          ) : variant === "creator" ? (
            <CreatorPreview concept={concept} priority={priority} />
          ) : variant === "market" ? (
            <MarketPreview concept={concept} priority={priority} />
          ) : (
            <SummitPreview concept={concept} priority={priority} />
          )}
        </div>
      </div>
    </div>
  );
}

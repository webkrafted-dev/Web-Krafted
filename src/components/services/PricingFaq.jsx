import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is included in each price range?",
    a: "Each package lists its core inclusions above. The final written scope clarifies the exact pages, content, features, and deliverables for your project before work begins.",
  },
  {
    q: "How long will my website take?",
    a: "Timing depends on the agreed scope, content readiness, and feedback. We share a realistic schedule with your written project scope before work starts.",
  },
  {
    q: "What do I need to provide?",
    a: "Your logo if you have one, the text for each page, and any images you want used. If your content is not ready, we can agree a structure and start with placeholders — but the final build cannot finish without real content.",
  },
  {
    q: "What about hosting and domains?",
    a: "Hosting and domain registration are not included in project pricing. We can recommend suitable options and help with setup, and you keep ownership of the accounts.",
  },
  {
    q: "Can you look after the site after launch?",
    a: "Yes. Website maintenance starts at $20 per month with a defined monthly scope: content updates, small design changes, and software and security updates where applicable.",
  },
  {
    q: "How does payment work?",
    a: "The payment schedule is discussed and agreed in the proposal before any work starts, and it is written into the agreement.",
  },
  {
    q: "What happens if the scope changes?",
    a: "We talk it through first. If the change is significant, you receive a revised quote for the additional work before anything proceeds.",
  },
];

export default function PricingFaq() {
  return (
    <section className="bg-paper pb-16 sm:pb-20">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <span className="eyebrow text-charcoal/60">
              <span className="h-px w-6 bg-lime" aria-hidden="true" />
              Questions
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-navy">
              Common questions
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">
              If something isn't covered here, send a message and we'll answer it directly.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-b border-mist/80">
                <AccordionTrigger className="py-4 text-left font-heading text-[15px] font-semibold text-navy transition-colors hover:text-navy-soft hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[14.5px] leading-relaxed text-charcoal/75">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

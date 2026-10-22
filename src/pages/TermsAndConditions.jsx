import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";

const contents = [
  { label: "Payment policy", href: "#payment-policy" },
  { label: "Terms & conditions", href: "#terms" },
  { label: "Scope & pricing", href: "#scope-pricing" },
  { label: "Payment terms", href: "#payment-terms" },
  { label: "Revisions & handover", href: "#revisions-handover" },
  { label: "Ownership & third parties", href: "#ownership-third-parties" },
  { label: "Cancellations & liability", href: "#cancellations-liability" },
  { label: "Privacy & disputes", href: "#privacy-disputes" },
];

function PolicySection({ id, number, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-mist/80 py-7 sm:py-9">
      <div className="grid gap-2 sm:grid-cols-[3.25rem_1fr] sm:gap-5">
        {number && (
          <span className="font-heading text-xs font-semibold tracking-[0.16em] text-lime-deep">
            {number}
          </span>
        )}
        <div>
          <h2 className="font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">{title}</h2>
          <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-charcoal/80">{children}</div>
        </div>
      </div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-lime-deep">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function TermsAndConditions() {
  usePageMeta(
    "Payment Policy & Terms & Conditions — WK Web Krafted Studios",
    "How project payments, milestones, scope, revisions, handover, ownership, cancellations, and related website services work."
  );

  return (
    <>
      <PageHeader
        eyebrow="Client information"
        title="Payment Policy & Terms & Conditions"
        description="A clear starting point for how projects are scoped, paid for, delivered, and handed over. Your written proposal confirms the terms for your specific project."
      >
        <p className="mt-5 text-xs font-medium tracking-[0.14em] text-mist/70">Last updated: October 22, 2026</p>
      </PageHeader>

      <section className="section bg-paper">
        <div className="shell grid items-start gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24">
            <nav aria-label="On this page" className="rounded-xl border border-mist/80 bg-white p-5">
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">
                On this page
              </h2>
              <ul className="mt-3 space-y-1">
                {contents.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-8 items-center text-[13px] text-charcoal/75 underline decoration-transparent underline-offset-4 transition-colors hover:text-navy hover:decoration-lime"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 rounded-xl border border-lime-deep/40 bg-lime/10 p-4 text-[12.5px] leading-relaxed text-charcoal/75">
              This page is a general draft, not legal advice. Laws vary by location; have it reviewed by a qualified legal professional before relying on it.
            </div>
          </aside>

          <article className="min-w-0 rounded-xl border border-mist/70 bg-white px-5 py-2 shadow-[0_18px_48px_-42px_rgba(11,31,59,0.35)] sm:px-8">
            <PolicySection id="payment-policy" number="01" title="Payment policy">
              <p>
                Every project has a written proposal or agreement that confirms the scope, total price and currency, payment stages, due dates, milestones, included revisions, and any exclusions. The agreed schedule may vary with the project's size and complexity.
              </p>
              <p>
                Unless another schedule is agreed in writing, the usual schedule is <strong className="font-semibold text-navy">50% to confirm and book the project, 30% at an agreed progress milestone, and 20% before final handover.</strong> Work starts after the proposal is approved and the first payment has cleared.
              </p>
              <div className="overflow-x-auto rounded-lg border border-mist/80">
                <table className="w-full min-w-[32rem] text-left text-[13px]">
                  <thead className="bg-navy text-paper">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-heading font-semibold">Stage</th>
                      <th scope="col" className="px-4 py-3 font-heading font-semibold">Share</th>
                      <th scope="col" className="px-4 py-3 font-heading font-semibold">When it is due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mist/80 text-charcoal/80">
                    <tr><td className="px-4 py-3 font-medium text-navy">Booking deposit</td><td className="px-4 py-3">50%</td><td className="px-4 py-3">Before work begins; confirms the project and reserves time.</td></tr>
                    <tr><td className="px-4 py-3 font-medium text-navy">Progress payment</td><td className="px-4 py-3">30%</td><td className="px-4 py-3">When the agreed design or working preview is ready for review.</td></tr>
                    <tr><td className="px-4 py-3 font-medium text-navy">Final payment</td><td className="px-4 py-3">20%</td><td className="px-4 py-3">Before the agreed final launch, ownership transfer, or handover.</td></tr>
                  </tbody>
                </table>
              </div>
              <h3 className="pt-2 font-heading text-base font-semibold text-navy">Schedules may be tailored to the project</h3>
              <p>As a guide, smaller landing pages may use 50% upfront and 50% before handover. Standard multi-page websites commonly use 50% / 30% / 20%. Premium websites may use 40% / 30% / 30%, and larger custom web apps may use 30% / 30% / 30% / 10% tied to agreed milestones. These are suggested schedules, not automatic terms; the schedule in your written agreement is the one that applies.</p>
              <h3 className="pt-2 font-heading text-base font-semibold text-navy">Example: a $200 project</h3>
              <div className="overflow-x-auto rounded-lg border border-mist/80">
                <table className="w-full min-w-[24rem] text-left text-[13px]">
                  <thead className="bg-cloud text-navy"><tr><th scope="col" className="px-4 py-2.5 font-heading font-semibold">Milestone</th><th scope="col" className="px-4 py-2.5 font-heading font-semibold">Share</th><th scope="col" className="px-4 py-2.5 font-heading font-semibold">Amount</th></tr></thead>
                  <tbody className="divide-y divide-mist/80 text-charcoal/80">
                    <tr><td className="px-4 py-2.5">Booking deposit</td><td className="px-4 py-2.5">50%</td><td className="px-4 py-2.5">$100</td></tr>
                    <tr><td className="px-4 py-2.5">Working preview</td><td className="px-4 py-2.5">30%</td><td className="px-4 py-2.5">$60</td></tr>
                    <tr><td className="px-4 py-2.5">Final handover</td><td className="px-4 py-2.5">20%</td><td className="px-4 py-2.5">$40</td></tr>
                    <tr className="bg-cloud font-semibold text-navy"><td className="px-4 py-2.5">Total</td><td className="px-4 py-2.5">100%</td><td className="px-4 py-2.5">$200</td></tr>
                  </tbody>
                </table>
              </div>
              <BulletList items={[
                "Payments are treated as received only when verified through the relevant payment account or provider. A screenshot, emailed receipt, or pending-transfer message alone does not confirm payment.",
                "Do not pay a third party an unexpected fee to release a payment or refund an overpayment to an unknown sender. Keep proposals, approvals, invoices, and payment confirmations for your records.",
                "If an invoice becomes overdue, work may be paused after written notice and resumed when the payment is resolved. Any revised timing will be agreed in writing.",
              ]} />
              <p>Cancellation charges and the handling of amounts already paid are governed by the written project agreement and applicable law. A payment is not automatically non-refundable simply because it is called a deposit.</p>
              <p>Domain registration, hosting, subscriptions, payment-processing charges, and other third-party costs are excluded unless the proposal specifically includes them.</p>
              <p>All milestone amounts, due dates, and deliverables will be confirmed in writing before work begins.</p>
            </PolicySection>

            <div id="terms" className="scroll-mt-28 border-t-2 border-navy/10 pt-8">
              <span className="eyebrow text-charcoal/55"><span className="h-px w-6 bg-lime" aria-hidden="true" />Project agreement</span>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">Terms &amp; Conditions</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal/75">
                These terms apply to website design, development, improvements, and related digital services provided by WK Web Krafted Studios (“WK Studios,” “we,” “us,” or “our”) to a person or organisation (“you” or “the client”). By approving a proposal, signing a project agreement, or authorising work to begin, you agree to the terms applicable to your project.
              </p>
            </div>

            <PolicySection id="scope-pricing" number="02" title="Services, project scope, and pricing">
              <p>Each project is described in a written proposal or agreement. It will set out, as applicable, the included services and features, agreed price and currency, estimated timeline and milestones, payment schedule, included revision rounds, exclusions, third-party costs, and other requirements.</p>
              <p>Work not expressly included in the agreed scope is additional work and may need a separate quote. Published prices are indicative ranges rather than guaranteed prices for every project. The final quote depends on factors such as complexity, page count, design, functionality, integrations, content needs, and expected workload.</p>
              <p>Quotes are valid for the period stated in the proposal. A change to the agreed scope may change the price or deadline. We will explain proposed additional charges and obtain your approval before the additional work begins.</p>
            </PolicySection>

            <PolicySection id="payment-terms" number="03" title="Payment terms and overdue invoices">
              <p>The written proposal confirms the payment schedule. Unless otherwise agreed in writing, the usual schedule is 50% before work begins, 30% when the agreed progress milestone is presented, and 20% before final handover, ownership transfer, or production launch, as specified in the project agreement. Smaller projects may use 50% / 50%; larger projects may use additional or different milestone payments.</p>
              <p>Work will not begin until the initial payment has cleared. Payments must be made through a method agreed by both parties. A payment screenshot, receipt, or pending transaction notice is not by itself proof that funds have been received.</p>
              <p>If a payment is overdue, WK Studios may give written notice and pause the work until the balance is resolved. Deadlines may be extended to account for payment delays, inactivity, or scheduling changes caused by a pause. Any late fee must be stated in the project agreement and permitted by applicable law; undisclosed late fees will not be imposed.</p>
            </PolicySection>

            <PolicySection id="timelines-responsibilities" number="04" title="Timelines and client responsibilities">
              <p>Timelines are estimates and depend on the agreed scope, timely feedback, receipt of content, and access to required accounts or services. You agree to:</p>
              <BulletList items={[
                "Provide accurate text, images, logos, and other materials needed for the project.",
                "Provide necessary access and approvals in a timely manner.",
                "Review milestones and communicate requested changes clearly.",
                "Ensure you have the rights needed to use materials you supply.",
              ]} />
              <p>Missing content, delayed feedback, changes in scope, or third-party services may extend the delivery date.</p>
            </PolicySection>

            <PolicySection id="revisions-handover" number="05" title="Revisions, approval, and final handover">
              <p>The proposal states how many revision rounds are included. A revision is a reasonable adjustment to work within the agreed scope. New pages, substantial redesigns, new functionality, or changes to approved requirements may be treated as additional work. Any additional work will be discussed, priced, and approved before it begins. Reviewing preview links carefully and sending consolidated feedback helps keep the project clear.</p>
              <p>WK Studios may provide a preview or staging version for review. You are responsible for checking the work and identifying discrepancies from the agreed scope. Final handover may include the agreed website files, source code, deployment, and transfer of relevant access or ownership. Handover follows clearance of the applicable project payments.</p>
              <p>A preview link is for review and does not transfer final ownership or give permission to copy, distribute, or commercially use unpaid deliverables, unless agreed otherwise in writing.</p>
            </PolicySection>

            <PolicySection id="ownership-third-parties" number="06" title="Ownership, intellectual property, and third-party services">
              <p>Unless the project agreement says otherwise, ownership of custom deliverables created specifically for you transfers to you after full payment has cleared. WK Studios retains ownership of pre-existing tools, reusable components, development methods, templates, and general know-how. If these are incorporated into a project, you receive the rights or licence needed to use the delivered website as agreed.</p>
              <p>Third-party fonts, images, software, plugins, libraries, and other assets remain subject to their own licences and terms. You are responsible for ensuring that materials you supply are authorised for use.</p>
              <p>Domains, hosting, premium plugins, subscriptions, email services, payment processors, and other third-party charges are excluded unless the proposal expressly includes them. Third-party services have their own pricing, availability, terms, and technical limits. WK Studios cannot guarantee uninterrupted operation of services controlled by other providers.</p>
              <p>You remain responsible for renewal fees and account ownership after handover unless a separate maintenance or management arrangement says otherwise.</p>
            </PolicySection>

            <PolicySection id="maintenance-security" number="07" title="Security and ongoing maintenance">
              <p>WK Studios takes reasonable care when developing and testing agreed features, but no website can be guaranteed completely secure or free from defects. Ongoing maintenance, security monitoring, backups, updates, content changes, and technical support are not included unless they are stated in the proposal or a separate maintenance agreement.</p>
              <p>After handover, you are responsible for maintaining the website and associated accounts unless other arrangements have been agreed.</p>
            </PolicySection>

            <PolicySection id="cancellations-liability" number="08" title="Cancellations, refunds, and liability">
              <p>Either party may request cancellation in writing. The parties will review work completed, approved expenses, payments received, and outstanding obligations. Subject to the project agreement and applicable law, you may be charged for work completed and authorised costs incurred up to the cancellation date.</p>
              <p>Any refundable balance is determined under the project agreement and applicable law. Deposits are not automatically non-refundable simply because they are called deposits. If WK Studios cannot complete a project, we will explain the situation and discuss a reasonable resolution, including any refund that may be due.</p>
              <p>Nothing in these terms removes consumer rights that cannot legally be excluded. To the extent permitted by applicable law, WK Studios is not responsible for indirect or consequential losses arising from a website or third-party service. These terms do not exclude liability where exclusion is prohibited by law. Any additional liability limitations must be stated in the project agreement and comply with applicable law.</p>
            </PolicySection>

            <PolicySection id="client-conduct-results" number="09" title="Client conduct, fraud prevention, and results">
              <p>WK Studios may pause work and ask for clarification if there are reasonable concerns about fraudulent payments, unauthorised requests, or misuse of services. We do not treat a payment as confirmed solely on the basis of a screenshot or email notification. Clients must not knowingly provide fraudulent payment details, request unauthorised access, or use a delivered website for unlawful purposes. Suspected fraud or payment disputes will be handled through the relevant payment provider and applicable legal processes.</p>
              <p>WK Studios aims to deliver work that meets the agreed specifications but does not guarantee specific sales, revenue, traffic, search rankings, leads, conversions, or other business or personal outcomes. Results can depend on market conditions, client activities, competition, advertising, and third-party platforms outside our control.</p>
            </PolicySection>

            <PolicySection id="portfolio-privacy" number="10" title="Portfolio, privacy, and confidentiality">
              <p>WK Studios may ask permission to show a completed project in its portfolio or promotional materials. Unless you give permission or the project agreement says otherwise, confidential client information will not be publicly disclosed. You may request confidentiality arrangements before work begins.</p>
              <p>Both parties should take reasonable steps to protect confidential information shared during a project. Personal information collected through a website must be handled in accordance with applicable privacy laws and the relevant privacy policy. Unless expressly included in the project scope, you are responsible for ensuring your website has the privacy notices, consent mechanisms, and other disclosures required for your use case.</p>
            </PolicySection>

            <PolicySection id="changes-disputes" number="11" title="Changes to these terms and disputes">
              <p>WK Studios may update these terms from time to time. For an existing project, the version generally applicable is the version agreed when the project was accepted, unless both parties agree otherwise or a change is required by law.</p>
              <p>The governing law and dispute-resolution process should be specified in the individual project agreement. The parties will first try to resolve disputes through good-faith written communication. If no resolution is reached, either party may pursue remedies available under applicable law.</p>
            </PolicySection>

            <PolicySection id="contact-legal" number="12" title="Questions and project-specific agreements">
              <p>For questions about this page or your project agreement, please <Link to="/contact" className="font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4">contact WK Web Krafted Studios</Link>. A project proposal or signed agreement may contain additional terms specific to an individual project.</p>
              <p>This page is a general business template and is not a substitute for legal advice. Laws vary by jurisdiction; have it reviewed by a qualified legal professional before relying on it as legally enforceable.</p>
              <p>For rules about information collected through this website, see our <Link to="/privacy" className="font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4">Privacy Policy</Link>. The existing <Link to="/terms" className="font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4">Terms of Use</Link> covers general use of the site.</p>
            </PolicySection>
          </article>
        </div>
      </section>
    </>
  );
}

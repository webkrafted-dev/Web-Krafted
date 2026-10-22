import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";

export default function Terms() {
  usePageMeta(
    "Terms of Use — WK Web Krafted Studios",
    "Terms covering use of this website, concept work, and the indicative nature of pricing."
  );

  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" />
      <section className="section bg-paper">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-lime-deep/50 bg-lime/10 p-4">
            <p className="text-[13.5px] leading-relaxed text-charcoal/80">
              <span className="font-heading font-semibold text-navy">Starter draft.</span> These are short
              starting terms. Please review them, and have them checked by a qualified adviser, before relying
              on them.
            </p>
          </div>

          <div className="mt-8 space-y-8 text-[15.5px] leading-relaxed text-charcoal/85">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Using this website</h2>
              <p className="mt-3">
                This website is provided by WK Web Krafted Studios for information and enquiries. You are
                welcome to browse it, link to it, and contact us through it. Please do not attempt to disrupt
                the site, access restricted areas, or use the forms to send spam or unlawful content.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Concept work</h2>
              <p className="mt-3">
                The projects shown on this site are concept projects created to demonstrate design and
                development approach. They are labelled as concept work and are not commissioned client
                projects. The brand names used in them are fictional.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Pricing is indicative</h2>
              <p className="mt-3">
                Prices shown on this site are starting estimates to help you judge fit. They are not a binding
                offer. Every project is scoped individually, and final pricing is confirmed in a written quote
                after a conversation about pages, features, content, and timeline.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Enquiries and agreements</h2>
              <p className="mt-3">
                Sending an enquiry does not create a contract or reserve time in the studio's schedule. A
                project begins only once a written scope is agreed and the initial payment has been received.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Content and ownership</h2>
              <p className="mt-3">
                The text, layouts, and code on this website belong to WK Web Krafted Studios unless stated
                otherwise. You may not copy or republish them without permission. Content you supply for a
                project remains yours.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">No guaranteed outcomes</h2>
              <p className="mt-3">
                We build sites carefully, but no one can guarantee specific commercial results such as sales,
                traffic, or search rankings. Nothing on this site should be read as a promise of a particular
                outcome.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">External links</h2>
              <p className="mt-3">
                Links to other websites are provided for convenience. We are not responsible for their content
                or their practices.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Changes</h2>
              <p className="mt-3">
                These terms may be updated from time to time. The current version is always published on this
                page. If you have a question about them, please{" "}
                <Link to="/contact" className="underline decoration-lime decoration-2 underline-offset-4">
                  get in touch
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";

export default function Privacy() {
  usePageMeta(
    "Privacy Policy — WK Web Krafted Studios",
    "What information this website collects through its forms, how it is used, and how to request deletion."
  );

  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section bg-paper">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-lime-deep/50 bg-lime/10 p-4">
            <p className="text-[13.5px] leading-relaxed text-charcoal/80">
              <span className="font-heading font-semibold text-navy">Starter draft.</span> This policy is a
              starting point written in plain language. Please review it, and have it checked by a qualified
              adviser, before relying on it as your final policy.
            </p>
          </div>

          <div className="mt-8 space-y-8 text-[15.5px] leading-relaxed text-charcoal/85">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">What this site collects</h2>
              <p className="mt-3">
                This website has two forms: a project enquiry form and a quick message panel. Both ask only
                for what is needed to reply to you.
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Your name</li>
                <li>Your email address</li>
                <li>A business, organisation, group, or project name, if you choose to share it</li>
                <li>The project details you type, including any budget range or deadline you select</li>
              </ul>
              <p className="mt-3">
                The site does not use advertising trackers, and it does not ask for payment details.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">How it is used</h2>
              <p className="mt-3">
                Information you submit is used to respond to your enquiry, to prepare a scope or quote, and to
                keep track of the conversation. A notification email is sent to the studio's private address
                when a form is submitted. Your details are not sold, rented, or added to a marketing list.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Where it is stored</h2>
              <p className="mt-3">
                Submissions are stored securely in the website's database and are visible only to the studio
                owner. The notification email is delivered through the platform that hosts this site. Service
                providers that host the site or deliver email process the data only to provide those services.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">How long it is kept</h2>
              <p className="mt-3">
                Enquiries and messages are kept while they are useful for responding to you or for a project
                record. If you ask for your details to be deleted, they will be removed unless there is a legal
                reason to keep them.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Requesting a copy or deletion</h2>
              <p className="mt-3">
                You can ask what information is held about you, ask for it to be corrected, or ask for it to be
                deleted. Use the{" "}
                <Link to="/contact" className="underline decoration-lime decoration-2 underline-offset-4">
                  contact form
                </Link>{" "}
                and mention what you would like done. Please include the email address you used when you got in
                touch so the request can be matched to the right records.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Cookies and third parties</h2>
              <p className="mt-3">
                This site does not set advertising cookies. Web fonts are loaded from a font delivery service,
                which may receive your IP address as part of that request. Links to external sites are provided
                for convenience; those sites have their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Changes to this policy</h2>
              <p className="mt-3">
                If this policy changes, the updated version will be published on this page. It was last reviewed
                in October 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

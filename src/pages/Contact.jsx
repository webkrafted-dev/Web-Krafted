import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import { TextField, TextAreaField, SelectField, ErrorSummary } from "@/components/form/Fields";
import { PROJECT_TYPES, BUDGETS } from "@/data/formOptions";
import { submitEnquiry } from "@/api/submissions";

const emptyForm = {
  name: "",
  business: "",
  email: "",
  project_type: "",
  description: "",
  budget: "",
  deadline: "",
  company_website: "",
};

const steps = [
  { title: "We review your enquiry", text: "We read what you have shared and look at anything you link to." },
  { title: "We reply", text: "You get a reply with questions, or a proposed next step." },
  { title: "You receive a scope and quote", text: "A clear outline of what is included, the timeline, and the cost." },
];

export default function Contact() {
  usePageMeta(
    "Start a project — WK Web Krafted Studios",
    "Tell us about your business, portfolio, creator page, club, event, or personal project, and we'll reply with a clear next step."
  );

  const [params] = useSearchParams();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const summaryRef = useRef(null);

  useEffect(() => {
    const type = params.get("type");
    const budget = params.get("budget");
    setForm((current) => ({
      ...current,
      project_type: PROJECT_TYPES.includes(type) ? type : "",
      budget: BUDGETS.includes(budget) ? budget : "",
    }));
  }, [params]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email.trim())) {
      next.email = "Please enter a valid email address, for example name@example.com.";
    }
    if (form.description.trim().length < 20) {
      next.description = "Please describe your project in at least 20 characters — a sentence or two is plenty.";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate();
    setErrors(found);
    setServerError("");
    if (Object.keys(found).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    const last = Number(window.localStorage.getItem("wk_enquiry_sent_at") || 0);
    if (Date.now() - last < 45000) {
      setServerError("You've just sent an enquiry. Please wait a moment before sending another.");
      return;
    }

    setStatus("submitting");
    try {
      const data = await submitEnquiry({
        name: form.name.trim(),
        business: form.business.trim(),
        email: form.email.trim(),
        project_type: form.project_type,
        description: form.description.trim(),
        budget: form.budget,
        deadline: form.deadline,
        company_website: form.company_website,
      });
      if (!data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          summaryRef.current?.focus();
        }
        setServerError(data.error || "Your enquiry could not be saved. Please try again.");
        setStatus("error");
        return;
      }
      window.localStorage.setItem("wk_enquiry_sent_at", String(Date.now()));
      setStatus("success");
      setForm({ ...emptyForm, project_type: form.project_type, budget: form.budget });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const data = error?.data || {};
      if (data.errors) {
        setErrors(data.errors);
        summaryRef.current?.focus();
      }
      setServerError(
        data.error || "Your enquiry could not be saved. Please check your connection and try again."
      );
      setStatus("error");
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a project"
        description="Tell us what you have in mind. A few sentences is enough to begin — we'll come back with questions or a clear next step."
      />

      <section className="section bg-paper">
        <div className="shell grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            {status === "success" ? (
              <div
                role="status"
                className="rounded-xl border border-lime-deep/50 bg-white p-8 shadow-[0_20px_50px_-40px_rgba(11,31,59,0.4)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-navy">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-heading text-2xl font-bold text-navy">Enquiry saved</h2>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-charcoal/75">
                  Thank you — your enquiry has been saved and we'll reply as soon as we can. If you need to
                  add anything, reply to the confirmation thread or send another message.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/work"
                    className="motion-cta inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-navy px-5 py-3 font-heading text-[13px] font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-navy-soft"
                  >
                    Explore our work
                    <ArrowRight className="motion-arrow h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrors({});
                      setServerError("");
                    }}
                    className="motion-cta inline-flex min-h-[44px] items-center rounded-lg border border-navy/20 px-5 py-3 font-heading text-[13px] font-semibold text-navy transition-all hover:border-navy"
                  >
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-mist/70 bg-white p-6 sm:p-8"
              >
                <h2 className="font-heading text-lg font-semibold text-navy">Project details</h2>
                <p className="mt-1.5 text-[13.5px] text-charcoal/60">
                  Fields marked with an asterisk are required.
                </p>

                <div className="mt-6 space-y-5">
                  <ErrorSummary errors={errors} summaryRef={summaryRef} />

                  <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="company_website">Company website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company_website}
                      onChange={update("company_website")}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="name"
                      label="Name"
                      required
                      value={form.name}
                      onChange={update("name")}
                      error={errors.name}
                      autoComplete="name"
                      maxLength={120}
                    />
                    <TextField
                      id="business"
                      label="Business, group, or project name"
                      value={form.business}
                      onChange={update("business")}
                      error={errors.business}
                      autoComplete="organization"
                      maxLength={160}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      error={errors.email}
                      autoComplete="email"
                      maxLength={254}
                      hint="We'll reply to this address."
                    />
                    <SelectField
                      id="project_type"
                      label="Project type"
                      value={form.project_type}
                      onChange={update("project_type")}
                      error={errors.project_type}
                      options={PROJECT_TYPES}
                      placeholder="Choose a project type"
                    />
                  </div>

                  <TextAreaField
                    id="description"
                    label="Project description"
                    required
                    rows={6}
                    value={form.description}
                    onChange={update("description")}
                    error={errors.description}
                    maxLength={4000}
                    hint="What are you building, who is it for, and what should it do? Even rough notes help."
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      id="budget"
                      label="Approximate budget"
                      value={form.budget}
                      onChange={update("budget")}
                      error={errors.budget}
                      options={BUDGETS}
                      placeholder="Choose a range"
                    />
                    <TextField
                      id="deadline"
                      label="Desired deadline"
                      type="date"
                      min={today}
                      value={form.deadline}
                      onChange={update("deadline")}
                      error={errors.deadline}
                    />
                  </div>

                  {serverError && (
                    <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4">
                      <p className="text-[13.5px] text-red-800">{serverError}</p>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="motion-cta mt-2 font-heading text-[13px] font-semibold text-red-900 underline underline-offset-4"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 border-t border-mist/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-[12px] leading-relaxed text-charcoal/55">
                      By sending this enquiry you agree to our{" "}
                      <Link to="/privacy" className="underline decoration-lime decoration-2 underline-offset-2">
                        privacy policy
                      </Link>
                      .
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="motion-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-lime px-6 py-3 font-heading text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-lime-deep disabled:pointer-events-none disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending enquiry…" : "Send enquiry"}
                      {status !== "submitting" && <ArrowRight className="motion-arrow h-4 w-4" aria-hidden="true" />}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <aside className="order-1 lg:order-2">
            <div className="rounded-xl bg-navy p-6 sm:p-7">
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-mist/80">
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-lime/50 font-heading text-[12px] font-bold text-lime">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-heading text-[14px] font-semibold text-paper">{step.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-mist">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 h-px w-full bg-white/10" aria-hidden="true" />
              <p className="mt-5 text-[14px] leading-relaxed text-mist">
                We'll reply as soon as we can. Every enquiry is read by a person, not an automated system.
              </p>
              <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-mist/75">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                Your details are stored privately and used only to respond to your enquiry.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-mist/70 bg-white p-6">
              <h2 className="font-heading text-sm font-semibold text-navy">Not ready for a full brief?</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal/70">
                Use the "Message us" button in the corner to send a quick question instead. It goes to the
                same place.
              </p>
              <Link
                to="/pricing#pricing"
                className="mt-4 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4"
              >
                See launch pricing
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

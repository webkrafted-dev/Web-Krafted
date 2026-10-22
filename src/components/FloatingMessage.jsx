import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, X, ArrowRight, Check } from "lucide-react";

import { TextField, TextAreaField, ErrorSummary } from "@/components/form/Fields";
import { submitMessage } from "@/api/submissions";

const initialForm = { name: "", email: "", message: "", company_website: "" };

export default function FloatingMessage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const summaryRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector("input, textarea, button");
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (form.message.trim().length < 10) {
      next.message = "Please add a little more detail (at least 10 characters).";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    const last = Number(window.localStorage.getItem("wk_message_sent_at") || 0);
    if (Date.now() - last < 45000) {
      setServerError("You've just sent a message. Please wait a moment before sending another.");
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const data = await submitMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        company_website: form.company_website,
      });
      if (!data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          summaryRef.current?.focus();
        }
        setServerError(data.error || "Your message could not be saved. Please try again.");
        setStatus("error");
        return;
      }
      window.localStorage.setItem("wk_message_sent_at", String(Date.now()));
      setForm(initialForm);
      setStatus("success");
    } catch (error) {
      const data = error?.data || {};
      if (data.errors) {
        setErrors(data.errors);
        summaryRef.current?.focus();
      }
      setServerError(
        data.error || "Your message could not be saved. Please check your connection and try again."
      );
      setStatus("error");
    }
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="message-panel"
        className="fixed bottom-5 right-4 z-40 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-lime px-4 py-3 font-heading text-[13px] font-semibold text-navy shadow-[0_16px_34px_-16px_rgba(11,31,59,0.7)] transition-transform duration-200 hover:-translate-y-0.5 sm:right-6"
      >
        {open ? <X className="h-4 w-4" aria-hidden="true" /> : <MessageSquare className="h-4 w-4" aria-hidden="true" />}
        {open ? "Close" : "Message us"}
      </button>

      {open && (
        <div
          id="message-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Send a quick message"
          className="fixed bottom-24 right-4 z-40 w-[min(360px,calc(100vw-2rem))] rounded-xl border border-navy/10 bg-white p-5 shadow-[0_30px_70px_-30px_rgba(11,31,59,0.6)] sm:right-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-base font-semibold text-navy">Send a quick message</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-charcoal/65">
                A question or a short note — we'll reply by email.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-mist/80 text-charcoal/70 transition-colors hover:border-navy/30 hover:text-navy"
              aria-label="Close message panel"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {status === "success" ? (
            <div className="mt-4 rounded-lg border border-lime-deep/50 bg-lime/15 p-4">
              <p className="flex items-center gap-2 font-heading text-sm font-semibold text-navy">
                <Check className="h-4 w-4" aria-hidden="true" />
                Message saved
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal/75">
                Thank you — your message is safely with us and we'll reply as soon as we can.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-3 font-heading text-[12.5px] font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5" noValidate>
              <ErrorSummary errors={errors} summaryRef={summaryRef} />

              <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="floating-company-website">Company website</label>
                <input
                  id="floating-company-website"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company_website}
                  onChange={update("company_website")}
                />
              </div>

              <TextField
                id="floating-name"
                label="Name"
                required
                value={form.name}
                onChange={update("name")}
                error={errors.name}
                autoComplete="name"
                maxLength={120}
              />
              <TextField
                id="floating-email"
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                error={errors.email}
                autoComplete="email"
                maxLength={254}
              />
              <TextAreaField
                id="floating-message"
                label="Message"
                required
                rows={3}
                value={form.message}
                onChange={update("message")}
                error={errors.message}
                maxLength={2000}
              />

              {serverError && (
                <p role="alert" className="rounded-md border border-red-300 bg-red-50 p-3 text-[12.5px] text-red-800">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 font-heading text-[13px] font-semibold text-paper transition-colors hover:bg-navy-soft disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                {status !== "submitting" && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <p className="text-[11.5px] leading-relaxed text-charcoal/50">
                Your details are only used to reply to this message.
              </p>
            </form>
          )}
        </div>
      )}
    </>
  );
}
import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { requireSupabase } from "@/lib/supabase";

const STATUS_OPTIONS = ["New", "Replied", "Closed"];

function SubmissionList({
  title, items, field, onStatusChange, emptyMessage, replyTarget, replyDraft,
  onReplyDraftChange, onStartReply, onCancelReply, onSendReply, sendingKey,
}) {
  return (
    <section className="rounded-2xl border border-mist/70 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="font-heading text-xl font-semibold text-navy">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-5 text-sm text-charcoal/60">{emptyMessage}</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item) => {
            const replyKey = `${field}:${item.id}`;
            const isReplyOpen = replyTarget === replyKey;
            const isSending = sendingKey === replyKey;
            return (
            <article key={item.id} className="rounded-xl border border-mist/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-semibold text-navy">{item.name}</h3>
                  <a className="text-sm text-navy underline" href={`mailto:${item.email}`}>{item.email}</a>
                  <p className="mt-1 text-xs text-charcoal/55">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-charcoal/70">
                  Status
                  <select
                    value={item.status}
                    onChange={(event) => onStatusChange(field, item.id, event.target.value)}
                    className="rounded-md border border-mist bg-white px-2 py-1.5 text-sm text-charcoal"
                  >
                    {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </label>
              </div>
              {item.business && <p className="mt-3 text-sm"><strong>Business:</strong> {item.business}</p>}
              {item.project_type && <p className="mt-1 text-sm"><strong>Project:</strong> {item.project_type}</p>}
              {item.budget && <p className="mt-1 text-sm"><strong>Budget:</strong> {item.budget}</p>}
              {item.deadline && <p className="mt-1 text-sm"><strong>Deadline:</strong> {item.deadline}</p>}
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-charcoal/80">
                {item.description || item.message}
              </p>
              {isReplyOpen ? (
                <form
                  className="mt-5 space-y-3 rounded-xl border border-mist/70 bg-paper/60 p-4"
                  onSubmit={(event) => onSendReply(event, field, item)}
                >
                  <label className="block text-sm font-semibold text-navy">
                    Email subject
                    <input
                      required
                      maxLength={140}
                      value={replyDraft.subject}
                      onChange={(event) => onReplyDraftChange("subject", event.target.value)}
                      className="mt-1.5 block w-full rounded-lg border border-mist bg-white px-3 py-2.5 font-normal text-charcoal outline-none focus:border-lime-deep focus:ring-2 focus:ring-lime/30"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-navy">
                    Your reply
                    <textarea
                      required
                      maxLength={8000}
                      rows={6}
                      value={replyDraft.message}
                      onChange={(event) => onReplyDraftChange("message", event.target.value)}
                      placeholder="Write a thoughtful reply..."
                      className="mt-1.5 block w-full resize-y rounded-lg border border-mist bg-white px-3 py-2.5 font-normal leading-relaxed text-charcoal outline-none focus:border-lime-deep focus:ring-2 focus:ring-lime/30"
                    />
                    <span className="mt-1 block text-xs font-normal text-charcoal/55">
                      Sent to {item.email} from your verified studio address.
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="rounded-lg bg-navy px-4 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-navy/90 disabled:cursor-wait disabled:opacity-60"
                    >
                      {isSending ? "Sending…" : "Send reply"}
                    </button>
                    <button
                      type="button"
                      disabled={isSending}
                      onClick={onCancelReply}
                      className="rounded-lg border border-mist px-4 py-2.5 font-heading text-sm font-semibold text-charcoal transition hover:bg-white disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => onStartReply(field, item)}
                  className="mt-4 rounded-lg border border-navy/15 px-3.5 py-2 font-heading text-sm font-semibold text-navy transition hover:border-lime-deep hover:bg-lime/15"
                >
                  Reply by email
                </button>
              )}
            </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function Admin() {
  const [enquiries, setEnquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyDraft, setReplyDraft] = useState({ subject: "", message: "" });
  const [sendingKey, setSendingKey] = useState("");

  const loadInbox = useCallback(async () => {
    setError("");
    const client = requireSupabase();
    const [enquiryResult, messageResult] = await Promise.all([
      client.from("enquiries").select("*").order("created_at", { ascending: false }),
      client.from("messages").select("*").order("created_at", { ascending: false }),
    ]);

    if (enquiryResult.error) throw enquiryResult.error;
    if (messageResult.error) throw messageResult.error;
    setEnquiries(enquiryResult.data || []);
    setMessages(messageResult.data || []);
  }, []);

  useEffect(() => {
    loadInbox()
      .catch((loadError) => {
        console.error("Unable to load the admin inbox:", loadError.message);
        setError("The inbox could not be loaded. Check your Supabase setup and try again.");
      })
      .finally(() => setLoading(false));
  }, [loadInbox]);

  const updateStatus = async (table, id, status) => {
    setError("");
    setNotice("");
    try {
      const { error: updateError } = await requireSupabase()
        .from(table)
        .update({ status })
        .eq("id", id);
      if (updateError) throw updateError;
      await loadInbox();
    } catch (updateError) {
      console.error("Unable to update submission status:", updateError.message);
      setError("That status change could not be saved. Please try again.");
    }
  };

  const startReply = (table, item) => {
    setReplyTarget(`${table}:${item.id}`);
    setReplyDraft({
      subject: table === "enquiries" ? "Re: Your project enquiry — WK Studios" : "Re: Your message — WK Studios",
      message: "",
    });
    setError("");
    setNotice("");
  };

  const sendReply = async (event, table, item) => {
    event.preventDefault();
    const key = `${table}:${item.id}`;
    setSendingKey(key);
    setError("");
    setNotice("");
    try {
      const client = requireSupabase();
      const { data, error: sessionError } = await client.auth.getSession();
      if (sessionError) throw sessionError;
      const accessToken = data.session?.access_token;
      if (!accessToken) throw new Error("Your sign-in has expired. Please sign in again.");

      const response = await fetch("/api/send-reply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table,
          id: item.id,
          subject: replyDraft.subject,
          message: replyDraft.message,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The reply could not be sent. Please try again.");

      setReplyTarget(null);
      setNotice(result.statusUpdated === false
        ? `Your reply was sent to ${item.email}, but the inbox status could not be updated.`
        : `Your reply was sent to ${item.email}.`);
      try {
        await loadInbox();
      } catch (loadError) {
        console.error("Reply sent but inbox refresh failed:", loadError.message);
        setError("The reply was sent, but the inbox could not refresh. Reload this page to see its latest status.");
      }
    } catch (sendError) {
      console.error("Unable to send admin reply:", sendError.message);
      setError(sendError.message || "The reply could not be sent. Please try again.");
    } finally {
      setSendingKey("");
    }
  };

  const replyProps = {
    replyTarget,
    replyDraft,
    onReplyDraftChange: (field, value) => setReplyDraft((draft) => ({ ...draft, [field]: value })),
    onStartReply: startReply,
    onCancelReply: () => setReplyTarget(null),
    onSendReply: sendReply,
    sendingKey,
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="eyebrow text-lime-deep">Studio admin</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-navy">Inbox</h1>
        <p className="mt-2 text-sm text-charcoal/65">Enquiries and messages are stored in your Supabase project.</p>
      </div>
      {error && <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
      {notice && <p className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-800" role="status">{notice}</p>}
      {loading ? (
        <p className="text-sm text-charcoal/60" role="status">Loading inbox...</p>
      ) : (
        <div className="space-y-6">
          <SubmissionList
            title={`Project enquiries (${enquiries.length})`}
            items={enquiries}
            field="enquiries"
            onStatusChange={updateStatus}
            emptyMessage="No project enquiries yet."
            {...replyProps}
          />
          <SubmissionList
            title={`Quick messages (${messages.length})`}
            items={messages}
            field="messages"
            onStatusChange={updateStatus}
            emptyMessage="No quick messages yet."
            {...replyProps}
          />
        </div>
      )}
    </AdminShell>
  );
}

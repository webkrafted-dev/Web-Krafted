import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { requireSupabase } from "@/lib/supabase";

const STATUS_OPTIONS = ["New", "Replied", "Closed"];

function SubmissionList({ title, items, field, onStatusChange, emptyMessage }) {
  return (
    <section className="rounded-2xl border border-mist/70 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="font-heading text-xl font-semibold text-navy">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-5 text-sm text-charcoal/60">{emptyMessage}</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item) => (
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
            </article>
          ))}
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

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="eyebrow text-lime-deep">Studio admin</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-navy">Inbox</h1>
        <p className="mt-2 text-sm text-charcoal/65">Enquiries and messages are stored in your Supabase project.</p>
      </div>
      {error && <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
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
          />
          <SubmissionList
            title={`Quick messages (${messages.length})`}
            items={messages}
            field="messages"
            onStatusChange={updateStatus}
            emptyMessage="No quick messages yet."
          />
        </div>
      )}
    </AdminShell>
  );
}

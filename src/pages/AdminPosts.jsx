import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { requireSupabase } from "@/lib/supabase";

const blankPost = () => ({
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  category: "Insights",
  content: "",
  read_time: "",
  published_date: new Date().toISOString().slice(0, 10),
  published: false,
});

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Field({ label, value, onChange, required = false, type = "text", multiline = false }) {
  const className = "w-full rounded-lg border border-mist bg-white px-3 py-2.5 text-sm text-charcoal focus:border-navy focus:outline-none";
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-charcoal/75">{label}</span>
      {multiline ? (
        <textarea className={`${className} min-h-28`} value={value} onChange={onChange} required={required} />
      ) : (
        <input className={className} type={type} value={value} onChange={onChange} required={required} />
      )}
    </label>
  );
}

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(blankPost);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadPosts = useCallback(async () => {
    const { data, error: queryError } = await requireSupabase()
      .from("posts")
      .select("*")
      .order("published_date", { ascending: false });
    if (queryError) throw queryError;
    setPosts(data || []);
  }, []);

  useEffect(() => {
    loadPosts()
      .catch((loadError) => {
        console.error("Unable to load posts:", loadError.message);
        setError("Posts could not be loaded. Check your Supabase setup and try again.");
      })
      .finally(() => setLoading(false));
  }, [loadPosts]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "title" && !current.id ? { slug: slugify(value) } : {}),
    }));
  };

  const savePost = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    const { id, ...values } = form;

    try {
      const query = id
        ? requireSupabase().from("posts").update(values).eq("id", id)
        : requireSupabase().from("posts").insert(values);
      const { error: saveError } = await query;
      if (saveError) throw saveError;
      await loadPosts();
      setForm(blankPost());
      setNotice(id ? "Post changes saved." : "Post created.");
    } catch (saveError) {
      console.error("Unable to save post:", saveError.message);
      setError(saveError.code === "23505"
        ? "That URL slug is already in use. Choose a different slug."
        : "The post could not be saved. Check the required fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const editPost = (post) => {
    setForm({
      ...post,
      published_date: post.published_date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletePost = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setError("");
    setNotice("");
    try {
      const { error: deleteError } = await requireSupabase().from("posts").delete().eq("id", post.id);
      if (deleteError) throw deleteError;
      await loadPosts();
      if (form.id === post.id) setForm(blankPost());
      setNotice("Post deleted.");
    } catch (deleteError) {
      console.error("Unable to delete post:", deleteError.message);
      setError("The post could not be deleted. Please try again.");
    }
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="eyebrow text-lime-deep">Studio admin</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-navy">Insights</h1>
        <p className="mt-2 text-sm text-charcoal/65">Create and publish articles. Published changes appear on the public site.</p>
      </div>
      {error && <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
      {notice && <p className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-800" role="status">{notice}</p>}
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form onSubmit={savePost} className="space-y-4 rounded-2xl border border-mist/70 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl font-semibold text-navy">{form.id ? "Edit post" : "New post"}</h2>
            {form.id && (
              <button type="button" onClick={() => setForm(blankPost())} className="text-xs font-semibold text-navy underline">
                Cancel edit
              </button>
            )}
          </div>
          <Field label="Title" value={form.title} onChange={(event) => updateField("title", event.target.value)} required />
          <Field label="URL slug" value={form.slug} onChange={(event) => updateField("slug", slugify(event.target.value))} required />
          <Field label="Excerpt" value={form.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} multiline />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category" value={form.category} onChange={(event) => updateField("category", event.target.value)} required />
            <Field label="Reading time" value={form.read_time} onChange={(event) => updateField("read_time", event.target.value)} />
          </div>
          <Field label="Publication date" type="date" value={form.published_date} onChange={(event) => updateField("published_date", event.target.value)} required />
          <Field label="Article body (Markdown)" value={form.content} onChange={(event) => updateField("content", event.target.value)} multiline required />
          <label className="flex items-center gap-2 text-sm font-medium text-charcoal">
            <input type="checkbox" checked={form.published} onChange={(event) => updateField("published", event.target.checked)} />
            Published on the website
          </label>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-60"
          >
            {saving ? "Saving..." : form.id ? "Save changes" : "Create post"}
          </button>
        </form>
        <section className="rounded-2xl border border-mist/70 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="font-heading text-xl font-semibold text-navy">All posts ({posts.length})</h2>
          {loading ? (
            <p className="mt-5 text-sm text-charcoal/60" role="status">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="mt-5 text-sm text-charcoal/60">No articles yet. Add your first post using the form.</p>
          ) : (
            <ul className="mt-5 divide-y divide-mist/70">
              {posts.map((post) => (
                <li key={post.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0">
                  <div>
                    <p className="font-heading font-semibold text-navy">{post.title}</p>
                    <p className="mt-1 text-xs text-charcoal/55">
                      {post.published ? "Published" : "Draft"} · {post.slug}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => editPost(post)} className="text-xs font-semibold text-navy underline">Edit</button>
                    <button type="button" onClick={() => deletePost(post)} className="text-xs font-semibold text-red-700 underline">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}

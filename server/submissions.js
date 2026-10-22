import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const projectTypes = [
  "Business website",
  "Landing page",
  "Personal or portfolio website",
  "Creator or link-in-bio page",
  "Community, club, or event website",
  "Multi-page website",
  "Website design",
  "Premium website",
  "Custom website / web app",
  "E-commerce website",
  "Web application",
  "UI/UX design",
  "Website maintenance",
  "Not sure yet",
];

const budgets = ["Under $150", "$150–$350", "$350–$700", "$700–$1,500", "$1,500+", "Not sure yet"];

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maxLength) : "";
}

function cleanMultiline(value, maxLength) {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim().slice(0, maxLength) : "";
}

function validEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
}

function validDate(value) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function getServiceClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured on the server.");
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function notifyOwner(subject, lines) {
  const recipient = process.env.NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!recipient && !apiKey && !from) return;
  if (!recipient || !apiKey || !from) {
    console.error("Email notification skipped: configure NOTIFICATION_EMAIL, RESEND_API_KEY, and RESEND_FROM_EMAIL together.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Email notification failed:", response.status, await response.text());
  }
}

function getBearerToken(req) {
  const authorization = req.headers?.authorization || req.headers?.Authorization || "";
  const match = typeof authorization === "string" ? authorization.match(/^Bearer\s+(.+)$/i) : null;
  return match?.[1]?.trim() || "";
}

async function getAdminClient(req) {
  const accessToken = getBearerToken(req);
  if (!accessToken) return { error: { status: 401, message: "Please sign in to send a reply." } };
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY
    || process.env.SUPABASE_PUBLISHABLE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: { status: 503, message: "The reply service is not configured yet." } };
  }

  const authClient = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: authData, error: authError } = await authClient.auth.getUser(accessToken);
  if (authError || !authData?.user) {
    return { error: { status: 401, message: "Your sign-in has expired. Please sign in again." } };
  }

  const client = getServiceClient();
  const { data: admin, error: adminError } = await client
    .from("admins")
    .select("user_id")
    .eq("user_id", authData.user.id)
    .maybeSingle();
  if (adminError) throw new Error(`Admin membership check failed: ${adminError.message}`);
  if (!admin) return { error: { status: 403, message: "This account is not authorized to send replies." } };
  return { client };
}

async function saveSubmission(table, email, values, subject, lines) {
  const client = getServiceClient();
  const emailHash = createHash("sha256").update(email).digest("hex");
  const { data: allowed, error: rateLimitError } = await client.rpc(
    "consume_submission_rate_limit",
    { p_email_hash: emailHash }
  );

  if (rateLimitError) {
    console.error("Submission rate limit check failed:", rateLimitError.message);
    return { status: 503, body: { ok: false, error: "Submissions are temporarily unavailable. Please try again shortly." } };
  }
  if (!allowed) {
    return {
      status: 429,
      body: { ok: false, error: "We've received several submissions from this email address. Please wait a little before trying again." },
    };
  }

  const { data, error } = await client.from(table).insert(values).select("id").single();
  if (error) {
    console.error(`Saving ${table} submission failed:`, error.message);
    return { status: 500, body: { ok: false, error: "Your submission could not be saved. Please try again." } };
  }

  try {
    await notifyOwner(subject, lines);
  } catch (error) {
    console.error("Email notification failed:", error.message);
  }

  return { status: 201, body: { ok: true, id: data.id } };
}

function getPayload(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body && typeof req.body === "object" ? req.body : null;
}

function methodNotAllowed(res) {
  res.setHeader("Allow", "POST");
  return res.status(405).json({ ok: false, error: "Method not allowed." });
}

function handleError(res, error) {
  console.error("Submission endpoint failed:", error.message);
  return res.status(503).json({
    ok: false,
    error: "Submissions are temporarily unavailable. Please try again shortly.",
  });
}

export async function handleEnquiry(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  const payload = getPayload(req);
  if (!payload) return res.status(400).json({ ok: false, error: "Invalid request body." });
  if (cleanText(payload.company_website, 200)) return res.status(200).json({ ok: true, id: null });

  const name = cleanText(payload.name, 120);
  const business = cleanText(payload.business, 160);
  const email = cleanText(payload.email, 254).toLowerCase();
  const description = cleanMultiline(payload.description, 4000);
  const projectType = cleanText(payload.project_type, 60);
  const budget = cleanText(payload.budget, 40);
  const deadline = cleanText(payload.deadline, 10);
  const errors = {};

  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!validEmail(email)) errors.email = "Please enter a valid email address.";
  if (description.length < 20) errors.description = "Please add a few more details (at least 20 characters) so we can reply usefully.";
  if (projectType && !projectTypes.includes(projectType)) errors.project_type = "Please choose a project type from the list.";
  if (budget && !budgets.includes(budget)) errors.budget = "Please choose a budget from the list.";
  if (!validDate(deadline)) errors.deadline = "Please choose a valid date.";

  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  try {
    const result = await saveSubmission(
      "enquiries",
      email,
      {
        name,
        business,
        email,
        project_type: projectType || "Not sure yet",
        description,
        budget: budget || "Not sure yet",
        deadline: deadline || null,
      },
      `New project enquiry from ${name}`,
      [
        "A new project enquiry was submitted on the website.",
        "",
        `Name: ${name}`,
        `Business: ${business || "—"}`,
        `Email: ${email}`,
        `Project type: ${projectType || "Not sure yet"}`,
        `Budget: ${budget || "Not sure yet"}`,
        `Deadline: ${deadline || "—"}`,
        "",
        "Description:",
        description,
      ]
    );
    return res.status(result.status).json(result.body);
  } catch (error) {
    return handleError(res, error);
  }
}

export async function handleMessage(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  const payload = getPayload(req);
  if (!payload) return res.status(400).json({ ok: false, error: "Invalid request body." });
  if (cleanText(payload.company_website, 200)) return res.status(200).json({ ok: true, id: null });

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 254).toLowerCase();
  const message = cleanMultiline(payload.message, 2000);
  const errors = {};

  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!validEmail(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  try {
    const result = await saveSubmission(
      "messages",
      email,
      { name, email, message },
      `New website message from ${name}`,
      ["A quick message was sent from the website.", "", `Name: ${name}`, `Email: ${email}`, "", "Message:", message]
    );
    return res.status(result.status).json(result.body);
  } catch (error) {
    return handleError(res, error);
  }
}

export async function handleReply(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  const payload = getPayload(req);
  if (!payload) return res.status(400).json({ ok: false, error: "Invalid request body." });

  const table = cleanText(payload.table, 16);
  const id = cleanText(payload.id, 64);
  const subject = cleanText(payload.subject, 140);
  const message = cleanMultiline(payload.message, 8000);
  const errors = {};
  if (table !== "enquiries" && table !== "messages") errors.table = "Choose a valid inbox item.";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) errors.id = "Choose a valid inbox item.";
  if (subject.length < 3) errors.subject = "Add an email subject.";
  if (message.length < 1) errors.message = "Write a reply before sending.";
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  const recipient = process.env.NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!recipient || !apiKey || !from) {
    return res.status(503).json({ ok: false, error: "Email replies are not configured yet." });
  }

  try {
    const authorization = await getAdminClient(req);
    if (authorization.error) {
      return res.status(authorization.error.status).json({ ok: false, error: authorization.error.message });
    }
    const { client } = authorization;
    const { data: submission, error: submissionError } = await client
      .from(table)
      .select("id, name, email")
      .eq("id", id)
      .maybeSingle();
    if (submissionError) throw new Error(`Could not load inbox item: ${submissionError.message}`);
    if (!submission || !validEmail(submission.email)) {
      return res.status(404).json({ ok: false, error: "That inbox item could not be found." });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [submission.email],
        reply_to: recipient,
        subject,
        text: `Hi ${submission.name},\n\n${message}\n\n— WK Studios`,
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error("Resend reply failed:", response.status, details.slice(0, 500));
      return res.status(502).json({ ok: false, error: "The email provider could not send the reply. Please try again." });
    }

    const { error: statusError } = await client.from(table).update({ status: "Replied" }).eq("id", id);
    if (statusError) console.error("Reply sent, but the inbox status could not be updated:", statusError.message);
    return res.status(200).json({ ok: true, statusUpdated: !statusError });
  } catch (error) {
    console.error("Admin email reply failed:", error.message);
    return res.status(503).json({ ok: false, error: "The reply could not be sent. Please try again." });
  }
}

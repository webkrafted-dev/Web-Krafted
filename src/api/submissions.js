class SubmissionError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "SubmissionError";
    this.data = data;
  }
}

async function postSubmission(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok || !data.ok) {
    throw new SubmissionError(data.error || "Your submission could not be saved.", data);
  }

  return data;
}

export function submitEnquiry(payload) {
  return postSubmission("/api/submit-enquiry", payload);
}

export function submitMessage(payload) {
  return postSubmission("/api/submit-message", payload);
}

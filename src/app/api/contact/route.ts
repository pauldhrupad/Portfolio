import { normalizeContactFields, validateContactFields } from "@/lib/contact";

export const runtime = "nodejs";

const maximumPayloadBytes = 16_384;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaximum = 5;
const maximumRateLimitEntries = 1000;

// shortcut: this bounded limiter is process-local; use a shared store or edge limits for production-wide enforcement.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: Request) {
  const identifier = (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown"
  ).slice(0, 128);
  const now = Date.now();

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(identifier);
  if (!current) {
    if (rateLimitStore.size >= maximumRateLimitEntries) return true;
    rateLimitStore.set(identifier, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  if (current.count >= rateLimitMaximum) return true;
  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ success: false, message: "Send the message from this website." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ success: false, message: "Send a JSON contact request." }, { status: 415 });
  }

  if (isRateLimited(request)) {
    return Response.json(
      { success: false, message: "Too many attempts. Wait 10 minutes or email me directly." },
      { headers: { "Retry-After": "600" }, status: 429 },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isSafeInteger(declaredLength) || declaredLength < 0) {
    return Response.json({ success: false, message: "Send a valid contact request." }, { status: 400 });
  }
  if (declaredLength > maximumPayloadBytes) {
    return Response.json({ success: false, message: "The message is too large. Shorten it and try again." }, { status: 413 });
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return Response.json({ success: false, message: "Send a valid contact request." }, { status: 400 });
  }

  let rawBody = "";
  let bytesRead = 0;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      if (bytesRead > maximumPayloadBytes) {
        void reader.cancel().catch(() => {});
        return Response.json({ success: false, message: "The message is too large. Shorten it and try again." }, { status: 413 });
      }
      rawBody += decoder.decode(value, { stream: true });
    }
    rawBody += decoder.decode();
  } catch {
    void reader.cancel().catch(() => {});
    return Response.json({ success: false, message: "The request could not be read. Please try again." }, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return Response.json({ success: false, message: "Send a valid contact request." }, { status: 400 });
  }

  const fields = normalizeContactFields(parsedBody);
  if (!fields) {
    return Response.json({ success: false, message: "Send a valid contact request." }, { status: 400 });
  }
  if (fields.company) {
    return Response.json({ success: false, message: "Your message was not sent. Please email me directly." }, { status: 400 });
  }

  const errors = validateContactFields(fields);
  if (Object.keys(errors).length > 0) {
    return Response.json({ success: false, errors, message: "Please correct the highlighted fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json(
      { success: false, message: "Sending is unavailable right now. Your message was not sent. Please email me directly." },
      { status: 503 },
    );
  }

  try {
    const deliveryResponse = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from: fromEmail,
        reply_to: fields.email,
        subject: "[Portfolio] " + fields.subject,
        text: "Name: " + fields.name + "\nEmail: " + fields.email + "\n\n" + fields.message,
        to: [toEmail],
      }),
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "Dhrupad-Paul-Portfolio/1.0",
      },
      method: "POST",
      signal: AbortSignal.timeout(8_000),
    });

    if (!deliveryResponse.ok) {
      return Response.json(
        { success: false, message: "Your message could not be sent. Please try again or email me directly." },
        { status: 502 },
      );
    }

    const result: unknown = await deliveryResponse.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id.trim()) {
      throw new Error("Missing acceptance receipt");
    }
  } catch {
    return Response.json(
      { success: false, message: "Sending could not be confirmed. Please email me directly." },
      { status: 502 },
    );
  }

  return Response.json(
    { success: true, message: "Your message was accepted for sending. Thank you for reaching out." },
    { status: 202 },
  );
}

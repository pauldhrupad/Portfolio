import {
  normalizeContactFields,
  validateContactFields,
} from "@/lib/contact";

export const runtime = "nodejs";

const maximumPayloadBytes = 16_384;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaximum = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(identifier: string) {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  if (current.count >= rateLimitMaximum) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);

  if (declaredLength > maximumPayloadBytes) {
    return Response.json({ message: "The message is too large." }, { status: 413 });
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ message: "The request could not be read." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > maximumPayloadBytes) {
    return Response.json({ message: "The message is too large." }, { status: 413 });
  }

  let parsedBody: unknown;

  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return Response.json({ message: "Send a valid contact request." }, { status: 400 });
  }

  const fields = normalizeContactFields(parsedBody);

  if (!fields) {
    return Response.json({ message: "Send a valid contact request." }, { status: 400 });
  }

  if (fields.company) {
    return Response.json({ message: "Message sent. I’ll get back to you soon." });
  }

  const errors = validateContactFields(fields);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { errors, message: "Please correct the highlighted fields." },
      { status: 400 },
    );
  }

  if (isRateLimited(getClientIdentifier(request))) {
    return Response.json(
      { message: "Too many messages were sent. Please wait a few minutes and try again." },
      { headers: { "Retry-After": "600" }, status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json(
      { message: "Contact delivery is not configured yet. Please use the direct email link." },
      { status: 503 },
    );
  }

  let deliveryResponse: Response;

  try {
    deliveryResponse = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from: fromEmail,
        reply_to: fields.email,
        subject: `[Portfolio] ${fields.subject}`,
        text: `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`,
        to: [toEmail],
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "Dhrupad-Paul-Portfolio/1.0",
      },
      method: "POST",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    return Response.json(
      { message: "The message could not be delivered. Please use the direct email link." },
      { status: 502 },
    );
  }

  if (!deliveryResponse.ok) {
    return Response.json(
      { message: "The message could not be delivered. Please use the direct email link." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent. I’ll get back to you soon." });
}

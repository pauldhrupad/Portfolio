import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

function loadSource(file, { fetch = async () => { throw new Error("Unexpected email request"); }, env = {}, clock = Date } = {}) {
  const source = readFileSync(new URL("../" + file, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const testModule = { exports: {} };
  const resolve = (id) => {
    assert.equal(id, "@/lib/contact");
    return contact;
  };
  // Compile the actual TypeScript handlers with isolated configuration and a mocked email transport.
  new Function("require", "module", "exports", "fetch", "process", "Date", code)(resolve, testModule, testModule.exports, fetch, { env }, clock);
  return testModule.exports;
}

const contact = loadSource("src/lib/contact.ts");
const valid = { name: "Test Reader", email: "reader@example.com", subject: "Portfolio question", message: "A synthetic message for the contact tests.", company: "" };
const configured = { RESEND_API_KEY: "test-only-key", CONTACT_FROM_EMAIL: "sender@example.com", CONTACT_TO_EMAIL: "inbox@example.com" };
const route = (options) => loadSource("src/app/api/contact/route.ts", options);
function request(body = JSON.stringify(valid), headers = {}) {
  return new Request("https://portfolio.example/api/contact", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body });
}
async function failure(response, status) {
  assert.equal(response.status, status);
  const result = await response.json();
  assert.equal(result.success, false);
  assert.equal(typeof result.message, "string");
  assert.equal(JSON.stringify(result).includes(configured.RESEND_API_KEY), false);
  return result;
}

test("normalization, whitespace, inclusive limits and Unicode validation", () => {
  for (const value of [null, [], "text", {}, { ...valid, company: 1 }]) assert.equal(contact.normalizeContactFields(value), null);
  assert.deepEqual(contact.normalizeContactFields({ ...valid, name: "  Test Reader  " }), valid);
  assert.deepEqual(contact.validateContactFields(valid), {});
  assert.deepEqual(contact.validateContactFields({ ...valid, name: "  ", subject: "  ", message: " ".repeat(30) }), {
    name: "Enter your name using at least 2 characters.",
    subject: "Add a subject using at least 3 characters.",
    message: "Add a little more detail — at least 20 characters.",
  });
  assert.deepEqual(contact.validateContactFields({ ...valid, name: "n".repeat(100), subject: "s".repeat(160), message: "m".repeat(5000) }), {});
  for (const [field, value] of Object.entries({ name: "n".repeat(101), email: "bad email", subject: "s".repeat(161), message: "m".repeat(5001) })) {
    assert.ok(contact.validateContactFields({ ...valid, [field]: value })[field]);
  }
  for (const field of ["name", "email", "subject"]) assert.ok(contact.validateContactFields({ ...valid, [field]: valid[field] + "\r\nInjected" })[field]);
  assert.ok(contact.validateContactFields({ ...valid, message: valid.message + "\0" }).message);
  assert.deepEqual(contact.validateContactFields({ ...valid, name: "Δοκιμή 読者", message: "Unicode message 😊\nSecond line with\ta tab." }), {});
});

test("origin, media type, malformed payloads, field errors and honeypot reject without claiming success", async () => {
  for (const [body, headers, status] of [
    [JSON.stringify(valid), { Origin: "https://other.example" }, 403],
    [JSON.stringify(valid), { "Content-Type": "text/plain" }, 415],
    ["{", {}, 400], ["null", {}, 400], ["[]", {}, 400],
    [JSON.stringify({ ...valid, name: " " }), {}, 400],
    [JSON.stringify({ ...valid, company: "spam.example" }), {}, 400],
    [JSON.stringify(valid), { "Content-Length": "-1" }, 400],
    [JSON.stringify(valid), { "Content-Length": "16385" }, 413],
  ]) await failure(await route().POST(request(body, headers)), status);
  const invalid = await failure(await route().POST(request(JSON.stringify({ ...valid, email: "invalid" }))), 400);
  assert.ok(invalid.errors.email);
});

test("streamed bytes are bounded even with no or understated Content-Length", async () => {
  for (const headers of [{}, { "Content-Length": "2" }]) {
    await failure(await route().POST(request("x".repeat(16385), headers)), 413);
  }
  let cancelled = false;
  const stream = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(16385)); },
    cancel() { cancelled = true; },
  });
  const streamedRequest = new Request("https://portfolio.example/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: stream, duplex: "half" });
  await failure(await route().POST(streamedRequest), 413);
  assert.equal(cancelled, true);
  const broken = new ReadableStream({ start(controller) { controller.error(new Error("read failed")); } });
  await failure(await route().POST(new Request("https://portfolio.example/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: broken, duplex: "half" })), 400);
  await failure(await route().POST(request(new Uint8Array([0xc3, 0x28]))), 400);
});

test("absent delivery configuration returns 503", async () => {
  await failure(await route().POST(request()), 503);
});

test("provider rejection, timeouts and missing receipts never report success or leak upstream details", async () => {
  const responses = [
    () => Response.json({ error: configured.RESEND_API_KEY }, { status: 401 }),
    () => Response.json({ error: "upstream limit" }, { status: 429 }),
    () => { throw new DOMException("Timed out", "TimeoutError"); },
    () => Response.json({}), () => Response.json(null),
    () => Response.json({ id: " " }), () => Response.json({ id: 123 }),
    () => new Response("not json", { status: 200 }),
  ];
  for (const response of responses) {
    await failure(await route({ env: configured, fetch: async () => response() }).POST(request()), 502);
  }
});

test("only a provider acceptance receipt returns 202, with normalized text and server-only headers", async () => {
  let transportCalls = 0;
  const { POST } = route({ env: configured, fetch: async (url, options) => {
    transportCalls += 1;
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options.headers.Authorization, "Bearer " + configured.RESEND_API_KEY);
    assert.match(options.headers["Idempotency-Key"], /^[\da-f-]{36}$/);
    assert.ok(options.signal instanceof AbortSignal);
    const sent = JSON.parse(options.body);
    assert.equal(sent.reply_to, valid.email);
    assert.equal(sent.subject, "[Portfolio] " + valid.subject);
    assert.ok(sent.text.startsWith("Name: " + valid.name));
    assert.equal("html" in sent, false);
    return Response.json({ id: "synthetic-receipt" });
  } });
  const response = await POST(request(JSON.stringify({ ...valid, name: " " + valid.name + " " }), { Origin: "https://portfolio.example" }));
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { success: true, message: "Your message was accepted for sending. Thank you for reaching out." });
  assert.equal(transportCalls, 1);
});

test("stream decoding preserves split multibyte UTF-8 characters", async () => {
  const payload = { ...valid, name: "Test 読者" };
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  const stream = new ReadableStream({ start(controller) { for (const byte of bytes) controller.enqueue(new Uint8Array([byte])); controller.close(); } });
  const { POST } = route({ env: configured, fetch: async (url, options) => {
    assert.ok(JSON.parse(options.body).text.startsWith("Name: Test 読者"));
    return Response.json({ id: "unicode-receipt" });
  } });
  const response = await POST(new Request("https://portfolio.example/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: stream, duplex: "half" }));
  assert.equal(response.status, 202);
});

test("per-client limiter counts failed attempts, expires, and permits independent clients", async () => {
  let now = 100;
  class Clock extends Date { static now() { return now; } }
  const { POST } = route({ clock: Clock });
  for (let i = 0; i < 5; i++) await failure(await POST(request("{")), 400);
  const limited = await POST(request());
  assert.equal(limited.headers.get("retry-after"), "600");
  await failure(limited, 429);
  await failure(await POST(request(JSON.stringify(valid), { "x-forwarded-for": "192.0.2.1" })), 503);
  now += 600_000;
  await failure(await POST(request()), 503);
});

test("limiter memory is bounded and expired entries free capacity", async () => {
  let now = 100;
  class Clock extends Date { static now() { return now; } }
  const { POST } = route({ clock: Clock });
  for (let i = 0; i < 1000; i++) await failure(await POST(request("{", { "x-real-ip": String(i) })), 400);
  await failure(await POST(request("{", { "x-real-ip": "overflow" })), 429);
  now += 600_000;
  await failure(await POST(request("{", { "x-real-ip": "overflow" })), 400);
});

import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { startProductionServer } from "./support/production.mjs";

const selectedProjects = [
  { slug: "gharkabite", title: "GharKaBite", github: "GharKaBite", demo: "https://gharkabite.vercel.app" },
  { slug: "co-parenting-coordinator", title: "Co-Parenting Coordinator", github: "co-parenting-coordinator", demo: "https://co-parenting-coordinator.vercel.app" },
  { slug: "4d-chess", title: "4D Chess: Chess on a Cube", github: "3d-Cube-Chess-Game" },
];
let server, homepage, canonical;

before(async () => {
  server = await startProductionServer();
  const response = await fetch(server.base);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-powered-by"), null);
  homepage = await response.text();
  canonical = new URL(homepage.match(/<link rel="canonical" href="([^"]+)"/)?.[1]);
});
after(async () => server?.stop());

test("homepage exposes a main landmark, exactly three cards and a consistent search identity", () => {
  assert.match(homepage, /<title>Dhrupad Paul \| Full-Stack &amp; Backend Developer<\/title>/);
  assert.match(homepage, /<meta name="description" content="[^"]+"/);
  assert.match(homepage, /<meta property="og:type" content="website"/);
  assert.match(homepage, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(homepage, /href="#main-content"[^>]*>Skip to content/);
  assert.match(homepage, /<main id="main-content" tabindex="-1"/);
  assert.deepEqual([...homepage.matchAll(/<article[^>]* id="project-([\w-]+)"/g)].map((match) => match[1]), selectedProjects.map(({ slug }) => slug));
  assert.doesNotMatch(homepage, /AI-Powered Resume Screening|Farm-Market|EduNextG/);
  assert.equal(canonical.pathname, "/");
  if (process.env.NEXT_PUBLIC_SITE_URL) assert.equal(canonical.href, new URL("/", process.env.NEXT_PUBLIC_SITE_URL).href);
  const person = JSON.parse(homepage.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]);
  assert.equal(person["@type"], "Person");
  assert.equal(person.name, "Dhrupad Paul");
  assert.equal(new URL(person.url).href, canonical.href);
  assert.ok(person.sameAs.includes("https://github.com/pauldhrupad"));
});

test("all three case studies have unique titles, metadata, sources and local media", async () => {
  const descriptions = new Set();
  for (const project of selectedProjects) {
    const route = `/projects/${project.slug}`;
    const response = await fetch(server.base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.ok(html.includes(`<title>${project.title} | Dhrupad Paul</title>`));
    assert.ok(html.includes(`<link rel="canonical" href="${new URL(route, canonical).href}"`));
    assert.match(html, /<meta property="og:type" content="article"/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
    assert.ok(html.includes(`<meta property="og:image" content="${canonical.origin}${route}.webp"`));
    assert.ok(html.includes(`<meta name="twitter:image" content="${canonical.origin}${route}.webp"`));
    assert.ok(html.includes(`href="https://github.com/pauldhrupad/${project.github}"`));
    assert.equal(/>Live Demo/.test(html), Boolean(project.demo));
    if (project.demo) assert.ok(html.includes(`href="${project.demo}"`));
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(description?.length > 50);
    descriptions.add(description);
    const media = await fetch(server.base + route + ".webp");
    assert.equal(media.status, 200);
    assert.match(media.headers.get("content-type"), /^image\/webp/);
    const image = Buffer.from(await media.arrayBuffer());
    assert.equal(image.subarray(8, 12).toString(), "WEBP");
    assert.ok(image.length < 100_000);
  }
  assert.equal(descriptions.size, 3);
});

test("sitemap lists four canonical URLs and robots excludes API paths", async () => {
  const xml = await (await fetch(server.base + "/sitemap.xml")).text();
  assert.deepEqual([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).href), [
    canonical.href, ...selectedProjects.map(({ slug }) => new URL(`/projects/${slug}`, canonical).href),
  ]);
  const robots = await (await fetch(server.base + "/robots.txt")).text();
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(robots.includes(`Sitemap: ${canonical.origin}/sitemap.xml`));
});

test("retired and unknown URLs return a helpful noindex 404", async () => {
  for (const route of ["/missing", "/projects/farm-market", "/projects/ai-resume-screening", "/projects/unknown"]) {
    const response = await fetch(server.base + route);
    assert.equal(response.status, 404, route);
    const html = await response.text();
    assert.match(html, /<meta name="robots" content="noindex"/);
    assert.match(html, /This page doesn(?:&#x27;|&#39;|')t exist\./);
    assert.ok(html.includes('href="/#projects"'));
  }
  assert.doesNotMatch(server.logs(), /Internal: NoFallbackError/);
});

test("the résumé, social card and allowed optimizer asset are available", async () => {
  const resume = await fetch(server.base + "/resume/Dhrupad-Paul-Resume.pdf");
  assert.equal(resume.status, 200);
  assert.match(resume.headers.get("content-type"), /^application\/pdf/);
  assert.equal(Buffer.from(await resume.arrayBuffer()).subarray(0, 5).toString(), "%PDF-");
  const socialCard = await fetch(server.base + "/og.webp");
  assert.equal(socialCard.status, 200);
  await socialCard.body.cancel();
  const optimize = (url) => fetch(`${server.base}/_next/image?url=${encodeURIComponent(url)}&w=640&q=75`, { headers: { Accept: "image/webp" } });
  const allowed = await optimize("/projects/gharkabite.webp");
  assert.equal(allowed.status, 200);
  assert.match(allowed.headers.get("content-type"), /^image\/webp/);
  await allowed.body.cancel();
  for (const url of ["/icon.svg", "/projects/gharkabite.webp?extra=1", "https://example.com/test.webp"]) {
    const response = await optimize(url);
    assert.equal(response.status, 400);
    await response.body.cancel();
  }
});

test("real route preserves contact validation and never succeeds without delivery settings", async () => {
  const valid = { name: "Smoke Test", email: "test@example.com", subject: "Test only", message: "Synthetic request for production smoke testing.", company: "" };
  const submit = (body, headers = {}) => fetch(server.base + "/api/contact", {
    method: "POST", body, headers: { "Content-Type": "application/json", ...headers },
  });
  for (const [body, headers, status] of [
    [JSON.stringify(valid), { Origin: "https://other.example" }, 403],
    [JSON.stringify(valid), { "Content-Type": "text/plain" }, 415],
    ["{", {}, 400], ["x".repeat(16_385), {}, 413],
    [JSON.stringify(valid), { Origin: server.base }, 503],
  ]) {
    const response = await submit(body, headers);
    assert.equal(response.status, status);
    const result = await response.json();
    assert.equal(result.success, false);
    assert.doesNotMatch(result.message, /RESEND_API_KEY|CONTACT_(FROM|TO)_EMAIL/);
    if (status === 503) assert.match(result.message, /not sent.*email me directly/i);
  }
});

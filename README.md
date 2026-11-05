# Dhrupad Paul — Portfolio

A portfolio built with Next.js App Router, TypeScript, Tailwind CSS,
Motion, and Lucide React. Personal information, skills, education,
experience, and projects are kept in centralized typed data.

## Local development

Checks were run with Node.js 24.21.0 and npm 11.19.0. In the VS Code terminal,
open this repository and run:

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`. If that
port is busy, use the alternate port shown in the terminal.

## Environment variables

Copy `.env.example` to `.env.local` and replace only the values needed for your
environment.

- `NEXT_PUBLIC_SITE_URL` — canonical production origin used at build time by metadata, sitemap, and robots. Use the final HTTPS origin, without a path. If unset, the app uses `VERCEL_PROJECT_PRODUCTION_URL` when present and otherwise falls back to `http://localhost:3000` for local work.
- `RESEND_API_KEY` — server-only Resend API key.
- `CONTACT_FROM_EMAIL` — sender on a verified Resend domain.
- `CONTACT_TO_EMAIL` — destination for portfolio messages.

Without the three contact-delivery variables, the contact endpoint returns a safe
configuration error and the interface keeps the direct email option available. Never
commit `.env.local` or real credentials.

The contact endpoint requires JSON, checks browser origins when present, and limits
the streamed request body to 16 KiB. It shares field validation with the form,
rejects honeypot submissions, and returns success only after Resend provides an
acceptance receipt. Acceptance is not a guarantee of inbox delivery; see the
[Resend send response](https://resend.com/docs/api-reference/emails/send-email) and
[delivery events](https://resend.com/docs/webhooks/event-types). Errors retain the
draft, and direct email remains available without JavaScript.

The rate limiter permits five attempts per client identifier in ten minutes per
running process. It holds at most 1,000 identifiers and rejects new identifiers
when full until entries expire. This bounds local memory, but it does not enforce
a shared limit across serverless instances or survive restarts. Forwarded IP
headers are useful only when a trusted hosting proxy overwrites untrusted input;
shared-IP users can also share a limit. Before relying on production-wide abuse
prevention, configure trusted edge rules or a shared limiter. No such service is
configured in this repository, and no paid dependency is added.

## Quality checks

```bash
npm run lint
npm test
npm run build
npm run test:smoke
npm audit --omit=dev
```

The contact tests use Node's built-in runner and the installed TypeScript compiler
against the actual validation and route source. Configuration, the clock, and the
Resend transport are isolated; tests never send real email. After the build, the
smoke suite starts a loopback production server and checks routes, metadata,
sitemap, robots, images, résumé, 404s, and contact failure behavior. See the
[readiness report](docs/portfolio-v2-readiness.md) for browser and Lighthouse results.

## Architecture

- `src/app` — routes, metadata, SEO resources, contact Route Handler, and global styles
- `src/components/layout` — navigation, footer, and page-layout primitives
- `src/components/sections` — homepage sections and interactive section clients
- `src/components/project` — data-driven project gallery and case-study presentation
- `src/components/ui` — shared controls, badges, and clipboard feedback
- `src/data` — centralized, typed portfolio content
- `src/lib` — validation, URLs, site metadata, and shared helpers
- `src/types` — shared portfolio data contracts
- `tests` — contact validation/API checks and production smoke tests
- `public/resume` — downloadable résumé

`src/app/globals.css` defines the semantic colors, typography, spacing, radii and
focus styles. The app shell uses Geist and Geist Mono, a pre-paint theme script,
and persisted light/dark/system settings. Pages and case-study content are
rendered on the server. Client components handle navigation, theme controls,
homepage motion, skill filtering, clipboard feedback and the contact form.

### Project content and assets

`src/data/projects.ts` is the source for the gallery, repository links, case
studies and sitemap. Keep stable slugs and unique case-study section IDs. Only
publish verified repository, demo and technical details.

| Project | Route | Media |
| --- | --- | --- |
| GharKaBite | `/projects/gharkabite` | `public/projects/gharkabite.webp` |
| Co-Parenting Coordinator | `/projects/co-parenting-coordinator` | `public/projects/co-parenting-coordinator.webp` |
| 4D Chess: Chess on a Cube | `/projects/4d-chess` | `public/projects/4d-chess.webp` |

Keep authentic screenshots in `public/projects/` as compact WebP files. Record
their dimensions, descriptive alt text and source caption in the project data.
Use a labeled illustration when no screenshot is available. The Next image
optimizer accepts local project assets in that directory; metadata images and
the résumé are served directly. The portfolio loads no chess application or
WebGL bundle.

## Deploying to Vercel

1. Link the GitHub repository, keep the Next.js preset and use `npm run build`.
   Verify that `main` is the production branch and that the redesign branch is
   used only for review.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. Configure the three
   server-only contact variables with a verified sender and approved test inbox
   before testing live delivery. Verify trusted proxy headers and edge limits if
   the form will be enabled for production traffic.
3. Review the draft pull request and run the verification commands above. Check
   the preview's links, screenshots, canonical URLs and contact fallback.
4. After explicit release approval, publish through the configured production
   branch. Verify the homepage, all three case studies, résumé, metadata,
   sitemap, robots, 404 and contact behavior on the final domain.

No custom Vercel configuration is required. The project uses standard Next.js static
assets, Route Handlers, and statically generated project case-study routes.

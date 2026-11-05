# Dhrupad Paul — Portfolio

A portfolio built with Next.js App Router, TypeScript, Tailwind CSS,
Motion, and Lucide React. Personal information, skills, education,
experience, and projects are kept in centralized typed data.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

## Environment variables

Copy `.env.example` to `.env.local` and replace only the values needed for your
environment.

- `NEXT_PUBLIC_SITE_URL` — canonical production URL used by metadata, sitemap, and robots.
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
```

The contact tests use Node's built-in runner and the installed TypeScript compiler
against the actual validation and route source. Configuration, the clock, and the
Resend transport are isolated; tests never send real email. Browser checks and
live delivery with an approved test inbox remain separate verification steps.

## Architecture

- `src/app` — routes, metadata, SEO resources, contact Route Handler, and global styles
- `src/components/layout` — navigation, footer, and page-layout primitives
- `src/components/sections` — homepage sections and interactive section clients
- `src/components/project` — data-driven project gallery and case-study presentation
- `src/components/ui` — shared controls, badges, and clipboard feedback
- `src/data` — centralized, typed portfolio content
- `src/lib` — validation, URLs, site metadata, and shared helpers
- `src/types` — shared portfolio data contracts
- `tests` — contact validation and API regression checks
- `public/resume` — downloadable résumé

## Deploying to Vercel

1. Push the repository to a Git provider and import it into Vercel.
2. Keep the detected framework preset as Next.js and the default build command (`npm run build`).
3. Configure `NEXT_PUBLIC_SITE_URL` with the final HTTPS domain.
4. Configure the three server-only contact variables if form delivery is required.
5. Deploy, then verify the homepage, project case study, résumé, contact path, metadata,
   sitemap, robots, 404 page, and responsive gallery.

No custom Vercel configuration is required. The project uses standard Next.js static
assets, Route Handlers, and statically generated project case-study routes.

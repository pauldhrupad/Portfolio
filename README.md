# Dhrupad Paul — Portfolio

A production-ready portfolio built with Next.js App Router, TypeScript, Tailwind CSS,
React Three Fiber, Motion, and Lucide React. Personal information, skills, education,
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

## Quality checks

```bash
npm run lint
npm run build
```

There is currently no automated test script; production checks use linting, the
Next.js build, API route checks, and browser interaction testing.

## Architecture

- `src/app` — routes, metadata, SEO resources, contact Route Handler, and global styles
- `src/components/layout` — navigation, footer, and page-layout primitives
- `src/components/sections` — homepage sections and interactive section clients
- `src/components/project` — data-driven project gallery and case-study presentation
- `src/components/three` — lazy, demand-rendered project gallery scene and fallback
- `src/data` — centralized, typed portfolio content
- `src/lib` — validation, URLs, site metadata, and shared helpers
- `src/types` — shared portfolio data contracts
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

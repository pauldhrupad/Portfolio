# Portfolio 2.0 plan

Phase 0 baseline reviewed on 5 November 2026 at `038ee48`. Work is scoped to `feat/portfolio-v2-redesign`. Complete and verify one phase at a time. Preserve unrelated changes, keep the reference repositories read-only, and commit only reviewed phase work on the feature branch. Keep credentials, environment files, and private data out of commits. Merge and deployment require explicit approval.

## Current architecture

| Area | Implementation |
| --- | --- |
| Runtime and tooling | Next.js 16.3.4 App Router, React 19.2.8, strict TypeScript, Tailwind CSS 4 through PostCSS, Lucide, Motion, Three.js and React Three Fiber. Next config sets the Turbopack root and shared security headers. ESLint uses Next.js Core Web Vitals and TypeScript presets. |
| App shell and homepage | The root layout loads Geist and Geist Mono with `next/font/google`, wraps the site in `ThemeProvider`, and shares navigation and footer across routes. `/` renders Hero, About, Skills, Projects, Experience, Education, Developer Presence, and Contact. The route and sections are server components with client boundaries for navigation, theme, motion, skills, the gallery, and the form. |
| Components and data | `src/components/layout` and `src/components/ui` provide shared layout and controls. Section components consume typed content from `src/data`. `src/types/portfolio.ts` defines the content contracts. `src/lib` handles class composition, URL validation, and shared contact validation. The hero, gallery, Developer Presence, case-study route, and sitemap all read the project dataset. |
| Projects and routes | `Project` holds card copy, technology lists, links and optional media and case-study fields. `/projects/[slug]` statically generates supported case studies. GharKaBite and Co-Parenting share the renderer, with commerce and coordination sections selected by a typed discriminator. Unknown slugs use the custom 404. |
| Tokens and responsive layout | `globals.css` defines palette, text, surfaces, spacing, radii, shadows, motion, and type scales with CSS custom properties mapped to Tailwind. The current style uses raised surfaces and glass effects. Fluid type and gutters, responsive grids, and the fixed navigation support smaller screens. The menu switches to a mobile dialog below `xl`. The project gallery stacks its details and shows the CSS fallback below 768 px. |
| Theme and motion | A pre-paint script and `ThemeProvider` resolve light, dark, and system preferences, persist the choice in `localStorage`, and update the page color scheme and browser theme color. Navigation observes section visibility. Motion supplies entrance and scroll reveals. CSS and Motion respond to reduced-motion preferences. |
| Three.js | The gallery dynamically imports the canvas with SSR disabled. React Three Fiber renders simple meshes on demand with capped device pixel ratio. A CSS stage remains underneath the canvas. Render errors and WebGL context loss fall back to the stage, and project controls and links are DOM elements. |
| SEO and assets | The root and case-study routes supply metadata and canonicals. The homepage adds Person JSON-LD. The sitemap lists case-study routes and robots excludes `/api/`. `NEXT_PUBLIC_SITE_URL` or the Vercel production hostname sets the canonical base, with a localhost fallback. `public` contains the site-wide social card and downloadable résumé. The image, model, and project asset directories contain placeholders. |
| Contact | `ContactForm` posts to the Node.js `POST /api/contact` route. Client and server share field limits. The route checks payload size, uses a honeypot and an in-memory rate limiter, and calls Resend with server-only configuration and a timeout. The direct email link is available independently of the form. |

## Approved design direction

Use the requested hybrid of Dark Tech Studio, Editorial Minimalism, and Bento Dashboard. Translate it into dark graphite surfaces with restrained accents, a clear type hierarchy, generous whitespace, and a responsive card grid for selected work and supporting details. Carry the same hierarchy and contrast into light mode and preserve the system preference. Make the developer role, selected work, résumé, and contact easy to find. Keep the full project lineup visible as regular content and use any retained 3D as optional decoration.

## Exact three-project lineup

The gallery follows the supplied reference order. GharKaBite is the featured homepage project and links to its published case study. Both GharKaBite and Co-Parenting have case-study routes and verified demo links. The game presentation is scheduled for Phase 4.

| Project | Case-study slug | Evidence and boundaries |
| --- | --- | --- |
| GharKaBite | `gharkabite` | Next.js food-ordering prototype with configurable Thalis, daily menus, subscriptions, delivery checks, order tracking, and admin tools. Auth.js and MongoDB/Mongoose back the workflow. Checkout recalculates server-side and uses transactions. Online UPI proof requires manual admin verification, COD is configurable, and meal-plan purchases are a no-money preview. [README](https://github.com/pauldhrupad/GharKaBite/blob/291c3d650ab21168ee4d2e275e98e7744e62994a/README.md) · [Manifest](https://github.com/pauldhrupad/GharKaBite/blob/291c3d650ab21168ee4d2e275e98e7744e62994a/package.json) · [Order service](https://github.com/pauldhrupad/GharKaBite/blob/291c3d650ab21168ee4d2e275e98e7744e62994a/lib/order-service.js) |
| Co-Parenting Coordinator | `co-parenting-coordinator` | Educational MERN application with family-scoped JWT access, custody conflict checks and swaps, expense states, append-only messages, transactional audit records, email notifications, and PDF/CSV exports. Describe the audit trail at the application level and retain the documented evidence boundaries. [README](https://github.com/pauldhrupad/co-parenting-coordinator/blob/531a233454fa91df03d91e47773f63b80ceed105/README.md) · [Client manifest](https://github.com/pauldhrupad/co-parenting-coordinator/blob/531a233454fa91df03d91e47773f63b80ceed105/client/package.json) · [Server manifest](https://github.com/pauldhrupad/co-parenting-coordinator/blob/531a233454fa91df03d91e47773f63b80ceed105/server/package.json) · [Audit service](https://github.com/pauldhrupad/co-parenting-coordinator/blob/531a233454fa91df03d91e47773f63b80ceed105/server/src/services/audit.js) |
| 4D Chess: Chess on a Cube | `4d-chess` | React, TypeScript, Three.js and Vite game played on the six faces of a 3D cube. Its custom engine handles cross-edge moves, local two-player or four-player team play, and optional heuristic CPU seats. Sessions run locally and reset on refresh. [README](https://github.com/pauldhrupad/3d-Cube-Chess-Game/blob/4f13a8ab9fc518b8aeafc97c7e7dad69bfebb171/README.md) · [Manifest](https://github.com/pauldhrupad/3d-Cube-Chess-Game/blob/4f13a8ab9fc518b8aeafc97c7e7dad69bfebb171/package.json) · [Game engine](https://github.com/pauldhrupad/3d-Cube-Chess-Game/blob/4f13a8ab9fc518b8aeafc97c7e7dad69bfebb171/src/game/engine.ts) · [Three.js scene](https://github.com/pauldhrupad/3d-Cube-Chess-Game/blob/4f13a8ab9fc518b8aeafc97c7e7dad69bfebb171/src/scene.ts) |

The documented [GharKaBite prototype](https://gharkabite.vercel.app/) and [Co-Parenting frontend](https://co-parenting-coordinator.vercel.app/) each returned HTTP 200 on a public GET. Recheck demo links before publishing. The 4D Chess README documents local play and static build instructions, so plan for a source link while a hosted demo remains unverified.

Retired project entries and their public references are removed. The SIH 2024 participation and innovation-prototype achievement are preserved with a general description. Publish source-supported claims, links, and approved media.

## Existing risks and missing inputs

### Phase 2 source and asset review

Reference heads were rechecked against GitHub on 5 November 2026. All three matched the pinned commits in the lineup table. The references were inspected as read-only copies.

| Repository | Source files inspected for portfolio claims |
| --- | --- |
| GharKaBite | `README.md`, `package.json`, `app/page.js`, `app/menu/page.js`, `app/admin/dashboard/page.js`, `auth.js`, `context/CartContext.js`, `lib/order-service.js`, `lib/subscription-service.js`, `app/api/orders/route.js`, and `app/api/orders/[orderId]/payment-verification/route.js`. |
| Co-Parenting Coordinator | `README.md`, root/client/server manifests, `client/src/App.jsx`, `server/src/middleware/auth.js`, custody-overlap, expense-state-machine, audit and email services, message routes, export controller, and `docs/immutable-records.md` and `docs/notifications-export.md`. |
| 4D Chess | `README.md`, `package.json`, `src/App.tsx`, `src/game/engine.ts`, `src/scene.ts`, and `vite.config.ts`. |

Both supplied demo URLs returned HTTP 200. The chess entry has a source link. Its hosted demo is unverified.

No application screenshots were found in the reference trees or the portfolio. GharKaBite includes food/category imagery, logos, and font assets. Co-Parenting includes a favicon and theme script, and its README lists screenshots as a future addition. The chess repository includes plaster and studio textures. These assets do not establish application screenshots. The gallery and current case-study preview use explicitly labeled illustrations. No reference media or private data was copied.

The downloadable résumé receives the same project cleanup. Its Co-Parenting entry, unrelated education, certifications, and achievements are preserved. New GharKaBite and 4D Chess descriptions are brief and source-supported.

Phase 2 verification passed lint, the production build and TypeScript checks, data/order assertions, and gallery interaction tests in both themes at 320, 375, 768, 1024, and 1440 px. Checks cover exact repository/demo links, counters, keyboard controls, the featured link, existing case-study navigation, removed-project 404s, and the sitemap. The one-page résumé was rendered and inspected, and its unrelated text and achievement records were checked against the original. The existing `Internal: NoFallbackError` server log still accompanies unsupported-slug 404 responses.

| Finding | Phase impact |
| --- | --- |
| Case-study data supports coordination, commerce, and game variants with distinct architecture and workflow contracts. The shared renderer presents coordination and commerce case studies. | Complete the game presentation in Phase 4. A shared publication guard keeps unsupported case studies out of routes, links, and the sitemap. |
| Shared section reveals now preserve visible server-rendered content and use transform/opacity keyframes after entering the viewport. The gallery canvas is still hidden by CSS on mobile while its dynamic component mounts, and scene colors are hard-coded. | Hero and About have JavaScript-disabled and reduced-motion checks. Keep the remaining gallery loading and palette concerns in the release verification gate. |
| `--radius-xl` is referenced by the custom 404 but missing from the global token definitions. | Resolve the token in the design foundation and verify the 404 in both themes. |
| The contact limiter is process-local and keys off proxy IP headers. The body is fully read before the actual byte count is checked. | Rate limiting depends on trusted proxy headers and resets per instance. Preserve existing behavior during visual phases and assess the hosting boundary before claiming production abuse protection. |
| Production canonicals require an explicit public URL or Vercel hostname. Successful form delivery requires a Resend key, verified sender, and recipient. | Check production configuration before release. Validate failure feedback and direct email locally. |
| The current lockfile includes a critical audit finding for Next.js and two high-severity findings in production dependencies. | Review and resolve the production findings before approving a release. [Next.js security advisory](https://github.com/advisories/GHSA-673q-mjm6-r5xr) |
| Portfolio project screenshots, a profile photo, 3D models, and a verified LinkedIn URL are absent. The browser-style preview is an illustration. | Use approved screenshots with synthetic or scrubbed data when available, or use clearly labeled illustrations and text. Preserve the initials treatment and conditional social links. Use the existing résumé and site social card as baseline assets. |
| The portfolio has no automated test script. Google-hosted fonts are a build-time network dependency. | Keep lint, build, and runtime smoke checks as separate gates. Capture the current build behavior before comparing redesign results. |

## Phase checklist

- [x] **Phase 0 · Preparation.** Review the portfolio and reference code, establish the baseline, create the feature branch, and document the plan.
- [x] **Phase 1 · Design foundation.** Update semantic tokens, type, spacing, and shared layout and controls. Verify light, dark, and system behavior, focus, reduced motion, mobile navigation, and 404. Keep the current project data and content routes during this phase.
- [x] **Phase 2 · Project lineup.** Verify the three source repositories, replace project data in the required order, remove retired public references, prepare typed case-study variants, and document missing media.
- [x] **Phase 3 · Hero and About.** Redesign the identity and value hierarchy, CTA layout, technical artwork, and editorial/bento biography using the existing typed data and anchors.
- [ ] **Phase 4 · Case-study presentation.** Build project-specific presentations for commerce, coordination, and game content, publish supported case-study routes, and add approved screenshots when available.
- [ ] **Release verification.** Run the full regression checklist, capture accessibility and performance results, and verify public content, production configuration, and dependency security. Merge or deploy only after explicit approval.

### GharKaBite case-study addition

The requested GharKaBite case study is published at `/projects/gharkabite`. The shared template uses commerce-specific order, payment, and subscription sections alongside the existing common sections. The homepage featured link, gallery, metadata, and sitemap consume the shared publication guard.

Content uses the pinned GharKaBite README, manifest, authentication configuration, order and subscription services, payment review routes, and checkout, thali, and delivery tests. Test descriptions report the coverage visible in those files. The reference application tests were inspected. The portfolio checks cover publication and rendering.

The preview remains an explicitly labeled illustration with food-ordering icons. Application screenshots remain a missing asset.

Verification passed lint, the production build, static-route and metadata checks, sitemap assertions, and homepage/gallery navigation to both published case studies. GharKaBite was checked in light and dark themes at 320, 375, 768, 1024, and 1440 px, with an automated accessibility scan. The mobile hero grid uses a zero-minimum column to keep preview content inside the viewport.

## Accessibility, performance, and verification

### Phase 3 verification

Hero now leads with the existing role and name, an editorial headline, and two primary actions. The selected GharKaBite case-study link remains connected to the project data. About uses the profile, featured education entry, skill constellation, and drawing credential. The concise introduction is stored in the existing profile summary field.

The custom hero artwork uses CSS, SVG, and a small Motion client component. Pointer tilt is limited to fine, hover-capable mouse input with no reduced-motion preference. Touch and reduced-motion paths remain static, and a preference change resets the tilt. Shared section reveals keep content visible during server rendering and animate only transforms and opacity on entry. Unused hero parallax helpers and old editorial-card CSS were removed.

Lint, the production build, and responsive checks passed at 320, 375, 768, 1024, and 1440 px in both themes. Browser checks cover the résumé download, project/contact anchors, both existing case-study routes, typed biography content, and JavaScript-disabled content. Automated accessibility scans of Hero and About reported no violations. The tested entrance sequence produced no Hero/About layout-shift entries. Desktop and mobile screenshots were visually reviewed. Verification used Chromium with emulated touch and color/motion preferences.

- Target WCAG 2.2 AA. Check both themes for at least 4.5:1 normal-text contrast and 3:1 large-text and applicable control contrast. Check semantic landmarks and heading order, keyboard access, visible focus, mobile dialog focus restoration, meaningful labels and alt text, and announced form feedback. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- Check 320 px and representative phone, tablet, and desktop widths plus 200% zoom. Keep reading and focus order aligned with the grid. Verify no page-level horizontal overflow and that the fixed header leaves anchored headings and focused controls visible.
- With reduced motion enabled, check that parallax, large transitions, and automatic decorative motion are disabled. Verify all project summaries, links, navigation, and contact remain reachable when motion or WebGL fails. Keep main content visible before hydration.
- Keep the app shell and content server-rendered or statically generated where they are today. Reserve media dimensions, size images to their display context, and defer noncritical assets. If 3D is retained, keep it lazy and demand-rendered and verify via the network panel that unsupported or ineligible views avoid its bundle. Compare a repeatable mobile Lighthouse run and initial JavaScript transfer against the pre-redesign build. Use LCP ≤ 2.5 s and CLS ≤ 0.1 as performance targets. Measure INP against a ≤ 200 ms target when field data is available. [Core Web Vitals thresholds](https://web.dev/articles/vitals#core-web-vitals)
- Run `npm ci` in a clean checkout and require `npm run lint` and `npm run build` to pass at each implementation gate. Smoke-test the homepage, case studies, unknown slug, résumé PDF, robots, sitemap, canonical metadata, and contact validation and fallback. Test successful delivery only with a configured test inbox. Review changed files and keep baseline findings separate from regressions.

## Phase 0 baseline

- Starting branch `main` was clean and matched `origin/main` at `038ee48`.
- Windows PowerShell, Node.js `v24.21.0`, npm `11.19.0`. No dependencies were installed in the checkout at the start.
- `npm ci --prefer-offline` passed on retry after the first install was interrupted. npm reported an ESLint support deprecation and an `allowScripts` notice for the `unrs-resolver` postinstall script. The checked-in lockfile was used as-is.
- `npm run lint` and `npm run build` both passed. The build completed TypeScript checking and statically generated the homepage and Co-Parenting case study.
- Local production HTTP checks passed for the homepage canonical and Person JSON-LD, the case-study canonical, the custom 404, the résumé PDF, robots, and sitemap. An unknown project slug returned the expected custom 404 and logged `Internal: NoFallbackError` on repeated checks.
- Local contact checks passed for malformed JSON, invalid fields, oversized payload, honeypot response, missing-configuration feedback, and rate limiting. The homepage contained a direct email link. Browser interaction, Lighthouse, and successful Resend delivery remain unverified.
- `npm audit` flagged 13 packages by severity (8 moderate, 4 high, 1 critical). `npm audit --omit=dev` flagged 3 (critical `next`, high `sharp` and `source-map-js`). These are existing dependency findings. Exploitability in this application was outside the baseline check.
- Phase 0 adds this planning document. The pre-existing findings above carry into Phase 1, which can begin with the design foundation.

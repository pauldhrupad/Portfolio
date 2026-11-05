# Portfolio 2.0 plan

Phase 0 baseline reviewed on 5 November 2026 at `038ee48`. Work is scoped to `feat/portfolio-v2-redesign`. Complete and verify one phase at a time. Preserve unrelated changes, keep the reference repositories read-only, and commit only reviewed phase work on the feature branch. Keep credentials, environment files, and private data out of commits. Merge and deployment require explicit approval.

## Current architecture

| Area | Implementation |
| --- | --- |
| Runtime and tooling | Next.js 16.3.4 App Router, React 19.2.8, strict TypeScript, Tailwind CSS 4 through PostCSS, Lucide and Motion. Next config sets the Turbopack root and shared security headers. ESLint uses Next.js Core Web Vitals and TypeScript presets. Phase 4 removes the unused Three.js and React Three Fiber dependencies. |
| App shell and homepage | The root layout loads Geist and Geist Mono with `next/font/google`, wraps the site in `ThemeProvider`, and shares navigation and footer across routes. `/` renders Hero, About, Skills, Projects, Experience, Education, Developer Presence, and Contact. The route, gallery, and sections are server components with client boundaries for navigation, theme, motion, skills, and the form. |
| Components and data | `src/components/layout` and `src/components/ui` provide shared layout and controls. Section components consume typed content from `src/data`. `src/types/portfolio.ts` defines the content contracts. `src/lib` handles class composition, URL validation, and shared contact validation. The hero, gallery, Developer Presence, case-study route, and sitemap all read the project dataset. |
| Projects and routes | `Project` holds card copy, technology lists, links and optional media and case-study fields. `/projects/[slug]` statically generates all three case studies. A typed section union supports text, lists, feature groups, workflows, architecture and deployment in one renderer. Unknown slugs use the custom 404. |
| Tokens and responsive layout | `globals.css` defines palette, text, surfaces, spacing, radii, shadows, motion, and type scales with CSS custom properties mapped to Tailwind. Fluid type and gutters, responsive grids, and fixed navigation support smaller screens. The menu switches to a mobile dialog below `lg`. The gallery stacks on mobile, with a wide featured card and two editorial cards on desktop. |
| Theme and motion | A pre-paint script and `ThemeProvider` resolve light, dark, and system preferences, persist the choice in `localStorage`, and update the page color scheme and browser theme color. Navigation observes section visibility. Motion supplies entrance and scroll reveals. CSS and Motion respond to reduced-motion preferences. |
| Project previews | All three projects use authentic static screenshots through `next/image`, with reserved aspect ratios, responsive sizes, alt text and provenance captions. The gallery has no canvas or WebGL dependency. The chess application remains external to the portfolio. |
| SEO and assets | The root and case-study routes supply metadata and canonicals. Each case study uses its screenshot for Open Graph and Twitter media. The homepage adds Person JSON-LD. The sitemap lists exactly three case-study routes and robots excludes `/api/`. `NEXT_PUBLIC_SITE_URL` or the Vercel production hostname sets the canonical base, with a localhost fallback. `public` contains the site-wide social card, downloadable résumé, and project screenshots. |
| Contact | `ContactForm` posts to the Node.js `POST /api/contact` route. Client and server share field limits. The route checks payload size, uses a honeypot and an in-memory rate limiter, and calls Resend with server-only configuration and a timeout. The direct email link is available independently of the form. |

## Approved design direction

Use the requested hybrid of Dark Tech Studio, Editorial Minimalism, and Bento Dashboard. Translate it into dark graphite surfaces with restrained accents, a clear type hierarchy, generous whitespace, and a responsive card grid for selected work and supporting details. Carry the same hierarchy and contrast into light mode and preserve the system preference. Make the developer role, selected work, résumé, and contact easy to find. Keep the full project lineup visible as regular content and use any retained 3D as optional decoration.

## Exact three-project lineup

The gallery follows the supplied reference order. GharKaBite is the featured homepage project. All three have published case studies. GharKaBite and Co-Parenting have verified demo links; chess has a source link only.

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

At Phase 2, no application screenshots were found in the reference trees or the portfolio. GharKaBite includes food/category imagery, logos, and font assets; Co-Parenting includes a favicon and theme script; chess includes plaster and studio textures. The Phase 2 previews were labeled illustrations. Phase 4 replaces them with browser-captured screenshots documented below.

The downloadable résumé receives the same project cleanup. Its Co-Parenting entry, unrelated education, certifications, and achievements are preserved. New GharKaBite and 4D Chess descriptions are brief and source-supported.

Phase 2 verification passed lint, the production build and TypeScript checks, data/order assertions, and gallery interaction tests in both themes at 320, 375, 768, 1024, and 1440 px. Checks cover exact repository/demo links, counters, keyboard controls, the featured link, existing case-study navigation, removed-project 404s, and the sitemap. The one-page résumé was rendered and inspected, and its unrelated text and achievement records were checked against the original. The existing `Internal: NoFallbackError` server log still accompanies unsupported-slug 404 responses.

| Finding | Phase impact |
| --- | --- |
| Phase 4 replaces project-specific schema variants with typed presentation sections and publishes all three case studies. | New projects can compose supported section types without custody- or commerce-specific rendering branches. |
| Shared section reveals preserve visible server-rendered content and animate transforms/opacity after entering the viewport. Phase 4 removes the gallery canvas, hard-coded scene colors, and obsolete gallery CSS. | Project discovery no longer depends on JavaScript or WebGL. Reduced-motion views retain static previews. |
| The custom 404's missing `--radius-xl` token was resolved in Phase 1. | Keep the existing 404 checks in release verification. |
| The contact limiter is process-local and keys off proxy IP headers. The body is fully read before the actual byte count is checked. | Rate limiting depends on trusted proxy headers and resets per instance. Preserve existing behavior during visual phases and assess the hosting boundary before claiming production abuse protection. |
| Production canonicals require an explicit public URL or Vercel hostname. Successful form delivery requires a Resend key, verified sender, and recipient. | Check production configuration before release. Validate failure feedback and direct email locally. |
| The current lockfile includes a critical audit finding for Next.js and two high-severity findings in production dependencies. | Review and resolve the production findings before approving a release. [Next.js security advisory](https://github.com/advisories/GHSA-673q-mjm6-r5xr) |
| Project screenshots are available after Phase 4. Authenticated admin/family screens, a profile photo, and a verified LinkedIn URL are absent. | Do not invent dashboard screenshots or access private records. Preserve the initials treatment and conditional social links. Portfolio 3D models are unnecessary for the static gallery. |
| The portfolio has no automated test script. Google-hosted fonts are a build-time network dependency. | Keep lint, build, and runtime smoke checks as separate gates. Capture the current build behavior before comparing redesign results. |

## Phase checklist

- [x] **Phase 0 · Preparation.** Review the portfolio and reference code, establish the baseline, create the feature branch, and document the plan.
- [x] **Phase 1 · Design foundation.** Update semantic tokens, type, spacing, and shared layout and controls. Verify light, dark, and system behavior, focus, reduced motion, mobile navigation, and 404. Keep the current project data and content routes during this phase.
- [x] **Phase 2 · Project lineup.** Verify the three source repositories, replace project data in the required order, remove retired public references, prepare typed case-study variants, and document missing media.
- [x] **Phase 3 · Hero and About.** Redesign the identity and value hierarchy, CTA layout, technical artwork, and editorial/bento biography using the existing typed data and anchors.
- [x] **Phase 4 · Project showcase and case studies.** Publish all three typed case studies, add authentic previews, build the content-first gallery, and verify routes, accessibility and responsive behavior.
- [x] **Phase 5 · Skills and background.** Build the evidence-linked skills bento grid, compact experience and academic sections, remove duplicate achievement presentations, and highlight the three selected repositories.
- [ ] **Release verification.** Run the full regression checklist, capture accessibility and performance results, and verify public content, production configuration, and dependency security. Merge or deploy only after explicit approval.

### GharKaBite case-study addition

The requested GharKaBite case study is published at `/projects/gharkabite`. Phase 4 migrates its order, payment and subscription content into the generic typed section renderer. The homepage featured link, gallery, metadata, and sitemap consume the shared publication guard.

Content uses the pinned GharKaBite README, manifest, authentication configuration, order and subscription services, payment review routes, and checkout, thali, and delivery tests. Test descriptions report the coverage visible in those files. The reference application tests were inspected. The portfolio checks cover publication and rendering.

Phase 4 replaces the original illustrated preview with the public storefront screenshot.

Verification passed lint, the production build, static-route and metadata checks, sitemap assertions, and homepage/gallery navigation to both published case studies. GharKaBite was checked in light and dark themes at 320, 375, 768, 1024, and 1440 px, with an automated accessibility scan. The mobile hero grid uses a zero-minimum column to keep preview content inside the viewport.

## Accessibility, performance, and verification

### Phase 5 implementation and evidence

Skills now has eight categories: Programming Languages, Frontend, Backend, Databases, Authentication / Security, Testing, Tools and Deployment, and 3D / Graphics. All categories render initially, with native button filters, pressed states, a polite results announcement, visible focus and comfortable touch targets. The cards link to relevant case studies as project examples. They describe implementation usage, without proficiency levels or percentages.

`src/data/skills.ts` holds category copy and project associations under the existing typed skill contract. React and Express labels match the project data; Auth.js, TypeScript, Tailwind CSS and Three.js are represented. Raycasting and OrbitControls are supported by the chess scene source. Existing Java, Python, HTML5, CSS3, Figma and Photoshop entries remain under “Additional toolkit,” separately from the project technology badges. No selected-project usage or expertise is asserted for those additional entries. Socket.io is omitted because the reviewed selected applications provide no evidence for it. Project examples apply to the category's demonstrated work, rather than asserting that every technology is used in every linked project.

The evidence uses the same read-only reference commits documented above. Phase 5 rechecked all application manifests, GharKaBite's credentials configuration in `auth.js`, Co-Parenting's architecture/testing/hosting documentation in `README.md`, and chess's OrbitControls and raycasting calls in `src/scene.ts`. The earlier source review supplies the application workflows behind the category descriptions. There are no new dependency installations or GitHub API requests.

Experience remains driven by `src/data/experience.ts`. Only the two visible records are rendered: Annual Tech Fest event coordination and Smart India Hackathon 2024. Roles, periods and contribution wording remain unchanged, including approximately 30 volunteers and more than 2000 participants. No organization name, exact Tech Fest dates, hackathon role or employment relationship is supplied by the data; none is inferred. EduNextG remains hidden. The timeline is now a compact server component, with the shared reduced-motion-aware section reveal replacing the separate animated track and articles.

Education uses the unchanged typed records: Sister Nivedita University's B.Tech, `Expected 2026`, CGPA `7.50`; ISC Class XII, `2023`, `86.9%`; and ICSE Class X, `2020`, `89.9%`. The featured degree and two school qualifications sit side by side on desktop and stack deliberately on mobile. Fixed minimum card heights and oversized internal padding are removed. The presentation preserves the supplied expected date without inferring current enrollment or graduation status.

Additional Dimensions holds the drawing credential in one compact panel. Leadership and hackathon achievements appear only in Experience; their duplicate cards are removed. About keeps its creative-interest story and links to `#dimensions`, where the complete credential is listed once. No genuine achievement is deleted from the source data.

Developer Presence reads the central project dataset and displays exactly three repository links in the approved order, along with a GitHub profile action, verified engineering highlights and technology badges for each project. It renders on the server and requires no contribution-count service, live API request or token. The Phase 4 gallery, screenshots, case-study data, routes and SEO remain unchanged.

#### Phase 5 verification

- `npm run lint`, `npm run build` and build-time TypeScript checks pass. All three case-study pages remain statically generated.
- Assert-based checks compare education, experience, creative and project source files to the preceding commit: all are unchanged. Public content checks confirm each leadership/hackathon highlight and full drawing credential appears once, EduNextG and retired projects are absent, and repository titles, order and URLs match the three selected projects.
- Production Chromium checks pass at 320, 375, 768, 1024 and 1440 px in light and dark themes with no page-level or section-content horizontal overflow. Desktop and mobile captures of each changed section were visually reviewed. Academic dates, institutions and results match the typed records.
- All eight filters pass keyboard activation, selected-state, focus retention, content and project-link assertions. Space resets to all categories, Tab reaches the filtered case-study link with visible focus, and Enter opens the case study. Touch checks cover filtering, project navigation and mobile navigation back to Education. About's creative-background anchor clears the fixed navbar.
- Automated axe WCAG A/AA scans report no violations in Skills, Experience, Education/Additional Dimensions and Developer Presence at 1440 and 320 px in both themes. With JavaScript disabled, all eight categories, factual records and repository links remain available. Reduced-motion checks pass, and the observed entrance sequence produces zero section layout-shift entries.
- No GitHub API or contribution-service resources are requested. No physical-device, Lighthouse or field Web Vitals result is claimed. Unverified experience details and the existing dependency-security release findings remain open; this phase does not merge, push or deploy.

### Phase 4 implementation and evidence

The gallery renders exactly three cards in the requested order. GharKaBite uses a wide featured layout; Co-Parenting and chess share the next desktop row. Every card includes its category, summary, primary stack, engineering highlights, case-study and repository links. Only the two supplied, publicly verified demo URLs appear. Cards and links are server-rendered; subtle reveals and image hover effects are optional enhancements.

`ProjectCaseStudy` now renders a strict discriminated union of six section types: text, list, features, workflows, architecture and deployment. Each dataset chooses its own headings and content. All three pages include a project hero, screenshot, technology groups, native collapsible section navigation, architecture/workflow diagrams where useful, repository/demo actions, back links and related-project navigation. `generateStaticParams`, metadata and the existing data-driven sitemap use the same publication guard. All three slugs are published; unsupported slugs remain 404s.

The case-study contribution sections describe the implementation scope visible in each repository. The sources do not establish individual team-member attribution, so no team size, exclusive authorship or numerical outcomes are asserted. Testing sections describe repository coverage and commands; the reference applications' full test suites were not executed for this presentation change.

Reference commits still match the lineup table. Phase 4 re-read the README and manifests for all three projects, plus GharKaBite's order/subscription services; Co-Parenting's audit, custody-overlap and expense-state-machine services and immutable-record/testing documentation; and chess's complete `App.tsx`, engine, scene and Vite configuration. This preserves manual UPI review, preview-only plan purchases, application-level audit boundaries, cube-surface movement, team safety, heuristic CPU behavior and the documented rules limitations.

#### Screenshot provenance

Captured on 5 November 2026 using isolated, unauthenticated Chromium sessions. No login was submitted, no protected screen was accessed, and no personal customer or family record was captured. The reference working trees remain unchanged. The three original 1440 × 900 captures were converted to WebP using the existing Sharp dependency, then visually inspected. No external application bundle is included in the portfolio.

| Asset | Authentic source | File size |
| --- | --- | --- |
| `public/projects/gharkabite.webp` | Public [GharKaBite storefront](https://gharkabite.vercel.app/), with an empty delivery input. | 83,964 bytes |
| `public/projects/co-parenting-coordinator.webp` | Public [Co-Parenting sign-in screen](https://co-parenting-coordinator.vercel.app/login), with empty credential fields. | 35,936 bytes |
| `public/projects/4d-chess.webp` | Initial four-player board from the read-only reference repository's supplied `dist/index.html`, served temporarily on loopback. | 87,706 bytes |

The 207,606 bytes of source media use `next/image` with responsive `sizes`, reserved aspect ratios, descriptive alt text and visible provenance captions. Case-study hero images are preloaded; gallery images use default lazy loading. A clearly labeled illustrative fallback remains available when media is absent. Co-Parenting has no approved authenticated dashboard capture, and chess has no verified hosted demo.

The generic mesh gallery added no useful project information, so Phase 4 removes `GalleryCanvas.tsx`, its unused CSS, `@react-three/fiber`, `three` and `@types/three`. Chess retains its verified Three.js technology badge and case-study explanation, while the portfolio itself needs no WebGL initialization or fallback machinery.

#### Phase 4 verification

- `npm run lint`, `npm run build` and build-time strict TypeScript checks pass. The production build statically generates all three case-study pages. The lockfile reflects the removed packages, and `npm ls` confirms they are absent.
- Production browser checks cover exact gallery count/order, source and conditional demo links, case-study routes, canonical/Open Graph/Twitter metadata, related-project navigation, section anchors, the four-entry sitemap, and unsupported/retired-slug 404s. The existing Next.js `Internal: NoFallbackError` log on unsupported slugs remains a baseline issue; HTTP responses are 404.
- Gallery and case-study layouts pass at 320, 375, 768, 1024 and 1440 px in both themes without page-level or project-content horizontal overflow. Desktop/mobile captures were visually reviewed. Keyboard activation, mobile Escape/focus restoration, and fixed-header anchor clearance pass.
- Chromium checks pass with WebGL disabled and JavaScript disabled: all three cards, images, links and native case-study section navigation remain usable. Actual `next/image` responses decode successfully. Reduced motion disables preview scaling. Automated axe scans report no WCAG A/AA violations in the gallery or the three case studies, including 320 px checks for each case study in both themes.
- The observed gallery reveal/image-loading sequence produces zero layout-shift entries, and no Three.js/gallery-canvas resources are requested. No Lighthouse score, field Web Vitals or physical-device result is claimed. The full release verification gate remains separate.

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

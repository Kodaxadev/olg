# Oviedo Law Group — concept by Kodaxa

A working, responsive concept translated from the two supplied AI-generated mockups. This is **not** the firm's authorized live website. Public hosting, current service claims, biographies, real portraits, and intake require firm approval.

## Run locally

Requires Node.js 22 or newer. No runtime or development npm dependencies, API keys, database, or paid services.

```sh
npm ci
npm run dev
```

Open **http://localhost:4173**. Source changes rebuild automatically; refresh the browser. Set `PORT` to change the local port. The local server binds to loopback only.

```sh
npm run check     # syntax checks, static build, and 19 structural tests
npm run build     # generated HTML and assets in dist/
npm run preview   # serve the built concept on localhost:4173
```

## Included

12 navigable pages plus a custom 404: homepage, practice-area index and four draft practice pages, attorney index and individual pages for J.R. Oviedo and Bradley Stevens, firm/about, contact, and design review. Mobile navigation supports keyboard Escape and focus restoration. Content is real HTML; navigation does not depend on a client-side router. Reduced-motion preferences are respected.

The provided mockups are included as optimized AVIF reference copies in `public/images/`. The conceptual office image is a crop from the homepage mockup, clearly labeled as AI-generated. The original full-resolution PNGs are supplied separately with the handoff archive; their source hashes are recorded in `design/assets.json`.

## Preview safeguards

Every page has a visible concept notice and noindex metadata. `robots.txt`, Vercel headers, and `_headers` preserve preview indexing restrictions. **Noindex is not authentication**: use hosting-level deployment protection when sharing privately. Do not point the firm's live domain here.

The contact form is disabled. No case information is collected, sent, or stored. There is no analytics, third-party font request, map embed, or external runtime asset request. A restrictive Content Security Policy blocks form submissions, network calls, and framing on configured hosts.

Generated attorney faces are retained only inside the labeled reference mockups. The actual profiles use intentional monogram placeholders. J.R.'s education in the generated inner-page mockup is incorrect; the implementation instead records the firm's published McGeorge information with an approval caveat. Bradley's education and current credentials are not invented.

## Edit with Spark

| Change | File |
| --- | --- |
| Names, phone, address, practice areas, draft biographies | `src/data.mjs` |
| Navigation, shared layout, cards, CTA, footer | `src/components.mjs` |
| Individual page structure | `src/pages/` |
| Routes | `src/routes.mjs` |
| Colors, type, spacing | `src/styles/base.css` |
| Shared component styling | `src/styles/components.css` |
| Page layouts | `src/styles/pages.css` |
| Mobile/tablet behavior | `src/styles/responsive.css` |
| Mobile navigation behavior | `public/app.js` |
| Content verification and launch gate | `docs/CONTENT-APPROVAL.md` |

Keep source files below 400 lines. Edit source, not `dist/`. Preview protections are deliberately **not** switched off by a single boolean: a production launch requires coordinated approval, metadata, header, privacy, and intake work.

## Vercel-ready, not deployed

Import `Kodaxadev/olg` as a **new review project**. Framework preset: **Other**. Build command: `npm run build`. Output directory: `dist`. Select Node.js 22.x. The included `vercel.json` supplies the static build and response headers. No environment variables are required. Use deployment protection for private review; do not replace the existing firm website.

## Verification

`docs/QA.md` records the checks performed. GitHub Actions is configured for the dependency-free build and structural tests. No live-firm domain, email account, database, DNS record, or existing deployment was changed.

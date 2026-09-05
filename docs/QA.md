# Verification record — initial concept

## Executed locally

- Node.js 22.16.0: `npm run check` passed all 19 tests.
- Thirteen generated HTML pages, including the custom 404.
- Twelve navigable pages rendered at four viewport widths: 375, 390, 768, and 1440 pixels — 48 page/viewport combinations without horizontal overflow.
- Mobile menu open/close, Escape dismissal, and focus restoration checked at three narrow viewports.
- Reduced-motion mode, disabled inquiry controls, image decoding, unique element IDs, one H1 per page, local links, and preview restrictions checked.
- Local HTTP responses, indexing headers, and the 404 response checked separately.

## Browser-test limitation

This environment blocks browser URL navigation. Visual and interaction checks used installed Chromium with the built HTML, identical local CSS/JavaScript, and image bytes loaded offline. Separate local HTTP checks exercised the server. These are not a live-deployment browser test, Safari/iOS test, screen-reader audit, Lighthouse measurement, or full accessibility conformance audit.

Screenshots and the JSON browser report are generated in `artifacts/` (ignored by Git) and included in the downloadable handoff. The optional `scripts/browser-check.py` reproduces the offline checks with Python Playwright and an available Chromium executable while `npm run preview` is running. Set `CHROMIUM_PATH` and `OLG_BASE_URL` as needed.

GitHub CI is configured for `npm run check`; a remote CI success should only be claimed after its actual workflow result is inspected.

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

## Imagery refresh — September 5, 2026

The original verification record above describes the initial build. The imagery refresh adds four local scene assets, a shared HTML image helper, photo subheroes, mobile image panels, and a dedicated stylesheet. Verification for this pass:

- `npm run check`: **25/25 tests passed**, including six new imagery tests. Thirteen HTML documents built (12 navigable pages plus the custom 404).
- `python scripts/browser-check.py`: **48 page/viewport pairs passed** at 375, 390, 768, and 1440 px; image decoding, overflow, and browser errors checked.
- Mobile navigation/Escape/focus restoration passed at three widths. Reduced-motion behavior, custom 404, disabled intake, and local HTTP preview restrictions passed.
- Desktop homepage/attorney and narrow-mobile homepage screenshots visually inspected. Mobile separates headline and image panels; desktop retains controlled overlays.
- Four image files total **63,359 bytes**. Manifest checks verify their hashes, dimensions, and AVIF signatures. New heroes use eager, high-priority HTML images; secondary images are lazy-loaded and dimensioned.
- The browser harness renders the built site through offline Chromium routing and performs separate local HTTP checks. These are not a live-host, Safari, screen-reader, Lighthouse, or full WCAG audit.
- Fixed the screenshot harness to reset scroll instantly after focusing/scanning page content; smooth scrolling had produced misleading full-page sticky-header captures.

No services, attorney credentials, form activation, tracking, production indexing, or DNS settings were changed. Firm approval remains required before an official launch.

# OLG project rules

- This is a Kodaxa concept, not an authorized live legal-services site.
- Preserve the navy / ivory / burgundy design and serif hierarchy; do not redesign unrelated sections during small fixes.
- Do not infer the firm's current services from an old website or a directory.
- Do not generate or publish fake attorney portraits, credentials, testimonials, results, client affiliations, awards, fee claims, or availability promises.
- Keep the visible concept notice, noindex metadata/headers, and disabled intake until the firm approves a separately reviewed production launch.
- Source factual copy in `docs/CONTENT-APPROVAL.md`. Use `src/data.mjs` as the single content registry.
- Do not add analytics, external embeds, fonts, database connections, or dependencies without a concrete approved need.
- Keep editable source files below 400 lines. Use the existing page/component structure.
- Run `npm run check` after changes. For layout changes, inspect desktop and narrow mobile output, keyboard navigation, and reduced motion.
- Do not edit generated `dist/` or change the existing firm's domain/DNS.

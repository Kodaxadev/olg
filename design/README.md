# Design reference custody

The two supplied homepage/attorney-page mockups establish the intended palette, typography, hierarchy, and editorial tone. They do not establish facts about the law firm.

- Homepage reference: `../public/images/homepage-concept.avif`
- Attorney-page reference: `../public/images/attorneys-concept.avif`
- Original office crop (retained as an archival asset, no longer used by the homepage): `../public/images/office-study.avif`
- Source and optimized asset hashes: `assets.json`

The repository contains optimized reference images. The full-resolution original PNGs accompany the downloadable handoff; they have not been silently represented as exact binary copies in GitHub.

## Important defects in the supplied artwork

The portraits are generated stand-ins, not verified photos of J.R. Oviedo or Bradley Stevens. The inner-page mockup assigns an unsupported San Joaquin College of Law credential to J.R.; the firm's published biography instead identifies University of the Pacific, McGeorge School of Law. Bradley's generated education and practice claims were not verified. Earlier image variations contained a different address and a stale copyright year.

Do not extract those faces for the real attorney pages. Do not copy embedded text indiscriminately. Monogram portrait placeholders remain until genuine photos and publication permission are supplied. The office artwork is conceptual, not the firm's office, and is labeled accordingly.

## Imagery refresh

Four additional scenes supplied and approved in the conversation are now self-hosted as AVIF files. These are lossy optimized derivatives, not the full PNG originals. `assets.json` records both original and derivative hashes, byte counts, and dimensions.

| Scene | File | Placement |
| --- | --- | --- |
| Executive office | `public/images/home-office.avif` | Homepage hero |
| Civic architecture | `public/images/civic-architecture.avif` | Attorneys, about, practice index, peace-officer and administrative pages |
| Foothills at dusk | `public/images/valley-dusk.avif` | Home/about values bands |
| Meeting room | `public/images/consultation-room.avif` | Contact, workers’ compensation, civil litigation, about supporting image |

All four files are 1440 pixels wide and total 63,359 bytes. Each is below 25 KB. A separate mobile download variant would offer limited benefit at these sizes; the layout instead uses intentional `object-position` values and a dedicated image panel below mobile hero copy.

`src/imagery.mjs` owns paths, dimensions, alt text, credits, and loading behavior. Hero images are ordinary eagerly loaded HTML images with high fetch priority. Secondary images are lazy loaded. `src/styles/imagery.css` supplies the overlay and crop rules without adding JavaScript, dependencies, or third-party requests.

These scenes are not verified pictures of the firm’s office, a courthouse, or a particular California landscape. Keep the visible conceptual-image labels and do not substitute generated faces for genuine attorney photography. No factual services, biographies, office information, or intake behavior changed in this refresh.

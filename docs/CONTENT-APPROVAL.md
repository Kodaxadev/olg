# Firm content approval gate

Prepared 2026-09-04. This build relies on supplied project discussion, mockups, and the previously retrieved firm website content. It is not a new credential, employment, practice-scope, or legal-compliance verification pass.

## Source map

| Item | Basis used | Status in this concept |
| --- | --- | --- |
| Firm name | Existing firm website: https://www.oviedolawgroup.com/ | Displayed; final firm review pending |
| 559-226-6200 | Existing firm website's published number | Click-to-call enabled; current handling unconfirmed |
| 401 Clovis Avenue, Suite 208, Clovis, CA 93612 | Existing site's office listing | Displayed with review caveat; old 1990 Shaw and invented 712 Pollasky excluded |
| J.R. Oviedo's published education and California admission year | https://www.oviedolawgroup.com/attorneys/ | Attributed as published; no claim of current license verification |
| Bradley Stevens as second profile | User reports a second lawyer; prior discussion identified Bradley and record 203893 | Profile included; current role and credentials await firm confirmation |
| State Bar verification lead for Bradley | https://apps.calbar.ca.gov/attorney/Licensee/Detail/203893 | Linked for review, not represented as newly checked |
| Law enforcement and workers' compensation | Existing site's public positioning | Draft practice categories; no claim of current case acceptance |
| Administrative hearings | Existing homepage discussion of administrative proceedings | Proposed standalone navigation category |
| Civil litigation | Existing J.R. biography | Proposed category; no invented business-law, injury, or other subpractice claims |
| Values, headlines, and process language | Original proposed design copy | Firm review required; not historical statements or guarantees |

## Must be supplied or approved by the firm

- Current attorney roster, preferred public names, titles, biographies, current admissions, and actual portrait files with permission to publish.
- The matters actively accepted now, excluded matters, intended clients, geographic reach, and approved service-page wording.
- Office addresses, Sacramento office status, telephone routing, hours, after-hours availability, languages, and consultation/fee policies.
- Whether any testimonials, results, associations, or awards may be used, with documented permission and factual support. None are included now.
- Intake contact, minimal collection fields, conflict-check process, retention/deletion process, privacy disclosures, and response expectations.
- Counsel-reviewed website notices and advertising review. Existing disclaimer language is not a substitute for that review.
- Approval to use business names, marks, real office photos, and any supplied portraits.

## Deliberate exclusions

No promise of confidential online intake, guaranteed outcomes, free consultation, 24/7 availability, certified specialization, active bar status, or confirmed current Sacramento office. No generated portraits presented as real people. No client case narrative or upload field. No copied old blog.

## Production transition checklist

1. Obtain written approval of the content registry and genuine portraits; remove draft language only for approved claims.
2. Implement and test a firm-approved intake workflow separately, including failure cases, spam controls, data handling, and notices. Never enable the current visual form by only removing `disabled`.
3. Perform counsel review and human accessibility testing. The automated checks here are not legal review or a WCAG certification.
4. Configure the approved production hostname, canonical URLs, absolute OpenGraph image/URL, and truthful structured data. Do not publish a guessed hostname or directory-generated attorney facts.
5. Coordinate robots.txt, per-page robots metadata, hosting X-Robots-Tag, and a sitemap after approval. Removing one restriction does not clear the others.
6. Test real hosting headers, routing, mobile browsers, calls, forms, error paths, and content before any DNS cutover.

The repository is public. Noindex is not secrecy. Keep confidential firm material and client data out of this repository and use hosting-level authentication for a private review deployment.

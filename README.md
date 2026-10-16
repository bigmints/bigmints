# Bigmints FZE

Product-company website for Bigmints, with Home, Products, Company, Innovation and Contact pages, plus six brand pages and four technology focus pages. React + Vite, pre-rendered to static HTML for GitHub Pages at https://www.bigmints.com.

## Work locally

- `npm ci`
- `npm run dev` — development server
- `npm run build` — TypeScript check, client build, server render, sitemap and robots.txt
- `npm run preview` — preview the completed static build

Deploy the `dist/` directory. The GitHub Pages workflow builds and deploys pushes to `master`. The production custom domain is `www.bigmints.com`; canonical URLs, sitemap and CNAME use that host.

## Content and design

The visual direction is black and white outside the homepage hero. The full-width hero is filled with drifting violet, blue and peach abstract shapes. A gentle, eased parallax follows mouse movement inside the hero and returns to center on exit. Touch input does not trigger parallax; pausing or reduced-motion preferences disable it. A pause control and static reduced-motion fallback remain available. The site uses with editorial serif headlines and restrained sans-serif text, informed by Modo Energy’s typography and aesthetics rather than its layout. Instrument Serif and DM Sans provide an open font pairing. The Bigmints wordmark uses self-hosted Syne 600, with its SIL Open Font License in `src/company/public/fonts/OFL-Syne.txt`. The header symbol scales with the wordmark at 1.2em: approximately 31px on desktop and 29px on mobile, matching the selected identity reference. Bigmints creates and grows its own brands; the site does not offer agency or client-project services. Product discovery is the primary action, with company enquiries and partnerships secondary. Content leads with intended user outcomes, with AI, IoT and digital twins as supporting context. Product statements come from repository capabilities, not invented measured customer results.

- `src/company/content.ts` owns company copy, contact destination, brand descriptions, external URLs and capability pages.
- `App.tsx` contains the company page, brand/capability page templates, navigation and interactions.
- `src/company/company.css` contains responsive styles and reduced-motion support.
- `src/company/public/` contains the company favicon, social preview and CNAME. Legacy personal-site assets are deliberately excluded from the company build.
- `scripts/prerender.mjs` renders fifteen crawlable pages, their canonical/social metadata, Organization/Brand/WebSite/WebPage/BreadcrumbList structured data, a noindex 404, sitemap and robots.txt.

The dedicated Contact page offers a company contact CTA that opens an email draft to the approved company address. The address is not displayed as page text; as with any mailto link, it remains discoverable in HTML. No contact form submission service or analytics has been added.

Primary navigation uses `/products/`, `/company/`, `/innovation/` and `/contact/`. Each has its own content, active navigation state, canonical metadata and structured breadcrumbs. The homepage leads with a centered sans-serif headline and italic serif accent, introduces all six identities in a compact brand strip, and presents their outcomes in a consistent product grid. Earlier company-preview bookmarks (`#brands`, `#company`, `#expertise`, `#contact`) redirect in the browser to their corresponding pages. The old personal-site hash router is no longer part of the active site. Brand pages use `/brands/{brand}/`; capability pages use `/expertise/{field}/`. Each URL has an actual HTML document and can be indexed without JavaScript. The personal blog and photography are retained in source and in the backup, but are not part of the company deployment. Historic personal hash URLs are not represented as company content; choose a future personal-site destination before adding any content-specific redirects.

## Personal website backup

`backup/personal-site-2026-10-12` points to `64cbeab71dbf8e3ecaf41dc75d9e6717d5e74008`.

This snapshot includes the tracked working-tree changes and the six new project/cover files that existed before the redesign. Local tooling metadata (`.serena/`), ignored files and dependencies are not part of the website snapshot. The original working-tree changes were left intact. The backup branch is retained on `origin` before the company website is published.

To inspect the original without disturbing current work:

```sh
git worktree add ../bigmints-personal backup/personal-site-2026-10-12
```

## Copy sources

Brand positioning was checked against local project sources on 12 October 2026:

| Brand | Source |
| --- | --- |
| Saveaday | `../saveaday-v2/README.md` and the existing Saveaday project record |
| Youbot | `../youbot/README.md` |
| Starcraft | `/Users/pretheesh/experiments/pi-design/README.md` — distinct from the older Spacecraft / AutoM8 project |
| PicoRunner | `../oven/picorunner-release-0.3.10/README.md` |
| Fikr | `../fikr-workspace/fikr/README.md` and the Fikr website source |
| Kachu | Existing Kachu project record with its product website URL |

AI, IoT and digital twins are company focus areas supplied by the owner. The digital-twin prototype provides supporting context, but its simulated telemetry is not presented as a live customer deployment. The site makes no invented customer, revenue, performance or scale claims.

Public brand destinations come from owner-provided URLs or project sources. Their live availability was not independently verified; web retrieval was unavailable during implementation.

## Multipage verification

Run `npm run build && npm run check:seo` before publishing. The SEO check also runs in the deployment workflow and checks metadata uniqueness, canonical URLs, rendered headings, brand ownership references, internal page/asset links, sitemap coverage, the noindex 404 and agent-reference consistency.

Search titles include each product's category; visible product summaries identify its purpose and relationship to Bigmints. Organization, Brand, WebSite, page, ItemList and breadcrumb entities use stable canonical IDs. IoT and digital twins remain explicitly described as prototypes and product research.

`/llms.txt` is a concise public company/product index linked in the footer. `/llms-full.txt` includes the corresponding public descriptions, features and source URLs. Both are generated from `src/company/content.ts` on every build; edit that source instead of generated files. These are optional reference files for agents, not an indexing or ranking guarantee. Do not add private product details or contact addresses to them.

The existing wildcard robots policy permits crawlers; no separate AI-training policy change was made. Google says the same SEO fundamentals apply to AI search and no special AI text file or schema is required: [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

For indexing measurement, the site owner can submit `https://www.bigmints.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools, inspect the home/company/product URLs and monitor impressions, queries and indexed pages. Console ownership and sitemap submission have not been verified from this repository. Do not invent verification tokens or report submissions without confirmation from those services.

The production build generates nineteen pages plus a noindex 404. The completed output was checked for unique titles, one H1 per page, canonical URLs, valid structured breadcrumbs, internal links and anchors, sitemap coverage and no visible contact email. Browser checks covered top-level navigation, direct product-page loading, mobile navigation, contact presentation and the earlier `#brands` bookmark.

## Online presence

Bigmints is the brand name of Bigmints FZE. Keep that identity and the description “technology product company” consistent across the website and company profiles. Public copy should connect the company to Saveaday, Youbot, Starcraft, PicoRunner, Fikr and Kachu.

The confirmed company profile is [BigMints on LinkedIn](https://www.linkedin.com/company/bigmints/), which links back to the company domain. Its URL is maintained in `company.profiles` in `src/company/content.ts`; the site renders it on the Company page and footer and includes it in Organization `sameAs` and both generated agent reference files. Add further profiles only after verifying company ownership. The Organization also includes the public brand and legal-name variants and identifies `/company/` as its main page. See [Google’s organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization).

Search Console was checked on 16 October 2026 using the existing `bigmints.com` domain property. At that time its overview reported one indexed page, and URL inspection reported `/company/` as unknown to Google. The live sitemap was submitted successfully at `https://www.bigmints.com/sitemap.xml`; Search Console reported **Success** and **19 discovered pages**. Discovery is not confirmation of indexing. A separate manual indexing request for `/company/` failed because Search Console could not connect to its reCAPTCHA service. Retry from URL Inspection when that service is available; the accepted sitemap remains in place.

The LinkedIn tagline and About description identify Bigmints FZE and explain all six products. The About copy retains “Make work easier. Make room for life.” as its opening. On 16 October 2026, the public profile was checked with the HTTPS website URL, Software Development industry, the website’s woven logo and a cover using large Instrument Serif headlines over the website’s violet, peach and blue palette. The cover reserves space for LinkedIn’s overlapping logo and was checked in the member view after saving. The old retail specialties were removed, and Product Development, Artificial Intelligence, Product Design, Software Development, Digital Twins and Internet of Things (IoT) were saved individually. LinkedIn rejected bulk specialty updates with a concurrent-edit error; saving one change per freshly loaded revision succeeded. The logo upload succeeded using `brand/profile-avatar.jpg`, a JPEG copy of the same approved PNG artwork.

The owner confirmed that Bigmints operates online only. It is therefore ineligible for a Google Business Profile under [Google’s eligibility rules](https://support.google.com/business/answer/3038177); do not create a Maps listing using its registration address. The signed-in Google account also manages an unverified Bapp profile, which is a separate product profile.

Meta’s Authorizations and verifications workflow reported **Bigmints FZE — In review** on 16 October 2026. This is the organization verification offered through the business portfolio’s advertiser authorizations; it is not confirmation of a paid Meta Verified badge or approval of every Meta verification program. Legal verification documents remain outside this public repository.

## Brand identity

An optional colour edition uses a continuous violet, blue, pink and peach gradient across the same woven geometry. The transparent symbol is `brand/bigmints-mark-color.svg`; `brand/bigmints-logo-color.svg` and `brand/bigmints-logo-color-white.svg` pair it with dark or white Syne text. Preview both backgrounds and small sizes in `brand/bigmints-identity-color.svg`. These are generated by `scripts/generate-logo.py`; the website continues to use the monochrome identity.

The selected Bigmints mark is the **woven, five-part emblem** from the “A connected whole” identity reference. Its path geometry is preserved in `design/previous-identity/woven-mark.svg` and reused by the generator, with slightly stronger strokes and adjusted crossing gaps for clarity at small sizes. The emblem-to-text ratio matches the selected reference; the Syne wordmark is retained. This is the approved design direction; formal trademark clearance remains pending. Black and white SVG versions and an identity sheet are in `src/company/public/brand/`. The mark is used in the header, footer, favicon, Organization metadata and social preview. Run `python3 scripts/generate-logo.py` from the repository root to regenerate the SVG geometry. The script also generates the editable `brand/profile-avatar.svg`, `brand/profile-cover.svg` and `brand/social-preview.svg`; render it in a browser at exactly 1200 × 630 pixels and export a PNG to update `og-image.png` (the local ImageMagick SVG renderer drops the stroked mark). The earlier woven concept is archived in `design/previous-identity/`, and the three-option comparison remains in `design/logo-options/`.

Render `brand/profile-cover.svg` in a browser at exactly 1128 × 191 pixels, wait for its embedded fonts to load, and export `brand/profile-cover.png` for LinkedIn. Its regular and italic Instrument Serif font sources and SIL Open Font License are in `src/company/public/fonts/`. Browser rendering preserves the embedded typefaces reliably.

### Product logos

The site uses existing product artwork, stored locally in `src/company/public/brand/products/`. CSS presents the assets in monochrome without modifying the source artwork. Logos appear in product cards, the homepage brand strip, product detail pages, related products and contact links, and are included in Brand structured data.

| Product | Asset source |
| --- | --- |
| Saveaday | `../saveaday-v2/apps/web/public/logo.svg` |
| Youbot | `../youbot/youbot-core/branding/youbot.svg` |
| Starcraft | SVG geometry exported from `/Users/pretheesh/experiments/pi-design/apps/desktop/src/renderer/StarcraftLogo.tsx` |
| PicoRunner | `../oven/picorunner-release-0.3.10/public/brand/symbol.svg` |
| Fikr | `../fikr-workspace/fikr.one/public/fikr-logo.svg` |
| Kachu | `../kir/catchup-website/public/kachu-icon.png` |

## Product case studies

The hero links to `/case-studies/`, with three own-product studies for Saveaday, Starcraft and PicoRunner. Copy is maintained in `src/company/content.ts`. These describe documented workflows and product intent, not customer deployments or measured results. Saveaday is explicitly labelled product development; no synthetic demo data is presented as customer evidence.

Sources: Saveaday v2 README (customer, booking, follow-up and permission workflows), Starcraft's `pi-design/README.md` (preview, annotations, attachments and review loop), and `picorunner-release-0.3.10/README.md` (catalogue, launch controls, local imports and supported update recovery). Source paths are listed in the product evidence table above. Reviewed 2026-10-13.

Each study is statically rendered with its own canonical URL, metadata, Article and breadcrumb entities, and entries in the sitemap and agent reference files. The SEO check verifies article copy against both rendered content and the full text reference.

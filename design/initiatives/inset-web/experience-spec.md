---
schema_version: 1
initiative: inset-web
revision: EX-0004
status: approved
source_product_revision: PD-0001
updated: 2026-07-15
approved_by: user
approved_at: 2026-07-15
---

# Inset Web Experience Specification

## 0. Scope and source of truth

This specification translates the approved Product Definition `PD-0001` into the public site's information architecture, visitor flows, screens, states, and content needs. It covers English and Japanese together. It does not approve a visual direction or production implementation.

- Product intent and claims: `design/product-definition.md`
- Experience behavior: this document
- Visual truth after selection: `design/inset-web.pen`
- Public product truth: verified App Store version and approved product evidence only

## 1. Experience principles

1. **Answer before atmosphere.** Every entry page begins with a direct explanation of the question it owns, then uses real output or public UI as proof.
2. **The photograph is the evidence.** Finished images and public app UI carry more visual weight than decoration, device chrome, icons, or marketing cards.
3. **One primary action per screen.** The conversion action is the verified iPhone App Store destination. Related pages and Support remain secondary.
4. **Detail has a home.** Home tells the product story; Features explains capabilities; How it works explains the process; Frames explains the result and frame structure; FAQ gives short direct answers.
5. **Platform status is literal.** iPhone is available. Android is rendered as a disabled, non-interactive Google Play `Coming Soon` status with no store link, release date, or parity claim.
6. **Core access is static.** Headings, answers, navigation, language links, legal content, release content, and the App Store action remain available without JavaScript.
7. **Locale is chosen, not forced.** English and Japanese have explicit stable URLs. The site does not automatically redirect by browser language.
8. **Motion is optional explanation.** Motion may clarify layering, comparison, or navigation state, but no task depends on it.

## 2. Information architecture

### 2.1 Locale model

- English is the root language and `x-default`.
- Japanese mirrors the canonical English structure under `/ja/`.
- Each locale page links to its exact semantic counterpart with ordinary HTML links.
- The language switch never sends a visitor back to Home when an equivalent page exists.
- Release language switching preserves the requested version.
- Missing locale counterparts are build errors for all in-scope pages.

### 2.2 Screen and route map

`SCR-*` identifies a semantic screen. English, Japanese, desktop, and mobile are variants of the same screen rather than separate screens.

| Screen | Purpose | English | Japanese |
| --- | --- | --- | --- |
| `SCR-001` Home | Explain, prove, and convert | `/` | `/ja/` |
| `SCR-002` Features | Explain what the public product can do | `/features/` | `/ja/features/` |
| `SCR-003` How it works | Explain the selection-to-export process | `/how-it-works/` | `/ja/how-it-works/` |
| `SCR-004` Frames | Show finished treatments and how frames are composed | `/frames/` | `/ja/frames/` |
| `SCR-005` Pricing | Explain free basics and paid Inset Lab without fixed regional prices | `/pricing/` | `/ja/pricing/` |
| `SCR-006` FAQ | Give short, indexable answers to common questions | `/faq/` | `/ja/faq/` |
| `SCR-007` Support | Route existing users to self-service and verified contact help | `/support/` | `/ja/support/` |
| `SCR-008` Privacy | Present controlled privacy text | `/privacy/` | `/ja/privacy/` |
| `SCR-009` Terms | Present controlled terms text | `/terms/` | `/ja/terms/` |
| `SCR-010` Releases | List verified public releases | `/releases/` | `/ja/releases/` |
| `SCR-011` Release detail | Explain one verified public version | `/releases/[version]/` | `/ja/releases/[version]/` |
| `SCR-012` Not found | Recover from a missing route while returning HTTP 404 | route-contextual | route-contextual |

`SCR-010` is a recommended addition to the original route list. It prevents dead ends from unknown or old release URLs and gives Support, language switching, and the 404 screen a stable recovery target.

### 2.3 Compatibility endpoints

The following are delivery contracts, not primary navigation destinations:

- `/announcements.json`
- `/roadmap.json`
- `/privacy.html`
- `/terms.html`
- `/releases/*.html`
- the currently published GitHub Pages URLs referenced by released app versions

Compatibility HTML either redirects to the corresponding canonical locale page when that is safe for the released app contract, or is generated from the same structured source. JSON schemas and stable announcement IDs are preserved exactly.

### 2.4 Global navigation

#### Wide header

- Inset mark or wordmark → `SCR-001`
- Features → `SCR-002`
- Frames → `SCR-004`
- How it works → `SCR-003`
- Pricing → `SCR-005`
- Language counterpart link
- Primary iPhone App Store action

Support, FAQ, Privacy, Terms, and Releases remain consistently available in the footer. This keeps the header focused and prevents a crowded multi-line navigation bar.

#### Compact header

- Inset mark or wordmark
- Primary iPhone App Store action
- Native HTML `details` menu containing the complete navigation and language counterpart

The compact menu expands in document flow rather than as a focus-trapping overlay. Its links work without JavaScript, the summary has a text label, and the open state does not cover page content.

#### Footer

- Product: Features, Frames, How it works, Pricing
- Help: FAQ, Support, Releases
- Legal: Privacy, Terms
- Language counterpart
- Platform availability: iPhone available; Android `Coming Soon`
- Developer identity and current copyright text from verified data

### 2.5 Internal-linking rules

- Every detailed page links back to Home and forward to the iPhone App Store.
- Features links to the corresponding How it works and Frames sections.
- How it works links to the feature it demonstrates and relevant FAQ answers.
- Pricing links to subscription or purchase FAQ answers and Support.
- FAQ answers link to the authoritative detailed page instead of duplicating long explanations.
- Support links to FAQ, Privacy, Terms, Releases, and the verified contact method.
- Unknown release versions recover through `SCR-012` to `SCR-010`.

## 3. Visitor flows

### 3.1 Flow inventory

| Flow | Visitor intent | Entry | Successful outcome |
| --- | --- | --- | --- |
| `FLOW-001` | Understand and install Inset | Home, social, brand search | Visitor understands the product and opens the iPhone App Store |
| `FLOW-002` | Answer a feature or workflow question | Features, How it works, FAQ, search anchor | Visitor gets a direct verified answer and can inspect proof |
| `FLOW-003` | Explore possible frame treatments | Frames or a linked Home section | Visitor understands the frame/layer model and sees real output |
| `FLOW-004` | Understand free versus Inset Lab | Pricing or pricing FAQ | Visitor understands the boundary without an incorrect fixed price |
| `FLOW-005` | Check Android availability | Search, Home platform section, FAQ, footer | Visitor learns that Android is in preparation and not yet available |
| `FLOW-006` | Get help or inspect policy | Support, Privacy, Terms | Visitor self-serves or reaches a verified support method |
| `FLOW-007` | Verify a released version | Release URL, announcement, Support | Visitor sees a public release or recovers to the release list |
| `FLOW-008` | Change language | Any in-scope page | Visitor stays on the equivalent page and version |
| `FLOW-009` | Recover from a bad URL | Any missing route | Visitor receives a true 404 and chooses a useful destination |

### 3.2 Primary flow: `FLOW-001`

1. **Recognize.** `SCR-001` immediately says that Inset is an iPhone app for finishing the space and frame around a photograph. The first visual is a real finished image, not a fabricated UI.
2. **Understand control.** A public UI plus its matching output explains that multiple margin layers can each control color, width, and ratio.
3. **Trust the export.** A concrete explanation connects the visible preview with full-resolution export.
4. **See repeatability.** Presets and verified batch behavior explain how a look can be reused.
5. **Understand expression.** Approved finished outputs show distinct Inset Lab 35mm, polaroid, and film treatments without inventing settings or entitlement details.
6. **Resolve objections.** A short FAQ answers free-versus-Lab, export, repeatability, and Android status without a standalone Home pricing block.
7. **Act.** The visitor opens the verified iPhone App Store URL from the Hero or final store actions.

The App Store action is always labeled as an iPhone destination. The adjacent Google Play treatment is visibly disabled, has no `href` or click behavior, and says `Coming Soon`; the site does not imply that the iPhone action installs an Android app.

### 3.3 Feature-answer flow: `FLOW-002`

1. A search result lands on the owning page or a stable section anchor.
2. The page gives a direct answer before the visual or marketing explanation.
3. Real public UI or output proves the answer when approved evidence exists.
4. Related links provide either process detail (`SCR-003`), visual examples (`SCR-004`), or a short FAQ answer (`SCR-006`).
5. The visitor may continue to the iPhone App Store or Support.

If a claim is not verified for the current public version, it is excluded from the generated page. It is never replaced with vague teaser copy.

### 3.4 Frames discovery: `FLOW-003`

1. Visitor enters `SCR-004` from search, Home, or Features.
2. A concise definition explains that a frame is built from one or more adjustable margin layers.
3. Large approved outputs show distinct verified treatments. Each example has an accessible caption naming the treatment without inventing settings that are not evidenced.
4. Matching public UI demonstrates how at least one treatment is constructed.
5. The page links to the step-by-step process and iPhone App Store.

### 3.5 Pricing and Inset Lab: `FLOW-004`

1. `SCR-005` begins with the stable rule: basic features are free; Inset Lab is a paid addition.
2. A verified entitlement map explains included capabilities without showing a region-specific fixed price.
3. The page tells visitors to confirm current offers and local pricing in the App Store or app.
4. Purchase, restore, renewal, and cancellation questions link to verified FAQ answers or Support.
5. Android pricing is not implied. The Android status appears separately as `Coming Soon`.

If the entitlement map or purchase model cannot be verified at build time, publication stops rather than presenting an incomplete or guessed comparison.

### 3.6 Android availability: `FLOW-005`

1. Search, Home, FAQ, or footer exposes a plain-language platform answer in static HTML.
2. English and Japanese display a disabled Google Play store treatment with `Coming Soon` as a platform status, not an install action.
3. Supporting copy says that preparation is underway and that a public date has not been announced.
4. No live Google Play link, notification signup, price, feature-parity statement, or Android structured-data availability is emitted before verification.

The `coming_soon` state is generated from one platform-status record. On verified launch, that record changes to `available`, receives the confirmed Google Play URL, and triggers a content and structured-data review before publication.

### 3.7 Support, policy, and releases: `FLOW-006` and `FLOW-007`

- Support starts with self-service destinations, then shows the verified contact method.
- Privacy and Terms keep controlled text, locale, effective date, and change history separate from marketing copy.
- Releases lists only public versions. A release detail page shows version, public date, verified notes, approved media, links to adjacent releases, and the iPhone App Store.
- An unknown or unpublished version returns `SCR-012` with HTTP 404 and a path to `SCR-010`.
- Legacy release HTML remains available for released app references but is not the canonical page in normal navigation.

### 3.8 Language and error recovery: `FLOW-008` and `FLOW-009`

- Locale changes use ordinary links and preserve screen, section anchor, and release version when a counterpart exists.
- Automatic browser-language redirects are not used.
- Missing required counterparts stop the build.
- Missing paths return HTTP 404, not a soft-404 page with status 200.
- The 404 screen offers Home, Features, Support, Releases, and a locale counterpart.
- For a missing `/ja/` path, the response is Japanese; other missing paths use English/x-default.

## 4. Screen specifications

### `SCR-001` Home

**Purpose:** Establish what Inset does, prove the result and precision, resolve the main adoption questions, and provide the iPhone App Store action.

**Section sequence:**

1. Global header
2. Hero: one direct H1, one supporting explanation, App Store plus disabled Google Play `Coming Soon`, and one approved finished image
3. Layers and full resolution: public UI paired with a black outer mat, white inner mat, approved photograph, and a concrete explanation
4. Presets and batch: a repeatability statement, direct functional explanation, and three distinct photographs
5. Creative frames: approved finished outputs showing distinct verified 35mm, polaroid, white film, and black film treatments, paired with an explicit Inset Lab description
6. FAQ preview: three to five high-intent questions, including free-versus-Lab and Android availability
7. Final store actions: Inset icon, App Store, and disabled Google Play `Coming Soon`; no additional marketing headline
8. Global footer

**Content needs:** short locale-specific Hero copy, verified App Store URL, campaign parameter, approved Hero image, paired UI/output evidence, verified feature and entitlement records, platform-status record, selected FAQ records, image alt text and captions.

**States:** normal image, slow or unavailable image, light, dark, reduced motion, no JavaScript, compact and wide navigation. Text and action remain usable in every state.

### `SCR-002` Features

**Purpose:** Answer “what can Inset do?” with verified public capabilities rather than repeating the Home narrative.

**Required content:**

- Direct introductory answer
- Adjustable margin-layer model: color, width, ratio, and stacking
- Crop and composition controls
- Preview and full-resolution export relationship
- Preset reuse and verified batch capability
- Inset Lab labels only where the current entitlement map supports them
- Real public UI and matching output for each major capability where approved evidence exists
- Related links to the exact How it works step, Frames example, FAQ answer, and iPhone App Store

Feature headings receive stable anchors for search and internal linking. No unreleased feature appears as “coming soon” on this page.

### `SCR-003` How it works

**Purpose:** Answer “how do I finish a photo with Inset?” as a short, complete process.

**Core sequence:**

1. Choose a photo
2. Choose or add margin layers
3. Adjust color, width, ratio, and crop while viewing the result
4. Export the visible result at full resolution
5. Optionally save or reuse the treatment with verified preset or batch behavior

Each step has a direct heading, short explanation, approved public UI, result or caption, and stable anchor. This is explanatory content, not a fabricated interactive editor. The entire sequence reads correctly when images, motion, or JavaScript are absent.

### `SCR-004` Frames

**Purpose:** Let visitors judge the visual outcomes and understand that frames are composable margin layers, not fixed decorations.

**Required content:**

- Direct definition of a frame in Inset
- Large approved finished outputs with meaningful captions
- A layer breakdown connecting one public UI state to one finished output
- Verified treatments or collections only; names and settings must have public evidence
- Link to the corresponding How it works step
- iPhone App Store action

This page is a curated product gallery. It does not imply a user gallery, downloadable template marketplace, or Web editor.

### `SCR-005` Pricing

**Purpose:** Explain the durable commercial boundary without presenting a stale or region-specific price.

**Required content:**

- Direct statement: basic features are free and Inset Lab is a paid addition
- Verified feature/entitlement comparison
- Explanation that current offers and local prices are shown in the App Store or app
- Separate iPhone availability and Android `Coming Soon` status
- Verified purchase, restore, cancellation, and billing FAQ links
- Support link and iPhone App Store action

The page does not use a fake “most popular” tier, annual savings claim, trial length, fixed currency value, or Android price unless each fact is reverified for publication.

### `SCR-006` FAQ

**Purpose:** Give short, quotable, visible answers and route visitors to authoritative details.

**Question groups:** product and compatibility, frames and editing, export, pricing and Inset Lab, privacy, Android availability, troubleshooting and Support.

- The first sentence answers the question directly.
- Native `details` and `summary` may progressively disclose longer answers without JavaScript.
- All answer text remains in the rendered HTML.
- FAQ JSON-LD is emitted only for questions and answers visibly present on the page and is generated from the same record.
- Each answer links to a detailed page when more context is useful.
- Client-side FAQ search is not part of the initial release.

### `SCR-007` Support

**Purpose:** Help existing users self-serve and provide one verified escalation route.

**Required content:**

- Quick links to relevant FAQ groups
- Links to How it works, Pricing, Privacy, Terms, and Releases
- Verified support contact method
- A short list of useful diagnostic details a user may include, without collecting them through a new Web form
- Current public app version and OS requirement only when preflight verifies them

If the contact destination is missing or unverified, the build stops. A generic nonfunctional contact control is not rendered.

### `SCR-008` Privacy and `SCR-009` Terms

**Purpose:** Present controlled legal content with high readability and stable canonical URLs.

**Required content:** locale title, concise scope statement, table of contents for long text, controlled legal body, effective or last-updated date, verified contact route, and global footer.

These pages do not insert promotional claims into the legal body. Marketing layout may improve readability but cannot silently rewrite, merge, or omit the separately controlled legal source.

### `SCR-010` Releases

**Purpose:** Provide a stable, searchable list of public versions and recovery target for old or invalid release links.

**Required content:** newest-first public release list, version, public date, short verified summary, link to each localized detail page, current public release marker, and Support link. Draft, TestFlight, local, and unreleased versions are excluded.

### `SCR-011` Release detail

**Purpose:** Explain one verified public version and preserve announcement deep links.

**Required content:** version, public date, verified release notes, approved screenshots when available, previous/next public release links, Releases index, Support, and iPhone App Store action. The same version record generates both locale pages and any required compatibility HTML.

### `SCR-012` Not found

**Purpose:** State that the requested page does not exist and provide useful recovery without masquerading as valid content.

**Required content:** localized 404 heading and explanation; Home, Features, Support, and Releases links; language counterpart; global brand identity. It returns HTTP 404, is excluded from the sitemap, and uses `noindex`.

## 5. Cross-screen state model

| State dimension | Values | Required behavior |
| --- | --- | --- |
| `locale` | `en`, `ja` | Exact counterpart links; natural local copy and line breaks; no automatic redirect |
| `theme` | `light`, `dark` | Follow system preference; use semantic tokens; preserve image legibility and contrast independently |
| `motion` | `standard`, `reduced` | Standard may explain layering with transform/opacity; reduced shows the complete static state |
| `javascript` | `available`, `unavailable` | Core content, navigation, language, FAQ, legal, release, and App Store actions remain usable |
| `navigation` | `wide`, `compact-closed`, `compact-open` | Predictable order; 44px minimum targets; no content-covering compact menu |
| `asset` | `verified`, `optional-missing`, `required-missing` | Optional missing keeps text/caption and reserved geometry; required missing stops the build |
| `platformAvailability.ios` | `available` | Show verified iPhone App Store action and current support statement |
| `platformAvailability.android` | `coming_soon`, future `available` | Current state shows text only; future available state requires verified Play URL and content/schema review |
| `releaseExistence` | `public`, `missing-or-unpublished` | Public renders detail; missing/unpublished returns localized true 404 |
| `externalCtaAvailability` | `verified`, `missing` | Verified renders a normal link; missing stops the production build |
| `claimVerification` | `verified-public`, `unverified-or-local` | Verified claims render; unverified/local claims are excluded and fail preflight if required by a page |

### 5.1 Image failure behavior

- Every meaningful image has explicit dimensions or aspect ratio, alt text, and an optional visible caption.
- Critical Hero and proof assets are build dependencies; missing files fail the build.
- If an already-built optional image fails at runtime, reserved geometry prevents layout shift and the adjacent explanation still answers the question.
- The site never substitutes an unapproved stock photo, generated photo, or fabricated app UI.

### 5.2 Motion behavior

- Static layout is the baseline design state.
- Motion is limited to one or two explanatory moments per view and uses opacity or transforms.
- No scroll-jacking, forced parallax, long route-transition overlay, autoplay audio, or animation-dependent reveal is allowed.
- Interaction transitions target 150–300ms; content remains immediately readable.
- `prefers-reduced-motion: reduce` removes nonessential animation and presents the end state.

### 5.3 Navigation and focus behavior

- A skip link moves keyboard focus to the main landmark.
- Tab order follows document order and every interactive element has a visible focus state.
- Route changes use normal document navigation, so browser history and the Back button remain predictable.
- The compact menu uses native HTML disclosure in document flow rather than a custom modal, removing the need for a JavaScript focus trap.
- On-page anchors account for any sticky-header offset and place the section heading in view.

## 6. Content and data needs

The names below describe logical entities. Implementation filenames are selected later, but HTML, JSON, compatibility pages, metadata, and schema must share these records.

| Entity | Required fields or rules |
| --- | --- |
| Site identity | product name, developer Person, canonical origin, app icon, verified store identifiers |
| Localized page copy | locale, screen ID, title, description, H1, section copy, CTA labels, natural line-break hints only where necessary |
| Claim ledger | claim ID, localized wording, public-version evidence, verification date, owning screen, publication state |
| Features | stable ID, public capability, entitlement if verified, anchors, proof asset references, related FAQ and process step |
| Frame examples | stable ID, localized caption, approved output, optional matching public UI, evidence and rights state |
| Pricing/entitlements | stable tier boundary, verified feature mapping, last verification date; no hard-coded regional amount |
| Platform status | platform, state, localized message, verified store URL when available, last verification date |
| FAQ | stable ID, localized question and exact visible answer, related page, schema eligibility |
| Support | verified contact destination, self-service links, current compatibility facts, last verification date |
| Legal | controlled locale body, effective date, source revision, compatibility-page mapping |
| Releases | public version, public date, localized notes, approved media, current flag, legacy URL mapping |
| Asset manifest | file, purpose, locale applicability, approval state, rights state, dimensions, alt/caption records |
| SEO metadata | localized canonical route, title, description, OG/X asset, hreflang counterpart, sitemap inclusion |
| Compatibility | legacy route, response behavior, canonical target, source record, wire-format test fixture |

### 6.1 Build-stop conditions

Production output is invalid if any of the following occurs:

- A required English or Japanese page or semantic counterpart is missing.
- The iPhone App Store URL, support contact, required approved asset, or canonical origin is missing.
- A page requires a claim without current public-version evidence.
- Android is `coming_soon` while a live Google Play action or Android-available structured-data value is emitted.
- A draft, TestFlight, local, or unreleased version is emitted as a public release.
- FAQ JSON-LD differs from the visible localized answer.
- A legacy JSON fixture changes shape or stable IDs unexpectedly.

## 7. Search and AI retrieval contract

- Each canonical page has one purpose, unique title, description, and H1.
- English and Japanese counterparts emit mutual `hreflang`; English also emits `x-default`.
- The first paragraph answers the page's main question directly.
- Stable section anchors support precise search and internal links.
- `WebSite`, `MobileApplication`, and developer `Person` JSON-LD use only verified public facts.
- Android is not listed as an available operating system until verified release.
- FAQ schema uses the same localized record as the visible answer.
- Release pages state version and public date as text, not only metadata.
- Meaningful images have descriptive alt text; decorative frames use empty alt.
- No hidden “AI summary,” keyword block, or alternate crawler-only copy is generated.
- Canonical pages are indexable; preview builds and the 404 response are `noindex`.

## 8. Responsive and accessibility contract

- Validate at 390px, 430px, 1280px, and 1440px; use 375px as an additional small-phone guardrail.
- Mobile prioritizes the answer, proof, and primary action before secondary navigation.
- Body text is at least 16px on mobile and remains readable at 200% zoom.
- Long-form body measure targets roughly 60–75 characters on wide screens and 35–60 on compact screens.
- Interactive targets are at least 44×44px with at least 8px separation where targets are adjacent.
- Semantic landmarks, sequential headings, link text, native controls, and a skip link are required.
- Light and dark themes are audited independently for WCAG 2.2 AA contrast.
- Meaningful product images receive descriptive alt text that states the demonstrated result, not visual filler.
- Color, animation, hover, and image content are never the only way to communicate a fact or action.
- No horizontal scrolling is permitted at target widths or with 200% text enlargement.

## 9. UX validation walkthrough

| Task | Walkthrough result | Gap found | Correction in EX-0001 |
| --- | --- | --- | --- |
| First visit to iPhone App Store | Home moves from direct definition to real result, control, export, repeatability, objections, and action | Generic App Store patterns could obscure the product and confuse Android visitors | App Store action is explicitly for iPhone; Android is a separate text status |
| Feature search to answer | Search lands on an owning page or stable anchor with the answer first | Repeating the same marketing copy across pages would weaken search intent | Distinct ownership assigned to Features, How it works, Frames, and FAQ |
| Frame exploration | Frames connects outputs to the margin-layer model and public UI | A gallery alone could imply fixed templates or user-generated content | Page explicitly explains composable layers and excludes gallery/marketplace claims |
| Pricing and Lab | Pricing states the durable free/paid boundary and links to current store information | Fixed prices, trial details, or unclear entitlement could drift | Verified entitlement record required; unresolved mapping stops publication |
| Android status check | Home, FAQ, and footer expose the same static answer | A Play treatment could imply availability if it behaves like a link | Disabled, non-interactive Google Play `Coming Soon` status from a single platform record; no URL, date, or notification flow |
| Support and legal | Support routes to self-service, controlled legal pages, releases, and contact | FAQ/Support duplication and legal source drift | Page roles separated; verified contact and controlled legal revision required |
| Release deep link | Public version opens a detail; invalid version returns true 404 | Original route set had no stable recovery destination | Added recommended `SCR-010` Releases index in both locales |
| Language switch | Ordinary counterpart link preserves screen, anchor, and release version | Home fallback or JS-only switching would lose context | Missing counterparts stop the build; no automatic redirects |
| No-JS mobile navigation | Native disclosure menu exposes all routes and language | Custom drawer would need JavaScript and focus recovery | Compact menu stays in document flow using native HTML |
| Missing image or URL | Required dependencies fail build; optional media keeps text and geometry | Silent blank proof or nonfunctional CTA could trap the visitor | Explicit asset and external-action states plus build-stop conditions |
| Bad URL recovery | Localized true 404 links to useful stable destinations | Soft 404 or missing release version could become a dead end | `SCR-012` with Home, Features, Support, Releases, and locale switch |

## 10. IA approval gate

The following decisions must be approved before visual directions are created in Pencil:

1. The screen tree and route ownership in section 2, including the recommended `/releases/` and `/ja/releases/` index pages.
2. `FLOW-001` as the primary Home narrative and conversion sequence.
3. Header focus on Features, Frames, How it works, Pricing, language, and the iPhone App Store; Support and legal destinations remain in the footer and compact menu.
4. Android status appears in Home and final store actions as a disabled, non-interactive Google Play `Coming Soon` treatment, and in FAQ/footer as plain status copy, with no Play URL or date.
5. Compact navigation uses a no-JavaScript disclosure rather than a custom modal drawer.

## 11. Approval

- Draft `EX-0001` created from approved Product Definition `PD-0001` on 2026-07-15.
- 2026-07-15: The user approved the information architecture, `FLOW-001`, and the localized Releases index proposal.
- 2026-07-15: Revised to `EX-0002` from explicit user feedback: Home uses three feature blocks, folds free-versus-Lab into FAQ, and shows Google Play as a disabled `Coming Soon` status.

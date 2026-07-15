---
schema_version: 1
initiative: inset-web
status: active
updated: 2026-07-15
---

# Inset Web Initiative Brief

## Classification

- Intent: redesign, visual overhaul
- Scope: product website and landing page system
- Preserve: product truth, brand invariants, legal text, public URL contracts, JSON wire contracts, approved assets
- Replace: previous unapproved Web concepts and the current site visual language
- Evidence: product repository, feature ledger, public App Store, approved iOS/App Store/SNS images, current site repository
- Surface: website and landing pages
- Output: Product Definition, experience specification, Pencil design, validated handoff
- Fidelity: high

## Design Read

Reading this as a multilingual product website for image-conscious iPhone photographers, with a quiet editorial and precision-tool language, leaning toward native Web layout principles, restrained motion, and photography-led composition.

## Dials

- DESIGN_VARIANCE: 6
- MOTION_INTENSITY: 4
- VISUAL_DENSITY: 3

The composition should feel deliberate and slightly asymmetric, but never make the photograph compete with the interface. Motion should explain layering, comparison, or state change. Density should stay low enough for each photograph and claim to be understood independently.

## Selected visual direction

- Revision: `VD-0004`
- Direction: Quiet Gallery Refined
- Desktop frame: `L6sy4u`
- Mobile frame: `zyzpR`
- Selection basis: the user selected the first generated iPhone-app LP direction, requested a simpler composition, then approved a final refinement using the official bezel screen mask, no standalone panorama section, a black-white-photo output mat, and four distinct approved Creative Frame types.
- Home story: Hero, layers/full-resolution, presets/batch, creative frames, FAQ, store actions, footer.
- Pricing boundary: no standalone Home pricing summary; free basics and paid Inset Lab are answered in FAQ.
- Android treatment: Google Play is present only as a disabled, non-interactive `Coming Soon` status.
- Closing treatment: Inset icon plus App Store and Google Play status, with no closing marketing headline.

## Approved project boundary

- Root: `/Users/aritakakanazawa/projects/App/Inset/inset-site`
- Initiative: `inset-web`
- Pencil: `design/inset-web.pen`
- Until visual direction approval, writes remain inside `design/`.

## Evidence baseline

- Product truth: `../Yohaku/PRODUCT.md`
- Visual truth: `../Yohaku/DESIGN.md`
- Feature state: `../Yohaku/docs/features.json`
- Public UI and approved imagery: `../Yohaku/docs/design-reference/`
- Public App Store identity: ID `6776488290`, version 1.2.1 as checked 2026-07-15
- Android release track: `../Yohaku/android/` is in active release preparation; public website status is `Coming Soon` until Google Play availability is verified
- Existing Web contracts: `index.html`, `privacy.html`, `terms.html`, `announcements.json`, `roadmap.json`, `releases/`

## Delivery rule

The Product Definition and experience specification control intent and behavior. Pencil controls visual truth. Production implementation starts only after the required definition, IA, and visual-direction approvals.

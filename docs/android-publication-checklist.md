# Android publication worksheet — shared public documents

Evidence date: **2026-10-05**. Status: **preparation only; public Android submission blocked**.

This worksheet accompanies the shared iOS/Android support and legal pages. Preparing or publishing those pages does not authorize a Play upload, Console declaration, review submission, production rollout, provider setting change, or spend. Record final answers and read-backs against the exact signed public AAB before submission.

## Reuse the canonical pages

| Purpose | Japanese | English |
| --- | --- | --- |
| Privacy policy / Play privacy URL | [プライバシーポリシー](https://inset.page/ja/privacy/) | [Privacy policy](https://inset.page/privacy/) |
| Terms | [利用規約](https://inset.page/ja/terms/) | [Terms](https://inset.page/terms/) |
| Seller / transaction disclosure | [特定商取引法に基づく表記](https://inset.page/ja/legal/) | [Legal disclosure](https://inset.page/legal/) |
| Support / developer website | [サポート](https://inset.page/ja/support/) | [Support](https://inset.page/support/) |

The developer business site, [Atelier Yohaku](https://atelier-yohaku.com/), is already OS-neutral and links the canonical pages. Separate Android legal pages are unnecessary for the current shared product. Reuse the URLs while clearly distinguishing platform-specific billing and data practices. Android Settings currently opens the English canonical Terms and Privacy URLs; verify those links in the final artifact and both language pages after deployment.

The current app provides no account creation or sign-in. Anonymous RevenueCat purchase identifiers are not a user-facing app account. A dedicated account-deletion URL is therefore not currently required under Google's account-creation rule; reconsider if any in-app or linked external account-creation flow is added. This does **not** establish a deletion route for anonymous analytics/purchase data. [Google account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111)

## Evidence baseline and existing inventory

Android source reviewed for this work: `eeae10dca1ca04271a4e294dd10a63174462aa45`; version **1.3.7 (138), internal only**. This is not the approved public artifact. Existing conditional documents are the detailed inventory and answer branches, rather than finalized declarations:

- [Android Data Safety draft](https://github.com/aritaka-cow/Yohaku/blob/eeae10dca1ca04271a4e294dd10a63174462aa45/docs/ANDROID-DATA-SAFETY-1.3.1-DRAFT.md)
- [Android Privacy draft](https://github.com/aritaka-cow/Yohaku/blob/eeae10dca1ca04271a4e294dd10a63174462aa45/docs/ANDROID-PRIVACY-POLICY-1.3.1-DRAFT.md)
- [Android Terms draft](https://github.com/aritaka-cow/Yohaku/blob/eeae10dca1ca04271a4e294dd10a63174462aa45/docs/ANDROID-TERMS-1.3.1-DRAFT.md)

Their filenames and some artifact references are historical. Reconcile them against the public candidate instead of carrying their old version or verification dates into Console. Track outstanding work in [Android public-release preparation task (TASK-38)](https://app.notion.com/p/3ba46189d7e881e2822becd3fbc52b2d) and [Android release issue (Issue #304)](https://github.com/aritaka-cow/Yohaku/issues/304).

Implementation facts to preserve in listing, support, and review instructions:

- Photos: Android 8.0 / API 26+. Video export: Android 10 / API 29+, source duration up to five minutes; device codecs can limit supported inputs/outputs.
- OS Photo Picker/provider selection can download a Google Photos asset before the app processes the selected local media. Avoid promising that every selection requires no network. Exported files can retain EXIF/GPS; that metadata is not intentionally sent to PostHog or RevenueCat.
- The app manifest has no `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, location, microphone, camera, or `AD_ID` permission. Legacy `WRITE_EXTERNAL_STORAGE` is limited to API 28 and below for saving photos. Verify the **merged release manifest**, dependencies, and actual runtime separately.
- RevenueCat `inset_lab` unlocks the shared paid entitlement through monthly, yearly, and lifetime products. These are not video-specific products. Settings offers Restore and Android Google Play subscription management through the relevant SKU link. Do not imply that an Apple purchase automatically unlocks an anonymous Android installation.
- Exact Android Japanese prices and trial eligibility have not been freshly verified. Do not inherit iOS price or trial copy.

## Play Console App content and listing worksheet

“Candidate” means an answer to validate, not an answer already entered. Console settings and completion state have not been read back in this task. Google's [review preparation guide](https://support.google.com/googleplay/android-developer/answer/9859455) covers these declarations; [target-audience guidance](https://support.google.com/googleplay/android-developer/answer/9867159) treats audience settings separately from content ratings.

| Field / release material | Current evidence or candidate | Required evidence before submission |
| --- | --- | --- |
| Privacy policy URL | Canonical URLs above | Live, public, non-geofenced HTML; app/developer identity, SDK recipients, retention/deletion and platform-specific practices agree with the final artifact and Data Safety. Verify Console value and in-app access. |
| Target audience and content | Owner direction: not directed to children | Read back selected age groups; choose actual intended ages, not an invented default. Check listing/images against that audience and stop if children are targeted. |
| Contains ads | Candidate: no displayed in-app ads | Inspect exact artifact and remote content for ad display; read back declaration. Acquisition/attribution transfers still require separate Data Safety consideration. |
| Content rating | Unresolved | Complete IARC questionnaire from actual app behavior and record generated ratings. Do not copy iOS age rating or predict “Everyone.” |
| App access | No login; paid Inset Lab features exist | Provide concrete reviewer instructions to access every restricted feature using a verified review route; no credentials unless a real account exists. Do not assume “all functionality unrestricted” because there is no login. |
| Permissions / sensitive APIs | Source permissions summarized above | Merged AAB manifest and resolved SDK inventory; complete only applicable Console declarations. Keep OS picker selection distinct from broad media-library access. |
| Payments and paid products | Google Play Billing / RevenueCat; monthly, yearly, lifetime | Read back exact Android product IDs, active base plans/offers, entitlement mapping and territories. Verify purchase, restore, cancellation and refund instructions. |
| Subscription terms / paywall | Candidate: clear period, full payable price, renewal, trial conversion and cancellation | Verify localized Play product details and eligible/ineligible trial states in the exact release artifact. Lifetime must be described as a one-time purchase. |
| Listing text and device support | Internal-only Android; version constraints above | Approved localized text, icon, screenshots, feature graphic, category/contact details, target API/device compatibility, and Console-required fields for intended track. Public site preparation is not an Android availability announcement. |
| App account / deletion questions | Candidate: no app-account creation | Confirm final artifact has no external account-creation handoff. Answer data deletion separately, using the verified operational route or truthful absence of one. |

Use [Google Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738) and [Subscriptions policy](https://support.google.com/googleplay/android-developer/answer/9900533) for the paid-feature and renewal presentation. The platform's purchase screen is not a substitute for clear product terms in the app. Japanese transaction disclosures must also reflect the actual platform, price/offer, cancellation/refund route and operating environment; see the [Consumer Affairs Agency's mail-order advertising guidance](https://www.no-trouble.caa.go.jp/what/mailorder/advertising.htmljp).

## Data Safety: candidates and blocking evidence

Google exempts apps **exclusively** on internal testing from the Data Safety form; closed testing, open testing and production require it. SDK and pseudonymous transmissions count, while solely on-device processing is excluded. Complete the detailed existing inventory above; do not import a CSV or submit while these gates remain unresolved. [Google Data Safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469)

| Assessment | Candidate / established fact | Blocking gate |
| --- | --- | --- |
| Off-device collection | Yes candidate: purchase history; interactions; device/other identifiers; diagnostics. RevenueCat guidance establishes purchase-history disclosure. | Reconcile exact AAB traffic and all SDK/server recipients; finalize each purpose, required/optional and ephemeral answer. Diagnostics “App functionality” needs evidence beyond analytics use. |
| Photos, videos, audio and EXIF | Local-processing candidate; no intentional SDK upload | Exact artifact/network evidence excludes media bytes, URI/path/filename and EXIF/GPS transmission. OS/provider download does not establish app collection of the selected media. |
| Location / IP (selected LOC-A) | No-IP/no-geo direction is conditional | October 4 production PostHog read-back: Discard IP **OFF**, GeoIP **Active**. Public-candidate production behavior and location resolution remain unresolved. No “location not collected” assertion until implementation and new-event evidence support it. |
| Retention (selected RET-24) | Desired maximum 24 months, not established | Verify physical deletion mechanism and recipients' retention. A query window is not deletion; do not publish a fixed physical retention claim from it. |
| Sharing and marketing destinations | Unresolved | RevenueCat native PostHog/Meta integrations were previously active; verify Android filters, subscriber attributes, server lifecycle events, recipient roles and onward use across iOS/Android. No Android Meta SDK does not prove no Android data reaches Meta. |
| Production configuration | Internal artifact 138 uses PostHog Sandbox project 510948 | Bind final signed public AAB to intended production project 447958, approved host/SDK settings and RevenueCat Play configuration without exposing keys or IDs of users. Sandbox joins do not prove production joins. |
| Encrypted transit | Candidate: Yes; RevenueCat documents HTTPS | All app/SDK/hosting destinations, final network-security settings and runtime traffic support the answer. Assess announcement hosting and other recipients in the inventory too. |
| Anonymous data deletion (selected DEL-B) | Conditional No: contact exists, reliable anonymous-record lookup route is not established | Confirm final form/policy match actual operations. A support email alone is not evidence that both providers' anonymous records can be located and deleted. |

[RevenueCat's Google Play Data Safety guide](https://www.revenuecat.com/docs/platform-resources/google-platform-resources/google-plays-data-safety) is input to the inventory, not an attestation for all integrations. Google's [User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311) requires the policy and declarations to match actual app/SDK access, collection, use, sharing, security, retention and deletion.

## Exit conditions and submission handoff

1. Identify signed public AAB version/build, source and configuration provenance; complete feature-specific Simulator/emulator checks and required independent-device evidence for that artifact.
2. Resolve the blocking provider/data-handling gates above, or adopt a separately approved truthful alternative; synchronize both policy languages, in-app disclosures and declarations. Preserve verified iOS disclosures, including ATT-conditioned behavior, when adding Android detail. Shared pages do not replace Apple's separate requirements in [App Review Guidelines §5.1](https://developer.apple.com/app-store/review/guidelines/#privacy).
3. Verify deployed canonical URLs and language routes, final app links, purchase terms, reviewer access and Console-required assets. Record actual deployment/read-back date separately from this research date.
4. Read back the exact Console track, App content answers, store preview and product state; obtain the required exact authorization before upload, declarations, review submission or rollout. Record resulting state after each authorized action.

Stop if artifact behavior conflicts with policy, privacy/retention/sharing remains unverified, reviewer access fails, or the release configuration differs from tested configuration. This worksheet does not assert that any Play Console declaration, store submission or Android public release is complete.

Primary policy sources linked above were checked on **2026-10-05**. Provider observations dated October 4 and historical draft evidence are explicitly dated and require final-candidate read-back.

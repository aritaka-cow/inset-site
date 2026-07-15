---
schema_version: 1
product: Inset Web
revision: PD-0001
status: approved
updated: 2026-07-15
approved_by: user
approved_at: 2026-07-15
supersedes:
---

# Inset Web Product Definition

## 目的 / Product intent

Insetを必要とする人が、インストール前に「写真の周りまで作品として整えるiPhoneアプリ」だと理解し、実際の仕上がりと操作を確かめ、安心してApp Storeへ進める公開サイトをつくる。

同時に、検索エンジンとAI検索がInsetの機能、使い方、料金体系、対応環境、サポート情報を検証可能な静的HTMLから取得できる状態をつくる。

## 課題 / Problem

写真をSNSやポートフォリオへ載せる前には、写真の内容だけでなく、余白、比率、額装の佇まいまで整える必要がある。一般的な写真編集アプリでは、この最後の仕上げが複数の操作や別アプリへ分散しやすく、同じ見た目を繰り返し再現することも難しい。

Insetはこの工程を短く正確にする製品だが、現在のWebサイトは製品価値、機能、実UI、使い方、無料機能とInset Labの境界を十分に説明できていない。多言語SEO、構造化データ、検索やAIが参照しやすい情報構造も未整備である。

## 対象ユーザー / Target users

### Primary

- X、Threads、Instagram、ポートフォリオへ写真を公開する人
- 白枠、黒枠、額装、フィルム、ポラロイド、Letterboxなどで写真の見せ方を自分で設計したい人
- 高機能な編集ソフトより、選ぶ、整える、確認する、保存するという短い工程を求める人
- プリセットや一括処理で同じ仕上がりを再現したい人

### Affected

- 写真の余白、フレーム、比率調整、フル解像度書き出しの方法を検索している人
- Insetの料金、対応OS、プライバシー、使い方を確認したい既存ユーザー
- Android版の配信状況を確認したい人
- Insetを回答候補として紹介する検索エンジンやAI検索

### Excluded from this initiative

- 写真フィルター、生成AI、SNS投稿機能を主目的とする人
- デスクトップ向けの高度なレタッチソフトを必要とする人

## ユーザー成果 / User outcomes

- 訪問直後にInsetが何をするiPhoneアプリか理解できる。
- 実際の写真、フレーム、公開版UIから仕上がりと操作の正確さを判断できる。
- 余白レイヤー、クロップ、書き出し、プリセット、Inset Labの違いを必要な深さで確認できる。
- 基本機能は無料で、Inset Labが有料の追加機能であることを誤解なく理解できる。
- Android版は準備中であると理解でき、配信済みと誤認しない。
- 自分の言語で機能、FAQ、Support、Privacy、Termsへ到達できる。
- JavaScriptが無効でも主要情報とApp Store導線を利用できる。

## プロダクト成果 / Product outcomes

- ブランド名検索以外の写真フレーム、余白、比率、書き出し関連検索からInsetを発見できる。
- WebからApp Storeへの送客と、専用キャンペーンリンクで追跡可能な獲得を増やす。
- 機能、使い方、料金、FAQを自己解決できるようにし、サポート前の不明点を減らす。
- リリース、法務、JSON wire contract、旧GitHub Pages URLを一つの正本から継続配信できる。
- 製品の公開状態とサイト表現のずれを検出しやすくする。

## 根拠と仮説 / Evidence and assumptions

### Observed evidence

- `../Yohaku/PRODUCT.md`: Insetは色、幅、比率を持つ余白レイヤーを重ね、見たままをフル解像度で書き出すiPhoneアプリ。
- `../Yohaku/DESIGN.md`: 写真優先、抑制、実物による証明、情報の少なさ、正確さがブランドの不変条件。
- `../Yohaku/docs/features.json`: 余白レイヤー、WYSIWYG、フル解像度書き出し、クロップ、プリセットなどの検証記録。
- `../Yohaku/docs/design-reference/`: 公開版実UIと承認済みApp Store、SNS素材。
- Apple Lookup API: 2026-07-15確認時点の公開版は1.2.1。iOS 17.0以降、Inset Lab、バッチ、Letterbox、17言語が公開説明に含まれる。
- 現在の`index.html`、`privacy.html`、`terms.html`、`announcements.json`、`roadmap.json`、`releases/`: 既存の公開URLとアプリ参照契約。

### User decisions

- 正規ドメインは`inset.app`。
- 英語を`/`、日本語を`/ja/`へ置く。
- サイトデザインは以前のWeb案を継承せず、製品とブランドの前提から作り直す。
- Android版は`Coming Soon`として予告する。
- Pencilを視覚的な正本とする。
- Astroの静的HTMLとCloudflare Workers Static Assetsを実装方針とする。

### Inferences

- 最も強い獲得導線は、実際の仕上がりを最初に見せ、次に自由度と精度を証明し、最後にApp Storeへ送る流れである。
- 検索とAI検索には、抽象的なブランドコピーだけでなく、機能、手順、FAQ、料金境界の具体的な説明が必要である。
- 公開版UIと承認済み写真は、架空レビューや装飾的なモックより強い信頼材料になる。

### Assumptions

- Web AnalyticsとApp Storeキャンペーンリンクには、比較可能な既存ベースラインがまだない。
- `docs/design-reference/`の承認済み完成素材はWeb上の参照および掲載候補として扱える。元写真の新規切り抜き利用は権利確認まで保留する。
- 新ドメインへの切替後も、旧GitHub Pages URLを無期限で維持できる。

## 要件 / Requirements

- REQ-001: HeroはInsetを「写真の周りまで作品として整えるiPhoneアプリ」と短く説明し、実際の仕上がりを主要な視覚証拠として表示する。
- REQ-002: 訴求順は、作品としての仕上がり、余白レイヤーの自由度、見たままのフル解像度書き出し、プリセットと一括処理による再現性とする。
- REQ-003: 色、幅、比率をレイヤーごとに調整し、複数の余白やフレームを重ねられることを具体的に説明する。
- REQ-004: 公開版1.2.1で確認できる実UI、実出力、アプリアイコン、承認済みApp StoreまたはSNS素材だけを製品証拠として使う。
- REQ-005: 基本機能は無料、Inset Labは有料の追加機能と説明し、地域で変わる固定価格は掲載しない。
- REQ-006: Android版は`Coming Soon`として掲載する。配信済みと誤認させるGoogle Play CTA、具体的な公開日、未検証の機能差や価格は掲載しない。架空レビュー、未公開の1.2.2機能、検証できない利用者数や評価も掲載しない。
- REQ-007: 英語は`/`、日本語は`/ja/`に配置し、全主要ページで意味を揃えつつ、各言語に自然な語順と改行を設計する。
- REQ-008: 英語と日本語でHome、Features、How it works、Frames、Pricing、FAQ、Support、Privacy、Terms、Releasesを提供する。
- REQ-009: 各ページは固有のtitle、description、H1、canonical、hreflang、OG/X Cardを持ち、主要本文とCTAを静的HTMLで出力する。
- REQ-010: `WebSite`、`MobileApplication`、開発者`Person`のJSON-LDを検証可能な事実だけで生成する。FAQ schemaは画面上の同一回答と一致させる。
- REQ-011: 結論を先に書き、機能の具体的説明、手順、FAQ、検証可能な事実を検索とAI検索が引用しやすい構造で提供する。
- REQ-012: `announcements.json`、`roadmap.json`、`privacy.html`、`terms.html`、既存リリースHTML、旧GitHub Pages URLの公開契約を維持する。
- REQ-013: App Store CTAはJavaScriptなしでも機能し、Appleの提供するバッジまたは準拠した導線を使う。
- REQ-014: 写真内容や編集画像をアップロードしないことと、匿名利用分析を行うことを分けて説明する。「データを収集しない」「完全オフライン」とは表現しない。
- REQ-015: WCAG 2.2 AA、キーボード操作、明確なフォーカス、十分なコントラスト、意味のあるalt、200%以上のテキスト拡大を満たす。
- REQ-016: 動きは階層、物語、操作フィードバックのいずれかを伝える場合だけ使い、`prefers-reduced-motion`で静的表示へ縮退する。
- REQ-017: サイトはシステムのライトとダーク設定へ対応し、各テーマ内で一貫した色、角丸、階層を保つ。
- REQ-018: 390px、430px、1280px、1440pxで主要レイアウト、日英の改行、画像比率、CTA、overflowを検証する。
- REQ-019: モバイルLighthouseでLCP 2.5秒以内、INP 200ms未満、CLS 0.1未満を目標とする。
- REQ-020: `robots.txt`、XML sitemap、真の404、App Store Smart Banner、faviconを提供する。
- REQ-021: Search向けとユーザー操作型AI Agentのクローラを許可し、学習用途のクローラを拒否する。Cloudflare設定と`robots.txt`を一致させる。
- REQ-022: 検索流入、Core Web Vitals、App Store CTAをCloudflare Web Analytics、Search Console、専用App Storeキャンペーンリンクで計測する。
- REQ-023: visible copyではem dashとen dashを使わず、誇張、汎用的なAIコピー、意味のないmicro labelを避ける。
- REQ-024: アプリの公開バージョン、料金体系、対応OS、利用可能機能を本番公開直前にAppleの公開情報と再照合する。

## 成功指標 / Success metrics

| Signal | Baseline | Desired direction or threshold | Window | Availability |
| --- | --- | --- | --- | --- |
| App Store CTA click-through rate | 未計測 | ローンチ後の週次で上昇傾向 | 30日、継続観測 | Cloudflare Web Analytics |
| 専用キャンペーン経由のApp Store獲得 | 新規リンクのため0 | 8週間で継続的な獲得を確認 | 8週間 | App Store Connect campaign reporting |
| canonicalページのインデックス | 新サイトは0 | インデックス対象ページの100% | 公開後8週間 | Search Console |
| 非ブランド検索のimpressions | 未計測 | 写真フレーム、余白、比率、書き出し関連で上昇 | 公開後8週間、探索的 | Search Console |
| Core Web Vitals | 未計測 | LCP 2.5秒以内、INP 200ms未満、CLS 0.1未満 | 公開前と公開後 | Lighthouse、CrUX |
| Accessibility | 未監査 | criticalなWCAG 2.2 AA違反0件 | 各主要画面、公開前 | 自動検査と手動QA |
| Content truth | 現在はリポジトリと公開版にdriftあり | 未公開機能、誤価格、誤OS表記0件 | 各公開前 | Apple公開情報とのpreflight |
| Search and AI crawler access | 未計測 | 許可対象の誤ブロック0件 | 公開後 | Cloudflare crawler logs、robots検査 |

## 制約 / Constraints

- Platform: 現在配信中の製品はiPhone版Inset。公開版1.2.1はiOS 17.0以降。Android版は公開準備中であり、サイトでは`Coming Soon`としてのみ扱う。
- Product truth: ローカルの1.2.2実装やTestFlight情報を公開済みとして扱わない。
- Brand: 写真が最大の色面。ニュートラルな背景、抑制された階層、短いコピー、実物による証明を維持する。
- Assets: 承認済み完成素材と公開版実UIを優先し、権利が不明な元写真を新しい用途へ切り抜かない。
- Localization: 英語版へ日本語の構図を単純移植せず、各言語の自然な改行を個別に検証する。
- Accessibility: WCAG 2.2 AAとreduced motionをデザイン段階から扱う。
- SEO: 既存URLとwire contractを失わず、英語rootと日本語`/ja/`の相互参照を保つ。
- Privacy and legal: 法務本文は現在の複数変更系列を意図的に統合し、別途確認なしに書き換えない。
- Repository safety: 現在のmainは未コミット変更があり、origin/mainより1コミット遅れている。視覚方向の承認までは`design/`以外を変更しない。
- Delivery: Pencilを視覚正本とし、実装は承認済みexperience specとvisual directionから行う。
- Theme: 消費者向け公開サイトとしてライトとダークの両方を設計し、ページ途中で無意味にテーマを反転しない。

## 対象外 / Non-goals

- Insetアプリ本体のUIや機能の再設計
- 配信前のGoogle Playインストール導線、Androidの具体的な公開日、未検証のAndroid固有機能やiOSとの完全な同等性の主張
- 未公開1.2.2、ロードマップ上の機能、実験機能の先行告知
- 固定価格、割引率、地域差を無視した価格比較
- 架空のレビュー、導入ロゴ、利用者数、受賞歴
- 写真フィルター、生成AI、SNS機能をInsetの主機能として見せること
- Web上でのアカウント、写真アップロード、編集機能
- 初回リリースでのブログ、コミュニティ、ユーザーギャラリー投稿機能
- `llms.txt`
- WebへのPostHog導入
- このデザインフェーズでのCloudflare設定変更、公開、Git操作、production code実装

## リスクと未解決事項 / Risks and open questions

- High: App Store公開版1.2.1とローカル1.2.2のdrift。公開直前の自動または手動preflightが必要。
- High: `privacy.html`にworking copy、origin/main、RevenueCat対応の複数系列がある。実装時に法務内容を意図的に統合する必要がある。
- Medium: 承認済み完成画像内の写真は使えるが、元写真を新しい構図へ再利用できる権利範囲は未確認。
- Medium: 既存Webの計測ベースラインがなく、初期成功指標の一部は探索的になる。
- Medium: ライトとダークで同じ写真素材の階調と可読性を維持するため、テーマ別の画像処理ルールが必要。
- Medium: 料金ページは価格を固定表示せず、価値と購入方式を説明しながらApp Storeへ自然に委ねる必要がある。
- Medium: Android版の公開時期、Google Play URL、課金と機能の最終状態は未確定。`Coming Soon`表示を一箇所の構造化コンテンツから更新できるようにする必要がある。
- Open: 専用App Storeキャンペーンリンクの最終URL。
- Open: Android公開時に`Coming Soon`を置き換えるGoogle Play URLと公開確認手順。
- Open: `www.inset.app`、旧GitHub Pages、Workers previewの最終redirectとnoindex設定。

## 承認 / Approval

- 2026-07-15: project root、標準成果物、Pencil利用をユーザーが承認。
- 2026-07-15: 課題、対象ユーザー、意図するユーザー成果とプロダクト成果をユーザーが承認。
- 2026-07-15: Android版を`Coming Soon`としてサイトに掲載することをユーザーが決定。
- 2026-07-15: REQ-001からREQ-024、非目標、成功指標、制約、未解決事項を含むPD-0001全体をユーザーが承認。

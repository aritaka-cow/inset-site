# inset-site

[Inset](https://inset.page/) の日英公式サイトです。Astroで静的HTMLを生成し、Cloudflare Workers Static Assetsから配信します。旧GitHub Pages URLと公開済みアプリの取得先は、同じビルド成果物で互換配信します。

## ローカル開発

Node.js 24.14.0を使用します。

```sh
nvm use
npm ci
npm run dev
```

Cloudflareと同じ配信設定で確認する場合:

```sh
npm run preview
```

型、コンテンツ契約、HTML、内部リンク、canonical、hreflang、sitemapをまとめて検証する場合:

```sh
npm run build
```

Cloudflareのツール選定とWorkers Builds設定は [`docs/cloudflare-tooling.md`](docs/cloudflare-tooling.md) を参照してください。

本番反映前のdry-runと、apexサイト＋`www`リダイレクトの本番反映:

```sh
# 先に変更をmainへmergeし、cleanかつorigin/mainと同一のmainから実行する
npm run deploy:dry-run
npm run deploy
```

本番コマンドは毎回`origin/main`をfetchし、現在のbranchが`main`、HEADが`origin/main`と完全一致、worktreeがcleanであることを確認する。条件を満たさないブランチや未コミット変更からのデプロイは失敗する。`npx wrangler deploy`を直接実行せず、必ず上記npm scriptを使う。

`/go/`配下の計測URLは[`scripts/redirect-contracts.mjs`](scripts/redirect-contracts.mjs)を契約正本とする。ソースとビルド成果物の不足・余計なルール・転送先・statusはbuildで検証し、デプロイ後にも実URLの302と`Location`完全一致を自動確認する。GitHub ActionsもPRごとのbuildと、本番URLの1時間ごとの監視を行う。

## 公開URL

- English: `/`
- 日本語: `/ja/`
- Features, How it works, Frames, Pricing, FAQ, Support, Privacy, Terms, Commercial Disclosure, Releasesを両言語で生成
- `inset.page` をcanonical、英語ルートを `x-default` とし、`www.inset.page` は同じパスとクエリを保って301する

## 既存の公開契約

| ファイル | 用途 |
|---|---|
| `index.html` | 旧GitHub Pagesのサポート / FAQ |
| `privacy.html` | 旧プライバシーポリシーURLの互換ページ |
| `terms.html` | 旧利用規約URLの互換ページ |
| `legal.html` | 特定商取引法に基づく表記の互換ページ |
| `roadmap.html` / `roadmap.json` | 公開ロードマップ終了の案内（ロードマップ正本は Yohaku GitHub Issues） |
| `announcements.json` | アプリ内お知らせの配信元（T-0201 / RM-033） |
| `releases/*.html` | 旧リリースノートURLの互換ページ |

## ロードマップの運用

公開ロードマップは 2026-06-28 に終了。今後のロードマップ正本は private の [Yohaku GitHub Issues](https://github.com/aritaka-cow/Yohaku/issues) に置く。

- 未実装の旧 `roadmap.json` 項目は Yohaku Issues #85〜#95 に移行済み。
- 外部向けの更新情報は App Store、アプリ内お知らせ、リリースノートで案内する。
- `roadmap.html` は古いURL向けの終了案内ページとして残す。
- `roadmap.json` は詳細データを公開せず、終了ステータスのみ返す。

## announcements.json の運用

アプリは起動時にこのファイルを silent fetch し、設定画面の「お知らせ」一覧と What's New シート（アプリ更新後の初回起動）に使う。**git push = 配信**。

### お知らせの足し方

1. `announcements` 配列の**先頭**に追記する（アプリ側は date 降順で表示するが、人間が読む際の慣例として新しいものを上に置く）。
2. フィールド規約:
   - `id`: 安定文字列。リリースノートは `rel-<version>`、一般告知は `news-<YYYYMMDD>-<slug>`。**既出 id の再利用禁止**（既読管理に使うため）
   - `date`: `"YYYY-MM-DD"`
   - `type`: `release`（アプリ更新のお知らせ）または `news`（一般告知）。アプリ側は未知の type も一般告知として表示する
   - `appVersion`: `release` のみ必須。この値が端末のアプリバージョンと一致すると、更新後の初回起動で What's New シートに使われる
   - `title` / `body`: `{ "en": ..., "ja": ... }`。en 必須、ja 推奨（欠落時は en にフォールバック）
   - `url`（任意）: 詳細ページへのリンク。**https のみ有効**（http は無視される）。画像付きのリッチな解説はサイト側のページに置き、ここからリンクする。アプリでは「詳しく見る ↗」として表示される
3. push 前に構文チェック: `python3 -m json.tool announcements.json > /dev/null`
4. push 後の反映は**最大 11 分程度**（GitHub Pages の CDN cache-control: max-age=600 + デプロイ時間）。即時反映は保証されない。

### スキーマの拡張

- フィールド追加（Optional）はアプリの Codable が未知キーを無視するため、トップレベル `version` を**上げずに**後方互換で行える。
- 破壊的変更（必須フィールドの型変更等）は `version` を +1 し、**対応アプリを先にリリースしてから**配信側を切り替える（旧アプリは未来 version を拒否してキャッシュ表示を続ける）。

正本・実装は Yohaku repo（`Yohaku/IO/AnnouncementStore.swift` ほか）と vault T-0201 を参照。

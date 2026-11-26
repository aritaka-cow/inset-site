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
   - `platforms`（任意）: 対象 OS の配列。`"ios"` / `"android"` / `"macos"`。省略・空配列は全 OS 向け。指定した OS のアプリだけが一覧・What's New・更新案内に使う（iOS 1.4.1・Android の対応版以降。古いアプリはこの項目を無視して全件を表示するので、移行期間は文面にも OS 名を入れる）。同じ `appVersion` の `release` を OS ごとに分けるときは、OS が重ならないようにする（検証スクリプトが重複を拒否する）。macOS 版にはお知らせの表示がまだない
   - `url`（任意）: 詳細ページへのリンク。**https のみ有効**（http は無視される）。画像付きのリッチな解説はサイト側のページに置き、ここからリンクする。アプリでは「詳しく見る ↗」として表示される
3. push 前に構文チェック: `python3 -m json.tool announcements.json > /dev/null`
4. iOS の新しい版のお知らせは、下の「App Store 公開での自動公開」で出す。手でマージした場合は、GitHub Pages は自動で出るが inset.page は `npm run deploy` が要る
5. push 後の反映は**最大 11 分程度**（GitHub Pages の CDN cache-control: max-age=600 + デプロイ時間）。即時反映は保証されない。

### App Store 公開での自動公開

iOS の新しい版のお知らせとリリースノートは、PR を用意してラベルを付けておけば、App Store Connect でリリースのボタンを押すだけで公開される。ワークフロー [`auto-publish-on-store-release.yml`](.github/workflows/auto-publish-on-store-release.yml) が15分ごとに（下の「定期実行の起動元」を参照） [iTunes Lookup](https://itunes.apple.com/lookup?id=6776488290&country=jp) で日本の App Store の公開版を確かめ、対象の版以上になったら PR をマージし、GitHub Pages と inset.page に公開する。

1. お知らせ（`announcements.json` の `release`）とリリースノートの PR を作る。日付 `date` は公開予定日にしておく
2. PR に `publish-on-store-release` ラベルを付ける。対象の版は、PR で新しく足した `release` の `appVersion` から読む。お知らせを足さない PR や、`release` を2件以上足す PR は、本文に `Store-Release-Version: 1.4.0` の行を書く
3. チェック（Verify site changes）が通っていること、Draft でないこと、main とコンフリクトしていないことを確かめておく
4. App Store Connect でリリースする。公開版が対象の版以上になってから最大15分ほどで、次が順に行われる
   - PR を squash でマージし、PR にコメントする
   - [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) で GitHub Pages（アプリの取得先）に公開する
   - [`deploy-inset-page.yml`](.github/workflows/deploy-inset-page.yml) で inset.page（Cloudflare Workers）に公開する
   - 公開結果を PR にコメントする
5. 念のため、リリースのボタンを押したら Actions の「Publish on App Store release」を Run workflow で1回実行する（`dry_run` は付けない）。App Store にまだ出ていなければ「公開待ち」で終わるだけなので、何度実行してもよい。PR にマージのコメントが付けば完了
   - PC：<https://github.com/aritaka-cow/inset-site/actions/workflows/auto-publish-on-store-release.yml> →「Run workflow」→ Branch は `main` のまま →「Run workflow」
   - スマホ（GitHub アプリ）：`aritaka-cow/inset-site` → Actions → Workflows →「Publish on App Store release」→ Run workflow（[GitHub Changelog](https://github.blog/changelog/2024-07-30-run-workflows-set-as-workflow_dispatch-manually/)）
   - ターミナル：`gh workflow run auto-publish-on-store-release.yml -R aritaka-cow/inset-site --ref main`

1回の実行でマージするのは1件だけ。公開前はチェックが落ちていても待つだけで、公開後に PR をマージできないとき（チェック失敗・コンフリクト・Draft・対象の版が読めない）は PR にコメントし、実行を失敗にして GitHub の通知を出す。直せば次の回で再確認する。急ぐときは Actions の「Publish on App Store release」を Run workflow で手動実行できる。`dry_run` にすると判定だけを行う。

手元での判定の確認（マージやコメントはしない）:

```sh
GITHUB_TOKEN=$(gh auth token) GITHUB_REPOSITORY=aritaka-cow/inset-site npm run auto-publish:dry-run
# ラベルのない PR を、公開済みと仮定して判定する
GITHUB_TOKEN=$(gh auth token) GITHUB_REPOSITORY=aritaka-cow/inset-site DRY_RUN_PR=52 STORE_VERSION_OVERRIDE=1.4.0 npm run auto-publish:dry-run
```

判定ロジックは [`scripts/store-release.mjs`](scripts/store-release.mjs)、テストは `npm run test:store-release`。

注意:

- 見ているのは iOS の App Store だけ。Android（Google Play）の公開は検知しない
- `GITHUB_TOKEN` によるマージは、ほかのワークフローの `push` を起動しない。そのため公開はこのワークフローから直接呼んでいる
- `.github/workflows/` を変える PR は `GITHUB_TOKEN` でマージできないので、ラベルを付けない
- 公開リポジトリの定期実行（`schedule`）は、リポジトリに60日間動きがないと GitHub が止める。止まったら Actions の画面で有効にし直す
- inset.page への公開には、次の秘密の値が要る。未登録の間は inset.page への公開だけが失敗し、PR にその旨がコメントされるので、main から `npm run deploy` を手で実行する

#### 定期実行の起動元

GitHub の `schedule` は混雑時に遅れたり落とされたりする（[公式ドキュメント](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)）。このリポジトリでも毎時の監視が1日3〜4回しか動かず、このワークフローの `schedule` は登録後5時間以上1回も動かなかった（2026-11-20）。そのため、Cloudflare Workers の Cron Trigger から `workflow_dispatch` で起動する。`schedule` は予備として残している。

- Worker：[`workers/store-release-dispatcher.js`](workers/store-release-dispatcher.js)（設定 [`wrangler.dispatcher.jsonc`](wrangler.dispatcher.jsonc)、Worker 名 `inset-site-store-release-dispatcher`）。inset.page の Worker とは別で、公開 URL を持たない
- 15分ごとに、ラベル `publish-on-store-release` の付いた未マージの PR があるときだけ `main` のワークフローを起動する。なければ何もしない
- Cron Trigger は無料プランのアカウント上限（5個）のうち1個を使う
- 公開後に PR をマージできない状態が続くと、15分ごとに失敗の実行と GitHub の通知が出る。直すかラベルを外すと止まる
- デプロイは main から `npm run deploy:dispatcher`（`npm run deploy` と同じ main 一致の安全確認つき）。Worker のコードを変えたときだけ要る
- ログは Cloudflare の Workers & Pages → `inset-site-store-release-dispatcher` → Logs で見られる

Worker が使う GitHub のトークン（オーナーが作成・登録）:

1. GitHub の Settings → Developer settings → Fine-grained personal access tokens → Generate new token
2. Resource owner は `aritaka-cow`、Repository access は Only select repositories で `aritaka-cow/inset-site` だけ
3. Permissions は Repository permissions の Actions を Read and write（Metadata: Read-only は自動で付く）。ほかは付けない
4. 有効期限を決めて生成し、Worker の秘密の値に登録する（値は画面に貼り付けるだけで、ファイルやチャットに残さない）

```sh
npx wrangler secret put GITHUB_DISPATCH_TOKEN --config wrangler.dispatcher.jsonc
```

トークンの有効期限が切れると起動が止まる。期限の前に作り直して同じコマンドで登録し直す。

#### inset.page 公開用の秘密の値（オーナーが登録）

| 名前 | 中身 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare の Account API tokens で「Edit Cloudflare Workers」テンプレートから作るトークン。アカウントは Inset のアカウント、ゾーンは `inset.page` だけに絞る |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare のアカウント ID |

```sh
gh secret set CLOUDFLARE_API_TOKEN --repo aritaka-cow/inset-site
gh secret set CLOUDFLARE_ACCOUNT_ID --repo aritaka-cow/inset-site
```

登録後、Actions の「Deploy inset.page」を main で Run workflow すると、公開の経路を単独で確かめられる。このワークフローは checkout したコミットが `origin/main` と一致しないと公開しない（手元の `npm run deploy` の安全確認と同じ考え方）。

### スキーマの拡張

- フィールド追加（Optional）はアプリの Codable が未知キーを無視するため、トップレベル `version` を**上げずに**後方互換で行える。
- 破壊的変更（必須フィールドの型変更等）は `version` を +1 し、**対応アプリを先にリリースしてから**配信側を切り替える（旧アプリは未来 version を拒否してキャッシュ表示を続ける）。

### 更新案内のポップアップ

iOS 1.2.3以降は、既存entryへ次のOptionalフィールドを加えると起動時の更新案内にも使える。

- `presentation`: 通常は閉じられる `modal`。`blocking` は重大な互換性・セキュリティ・データ保全上の問題に限定する
- `targetVersionBelow`: このバージョン未満だけを対象にする
- `repeat`: `once` または `daily`
- `startsAt` / `expiresAt`: 任意の配信期間。`blocking` では両方必須かつ最大7日
- `url`: InsetのApp Store URL（App ID `6776488290`）

iOS 1.2.2以前はこれらのフィールドを無視し、設定内のお知らせ一覧にだけ表示する。旧版へ起動時ポップアップを後付けすることはできない。App Storeで更新版が取得可能になる前に公開すると更新ボタンの遷移先に旧版しか出ないため、リリース状態を確認してから `announcements.json` を配信する。

正本・実装は Yohaku repo（`Yohaku/IO/AnnouncementStore.swift` ほか）と vault T-0201 を参照。

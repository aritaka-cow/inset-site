# inset-site

[Inset](https://aritaka-cow.github.io/inset-site/) の公開サイト（GitHub Pages）。

| ファイル | 用途 |
|---|---|
| `index.html` | サポート / FAQ |
| `privacy.html` | プライバシーポリシー |
| `roadmap.html` / `roadmap.json` | 公開ロードマップ終了の案内（ロードマップ正本は Yohaku GitHub Issues） |
| `announcements.json` | アプリ内お知らせの配信元（T-0201 / RM-033） |

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

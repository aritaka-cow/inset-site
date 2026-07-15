import type { Localized } from "./site";

export type ReleaseEntry = {
  version: string;
  announcementDate: string;
  storePublishedAt?: string;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  media: Localized<string[]>;
};

export const releases: ReleaseEntry[] = [
  {
    version: "1.2.1",
    announcementDate: "2026-07-02",
    storePublishedAt: "2026-07-11T20:54:04Z",
    summary: {
      en: "Letterbox frames, a clearer Creative Frames picker, Photos sharing, and support for 17 app locales.",
      ja: "Letterboxフレーム、整理されたクリエイティブフレーム選択、写真アプリ共有、17ロケール対応を追加しました。"
    },
    highlights: {
      en: ["Letterbox styles for 9:16, 4:5, 1:1, 4:3, and 3:2", "Rounded, bordered, and thin-border variants", "None, Favorites, Film, and Letterbox picker tabs", "Share one or multiple photos from Photos", "Localization for 17 app locales"],
      ja: ["9:16、4:5、1:1、4:3、3:2向けのLetterbox", "角丸、ボーダー、細いボーダー", "なし、お気に入り、フィルム、Letterboxのタブ", "写真アプリから1枚または複数枚を共有", "アプリを17ロケールへ対応"]
    },
    media: { en: [], ja: ["x-ja-1-overview.png", "x-ja-2-letterbox.png", "x-ja-3-photos-share.png", "x-ja-4-languages.png"] }
  },
  {
    version: "1.2.0",
    announcementDate: "2026-06-26",
    summary: {
      en: "Inset Lab introduces film, polaroid, and 35mm Creative Frames plus batch framing, while core features remain free.",
      ja: "Inset Labが登場。フィルム、ポラロイド、35mmのクリエイティブフレームと複数写真の一括処理を追加しました。"
    },
    highlights: {
      en: ["Film, polaroid, and 35mm Creative Frames", "Preview and export consistency", "Apply one setup to multiple photos", "Monthly, yearly, or one-time Lifetime purchase", "Core features remain free"],
      ja: ["フィルム、ポラロイド、35mmフレーム", "プレビューと書き出しの一致", "同じ設定を複数写真へ一括適用", "月額、年額、Lifetime買い切り", "基本機能は無料のまま"]
    },
    media: { en: [], ja: [] }
  },
  {
    version: "1.1.0",
    announcementDate: "2026-06-13",
    summary: {
      en: "Japanese localization, cropping, Undo and Redo, session restore, settings, announcements, and EXIF preservation.",
      ja: "日本語対応、クロップ、UndoとRedo、編集復元、設定、お知らせ、EXIF保持を追加しました。"
    },
    highlights: {
      en: ["Japanese localization and language selection", "Settings, announcements, and What's New", "Ratio and freeform crop, rotation, and straightening", "Undo, Redo, session restore, and EXIF preservation", "Performance and stability improvements"],
      ja: ["日本語対応とアプリ内言語切替", "設定、お知らせ、更新案内", "比率・自由クロップ、回転、傾き調整", "Undo、Redo、編集復元、EXIF保持", "性能と安定性の改善"]
    },
    media: {
      en: ["card-en-language.jpg", "card-en-news.jpg", "card-en-crop.jpg", "card-en-undo.jpg"],
      ja: ["card-ja-language.jpg", "card-ja-news.jpg", "card-ja-crop.jpg", "card-ja-undo.jpg"]
    }
  },
  {
    version: "1.0.0",
    announcementDate: "2026-06-05",
    summary: {
      en: "The first public release of Inset, with layered margins, reusable presets, and full-resolution export.",
      ja: "Insetの初回リリース。余白レイヤー、プリセット、フル解像度書き出しを利用できます。"
    },
    highlights: {
      en: ["Stack independently colored and sized margins", "Fit common output ratios with margins", "Sample a color from the photograph", "Save and reuse presets", "Export at full resolution"],
      ja: ["色と幅を個別に指定した余白を重ねる", "余白で一般的な出力比率へ合わせる", "写真からスポイトで色を取得", "プリセットとして保存して再利用", "フル解像度で書き出し"]
    },
    media: { en: ["en-2.jpg", "en-3.jpg"], ja: ["ja-2.jpg", "ja-3.jpg"] }
  }
];

export const releaseVersions = releases.map((release) => release.version);
export function findRelease(version: string): ReleaseEntry | undefined {
  return releases.find((release) => release.version === version);
}

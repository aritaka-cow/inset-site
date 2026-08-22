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
    version: "1.3.1",
    announcementDate: "2026-08-23",
    summary: {
      en: "Finish a single video with Inset's layered frame workflow, with more reliable saving and clearer, more accessible Inset Lab guidance.",
      ja: "写真と同じ余白レイヤーで1本の動画を仕上げられるようになり、保存の安定性とInset Labの案内・アクセシビリティも改善しました。"
    },
    highlights: {
      en: [
        "Edit one video with frame layers, aspect ratio, crop, 90° rotation, straightening, and Creative Frames",
        "Play, seek, and control audio directly in the preview",
        "With Inset Lab, save videos up to 5 minutes while preserving the original duration and audio, at up to 1080p/30 fps",
        "More reliable saving for longer videos, with improved playback controls, frame sizing, and save status",
        "A clearer one-time Inset Lab introduction and better access to Lab actions with larger accessibility text"
      ],
      ja: [
        "1本の動画に、余白レイヤー、比率フィット、トリミング、90°回転、傾き補正、クリエイティブフレームを適用",
        "プレビューで再生、シーク、音声を操作",
        "Inset Labなら最大5分の動画を、元の尺と音声を保ったまま最大1080p／30fpsで保存",
        "長めの動画でも保存をより安定化し、再生操作、フレームのリサイズ、保存状況の表示を改善",
        "Inset Labを初めてご案内する流れを明確化し、大きな文字でも操作へアクセスしやすく改善"
      ]
    },
    media: { en: [], ja: [] }
  },
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

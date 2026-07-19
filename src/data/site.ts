export type Locale = "en" | "ja";
export type Localized<T> = Record<Locale, T>;
export type PageKey = "home" | "features" | "how-it-works" | "frames" | "pricing" | "faq" | "support" | "privacy" | "terms" | "legal" | "releases";
export type ContentSection = { title: string; body: string; bullets?: string[] };
export type PageContent = { title: string; description: string; eyebrow?: string; heading: string; intro: string; sections: ContentSection[] };
export type AppStorePlacement = "hero" | "closing" | "pricing" | "support";

export const siteOrigin = "https://inset.page";
export const supportEmail = "contact@atelier-yohaku.com";
export const appStoreId = "6776488290";
export const appStoreUrls: Localized<string> = {
  en: "https://apps.apple.com/us/app/inset-photo-frames/id6776488290",
  ja: "https://apps.apple.com/jp/app/inset/id6776488290"
};
export function appStoreClickPath(locale: Locale, placement: AppStorePlacement): string {
  return `/go/app-store/${locale}/${placement}`;
}
export const appFacts = {
  name: "Inset",
  developer: "Aritaka Kanazawa",
  developerUrl: "https://apps.apple.com/jp/developer/aritaka-kanazawa/id6776488293",
  publicVersion: "1.2.1",
  minimumOs: "iOS 17.0",
  device: "iPhone",
  androidStatus: "coming-soon" as const
};

export const routeKeys: PageKey[] = ["home", "features", "how-it-works", "frames", "pricing", "faq", "support", "privacy", "terms", "legal", "releases"];
export const contentPageKeys = ["features", "how-it-works", "frames", "pricing", "faq", "support"] as const;
export type ContentPageKey = (typeof contentPageKeys)[number];

export function pathFor(key: PageKey, locale: Locale): string {
  const prefix = locale === "ja" ? "/ja" : "";
  return key === "home" ? `${prefix}/` : `${prefix}/${key}/`;
}
export function releasePath(version: string, locale: Locale): string {
  return `${locale === "ja" ? "/ja" : ""}/releases/${version}/`;
}

export const localeLabels: Localized<{ language: string; menu: string; skip: string }> = {
  en: { language: "日本語", menu: "Menu", skip: "Skip to content" },
  ja: { language: "EN", menu: "メニュー", skip: "本文へ移動" }
};
export const navLabels: Record<"features" | "frames" | "pricing" | "faq", Localized<string>> = {
  features: { en: "Features", ja: "機能" },
  frames: { en: "Frames", ja: "フレーム" },
  pricing: { en: "Pricing", ja: "料金" },
  faq: { en: "FAQ", ja: "FAQ" }
};
export const storeCopy: Localized<{ appStore: string; googlePlay: string; comingSoon: string; available: string }> = {
  en: { appStore: "App Store", googlePlay: "Google Play", comingSoon: "Coming Soon", available: "Available for iPhone on the App Store" },
  ja: { appStore: "App Store", googlePlay: "Google Play", comingSoon: "Coming Soon", available: "iPhone版をApp Storeで入手" }
};

export const homeCopy: Localized<{
  title: string; description: string; heading: string; lead: string;
  layersHeading: string; layersBody: string; repeatHeading: string; repeatBody: string;
  framesEyebrow: string; framesHeading: string; framesBody: string;
  imageAlt: { hero: string; device: string; water: string; batch: string[]; frames: string[] };
}> = {
  en: {
    title: "Inset — Layered photo frames for iPhone",
    description: "Layer margins around a photograph, preview the exact result, and export it at full resolution with Inset for iPhone.",
    heading: "Finish the space\naround your photo.",
    lead: "Layer margins, then export exactly what you see at full resolution.",
    layersHeading: "Build the space,\nlayer by layer.",
    layersBody: "Adjust the color, width, and ratio of each layer, then export the visible result at full resolution.",
    repeatHeading: "Finish once. Repeat consistently.",
    repeatBody: "Save a finished setup as a preset and apply it to multiple photographs in one batch.",
    framesEyebrow: "INSET LAB  /  CREATIVE FRAMES",
    framesHeading: "Change the presence,\nframe by frame.",
    framesBody: "Inset Lab includes film, polaroid, 35mm, and Letterbox Creative Frames.",
    imageAlt: {
      hero: "A finished street photograph presented with a thin Letterbox frame",
      device: "Inset on iPhone showing two margin layers around a photograph",
      water: "A glass of water presented inside a white inner mat and black outer mat",
      batch: ["A pale branch reflected in water", "A glowing lamp", "A geometric chair and table"],
      frames: ["A coffee sign in a black 35mm frame", "Two people beneath a chandelier in a black polaroid frame", "Sunset light on water in a white polaroid frame", "A field and plume of steam in a white film frame", "A paraglider in a rounded Letterbox border", "A sunlit tree in an original Letterbox frame"]
    }
  },
  ja: {
    title: "Inset — 写真の余白とフレームを整えるiPhoneアプリ",
    description: "写真に余白を重ね、見たままをフル解像度で書き出せるiPhoneアプリ、Inset。プリセット、一括処理、クリエイティブフレームにも対応します。",
    heading: "写真の\nまわりまで、\n作品に。",
    lead: "余白を重ね、見たままを\nフル解像度で書き出す。",
    layersHeading: "余白を、\n一層ずつ。",
    layersBody: "色・枠・比率をレイヤーごとに調整し、見たままをフル解像度で書き出せます。",
    repeatHeading: "整えて、繰り返せる。",
    repeatBody: "仕上がりをプリセットに保存し、複数の写真へまとめて適用できます。",
    framesEyebrow: "INSET LAB  /  CREATIVE FRAMES",
    framesHeading: "フレームで、\n表情を変える。",
    framesBody: "Inset Labでは、フィルム、ポラロイド、35mm、Letterboxなどのクリエイティブフレームを選べます。",
    imageAlt: {
      hero: "細いLetterboxフレームで仕上げた街角の写真",
      device: "写真のまわりに2層の余白を重ねたInsetのiPhone編集画面",
      water: "白い内側の余白と黒い外側の余白で仕上げた水のグラスの写真",
      batch: ["水面に映る淡い枝", "灯りのついたランプ", "幾何学的な椅子とテーブル"],
      frames: ["coffeeの看板を入れた黒い35mmフレーム", "シャンデリアの下の二人を入れた黒いポラロイドフレーム", "夕景の水面を入れた白いポラロイドフレーム", "草原と噴煙を入れた白いフィルムフレーム", "丸いLetterbox枠で仕上げたパラグライダー", "Original Letterboxで仕上げた木の写真"]
    }
  }
};

export type Faq = { question: string; answer: string };
export const faqs: Localized<Faq[]> = {
  en: [
    { question: "Is Inset free to use?", answer: "Yes. The core framing, preset, crop, and full-resolution export features are free. Inset Lab is a paid upgrade for Creative Frames and batch processing." },
    { question: "Can I stack more than one margin?", answer: "Yes. Each layer can have its own color, width, and aspect ratio, so you can build the frame one layer at a time." },
    { question: "Does Inset export at full resolution?", answer: "Yes. Inset renders the layout you see in the preview at the full resolution supported by the source photograph." },
    { question: "Can I reuse the same setup?", answer: "Yes. Save a setup as a preset and apply it to another photograph. Presets are stored on your device." },
    { question: "Are my photos uploaded?", answer: "No. Photos and edited images are processed on your device. Inset does send anonymous usage analytics and purchase data as described in the Privacy Policy." },
    { question: "Why does Inset request photo access?", answer: "Inset uses add-only access to save exported images. You choose source images through the system photo picker." },
    { question: "What devices are supported?", answer: "The current public version supports iPhone with iOS 17.0 or later." },
    { question: "Which languages are supported?", answer: "Inset 1.2.1 is localized for 17 locales, including English and Japanese." },
    { question: "Is an Android version available?", answer: "Not yet. Android is in preparation. A release date and Google Play URL have not been announced." },
    { question: "How do I manage or restore Inset Lab?", answer: "Manage a subscription in your Apple Account settings. Use Restore in Inset with the same Apple ID to restore an eligible purchase." }
  ],
  ja: [
    { question: "Insetは無料で使えますか？", answer: "はい。余白、プリセット、クロップ、フル解像度書き出しなどの基本機能は無料です。クリエイティブフレームと一括処理を含むInset Labは有料の追加機能です。" },
    { question: "複数の余白を重ねられますか？", answer: "はい。各レイヤーの色、幅、比率を個別に調整し、余白を一層ずつ重ねられます。" },
    { question: "フル解像度で書き出せますか？", answer: "はい。プレビューと同じレイアウトを、元写真に応じたフル解像度で書き出します。" },
    { question: "設定を保存して繰り返し使えますか？", answer: "はい。仕上がりをプリセットとして保存し、別の写真へ再適用できます。プリセットは端末内に保存されます。" },
    { question: "写真はアップロードされますか？", answer: "いいえ。写真と編集後画像は端末内で処理されます。匿名の利用分析と購入に関するデータについてはプライバシーポリシーをご確認ください。" },
    { question: "写真ライブラリ権限は何に使いますか？", answer: "書き出した画像を追加するためのadd-only権限です。元写真はシステムの写真ピッカーから選びます。" },
    { question: "対応環境は？", answer: "現在の公開版はiOS 17.0以降のiPhoneに対応しています。" },
    { question: "何言語に対応していますか？", answer: "Inset 1.2.1は、日本語と英語を含む17ロケールに対応しています。" },
    { question: "Android版はありますか？", answer: "現在準備中です。公開日とGoogle Play URLはまだ発表していません。" },
    { question: "Inset Labの管理や復元は？", answer: "Apple Accountのサブスクリプション設定から管理できます。同じApple IDでInsetのRestoreを使うと、対象の購入を復元できます。" }
  ]
};

export const pageContent: Localized<Record<ContentPageKey, PageContent>> = {
  en: {
    features: {
      title: "Inset features — Layered margins, presets, batch processing",
      description: "See how Inset layers margins, previews the exact output, saves presets, processes multiple photos, and exports at full resolution.",
      eyebrow: "FEATURES", heading: "A precise final step for photographs.",
      intro: "Inset is focused on the space around a photograph. Build a frame, verify the result, and save it without moving through a general-purpose editor.",
      sections: [
        { title: "Layered margins", body: "Add as many margin layers as you need. Set the color, width, and aspect ratio of each layer independently." },
        { title: "Preview and full-resolution export", body: "The editor previews the final composition. Export uses the same layout at the full resolution supported by the source image." },
        { title: "Crop and fit", body: "Fit photographs to common ratios with margins, or use free and ratio crop, pan, zoom, 90-degree rotation, and straightening." },
        { title: "Presets and batch processing", body: "Save a setup as a preset. Inset Lab can apply one setup to multiple photographs and save the results as a batch." },
        { title: "Creative Frames", body: "Inset Lab adds film, polaroid, 35mm, and Letterbox treatments, including favorites for faster reuse." }
      ]
    },
    "how-it-works": {
      title: "How Inset works — From photo to full-resolution export", description: "Choose a photo, layer margins, check the final composition, save a preset, and export from Inset.",
      eyebrow: "HOW IT WORKS", heading: "Choose. Frame. Check. Save.", intro: "The workflow stays short so the photograph remains the center of the decision.",
      sections: [
        { title: "1. Choose a photograph", body: "Pick one image with the system photo picker, or share one or more photographs to Inset from Photos." },
        { title: "2. Build the frame", body: "Add margin layers, adjust their color and width, and choose an output ratio. Crop only when the composition needs it." },
        { title: "3. Check the visible result", body: "The editor shows the frame, photograph, and output ratio together before export." },
        { title: "4. Save or repeat", body: "Export to the photo library. Save the setup as a preset, or use Inset Lab to apply it to a batch." }
      ]
    },
    frames: {
      title: "Photo frames in Inset — Margins, film, polaroid, 35mm, Letterbox", description: "Explore layered margins and Inset Lab Creative Frames for film, polaroid, 35mm, and Letterbox finishes.",
      eyebrow: "FRAMES", heading: "Frames that change how a photograph sits.", intro: "A frame is not decoration added after the fact. In Inset, it is part of the final composition.",
      sections: [
        { title: "Custom margins", body: "Build clean white, black, colored, or multi-layer frames with precise width and ratio controls." },
        { title: "Film and 35mm", body: "Inset Lab includes film and 35mm treatments that adapt to the photograph's orientation." },
        { title: "Polaroid", body: "Use a polaroid treatment when the bottom space and physical print shape should become part of the image." },
        { title: "Letterbox", body: "Letterbox variants support 9:16, 4:5, 1:1, 4:3, and 3:2, with rounded and bordered styles." }
      ]
    },
    pricing: {
      title: "Inset pricing — Free core features and Inset Lab", description: "Inset's core framing tools are free. Inset Lab is a paid upgrade for Creative Frames and batch processing.",
      eyebrow: "PRICING", heading: "Start free. Add Inset Lab when you need more.", intro: "Inset Lab is available as monthly and yearly auto-renewable subscriptions or a one-time Lifetime purchase. The App Store shows the applicable price before you confirm a purchase.",
      sections: [
        { title: "Core features are free", body: "Layered margins, crop, presets, and full-resolution export are available without Inset Lab." },
        { title: "Inset Lab", body: "Inset Lab unlocks Creative Frames, favorites, and batch framing for multiple photographs." },
        { title: "Purchase options", body: "Choose a monthly or yearly auto-renewable subscription, or a Lifetime purchase. Eligible monthly and yearly subscriptions include a 7-day free trial and renew automatically unless cancelled. The applicable price is shown in the App Store purchase screen in the currency for your country or region before confirmation." }
      ]
    },
    faq: { title: "Inset FAQ — Price, full-resolution export, privacy, Android", description: "Direct answers about Inset's free features, Inset Lab, full-resolution export, photo privacy, supported iPhones, and Android status.", eyebrow: "FAQ", heading: "Questions about Inset, answered directly.", intro: "These answers describe the current public iPhone version, 1.2.1.", sections: [] },
    support: {
      title: "Inset support — Help, privacy, terms, and release notes", description: "Get help with Inset, read common answers, review release notes, or contact the developer.",
      eyebrow: "SUPPORT", heading: "Help with Inset.", intro: "Start with the FAQ and release notes. If the problem remains, send the app version, iOS version, and the steps that led to it. Do not attach a private photo unless it is necessary and you choose to do so.",
      sections: [
        { title: "Before contacting support", body: "Check that Inset and iOS are up to date, then try the action again. For purchase restoration, use the same Apple ID and Restore inside Inset." },
        { title: "Contact", body: `Email ${supportEmail}. Please include a short description, your Inset version, iOS version, and whether the issue can be repeated.` },
        { title: "Policies and updates", body: "Privacy, Terms, the commercial transaction disclosure, FAQ, and Releases are available from the footer of every page." }
      ]
    }
  },
  ja: {
    features: {
      title: "Insetの機能 — 余白レイヤー、プリセット、一括処理", description: "Insetの余白レイヤー、見たままのプレビュー、プリセット、一括処理、フル解像度書き出しについて説明します。",
      eyebrow: "機能", heading: "写真を仕上げる、正確な最後の工程。", intro: "Insetが扱うのは、写真のまわりです。余白を組み、仕上がりを確かめ、汎用編集アプリを行き来せずに保存できます。",
      sections: [
        { title: "余白を重ねる", body: "必要な数だけ余白レイヤーを追加し、色、幅、比率を一層ずつ調整できます。" },
        { title: "見たままとフル解像度", body: "編集画面で最終構図を確認し、そのレイアウトを元写真に応じたフル解像度で書き出します。" },
        { title: "クロップと比率", body: "余白で一般的な比率へ合わせるほか、自由・比率クロップ、パン、ズーム、90度回転、傾き調整を使えます。" },
        { title: "プリセットと一括処理", body: "仕上がりをプリセットとして保存できます。Inset Labでは同じ設定を複数の写真へ適用し、一括保存できます。" },
        { title: "クリエイティブフレーム", body: "Inset Labではフィルム、ポラロイド、35mm、Letterboxを選び、お気に入りとして再利用できます。" }
      ]
    },
    "how-it-works": {
      title: "Insetの使い方 — 写真選択からフル解像度書き出しまで", description: "写真を選び、余白を重ね、構図を確認し、プリセット保存または書き出しを行うInsetの流れを説明します。",
      eyebrow: "使い方", heading: "選ぶ。整える。確かめる。保存する。", intro: "写真を中心に判断できるよう、工程は短く保たれています。",
      sections: [
        { title: "1. 写真を選ぶ", body: "システムの写真ピッカーで1枚選ぶか、写真アプリから1枚または複数枚をInsetへ共有します。" },
        { title: "2. 余白を組む", body: "余白レイヤーを追加して色と幅を調整し、出力比率を選びます。必要なときだけクロップします。" },
        { title: "3. 仕上がりを確かめる", body: "編集画面で余白、写真、出力比率をまとめて確認します。" },
        { title: "4. 保存して繰り返す", body: "写真ライブラリへ書き出します。設定はプリセットへ保存でき、Inset Labでは複数の写真へまとめて適用できます。" }
      ]
    },
    frames: {
      title: "Insetの写真フレーム — 余白、フィルム、ポラロイド、35mm、Letterbox", description: "自由な余白レイヤーと、フィルム、ポラロイド、35mm、Letterboxのクリエイティブフレームを紹介します。",
      eyebrow: "フレーム", heading: "フレームで、写真の佇まいを変える。", intro: "フレームは後から足す飾りではなく、写真をどう置くかを決める最終構図の一部です。",
      sections: [
        { title: "自由な余白", body: "白、黒、任意の色、複数レイヤーを組み合わせ、幅と比率を正確に調整できます。" },
        { title: "フィルムと35mm", body: "Inset Labのフィルムと35mmフレームは、写真の向きに合わせて使えます。" },
        { title: "ポラロイド", body: "下側の余白やプリントの形そのものを構図に加えたいときに使えます。" },
        { title: "Letterbox", body: "9:16、4:5、1:1、4:3、3:2に対応し、角丸、ボーダー、細いボーダーも選べます。" }
      ]
    },
    pricing: {
      title: "Insetの料金 — 基本機能は無料、Inset Labは有料", description: "Insetの基本機能は無料です。Inset Labではクリエイティブフレームと一括処理を利用できます。",
      eyebrow: "料金", heading: "まずは無料で。必要になったらInset Labを。", intro: "Inset Labは、月額・年額の自動更新サブスクリプションと、買い切りから選べます。購入確定前に、App Storeの画面で適用価格を確認できます。",
      sections: [
        { title: "基本機能は無料", body: "余白レイヤー、クロップ、プリセット、フル解像度書き出しはInset Labなしで利用できます。" },
        { title: "Inset Lab", body: "クリエイティブフレーム、お気に入り、複数写真への一括フレームを利用できます。" },
        { title: "購入方式", body: "Inset Labは、月額・年額の自動更新サブスクリプション、または買い切りから選べます。対象となる月額・年額プランには7日間の無料トライアルが付き、解約しない限り自動更新されます。実際に適用される価格は、購入確定前にApp Storeの購入画面へ各国・地域の通貨で表示されます。" }
      ]
    },
    faq: { title: "Inset FAQ — 料金、フル解像度、写真のプライバシー、Android", description: "Insetの無料機能、Inset Lab、フル解像度書き出し、写真の扱い、対応iPhone、Android版について回答します。", eyebrow: "FAQ", heading: "Insetについて、短く答えます。", intro: "現在公開中のiPhone版1.2.1に基づく回答です。", sections: [] },
    support: {
      title: "Insetサポート — FAQ、プライバシー、利用規約、更新情報", description: "Insetのよくある質問、リリースノート、ポリシーを確認し、開発者へ問い合わせできます。",
      eyebrow: "サポート", heading: "Insetのサポート。", intro: "まずFAQとリリースノートをご確認ください。解決しない場合は、アプリのバージョン、iOSのバージョン、問題が起きるまでの手順をお知らせください。必要がない限り、私的な写真は添付しないでください。",
      sections: [
        { title: "お問い合わせの前に", body: "InsetとiOSを最新の状態にし、もう一度同じ操作をお試しください。購入の復元は、同じApple IDでInset内のRestoreを使用します。" },
        { title: "お問い合わせ", body: `${supportEmail} へメールをお送りください。短い状況説明、Insetのバージョン、iOSのバージョン、再現できるかを添えてください。` },
        { title: "ポリシーと更新情報", body: "プライバシー、利用規約、特定商取引法に基づく表記、FAQ、リリースノートはすべてのページのフッターから確認できます。" }
      ]
    }
  }
};

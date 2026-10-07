export type Locale = "en" | "ja";
export type Localized<T> = Record<Locale, T>;
export type PageKey = "home" | "features" | "how-it-works" | "frames" | "pricing" | "faq" | "support" | "privacy" | "terms" | "legal" | "releases";
export type ContentSection = { title: string; body: string; bullets?: string[]; links?: { label: string; href: string }[] };
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
  publicVersion: "1.3.2",
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
    { question: "Are my photos uploaded?", answer: "No. Photos and edited images are processed on your device. Inset does send pseudonymous usage analytics and purchase data as described in the Privacy Policy." },
    { question: "Why does Inset request photo access?", answer: "Choose source photos and videos through the system picker. iOS uses add-only access to save them. Android 8–9 asks for storage write permission when saving photos; Android 10 and later uses MediaStore for saving." },
    { question: "What devices are supported?", answer: "The public iOS version supports iPhone with iOS 17.0 or later. Android is in preparation: photos require Android 8 or later; video saving requires Android 10 or later, for videos up to five minutes. Some formats or device limitations may prevent export." },
    { question: "Which languages are supported?", answer: "The iOS version supports 17 locales, including English and Japanese. The initial Android release is being prepared with Japanese and English support." },
    { question: "Is an Android version available?", answer: "Not yet. Android is in preparation. A release date and Google Play URL have not been announced." },
    { question: "How do I manage or restore Inset Lab?", answer: "Use Apple subscription management on iOS or Google Play subscription management on Android. Restore Purchases in Inset with the same account for the store where you purchased. Uninstalling does not cancel a subscription; purchases are not guaranteed to transfer between stores." }
  ],
  ja: [
    { question: "Insetは無料で使えますか？", answer: "はい。余白、プリセット、クロップ、フル解像度書き出しなどの基本機能は無料です。クリエイティブフレームと一括処理を含むInset Labは有料の追加機能です。" },
    { question: "複数の余白を重ねられますか？", answer: "はい。各レイヤーの色、幅、比率を個別に調整し、余白を一層ずつ重ねられます。" },
    { question: "フル解像度で書き出せますか？", answer: "はい。プレビューと同じレイアウトを、元写真に応じたフル解像度で書き出します。" },
    { question: "設定を保存して繰り返し使えますか？", answer: "はい。仕上がりをプリセットとして保存し、別の写真へ再適用できます。プリセットは端末内に保存されます。" },
    { question: "写真はアップロードされますか？", answer: "いいえ。写真と編集後画像は端末内で処理されます。仮名の利用分析と購入に関するデータについてはプライバシーポリシーをご確認ください。" },
    { question: "写真ライブラリ権限は何に使いますか？", answer: "元の写真・動画はシステムのピッカーで選びます。iOSでは保存用の「追加のみ」権限を使います。Android 8–9では写真保存時にストレージ書き込み権限を求め、Android 10以降ではMediaStoreで保存します。" },
    { question: "対応環境は？", answer: "公開中のiOS版はiOS 17.0以降のiPhoneに対応しています。準備中のAndroid版は、写真がAndroid 8以降、動画保存がAndroid 10以降で、動画の上限は5分です。素材形式・端末性能により保存できない場合があります。" },
    { question: "何言語に対応していますか？", answer: "iOS版は日本語と英語を含む17ロケールに対応しています。Android初回公開は日本語・英語を基本として準備しています。" },
    { question: "Android版はありますか？", answer: "現在準備中です。公開日とGoogle Play URLはまだ発表していません。" },
    { question: "Inset Labの管理や復元は？", answer: "iOSはApple、AndroidはGoogle Playのサブスクリプション管理で解約できます。購入したストアの同じアカウントで、Insetの「購入を復元」を使います。アプリを削除しても解約されません。ストアをまたぐ購入の移行は保証しません。" }
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
      eyebrow: "PRICING", heading: "Start free. Add Inset Lab when you need more.", intro: "Inset Lab is available as monthly and yearly auto-renewable subscriptions or a one-time Lifetime purchase. The store purchase screen shows the applicable price and terms before confirmation. Android public sales have not started.",
      sections: [
        { title: "Core features are free", body: "Layered margins, crop, presets, and full-resolution export are available without Inset Lab." },
        { title: "Inset Lab", body: "Inset Lab unlocks Creative Frames, favorites, and batch framing for multiple photographs." },
        { title: "Purchase options", body: "Published App Store prices in Japan are ¥500 per month, ¥1,500 per year, and ¥4,000 for Lifetime, including tax. Eligible monthly and yearly subscriptions include a 7-day free trial and renew automatically unless cancelled. For prices outside Japan, contact contact@atelier-yohaku.com and we will provide the current price by email without delay. The applicable price is also shown in the App Store purchase screen before confirmation. Android public prices and trial conditions will be listed before public sales begin; they are not guaranteed to match iOS." }
      ]
    },
    faq: { title: "Inset FAQ — Price, full-resolution export, privacy, Android", description: "Direct answers about Inset's free features, Inset Lab, full-resolution export, photo privacy, supported iPhones, and Android status.", eyebrow: "FAQ", heading: "Questions about Inset, answered directly.", intro: "These answers cover the public iOS app and the Android version being prepared for release.", sections: [] },
    support: {
      "title": "Inset support — iOS and Android",
      "description": "Help with photos, videos, Inset Lab, restoration, cancellation, refunds, and privacy on iOS and Android.",
      "eyebrow": "SUPPORT",
      "heading": "Help with Inset.",
      "intro": "Support for the public iOS app and the Android version being prepared for release. Start with the FAQ and release notes. If a problem remains, tell us your device model, OS, Inset version, and the steps that led to it. Do not send private media unless needed and you choose to share it.",
      "sections": [
        {
          "title": "Photos and videos",
          "body": "Update Inset and try again. For Google Photos or other cloud media, first confirm the selected file has downloaded and plays in its source app. Android photo support starts at Android 8; video saving requires Android 10 or later, for videos up to five minutes. If export fails, report the duration, file format if known, and the error shown; do not send the media initially."
        },
        {
          "title": "Restore Inset Lab",
          "body": "In Inset settings, select Restore Purchases while using the same Apple Account or Google account used for the purchase. Confirm any pending payment with the store. Restoring does not create a new purchase. A purchase is not guaranteed to transfer between iOS and Android. If restoration fails, tell us the platform and plan without sending card details or verification codes."
        },
        {
          "title": "Service codes on Android",
          "body": "Complimentary Inset Lab access from a service code is separate from a Google Play purchase. Restore Purchases is for store purchases and is not guaranteed to restore code access to a different anonymous App User ID. If reinstalling creates a new ID, you may need to enter the code again. Redeeming a code does not cancel or refund an existing paid subscription; manage that subscription through Google Play."
        },
        {
          "title": "Cancel a subscription",
          "body": "On iOS, use Apple subscription management and cancel at least 24 hours before renewal. On Android, use Google Play subscription management before the next renewal. Inset’s Android settings also provides a management link when an active subscription is recognized. Uninstalling does not cancel a subscription. Check the store for the access end date. Lifetime is a one-time purchase with no renewal.",
          "links": [
            {
              "label": "Manage Apple subscriptions",
              "href": "https://support.apple.com/118428"
            },
            {
              "label": "Manage Google Play subscriptions",
              "href": "https://play.google.com/store/account/subscriptions"
            }
          ]
        },
        {
          "title": "Request a refund",
          "body": "Refund eligibility follows the conditions of the store where you purchased and applicable law. Use Apple’s Report a Problem or Google Play’s refund guidance. If Google Play asks you to contact the developer, email us for assistance.",
          "links": [
            {
              "label": "Apple: Report a Problem",
              "href": "https://reportaproblem.apple.com/"
            },
            {
              "label": "Google Play refund guidance",
              "href": "https://support.google.com/googleplay/answer/15574908"
            }
          ]
        },
        {
          "title": "Privacy and deletion requests",
          "body": "Inset has no app account or sign-in. Email us with a privacy inquiry or data deletion request. We do not currently provide a dedicated method that reliably matches and deletes anonymous records. Pseudonymous records may not be locatable from an email address alone; we will explain the identifiable records and any limits. Deleting the app removes local data but does not cancel purchases or remove service-side records.",
          "links": [
            {
              "label": "Read the Privacy Policy",
              "href": "/privacy/"
            }
          ]
        },
        {
          "title": "Contact",
          "body": "Email contact@atelier-yohaku.com. Include a short description, device model, OS and Inset versions, and whether the issue repeats. For an internal Android test, include the build number if available. Do not send verification codes, payment details, or unnecessary private media."
        }
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
      eyebrow: "料金", heading: "まずは無料で。必要になったらInset Labを。", intro: "Inset Labは、月額・年額の自動更新サブスクリプションと、買い切りから選べます。購入前に各ストアの購入画面で価格と条件を確認できます。Android版の一般販売はまだ開始していません。",
      sections: [
        { title: "基本機能は無料", body: "余白レイヤー、クロップ、プリセット、フル解像度書き出しはInset Labなしで利用できます。" },
        { title: "Inset Lab", body: "クリエイティブフレーム、お気に入り、複数写真への一括フレームを利用できます。" },
        { title: "購入方式", body: "日本のApp Store掲載価格（税込）は、月額500円、年額1,500円、買い切り4,000円です。対象となる月額・年額プランには7日間の無料トライアルが付き、解約しない限り自動更新されます。日本以外の各国・地域の販売価格は、contact@atelier-yohaku.comへご請求いただければ、電子メールにて遅滞なく提供します。適用価格は購入前にApp Storeの購入画面でも表示されます。Android版の一般販売価格・トライアル条件は一般販売開始までに表示します。iOSと同一条件であることは保証しません。" }
      ]
    },
    faq: { title: "Inset FAQ — 料金、フル解像度、写真のプライバシー、Android", description: "Insetの無料機能、Inset Lab、フル解像度書き出し、写真の扱い、対応iPhone、Android版について回答します。", eyebrow: "FAQ", heading: "Insetについて、短く答えます。", intro: "公開中のiOS版と、公開準備中のAndroid版についてご案内します。", sections: [] },
    support: {
      "title": "Insetサポート — iOS・Android",
      "description": "iOS・Androidの写真・動画、Inset Lab、復元、解約、返金、プライバシーの問い合わせ先です。",
      "eyebrow": "サポート",
      "heading": "Insetのサポート。",
      "intro": "公開中のiOS版と公開準備中のAndroid版についてご案内します。まずFAQと更新情報をご確認ください。解決しない場合は、端末の機種、OS、Insetのバージョン、問題が起きるまでの手順をお知らせください。私的な写真・動画は、必要があり、ご自身が共有を選ぶ場合だけお送りください。",
      "sections": [
        {
          "title": "写真・動画が読み込めない／保存できない",
          "body": "Insetを更新してもう一度お試しください。Google フォトなどクラウド上の素材は、元アプリでダウンロードが完了し、再生できるか確認してください。Androidの写真はAndroid 8以降、動画保存はAndroid 10以降・5分までが対象です。保存できない場合は、動画の長さ、分かれば形式、表示されたエラーをお知らせください。最初から素材そのものを送る必要はありません。"
        },
        {
          "title": "Inset Labの購入を復元",
          "body": "購入したものと同じApple AccountまたはGoogleアカウントで、Insetの設定から「購入を復元」を選んでください。支払いが保留中ならストアの状態をご確認ください。復元で新たな購入は発生しません。iOSとAndroidをまたぐ購入の移行は保証しません。復元できない場合は、OSと購入プランをお知らせください。カード情報や認証コードは送らないでください。"
        },
        {
          "title": "Androidのサービスコード",
          "body": "サービスコードによるInset Labの無償アクセスは、Google Playでの購入とは別です。「購入を復元」はストア購入のための機能で、別の匿名App User IDへのコード利用権の復元は保証しません。再インストールで新しいIDになった場合は、コードの再入力が必要になることがあります。コードを利用しても既存の有料サブスクリプションは解約・返金されません。Google Playで管理してください。"
        },
        {
          "title": "サブスクリプションの解約",
          "body": "iOSは更新の少なくとも24時間前までにAppleの管理画面から、Androidは次回更新前にGoogle Playの管理画面から解約します。Android版Insetの設定にも、認識された有効なサブスクリプションがある場合は管理リンクが表示されます。アプリを削除しても解約されません。利用終了日はストアでご確認ください。買い切りは一度きりの購入で、自動更新はありません。",
          "links": [
            {
              "label": "Appleのサブスクリプション管理",
              "href": "https://support.apple.com/118428"
            },
            {
              "label": "Google Playのサブスクリプション管理",
              "href": "https://play.google.com/store/account/subscriptions"
            }
          ]
        },
        {
          "title": "返金について",
          "body": "返金の可否は購入したストアの条件と適用法令に従います。Appleの「問題を報告する」またはGoogle Playの返金案内をご確認ください。Google Playから開発者への連絡を求められた場合は、メールでお問い合わせください。",
          "links": [
            {
              "label": "Apple：問題を報告する",
              "href": "https://reportaproblem.apple.com/"
            },
            {
              "label": "Google Playの返金案内",
              "href": "https://support.google.com/googleplay/answer/15574908"
            }
          ]
        },
        {
          "title": "プライバシー・データ削除の依頼",
          "body": "Insetにはアプリのアカウント登録・ログインはありません。プライバシーの照会・データ削除の依頼はメールで受け付けます。現在、匿名の記録を確実に照合して削除する専用手段は提供していません。仮名の記録はメールアドレスだけで特定できない場合があり、特定できる情報や対応範囲をご案内します。アプリの削除で端末内データは消去されますが、解約やサービス側の記録の削除は行われません。",
          "links": [
            {
              "label": "プライバシーポリシーを読む",
              "href": "/ja/privacy/"
            }
          ]
        },
        {
          "title": "お問い合わせ",
          "body": "contact@atelier-yohaku.com へメールをお送りください。状況の説明、端末の機種、OSとInsetのバージョン、再現できるかを添えてください。Android内部テストの場合は、分かればビルド番号もお知らせください。認証コード、決済情報、必要のない私的な写真・動画は送らないでください。"
        }
      ]
    }
  }
};

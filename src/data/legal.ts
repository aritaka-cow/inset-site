import type { Locale, Localized } from "./site";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  subheading?: string;
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  heading: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyDocuments: Localized<LegalDocument> = {
  ja: {
    title: "Inset プライバシーポリシー",
    description: "Insetが扱う写真、匿名利用分析、Apple Ads attribution、RevenueCatによる購入情報について説明します。",
    heading: "プライバシーポリシー",
    updated: "2026-07-14",
    intro: "Inset（以下「本アプリ」）は、ユーザーのプライバシーに配慮して設計されています。本アプリは、アプリ改善のための<strong>匿名の利用状況データ</strong>と、課金機能に必要な購入履歴を収集します。写真、編集後画像、ファイル名、写真の位置情報、プリセット名は収集・送信しません。",
    sections: [
      { heading: "データの収集", bullets: [
        "アカウント登録・ログインはありません。",
        "本アプリは、匿名の利用分析のためにPostHogを使用します。",
        "Inset Labの購入確認、解錠、復元、購入分析のためにRevenueCatを使用します。",
        "収集する可能性がある情報: 匿名のアプリ・端末インスタンス識別子、アプリの起動・画面表示・フレーム追加・プリセット保存・書き出し成功・失敗などの利用イベント、アプリバージョン、OS・端末種別などの技術情報。",
        "Apple Ads経由でインストールされた場合、広告効果を測定するため、Appleが返すattribution結果とcampaign・ad group・keyword・ad ID、claim・conversion type、国・地域、掲載面を、匿名の利用イベントとともにPostHogへ送信する場合があります。",
        "Apple Ads attribution token、Apple APIの未加工レスポンス、広告のクリック・表示日時は保存せず、PostHogにも送信しません。",
        "広告目的のトラッキングは行いません。"
      ] },
      { heading: "写真へのアクセス", bullets: [
        "本アプリは、編集した写真をフォトライブラリへ<strong>保存（追加）するためだけ</strong>に写真へのアクセスを要求します（「追加のみ」の権限）。",
        "<strong>既存の写真を読み取ることはありません。</strong>編集対象は、あなたが選択した写真だけが本アプリに渡されます。",
        "写真の処理は端末内で行われ、写真や編集後画像が外部に送信・アップロードされることはありません。",
        "写真ファイル名、写真メタデータ、位置情報、プリセット名、任意カラーの実際の色値も分析イベントには含めません。"
      ] },
      { heading: "端末内に保存される情報", bullets: [
        "保存したプリセット（余白の色・幅・比率などの<strong>数値設定のみ</strong>）は端末内にのみ保存されます。画像・位置情報は含まれません。",
        "プリセット名やプリセット内容そのものは分析サービスへ送信しません。アプリを削除すると端末内のプリセットは消去されます。"
      ] },
      { heading: "第三者への提供", paragraphs: ["本アプリは、利用分析と広告効果測定のためにPostHog（PostHog, Inc.）へ匿名の利用イベントを送信し、課金機能と購入分析のためにRevenueCat（RevenueCat, Inc.）へ購入履歴と匿名識別子を送信します。データの販売、データブローカーへの提供、他社のアプリやWebサイトを横断する広告目的のトラッキングは行いません。"] },
      { heading: "購入・課金について", bullets: [
        "Inset Labの購入（自動更新サブスクリプション・買い切り）は<strong>Apple（App Store・StoreKit）</strong>を通じて処理されます。本アプリがクレジットカード番号などの決済情報を収集・保存することはありません。",
        "RevenueCatは、レシート・トランザクション情報、製品ID、購入・更新・有効期限・復元状態などの購入履歴を受け取り、正当性確認とLabの解錠、購入分析に使用します。",
        "RevenueCatには自動生成された匿名App User IDと、PostHogの仮名ユーザーIDを送信します。本アプリにはアカウントがなく、氏名・メールアドレス・Apple Accountなどの直接識別情報とは紐づけません。",
        "RevenueCatは購入ライフサイクルイベントをPostHogへ送信します。これらはアプリ機能、製品分析、Apple Adsのキャンペーン効果測定に使用しますが、他社サービスを横断するユーザー追跡には使用しません。"
      ] },
      { heading: "お子様のプライバシー", paragraphs: ["本アプリは子どもを対象にしたサービスではありません。年齢、氏名、メールアドレスなど、個人を直接識別する情報の入力は求めません。"] },
      { heading: "本ポリシーの変更", paragraphs: ["本ポリシーは更新される場合があります。重要な変更はアプリの更新情報または本ページでお知らせします。"] },
      { heading: "お問い合わせ", paragraphs: ["本アプリやプライバシーに関するお問い合わせは<a href=\"mailto:inset.support@gmail.com\">inset.support@gmail.com</a>までご連絡ください。"] }
    ]
  },
  en: {
    title: "Inset Privacy Policy",
    description: "Learn how Inset handles photos, anonymous product analytics, Apple Ads attribution, and RevenueCat purchase information.",
    heading: "Privacy Policy",
    updated: "2026-07-14",
    intro: "Inset (“the App”) is designed with privacy in mind. The App collects <strong>anonymous usage analytics</strong> to improve the product and purchase history required to provide paid features. It does not collect or transmit your photos, edited images, filenames, photo location data, or preset names.",
    sections: [
      { heading: "Data Collection", bullets: [
        "No account and no sign-in.",
        "The App uses PostHog for anonymous product analytics.",
        "The App uses RevenueCat to validate, unlock, restore, and analyze Inset Lab purchases.",
        "Data that may be collected: anonymous app or device instance identifier, usage events such as app opens, screen views, frame additions, preset saves, export success or failure, app version, OS or device type, and similar technical information.",
        "When the App is installed through Apple Ads, it may send Apple's attribution result and campaign, ad group, keyword, and ad IDs, claim or conversion type, country or region, and placement to PostHog with anonymous usage events to measure campaign performance.",
        "The Apple Ads attribution token, raw Apple API response, and ad click or impression timestamps are not stored or sent to PostHog.",
        "The App does not use advertising tracking."
      ] },
      { heading: "Photo Access", bullets: [
        "The App requests photo access <strong>only to save (add)</strong> your edited images to your photo library (“add-only” permission).",
        "<strong>It never reads your existing photo library.</strong> Only the photo you choose is passed to the App.",
        "Photo processing happens on-device. Photos and edited images are not uploaded or transmitted.",
        "Photo filenames, photo metadata, location data, preset names, and exact custom color values are not included in analytics events."
      ] },
      { heading: "Information Stored on Your Device", bullets: [
        "Saved presets (numeric settings only, such as frame color, width, and ratio) are stored locally on your device. They contain no images or location data.",
        "Preset names and preset contents are not sent to analytics services. Deleting the App removes local presets."
      ] },
      { heading: "Third Parties", paragraphs: ["The App sends anonymous usage events to PostHog (PostHog, Inc.) for product analytics and advertising measurement, and sends purchase history and anonymous identifiers to RevenueCat (RevenueCat, Inc.) for purchase functionality and analytics. We do not sell data, provide it to data brokers, or track users across other companies’ apps or websites for advertising."] },
      { heading: "Purchases", bullets: [
        "Inset Lab purchases (auto-renewable subscriptions and the one-time Lifetime) are processed by <strong>Apple (App Store and StoreKit)</strong>. The App never collects or stores payment information such as credit card numbers.",
        "RevenueCat receives purchase history such as receipt and transaction information, product ID, purchase, renewal, expiration, and restore status. It uses this data to validate purchases, unlock Lab, and provide purchase analytics.",
        "The App sends RevenueCat an automatically generated anonymous App User ID and a pseudonymous PostHog user ID. The App has no account system and does not associate these identifiers with a name, email address, Apple Account, or other direct identifier.",
        "RevenueCat sends purchase lifecycle events to PostHog. These events are used for app functionality, product analytics, and Apple Ads campaign measurement, but not to track users across other companies’ services."
      ] },
      { heading: "Children’s Privacy", paragraphs: ["The App is not directed to children. It does not ask for directly identifying information such as name, email address, or age."] },
      { heading: "Changes to This Policy", paragraphs: ["This policy may be updated. Material changes will be noted in the app’s release notes or on this page."] },
      { heading: "Contact", paragraphs: ["For questions about the App or privacy, contact <a href=\"mailto:inset.support@gmail.com\">inset.support@gmail.com</a>."] }
    ]
  }
};

export const termsDocuments: Localized<LegalDocument> = {
  ja: {
    title: "Inset 利用規約",
    description: "Insetと有料機能Inset Labの利用条件、サブスクリプション、返金、知的財産について定めます。",
    heading: "利用規約",
    updated: "2026-07-15",
    intro: "本利用規約（以下「本規約」）は、Inset（以下「本アプリ」）の利用条件を定めるものです。本アプリをダウンロード・利用した時点で、本規約に同意したものとみなされます。本アプリはAppleの<a href=\"https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\">標準使用許諾契約</a>にも準拠します。",
    sections: [
      { heading: "1. ライセンス", paragraphs: ["本アプリは、App Storeの規約および上記Apple標準EULAに従い、お客様の所有・管理するAppleデバイスで本アプリを利用する非独占的なライセンスを付与します。"] },
      { heading: "2. Inset Lab（有料機能）", paragraphs: ["Insetの基本機能は無料で利用できます。「Inset Lab」は、すべてのクリエイティブフレーム（フィルム・ポラロイド・35mm・Letterbox）や複数写真への一括フレームなどを解放する有料機能です。価格はApp Store上で各国・地域の通貨で表示されます。"], bullets: [
        "<strong>年額プラン（自動更新サブスクリプション）</strong>: 7日間の無料トライアル付き。トライアル後は年額で自動更新されます。",
        "<strong>月額プラン（自動更新サブスクリプション）</strong>: 7日間の無料トライアル付き。トライアル後は月額で自動更新されます。",
        "<strong>買い切り（Lifetime）</strong>: 一度きりの購入で、継続課金はありません。"
      ], subheading: "自動更新・課金について" },
      { heading: "自動更新・課金について", bullets: [
        "支払いは、購入確定時にApple IDアカウントへ請求されます。",
        "サブスクリプションは、現在の期間終了の24時間前までに解約しない限り自動更新され、更新分が請求されます。",
        "無料トライアル期間中に解約した場合、トライアル終了時点で課金は発生しません。トライアルの未使用分は、同一サブスクリプションを購入した時点で失効します。",
        "解約・自動更新の管理は、購入後に端末の「設定」からApple Accountの「サブスクリプション」で行えます。",
        "過去の購入は、アプリ内の「復元（Restore）」からいつでも復元できます。"
      ] },
      { heading: "3. 返金", paragraphs: ["購入はすべてApple（App Store）を通じて処理されます。返金はAppleのポリシーに従い、<a href=\"https://support.apple.com/ja-jp/HT204084\">Appleの購入履歴の問題報告</a>から申請してください。本アプリ提供者は直接の返金を行いません。"] },
      { heading: "4. 知的財産", paragraphs: ["本アプリおよび同梱されるフレーム素材・デザイン・ロゴ等の知的財産権は、提供者または正当な権利者に帰属します。お客様が本アプリで作成した画像（あなたの写真にフレームを適用した成果物）の権利はお客様に帰属します。"] },
      { heading: "5. 免責事項", paragraphs: ["本アプリは「現状有姿」で提供され、特定目的への適合性等について明示・黙示を問わず保証しません。法令で許容される範囲で、本アプリの利用に起因する損害について提供者は責任を負いません。"] },
      { heading: "6. 本規約の変更", paragraphs: ["本規約は変更される場合があります。重要な変更は本ページまたはアプリの更新情報でお知らせします。"] },
      { heading: "7. お問い合わせ", paragraphs: ["本規約に関するお問い合わせは<a href=\"mailto:inset.support@gmail.com\">inset.support@gmail.com</a>までご連絡ください。"] }
    ]
  },
  en: {
    title: "Inset Terms of Use",
    description: "Terms governing Inset and the paid Inset Lab features, including subscriptions, refunds, and intellectual property.",
    heading: "Terms of Use",
    updated: "2026-07-15",
    intro: "These Terms of Use (“Terms”) govern your use of Inset (“the App”). By downloading or using the App, you agree to these Terms. The App is also subject to Apple’s <a href=\"https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\">Standard Licensed Application End User License Agreement (EULA)</a>.",
    sections: [
      { heading: "1. License", paragraphs: ["Subject to the App Store terms and Apple’s standard EULA above, you are granted a non-exclusive license to use the App on Apple devices that you own or control."] },
      { heading: "2. Inset Lab (Paid Features)", paragraphs: ["Inset’s core features are free. Inset Lab unlocks all Creative Frames (film, polaroid, 35mm, and Letterbox) and batch framing of multiple photos. Prices are shown in your local currency on the App Store."], bullets: [
        "<strong>Yearly plan (auto-renewable subscription)</strong>: includes a 7-day free trial, then renews yearly.",
        "<strong>Monthly plan (auto-renewable subscription)</strong>: includes a 7-day free trial, then renews monthly.",
        "<strong>Lifetime (one-time purchase)</strong>: a single purchase with no recurring charges."
      ] },
      { heading: "Auto-renewal and billing", bullets: [
        "Payment is charged to your Apple ID account at confirmation of purchase.",
        "A subscription automatically renews unless it is cancelled at least 24 hours before the end of the current period; your account is charged for renewal within that window.",
        "If you cancel during a free trial, no charge occurs at the end of the trial. Any unused portion of a free trial is forfeited when you purchase that subscription.",
        "You can manage or cancel auto-renewal after purchase in your device Settings under Apple Account and Subscriptions.",
        "Previous purchases can be restored anytime via Restore in the app."
      ] },
      { heading: "3. Refunds", paragraphs: ["All purchases are processed by Apple (the App Store). Refunds follow Apple’s policy. Request them through <a href=\"https://reportaproblem.apple.com/\">Apple’s Report a Problem</a>. The developer does not process refunds directly."] },
      { heading: "4. Intellectual Property", paragraphs: ["The App and its bundled frame assets, designs, and logos are owned by the developer or its licensors. Images you create with the App (your own photos with frames applied) remain yours."] },
      { heading: "5. Disclaimer", paragraphs: ["The App is provided “as is” without warranties of any kind, express or implied, including fitness for a particular purpose. To the extent permitted by law, the developer is not liable for damages arising from use of the App."] },
      { heading: "6. Changes to These Terms", paragraphs: ["These Terms may be updated. Material changes will be noted on this page or in the app’s release notes."] },
      { heading: "7. Contact", paragraphs: ["For questions about these Terms, contact <a href=\"mailto:inset.support@gmail.com\">inset.support@gmail.com</a>."] }
    ]
  }
};

export function getLegalDocument(kind: "privacy" | "terms", locale: Locale): LegalDocument {
  return (kind === "privacy" ? privacyDocuments : termsDocuments)[locale];
}

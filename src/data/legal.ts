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

export type LegalKind = "privacy" | "terms" | "legal";

export const privacyDocuments: Localized<LegalDocument> = {
  ja: {
    title: "Inset プライバシーポリシー",
    description: "Insetが扱う写真、仮名利用分析、Apple Ads attribution、RevenueCatによる購入情報、Meta広告効果測定について説明します。",
    heading: "プライバシーポリシー",
    updated: "2026-08-22",
    intro: "Inset（以下「本アプリ」）は、ユーザーのプライバシーに配慮して設計されています。本アプリは、アプリ改善のための<strong>仮名の利用状況データ</strong>と、課金機能に必要な購入履歴を扱います。氏名、メールアドレス、電話番号、写真、編集後画像、ファイル名、写真の位置情報、プリセット名をMeta、PostHog、RevenueCatへ送信しません。",
    sections: [
      { heading: "データの収集", bullets: [
        "アカウント登録・ログインはありません。",
        "本アプリは、仮名の利用分析のためにPostHogを使用します。",
        "本アプリに組み込まれたPostHogおよびMeta SDKのコンポーネントは、アプリの機能提供と利用分析のため、クラッシュレポートおよび限定的な技術・運用上の診断データを収集する場合があります。これらの診断データをトラッキングには使用しません。",
        "Inset Labの購入確認、解錠、復元、購入分析のためにRevenueCatを使用します。",
        "収集する可能性がある情報: 仮名のアプリ・端末インスタンス識別子、アプリの起動・画面表示・フレーム追加・プリセット保存・書き出し成功・失敗などの利用イベント、アプリバージョン、OS・端末種別などの技術情報。これらの識別子はアカウントや氏名などの直接識別情報ではありませんが、AppleのApp Privacyでは利用者または端末に関連付けられる識別子として扱われる場合があります。",
        "Apple Ads経由でインストールされた場合、広告効果を測定するため、Appleが返すattribution結果とcampaign・ad group・keyword・ad ID、claim・conversion type、国・地域、掲載面を、仮名の利用イベントとともにPostHogへ送信する場合があります。",
        "Apple Ads attribution token、Apple APIの未加工レスポンス、広告のクリック・表示日時は保存せず、PostHogにも送信しません。",
        "Meta広告効果測定は、対応するproduction版でAppleのApp Tracking Transparency（ATT）を許可した場合だけ有効になります。本アプリはMetaへ、アプリ起動と初回写真書き出し完了のイベントを送信し、RevenueCatはtrial開始、購入、サブスクリプション、更新などの購入ライフサイクル情報をserver-to-serverで送信する場合があります。",
        "ATTが未許可、拒否、制限中の場合、または必要なproduction設定がない場合、本アプリはMeta SDKを初期化せず、Metaへアプリ内イベントやMetaの匿名識別子を送信しません。許可しなくても、本アプリの利用、購入、復元には影響しません。"
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
      { heading: "第三者への提供と広告効果測定", paragraphs: ["本アプリは、利用分析と広告効果測定のためにPostHog（PostHog, Inc.）へ仮名の利用イベントを送信し、課金機能と購入分析のためにRevenueCat（RevenueCat, Inc.）へ購入履歴と仮名識別子を送信します。ATTを許可した場合に限り、Meta Platforms, Inc.へMetaの匿名識別子、限定したアプリ内イベント、購入・サブスクリプションのライフサイクル情報を送信し、Meta広告がダウンロードや購入につながったかの測定と今後の広告配信改善に使用します。この目的はAppleの定義上のトラッキングに該当します。本アプリ内に第三者広告は表示しません。データを販売せず、データブローカーへ提供しません。"] },
      { heading: "購入・課金について", bullets: [
        "Inset Labの購入（自動更新サブスクリプション・買い切り）は<strong>Apple（App Store・StoreKit）</strong>を通じて処理されます。本アプリがクレジットカード番号などの決済情報を収集・保存することはありません。",
        "RevenueCatは、レシート・トランザクション情報、製品ID、購入・更新・有効期限・復元状態などの購入履歴を受け取り、正当性確認とLabの解錠、購入分析に使用します。",
        "RevenueCatには自動生成された仮名App User IDと、PostHogの仮名ユーザーIDを送信します。RevenueCatによる端末識別子の自動収集は無効です。本アプリにはアカウントがなく、これらのIDへ氏名、メールアドレス、電話番号、Apple Account、写真を設定しません。",
        "RevenueCatは購入ライフサイクルイベントをPostHogへ送信します。ATTを許可し、Meta連携が明示的に有効なproduction版では、同じイベントのうち設定済みのtrial開始、購入、サブスクリプション、更新などをMetaへ送信する場合があります。ATT未許可時のserver-to-server送信は有効にしません。購入・売上イベントを本アプリとRevenueCatの両方からMetaへ二重送信しません。"
      ] },
      { heading: "選択、保持、削除", bullets: [
        "Meta広告効果測定の許可は、iOSの設定からいつでも変更できます。許可を取り消した後は、本アプリからMetaへ新しいトラッキングデータを送信しません。既に送信されたデータには各提供先の保持・削除方針が適用されます。",
        "アプリを削除すると、端末内のプリセットと本アプリのローカル状態は削除されます。PostHog、RevenueCat、Metaが保持する仮名データは、それぞれの保持方針、セキュリティ、不正防止、会計・法令上の必要性に従って保持される場合があります。",
        "本アプリにアカウントはありません。プライバシーに関する照会または削除依頼は、下記の連絡先へお送りください。対応に必要な範囲で、端末に表示される仮名識別子の提供をお願いする場合があります。"
      ] },
      { heading: "お子様のプライバシー", paragraphs: ["本アプリは子どもを対象にしたサービスではありません。年齢、氏名、メールアドレスなど、個人を直接識別する情報の入力は求めません。"] },
      { heading: "本ポリシーの変更", paragraphs: ["本ポリシーは更新される場合があります。重要な変更はアプリの更新情報または本ページでお知らせします。"] },
      { heading: "お問い合わせ", paragraphs: ["本アプリやプライバシーに関するお問い合わせは<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>までご連絡ください。"] }
    ]
  },
  en: {
    title: "Inset Privacy Policy",
    description: "Learn how Inset handles photos, pseudonymous product analytics, Apple Ads attribution, RevenueCat purchases, and Meta ad measurement.",
    heading: "Privacy Policy",
    updated: "2026-08-22",
    intro: "Inset (“the App”) is designed with privacy in mind. The App handles <strong>pseudonymous usage analytics</strong> to improve the product and purchase history required to provide paid features. It does not send your name, email address, phone number, photos, edited images, filenames, photo location data, or preset names to Meta, PostHog, or RevenueCat.",
    sections: [
      { heading: "Data Collection", bullets: [
        "No account and no sign-in.",
        "The App uses PostHog for pseudonymous product analytics.",
        "Bundled PostHog and Meta SDK components may collect crash reports and limited technical or operational diagnostic data for app functionality and analytics. These diagnostics are not used for tracking.",
        "The App uses RevenueCat to validate, unlock, restore, and analyze Inset Lab purchases.",
        "Data that may be collected: pseudonymous app or device instance identifiers, usage events such as app opens, screen views, frame additions, preset saves, export success or failure, app version, OS or device type, and similar technical information. These are not account names or direct identifiers, but Apple App Privacy may treat them as identifiers linked to a user or device.",
        "When the App is installed through Apple Ads, it may send Apple's attribution result and campaign, ad group, keyword, and ad IDs, claim or conversion type, country or region, and placement to PostHog with pseudonymous usage events to measure campaign performance.",
        "The Apple Ads attribution token, raw Apple API response, and ad click or impression timestamps are not stored or sent to PostHog.",
        "Meta ad measurement is enabled only in a supported production release after you allow tracking through Apple's App Tracking Transparency (ATT). The App may then send Meta app activation and first photo export completion events, while RevenueCat may send trial start, purchase, subscription, renewal, and similar purchase lifecycle information to Meta server-to-server.",
        "If ATT is not authorized, is denied or restricted, or required production configuration is unavailable, the App does not initialize the Meta SDK or send in-app events or Meta's anonymous identifier to Meta. Your choice does not affect using the App, purchasing, or restoring purchases."
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
      { heading: "Third Parties and Ad Measurement", paragraphs: ["The App sends pseudonymous usage events to PostHog (PostHog, Inc.) for product analytics and advertising measurement, and purchase history and pseudonymous identifiers to RevenueCat (RevenueCat, Inc.) for purchase functionality and analytics. Only after ATT authorization, it may send Meta Platforms, Inc. a Meta anonymous identifier, limited in-app events, and purchase or subscription lifecycle information to measure whether Meta ads lead to downloads or purchases and to improve future ad delivery. Apple defines this purpose as tracking. The App does not display third-party ads, sell data, or provide data to data brokers."] },
      { heading: "Purchases", bullets: [
        "Inset Lab purchases (auto-renewable subscriptions and the one-time Lifetime) are processed by <strong>Apple (App Store and StoreKit)</strong>. The App never collects or stores payment information such as credit card numbers.",
        "RevenueCat receives purchase history such as receipt and transaction information, product ID, purchase, renewal, expiration, and restore status. It uses this data to validate purchases, unlock Lab, and provide purchase analytics.",
        "The App sends RevenueCat an automatically generated pseudonymous App User ID and a pseudonymous PostHog user ID. RevenueCat automatic device-identifier collection is disabled. The App has no account system and does not set a name, email address, phone number, Apple Account, or photo on these IDs.",
        "RevenueCat sends purchase lifecycle events to PostHog. In a production release where ATT is authorized and the Meta integration is explicitly enabled, RevenueCat may also send configured trial start, purchase, subscription, renewal, and similar events to Meta. Server-to-server delivery without ATT authorization is not enabled. The App does not send purchase or revenue events to Meta from both the client and RevenueCat."
      ] },
      { heading: "Choices, Retention, and Deletion", bullets: [
        "You can change Meta ad measurement permission at any time in iOS Settings. After permission is withdrawn, the App stops sending new tracking data to Meta. Data already sent remains subject to each recipient's retention and deletion practices.",
        "Deleting the App removes local presets and local App state. Pseudonymous data held by PostHog, RevenueCat, or Meta may be retained under their retention policies and as needed for security, fraud prevention, accounting, or legal obligations.",
        "The App has no account system. Contact the address below with a privacy inquiry or deletion request. To locate pseudonymous records, the developer may ask for an identifier displayed on your device, limited to what is necessary to fulfill the request."
      ] },
      { heading: "Children’s Privacy", paragraphs: ["The App is not directed to children. It does not ask for directly identifying information such as name, email address, or age."] },
      { heading: "Changes to This Policy", paragraphs: ["This policy may be updated. Material changes will be noted in the app’s release notes or on this page."] },
      { heading: "Contact", paragraphs: ["For questions about the App or privacy, contact <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>."] }
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
      { heading: "7. お問い合わせ", paragraphs: ["本規約に関するお問い合わせは<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>までご連絡ください。"] }
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
      { heading: "7. Contact", paragraphs: ["For questions about these Terms, contact <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>."] }
    ]
  }
};

export const commercialDisclosureDocuments: Localized<LegalDocument> = {
  ja: {
    title: "Inset 特定商取引法に基づく表記",
    description: "Inset Labの販売事業者、所在地、連絡先、価格、支払方法、提供時期、解約・返金条件を表示します。",
    heading: "特定商取引法に基づく表記",
    updated: "2026-07-19",
    intro: "Insetの有料機能「Inset Lab」に関する、特定商取引法第11条に基づく表示です。購入はAppleのApp Storeを通じて行われます。",
    sections: [
      { heading: "販売事業者", paragraphs: ["金澤 有剛（屋号：余白製作所）"] },
      { heading: "運営責任者", paragraphs: ["金澤 有剛"] },
      { heading: "所在地", paragraphs: ["〒060-0062<br>北海道札幌市中央区南2条西5丁目31-1 RMBld. 701"] },
      { heading: "電話番号", paragraphs: ["<a href=\"tel:+818057430492\">080&#8209;5743&#8209;0492</a>"] },
      { heading: "お問い合わせ", paragraphs: ["<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>"] },
      { heading: "販売価格", paragraphs: ["日本での現在価格（税込）は、月額500円、年額1,500円、買い切り4,000円です。対象となる月額・年額プランには7日間の無料トライアルが付きます。日本以外の各国・地域の販売価格は、contact@atelier-yohaku.comへご請求いただければ、電子メールにて遅滞なく提供します。いずれの場合も、購入確定前にApp Storeの購入手続き画面に表示される価格が適用されます。"] },
      { heading: "販売価格以外に必要な費用", paragraphs: ["ありません。ただし、アプリのダウンロードや利用に必要な通信料はお客様の負担となります。"] },
      { heading: "支払方法・支払時期", paragraphs: ["Apple IDに設定された支払方法を通じて決済されます。買い切りは購入確定時に課金されます。サブスクリプションは、無料トライアルの対象者についてはトライアル終了時、その後は各更新期間の開始時に課金されます。"] },
      { heading: "サービスの提供時期", paragraphs: ["購入手続きの完了後、直ちにInset Labの機能を利用できます。"] },
      { heading: "サブスクリプションの更新・解約", paragraphs: ["月額・年額プランは、現在の期間終了の24時間前までに解約しない限り自動更新されます。解約はiPhoneの「設定」からApple Accountの「サブスクリプション」で行えます。解約後も、支払済み期間の終了までは利用できます。"] },
      { heading: "返品・キャンセル・返金", paragraphs: ["デジタルサービスの性質上、提供開始後の返品・キャンセルには応じられません。サブスクリプションの解約は次回以降の更新を停止するもので、日割り返金は行われません。返金の可否はAppleの規約に従い、<a href=\"https://reportaproblem.apple.com/\">Appleの「問題を報告する」</a>から申請してください。法令上の権利を制限するものではありません。"] },
      { heading: "動作環境", paragraphs: ["iOS 17.0以降を搭載したiPhone。対応環境はApp Storeの製品ページでもご確認いただけます。"] }
    ]
  },
  en: {
    title: "Inset — Commercial Transaction Disclosure",
    description: "Seller identity, address, contact details, prices, payment, delivery, cancellation, and refund terms for Inset Lab under Japanese law.",
    heading: "Commercial Transaction Disclosure",
    updated: "2026-07-19",
    intro: "This disclosure is provided for the paid Inset Lab features under Article 11 of Japan’s Act on Specified Commercial Transactions. Purchases are processed through Apple’s App Store.",
    sections: [
      { heading: "Seller", paragraphs: ["Aritaka Kanazawa (trading as Atelier Yohaku)"] },
      { heading: "Person responsible for operations", paragraphs: ["Aritaka Kanazawa"] },
      { heading: "Business address", paragraphs: ["RMBld. 701, 5-31-1 Minami 2-jo Nishi, Chuo-ku, Sapporo, Hokkaido 060-0062, Japan"] },
      { heading: "Telephone", paragraphs: ["<a href=\"tel:+818057430492\">+81&nbsp;80&#8209;5743&#8209;0492</a>"] },
      { heading: "Contact", paragraphs: ["<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>"] },
      { heading: "Price", paragraphs: ["Current prices in Japan are ¥500 per month, ¥1,500 per year, and ¥4,000 for Lifetime, including tax. Eligible monthly and yearly subscriptions include a 7-day free trial. For prices outside Japan, contact contact@atelier-yohaku.com and we will provide the current price by email without delay. In all cases, the price shown in the App Store purchase screen before confirmation applies."] },
      { heading: "Additional charges", paragraphs: ["No additional purchase charge is imposed by the seller. Internet access and data charges required to download or use the App are your responsibility."] },
      { heading: "Payment method and timing", paragraphs: ["Payment is processed using the payment method associated with your Apple ID. Lifetime is charged when the purchase is confirmed. For eligible subscriptions, the first charge occurs when the free trial ends, and later charges occur at the start of each renewal period."] },
      { heading: "Delivery", paragraphs: ["Inset Lab features become available immediately after the purchase is completed."] },
      { heading: "Renewal and cancellation", paragraphs: ["Monthly and yearly subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Cancel in iPhone Settings under Apple Account and Subscriptions. Access continues until the end of the paid period after cancellation."] },
      { heading: "Returns, cancellations, and refunds", paragraphs: ["Because this is a digital service, returns or cancellations are not accepted after access begins. Cancelling a subscription stops future renewals and does not provide a prorated refund. Refund eligibility is determined by Apple; requests can be submitted through <a href=\"https://reportaproblem.apple.com/\">Apple’s Report a Problem</a>. This does not limit rights that cannot be waived under applicable law."] },
      { heading: "System requirements", paragraphs: ["iPhone running iOS 17.0 or later. Current compatibility is also shown on the App Store product page."] }
    ]
  }
};

export function getLegalDocument(kind: LegalKind, locale: Locale): LegalDocument {
  const documents: Record<LegalKind, Localized<LegalDocument>> = {
    privacy: privacyDocuments,
    terms: termsDocuments,
    legal: commercialDisclosureDocuments
  };
  return documents[kind][locale];
}

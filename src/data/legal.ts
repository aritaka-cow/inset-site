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
  "ja": {
    "title": "Inset プライバシーポリシー",
    "description": "iOS・Android版Insetの写真・動画、利用分析、購入情報、保存と削除の扱いを説明します。",
    "heading": "プライバシーポリシー",
    "updated": "2026-10-05",
    "intro": "Atelier Yohakuが提供するInset（以下「本アプリ」）のiOS版とAndroid版に共通するポリシーです。Android版は現在一般公開の準備中です。本アプリにはアカウント登録・ログインはありません。編集対象の写真・動画は端末内で処理し、機能改善のための仮名の利用状況データと、Inset Labの提供に必要な購入履歴を扱います。",
    "sections": [
      {
        "heading": "写真・動画とアクセス権限",
        "bullets": [
          "システムの写真ピッカーなどから、あなたが選択した写真・動画を読み込みます。端末の写真ライブラリ全体へのアクセスを求めるものではありません。Google フォトなどのクラウド上の素材は、OSや選択元サービスがダウンロードしてから本アプリへ渡す場合があります。そのサービスには各提供者のポリシーが適用されます。",
          "iOSでは、書き出した写真・動画をライブラリへ保存するために「追加のみ」の写真アクセス権限を求めます。Android 10以降では共有メディアへの保存にMediaStoreを使い、Android 8–9で写真を保存するときはストレージへの書き込み権限を求めます。Android 8–9では動画保存に対応していません。",
          "写真・動画・書き出し結果を、開発者、PostHog、RevenueCat、Metaへアップロードしません。写真・動画のファイル名、画像や音声の内容、メディアに含まれる位置情報、プリセット名・設定データ全体、任意カラーの実際の色値を分析イベントに含めません。ただし、フレーム種類やレイヤー数など、限定した編集設定の分類情報を利用分析に含める場合があります。",
          "書き出した写真に、撮影日時やGPSなど元写真のメタデータが残る場合があります。これは端末内の処理です。書き出したファイルを他者へ共有する際は、必要に応じてメタデータを確認してください。"
        ]
      },
      {
        "heading": "端末内に保存される情報",
        "bullets": [
          "前回の写真編集を再開するための一時コピーと編集設定、プリセット、お気に入り、ガイドの進行状況などを端末内に保存します。Androidでは、選択した動画を安定して読み込み・書き出しするための一時コピーも使用します。",
          "キャッシュは、別の素材を選ぶ、処理を終える、アプリやOSがキャッシュを整理するなどの際に削除され、編集再開に使えなくなる場合があります。プリセットには写真・動画や位置情報を含めません。アプリの削除により端末内のアプリデータは削除されます。"
        ]
      },
      {
        "heading": "利用状況・技術情報",
        "bullets": [
          "本アプリはPostHog（PostHog, Inc.）を利用し、仮名のアプリ・端末インスタンス識別子、起動・画面表示・編集・保存成功／失敗などのイベント、アプリバージョン、OS、端末の種類、画面サイズ、言語、タイムゾーン、ネットワーク状態などの技術情報を送信します。目的は、機能改善と不具合の把握です。仮名識別子は、氏名そのものではありませんが、利用者・端末に関連付けられる情報として扱います。",
          "保存や読み込みの失敗について、エラーの種類・段階・限定した診断情報を扱う場合があります。iOSに組み込まれたPostHog・Meta SDKのコンポーネントも、限定的な技術・運用上の診断情報やクラッシュレポートを扱う場合があります。",
          "通信先のサービスやホスティング事業者は、通信に伴うIPアドレスやアクセスログを扱います。PostHogでは、生のIPアドレスを分析イベントに保存せず、標準のGeoIP処理によりIPアドレスから推定した国・地域、市区町村、郵便番号、おおまかな緯度・経度を利用分析で扱います。これは写真のGPS情報や端末の位置情報権限を使った取得とは別です。",
          "更新情報を表示するため、公開された更新情報ファイルをインターネットから取得します。配信元のホスティング事業者にも通信に伴う技術情報が渡ります。"
        ]
      },
      {
        "heading": "購入・Inset Lab",
        "bullets": [
          "iOSではApple（App Store・StoreKit）、AndroidではGoogle（Google Play）を通じて購入を処理します。本アプリがカード番号や銀行口座情報を収集・保存することはありません。",
          "RevenueCat（RevenueCat, Inc.）は、レシート・トランザクション情報、製品ID、購入・更新・有効期限・復元状態などの購入履歴と、仮名のApp User IDを受け取り、購入確認、Inset Labの解放、復元、購入分析に使います。",
          "RevenueCatへPostHogの仮名識別子を渡します。RevenueCatからPostHogへ購入ライフサイクルイベントが送られ、利用分析と対応付けられます。この連携により、サービス側に仮名の利用者レコードが作られる場合がありますが、本アプリのログイン用アカウントではありません。本アプリ側でRevenueCatの端末識別子自動収集は無効にしています。氏名、メールアドレス、電話番号、Apple AccountやGoogleアカウントの情報を、これらの識別子に設定しません。"
        ]
      },
      {
        "heading": "サービスコード（Android）",
        "paragraphs": [
          "Androidでサービスコードを利用する場合、入力したコードとRevenueCatの仮名のApp User IDを、HTTPSでCloudflare上の検証サービスへ送信します。Cloudflareは通信に伴うIPアドレスなども受け取ります。検証サービスはコードを確認し、RevenueCatへApp User IDとInset Labの無償アクセス付与の依頼を送ります。",
          "検証サービスのアプリケーションは、コード、App User ID、IPアドレスの元の値をログやデータベースに記録しません。不正利用を抑えるため、IPアドレスからHMAC（秘密鍵を使ったハッシュ）識別子を生成し、短期間の利用制限カウンターに使います。このカウンターは自動消去されます。一方、App User IDから生成したHMAC識別子と付与状態の記録は、二重付与を防ぐため継続して保持し、自動消去の期限は設けていません。HMAC識別子も仮名情報として扱います。CloudflareやRevenueCatが扱う通信・サービス側の記録には、各提供者の保持方針が適用されます。"
        ]
      },
      {
        "heading": "iOSの広告効果測定",
        "bullets": [
          "iOSでApple Ads経由のインストールを測定する場合、Appleが返すattribution結果、campaign・ad group・keyword・ad ID、claim・conversion type、国・地域、掲載面をPostHogへ送信する場合があります。attribution token、未加工のApple APIレスポンス、広告のクリック・表示日時は保存・送信しません。",
          "対応するiOS production版では、App Tracking Transparency（ATT）を許可した場合だけMeta SDKを有効にし、アプリ起動と初回写真書き出し完了のイベントを送信します。iOSのRevenueCatによるMeta送信も、ATTを許可し、連携が明示的に有効な場合に限り、trial開始・購入・サブスクリプション・更新などをserver-to-serverで送信する場合があります。ATT未許可時のiOSのserver-to-server送信は有効にしません。購入・売上イベントを本アプリとRevenueCatの両方からMetaへ二重送信しません。これはAppleの定義上のトラッキングです。",
          "ATTが未許可・拒否・制限中、または必要なproduction設定がない場合、本アプリはMeta SDKを初期化せず、Metaの匿名識別子やアプリ内イベントを送信しません。許可しなくても利用・購入・復元には影響しません。iOSの設定で許可を変更できます。許可を取り消した後は、新しいiOSのトラッキングデータをMetaへ送信しません。既に送信したデータには提供先の保持・削除方針が適用されます。Android版にはこのiOS向けMeta SDK・Apple Ads・ATTの処理はありません。"
        ]
      },
      {
        "heading": "第三者サービスと保護",
        "paragraphs": [
          "利用分析、課金・購入確認、広告効果測定に必要な範囲で上記サービスへデータを送信します。本アプリ内に第三者広告は表示しません。データを販売せず、データブローカーへ提供しません。各サービスは日本国外でデータを処理する場合があります。RevenueCatのMeta連携が有効な構成では、購入・サブスクリプション等のライフサイクル情報がMetaへ送信される場合があります。AndroidにMeta SDKがないことと、サービス間の送信は別です。iOSでの広告効果測定の条件は上記のとおりです。PostHogへの通信にはHTTPSを使用し、素材の一時コピーはアプリ専用の領域で管理します。",
          "各提供者の説明は、<a href=\"https://posthog.com/privacy\">PostHog</a>、<a href=\"https://www.revenuecat.com/privacy/\">RevenueCat</a>、<a href=\"https://www.cloudflare.com/privacypolicy/\">Cloudflare</a>、<a href=\"https://www.apple.com/legal/privacy/\">Apple</a>、<a href=\"https://policies.google.com/privacy\">Google</a>、<a href=\"https://www.facebook.com/privacy/policy/\">Meta</a>のプライバシーポリシーをご確認ください。"
        ]
      },
      {
        "heading": "保持と削除の依頼",
        "bullets": [
          "端末内のアプリデータと、サービス側にある購入履歴・仮名の分析記録は別に管理されます。アプリを削除しても、サブスクリプションの解約やサービス側の記録の削除は行われません。",
          "サービス側の情報は、利用分析・購入確認に必要な期間と、各提供者の保持方針、セキュリティ・不正防止・会計・法令上の必要性に従って保持される場合があります。",
          "プライバシーに関する照会や削除依頼は<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>へお送りください。アプリには本人のアカウントがなく、仮名記録を氏名やメールアドレスから特定できない場合があります。現在、匿名の記録を確実に照合して削除する専用手段は提供していません。確認可能な情報を必要な範囲で伺い、特定・削除できる範囲と、法令などにより保持が必要な範囲をご案内します。"
        ]
      },
      {
        "heading": "お問い合わせとウェブサイト",
        "paragraphs": [
          "お問い合わせでお送りいただいたメールアドレスや内容は、回答とサポート対応に使います。必要のない私的な写真・動画、認証コード、カード情報は送らないでください。事業者サイトの利用に関する情報は<a href=\"https://atelier-yohaku.com/privacy\">事業者サイトのプライバシーポリシー</a>もご確認ください。"
        ]
      },
      {
        "heading": "お子様のプライバシー",
        "paragraphs": [
          "本アプリは13歳以上の利用者を対象にしています。氏名やメールアドレスなど、個人を直接識別する情報の入力は求めません。",
          "Android版は、対応する地域やGoogle Playの設定に応じて、Google Playから提供される年齢範囲と年齢確認の状態を、アプリの利用可否を判断するため、実行中のメモリでのみ処理します。この情報や、それに基づく利用可否の状態を、当社サーバー、PostHog、RevenueCat、広告サービスへ送信せず、アプリのログや永続ストレージにも保存しません。この処理のために本アプリが生年月日、身分証明書や顔写真の入力を求めることはありません。Google Playで年齢確認が必要な場合は、その確認手順へ案内します。Google Play自身が行う処理にはGoogleのポリシーが適用されます。"
        ]
      },
      {
        "heading": "本ポリシーの変更・連絡先",
        "paragraphs": [
          "重要な変更はアプリの更新情報または本ページでお知らせします。本アプリやプライバシーのお問い合わせは、Atelier Yohaku（余白製作所） <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>へご連絡ください。"
        ]
      }
    ]
  },
  "en": {
    "title": "Inset Privacy Policy",
    "description": "How Inset for iOS and Android handles photos, videos, analytics, purchases, retention, and deletion.",
    "heading": "Privacy Policy",
    "updated": "2026-10-05",
    "intro": "This policy covers Inset (“the App”) for iOS and Android, provided by Atelier Yohaku. The Android version is currently being prepared for public release. The App has no account registration or sign-in. Selected photos and videos are processed on your device. The App handles pseudonymous usage data to improve the product and purchase history needed to provide Inset Lab.",
    "sections": [
      {
        "heading": "Photos, Videos, and Permissions",
        "bullets": [
          "The App reads photos and videos you select through the system media picker or a similar selection flow. It does not request access to your entire photo library. For cloud assets, services such as Google Photos or the OS may download the selected file before providing it to the App. Their own policies apply to that transfer.",
          "On iOS, the App requests add-only photo access to save exported photos and videos. On Android 10 and later, it saves shared media through MediaStore. On Android 8–9, saving photos requires storage write permission; video saving is not supported on these versions.",
          "Photos, videos, and exported files are not uploaded to the developer, PostHog, RevenueCat, or Meta. Media filenames, image or audio content, embedded media location, preset names or complete preset configuration, and exact custom color values are not included in analytics events. Limited classifications of editing settings, such as frame type or layer count, may be included in usage analytics.",
          "Exported photos may retain metadata from the source, including capture time or GPS coordinates. This happens on-device. Check metadata when sharing an exported file if necessary."
        ]
      },
      {
        "heading": "Information Stored on Your Device",
        "bullets": [
          "The App stores a temporary copy and settings to resume a photo edit, along with presets, favorites, and guide progress. Android also uses temporary video copies for reliable reading and export.",
          "Cached media can be removed when another asset is selected, processing finishes, or the App or OS clears its cache. The previous edit may then be unavailable. Presets contain no photos, videos, or location data. Deleting the App removes its local data."
        ]
      },
      {
        "heading": "Usage and Technical Data",
        "bullets": [
          "The App uses PostHog (PostHog, Inc.) for product improvement and troubleshooting. It sends pseudonymous app or device instance identifiers, events such as app opens, screen views, editing, and export success or failure, and technical details such as app version, OS, device type, screen size, language, time zone, and network state. Pseudonymous identifiers are not names, but are treated as information associated with a user or device.",
          "For loading or export failures, the App may handle the error type, processing stage, and limited diagnostic information. PostHog and Meta SDK components bundled with iOS may also handle limited technical or operational diagnostics and crash reports.",
          "Services receiving network requests and hosting providers handle IP addresses and access logs. PostHog does not store raw IP addresses in analytics events. Its standard GeoIP processing derives country or region, city, postal code, and approximate latitude and longitude from an IP address for usage analytics. This is separate from photo GPS metadata or access through a device location permission.",
          "The App retrieves a publicly hosted update information file to display release announcements. The hosting provider also receives technical information associated with that request."
        ]
      },
      {
        "heading": "Purchases and Inset Lab",
        "bullets": [
          "Purchases are processed through Apple (App Store and StoreKit) on iOS and Google (Google Play) on Android. The App does not collect or store card numbers or bank account details.",
          "RevenueCat (RevenueCat, Inc.) receives receipt or transaction information, product IDs, purchase, renewal, expiration and restore status, and a pseudonymous App User ID. These are used to validate purchases, unlock Inset Lab, restore purchases, and analyze purchases.",
          "The App passes a pseudonymous PostHog identifier to RevenueCat. RevenueCat sends purchase lifecycle events to PostHog, where they are associated with usage analytics. This integration may create a pseudonymous person record in the service; it is not an account for signing in to the App. RevenueCat automatic device-identifier collection is disabled in the App. The App does not set names, email addresses, telephone numbers, or Apple or Google account information on these identifiers."
        ]
      },
      {
        "heading": "Service Codes (Android)",
        "paragraphs": [
          "When you use a service code on Android, the entered code and your pseudonymous RevenueCat App User ID are sent over HTTPS to a validation service hosted on Cloudflare. Cloudflare also receives network metadata such as your IP address. The service validates the code and sends the App User ID and a request for complimentary Inset Lab access to RevenueCat.",
          "The validation service application does not record raw codes, App User IDs, or IP addresses in its logs or database. To limit abuse, it derives an HMAC identifier (a hash made with a secret key) from the IP address and uses it for a short-lived rate-limit counter that is automatically cleared. Separately, a customer-derived HMAC identifier and grant-status record are retained to prevent duplicate grants, with no automatic expiry. HMAC identifiers are also treated as pseudonymous information. Network and service records handled by Cloudflare and RevenueCat remain subject to their own retention practices."
        ]
      },
      {
        "heading": "iOS Advertising Measurement",
        "bullets": [
          "For Apple Ads attribution on iOS, the App may send Apple’s attribution result, campaign, ad group, keyword and ad IDs, claim or conversion type, country or region, and placement to PostHog. The attribution token, raw Apple API response, and ad click or impression timestamps are not stored or sent.",
          "In a supported iOS production release, the Meta SDK is enabled only after permission through App Tracking Transparency (ATT), sending app activation and first photo export completion events. On iOS, RevenueCat’s Meta delivery also requires ATT authorization and an explicitly enabled integration, and may send trial start, purchase, subscription, renewal and similar events server-to-server. iOS server-to-server delivery without ATT authorization is not enabled. Purchase and revenue events are not sent to Meta from both the App and RevenueCat. Apple defines this purpose as tracking.",
          "When ATT is not authorized, is denied or restricted, or required production configuration is unavailable, the App does not initialize the Meta SDK or send Meta’s anonymous identifier or in-app events. Your choice does not affect using the App, purchasing, or restoring purchases. You can change permission in iOS Settings. After permission is withdrawn, new iOS tracking data is no longer sent to Meta; previously sent data remains subject to the recipient’s retention and deletion practices. The Android version does not include these iOS Meta SDK, Apple Ads, or ATT flows."
        ]
      },
      {
        "heading": "Third-party Services and Protection",
        "paragraphs": [
          "The App sends data to the services above as needed for usage analytics, purchases, and advertising measurement. It does not display third-party ads, sell data, or provide data to data brokers. These services may process information outside Japan. When RevenueCat’s Meta integration is enabled for a configuration, purchase and subscription lifecycle information may be sent to Meta. The absence of a Meta SDK on Android is separate from service-to-service delivery. Conditions for iOS advertising measurement are described above. Communication with PostHog uses HTTPS, and temporary media copies are managed in App-private storage.",
          "See the privacy policies of <a href=\"https://posthog.com/privacy\">PostHog</a>, <a href=\"https://www.revenuecat.com/privacy/\">RevenueCat</a>, <a href=\"https://www.cloudflare.com/privacypolicy/\">Cloudflare</a>, <a href=\"https://www.apple.com/legal/privacy/\">Apple</a>, <a href=\"https://policies.google.com/privacy\">Google</a>, and <a href=\"https://www.facebook.com/privacy/policy/\">Meta</a> for their practices."
        ]
      },
      {
        "heading": "Retention and Deletion Requests",
        "bullets": [
          "Local App data and purchase or pseudonymous analytics records held by services are managed separately. Deleting the App does not cancel a subscription or delete service-side records.",
          "Service-side information may be retained for as long as needed for analytics and purchase validation, under the providers’ retention practices, and for security, fraud prevention, accounting, or legal requirements.",
          "For a privacy inquiry or deletion request, email <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>. The App has no personal account system, so pseudonymous records may not be identifiable from your name or email address. We do not currently provide a dedicated method that reliably matches and deletes anonymous records. We may request only the information needed to locate records and explain what can be located and deleted, as well as information that must be retained for legal or other applicable requirements."
        ]
      },
      {
        "heading": "Support Inquiries and Website",
        "paragraphs": [
          "The email address and content you send in a support inquiry are used to respond and provide support. Do not send unnecessary private photos or videos, verification codes, or payment information. See also the <a href=\"https://atelier-yohaku.com/privacy\">operator website privacy policy</a> for use of that site."
        ]
      },
      {
        "heading": "Children’s Privacy",
        "paragraphs": [
          "The App is intended for users aged 13 and older. It does not ask you to enter directly identifying information such as your name or email address.",
          "On Android, depending on the region and Google Play settings, the App processes age ranges and age-verification status supplied by Google Play only in memory while running, to determine access to the App. The App does not send these signals or the resulting access status to our servers, PostHog, RevenueCat or advertising services, or save them in application logs or persistent storage. The App does not ask you to enter a date of birth, identity document or facial photo for this process. If Google Play requires age verification, the App directs you to Google Play. Google’s policies govern processing performed by Google Play itself."
        ]
      },
      {
        "heading": "Changes and Contact",
        "paragraphs": [
          "Material changes will be announced in release information or on this page. For questions about the App or privacy, contact Atelier Yohaku (Yohaku Seisakusho) at <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>."
        ]
      }
    ]
  }
};

export const termsDocuments: Localized<LegalDocument> = {
  "ja": {
    "title": "Inset 利用規約",
    "description": "iOS・Android版InsetとInset Labの利用、購入、解約、復元、返金について定めます。",
    "heading": "利用規約",
    "updated": "2026-10-05",
    "intro": "本規約はInset（以下「本アプリ」）のiOS版とAndroid版の利用条件を定めます。本アプリをダウンロード・利用した時点で、本規約に同意したものとみなされます。Android版は現在一般公開の準備中です。",
    "sections": [
      {
        "heading": "1. ライセンス",
        "paragraphs": [
          "お客様の所有・管理する対応端末で本アプリを利用する非独占的なライセンスを付与します。iOS版にはApp Storeの規約とAppleの<a href=\"https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\">標準使用許諾契約</a>が適用されます。Android版の入手・購入にはGoogle Playの該当規約が適用されます。"
        ]
      },
      {
        "heading": "2. Inset Lab（有料機能）",
        "paragraphs": [
          "基本の写真編集は無料です。Inset Labは、クリエイティブフレーム、複数写真への一括フレーム、対応端末での動画保存などを解放します。機能の対応範囲はOS・アプリ版・端末により異なります。Androidでは写真はAndroid 8以降、動画保存はAndroid 10以降に対応し、動画の上限は5分です。素材形式や端末の処理能力によって保存できない場合があります。",
          "月額・年額の自動更新サブスクリプションと、一度きりの買い切り（Lifetime）があります。価格・通貨・税・トライアルの有無と期間・適用条件は、購入前のApp StoreまたはGoogle Playの購入画面で確認してください。トライアルは対象者・商品に限られます。"
        ]
      },
      {
        "heading": "3. 支払い・更新・解約",
        "paragraphs": [
          "支払いは購入したストアのアカウントと支払方法で行われます。サブスクリプションは解約しない限り表示された周期で自動更新されます。無料トライアルが適用される場合は、期間終了後に表示価格で課金されます。",
          "iOSでは期間終了の少なくとも24時間前までに解約してください。<a href=\"https://support.apple.com/118428\">Apple</a>のサブスクリプション管理をご利用ください。Androidでは次回更新前に<a href=\"https://support.google.com/googleplay/answer/7018481\">Google Play</a>のサブスクリプション管理から解約してください。アプリの削除だけでは解約されません。解約後の利用期限やトライアル終了の扱いは各ストアの条件をご確認ください。"
        ]
      },
      {
        "heading": "4. 購入の復元",
        "paragraphs": [
          "購入したものと同じApple AccountまたはGoogleアカウントを使い、アプリの設定または購入画面の「購入を復元」を選んでください。購入の確認・復元にはRevenueCatを利用します。ストアやOSをまたいだ購入の移行・共有は保証しません。"
        ]
      },
      {
        "heading": "5. 返金",
        "paragraphs": [
          "iOSの返金はAppleの条件に従い、<a href=\"https://reportaproblem.apple.com/\">Appleの「問題を報告する」</a>から申請できます。Androidの返金はGoogle Playの条件に従います。<a href=\"https://support.google.com/googleplay/answer/15574908\">Google Playの返金案内</a>を確認し、ストアへの返金申請はリンク先の手順で行ってください。開発者の支援が必要な場合は<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>へご連絡ください。適用法令上の権利を制限するものではありません。"
        ]
      },
      {
        "heading": "6. 知的財産と成果物の利用",
        "paragraphs": [
          "本アプリと同梱するフレーム素材・デザイン・ロゴ等の権利は提供者または正当な権利者に帰属します。ご自身が利用権を持つ写真・動画に本アプリのフレームを適用した成果物は、個人・商用の用途で利用できます。元の写真・動画や第三者の権利を侵害しない範囲でご利用ください。フレーム素材そのものを抽出し、再配布・販売することはできません。"
        ]
      },
      {
        "heading": "7. 免責事項",
        "paragraphs": [
          "本アプリは「現状有姿」で提供され、特定目的への適合性等について明示・黙示を問わず保証しません。法令で許容される範囲で、本アプリの利用に起因する損害について提供者は責任を負いません。"
        ]
      },
      {
        "heading": "8. 本規約の変更・お問い合わせ",
        "paragraphs": [
          "重要な変更は本ページまたはアプリの更新情報でお知らせします。本規約のお問い合わせは<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>へご連絡ください。"
        ]
      }
    ]
  },
  "en": {
    "title": "Inset Terms of Use",
    "description": "Terms for Inset on iOS and Android, including Inset Lab purchases, cancellation, restoration, and refunds.",
    "heading": "Terms of Use",
    "updated": "2026-10-05",
    "intro": "These Terms govern Inset (“the App”) for iOS and Android. By downloading or using the App, you agree to these Terms. The Android version is currently being prepared for public release.",
    "sections": [
      {
        "heading": "1. License",
        "paragraphs": [
          "You are granted a non-exclusive license to use the App on supported devices that you own or control. The iOS version is subject to App Store terms and Apple’s <a href=\"https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\">Standard Licensed Application End User License Agreement</a>. Applicable Google Play terms govern obtaining and purchasing the Android version."
        ]
      },
      {
        "heading": "2. Inset Lab (Paid Features)",
        "paragraphs": [
          "Core photo editing is free. Inset Lab unlocks Creative Frames, batch framing, and video saving on supported devices. Available features depend on the OS, app version, and device. Android supports photos on Android 8 and later and video saving on Android 10 and later, for videos up to five minutes. Some formats or device processing limitations may prevent export.",
          "Inset Lab offers monthly and yearly auto-renewing subscriptions and a one-time Lifetime purchase. Check the App Store or Google Play purchase screen for the price, currency, taxes, trial availability and duration, and eligibility before purchasing. Trials apply only to eligible customers and products."
        ]
      },
      {
        "heading": "3. Billing, Renewal, and Cancellation",
        "paragraphs": [
          "Payment uses the account and payment method for the store where you purchase. Subscriptions renew at the displayed interval unless cancelled. If an eligible free trial applies, billing starts at the displayed price after it ends.",
          "On iOS, cancel at least 24 hours before the current period ends using <a href=\"https://support.apple.com/118428\">Apple</a> subscription management. On Android, cancel before the next renewal using <a href=\"https://support.google.com/googleplay/answer/7018481\">Google Play</a> subscription management. Uninstalling the App does not cancel a subscription. Check your store’s terms for the remaining access period and how trial cancellation is handled."
        ]
      },
      {
        "heading": "4. Restoring Purchases",
        "paragraphs": [
          "Use the same Apple Account or Google account used for the purchase, then choose Restore Purchases in the App settings or purchase screen. RevenueCat is used to validate and restore purchases. Transfer or sharing of a purchase between stores or operating systems is not guaranteed."
        ]
      },
      {
        "heading": "5. Refunds",
        "paragraphs": [
          "iOS refunds follow Apple’s conditions; apply through <a href=\"https://reportaproblem.apple.com/\">Apple’s Report a Problem</a>. Android refunds follow Google Play’s conditions; see <a href=\"https://support.google.com/googleplay/answer/15574908\">Google Play refund guidance</a>. Apply to the store using the linked instructions. If you need developer assistance, contact <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>. This does not limit rights under applicable law."
        ]
      },
      {
        "heading": "6. Intellectual Property and Your Outputs",
        "paragraphs": [
          "The App and bundled frame assets, designs, and logos belong to the developer or their lawful rights holders. Outputs made by applying App frames to photos or videos you have the right to use may be used for personal or commercial purposes, subject to rights in the source media and any third-party rights. Frame assets themselves may not be extracted, redistributed, or sold."
        ]
      },
      {
        "heading": "7. Disclaimer",
        "paragraphs": [
          "The App is provided “as is” without express or implied warranties, including fitness for a particular purpose. To the extent permitted by law, the developer is not liable for damages arising from use of the App."
        ]
      },
      {
        "heading": "8. Changes and Contact",
        "paragraphs": [
          "Material changes will be announced on this page or in release information. For questions about these Terms, contact <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>."
        ]
      }
    ]
  }
};

export const commercialDisclosureDocuments: Localized<LegalDocument> = {
ja: {
  "title": "Inset 特定商取引法に基づく表記",
  "description": "Inset Labの事業者、価格、支払い、提供、解約・返金、対応環境を表示します。",
  "heading": "特定商取引法に基づく表記",
  "updated": "2026-10-05",
  "intro": "Inset Labに関する、特定商取引法第11条に基づく表示です。iOSはApp Store、AndroidはGoogle Playを通じて購入します。Android版は現在一般公開前で、一般向けの販売は開始していません。",
  "sections": [
{ heading: "販売事業者", paragraphs: ["金澤 有剛（屋号：余白製作所）"] },
{ heading: "運営責任者", paragraphs: ["金澤 有剛"] },
{ heading: "所在地", paragraphs: ["〒060-0062<br>北海道札幌市中央区南2条西5丁目31-1 RMBld. 701"] },
{ heading: "電話番号", paragraphs: ["<a href=\"tel:+818057430492\">080&#8209;5743&#8209;0492</a>"] },
{ heading: "お問い合わせ", paragraphs: ["<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>"] },
    {
      "heading": "販売価格",
      "paragraphs": [
        "日本のApp Store掲載価格（税込）は月額500円、年額1,500円、買い切り4,000円です。対象となる月額・年額プランには7日間の無料トライアルが付きます。Android版の一般販売価格・トライアル条件は、一般販売開始までに本ページへ表示します。ストア間で同一価格・同一条件であることは保証しません。",
        "日本以外の各国・地域の販売価格は、<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>へご請求いただければ、電子メールで遅滞なく提供します。購入前に各ストアの購入画面でも価格・通貨・更新条件をご確認ください。"
      ]
    },
    {
      "heading": "販売価格以外に必要な費用",
      "paragraphs": [
        "販売事業者が別途請求する費用はありません。ダウンロードや利用に必要な通信料はお客様の負担となります。"
      ]
    },
    {
      "heading": "支払方法・支払時期",
      "paragraphs": [
        "購入したストア（App StoreまたはGoogle Play）のアカウントに設定された支払方法を使います。買い切りは購入確定時、サブスクリプションは購入時（無料トライアル対象者は終了時）およびその後の更新時に課金されます。"
      ]
    },
    {
      "heading": "サービスの提供時期",
      "paragraphs": [
        "購入手続きの完了と購入確認後、Inset Labの機能を利用できます。購入が保留中の場合、ストアによる処理の完了をお待ちください。"
      ]
    },
    {
      "heading": "更新・解約・購入の復元",
      "paragraphs": [
        "月額・年額は解約しない限り自動更新されます。iOSでは期間終了の少なくとも24時間前までに<a href=\"https://support.apple.com/118428\">Apple</a>から、Androidでは次回更新前に<a href=\"https://support.google.com/googleplay/answer/7018481\">Google Play</a>から解約してください。アプリを削除しても解約されません。利用終了日は各ストアの管理画面でご確認ください。購入の復元は、購入したストアの同じアカウントで本アプリの「購入を復元」から行えます。"
      ]
    },
    {
      "heading": "返品・キャンセル・返金",
      "paragraphs": [
        "デジタルサービスの性質上、提供開始後の返品・キャンセルには原則応じられません。サブスクリプションの解約は次回以降の更新を止める操作です。返金の可否・日割り返金などは、適用法令および購入したストアの条件に従います。iOSは<a href=\"https://reportaproblem.apple.com/\">Appleの「問題を報告する」</a>、Androidは<a href=\"https://support.google.com/googleplay/answer/15574908\">Google Playの返金案内</a>をご確認ください。開発者への問い合わせが必要な場合は<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>へご連絡ください。法令上の権利を制限するものではありません。"
      ]
    },
    {
      "heading": "動作環境",
      "paragraphs": [
        "iOS版：iOS 17.0以降のiPhone。Android版：写真はAndroid 8以降、動画保存はAndroid 10以降、動画の上限は5分です。素材形式や端末性能により保存できない場合があります。各ストアの対応環境と購入前のアプリ表示もご確認ください。"
      ]
    }
  ]
},
en: {
  "title": "Inset — Commercial Transaction Disclosure",
  "description": "Seller information, prices, payments, delivery, cancellation, refunds, and compatibility for Inset Lab.",
  "heading": "Commercial Transaction Disclosure",
  "updated": "2026-10-05",
  "intro": "This disclosure covers Inset Lab under Article 11 of Japan’s Act on Specified Commercial Transactions. Purchases use the App Store on iOS and Google Play on Android. The Android version is not publicly released and public sales have not started.",
  "sections": [
{ heading: "Seller", paragraphs: ["Aritaka Kanazawa (trading as Atelier Yohaku)"] },
{ heading: "Person responsible for operations", paragraphs: ["Aritaka Kanazawa"] },
{ heading: "Business address", paragraphs: ["RMBld. 701, 5-31-1 Minami 2-jo Nishi, Chuo-ku, Sapporo, Hokkaido 060-0062, Japan"] },
{ heading: "Telephone", paragraphs: ["<a href=\"tel:+818057430492\">+81&nbsp;80&#8209;5743&#8209;0492</a>"] },
{ heading: "Contact", paragraphs: ["<a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a>"] },
    {
      "heading": "Price",
      "paragraphs": [
        "Published App Store prices in Japan, including tax, are ¥500 per month, ¥1,500 per year, and ¥4,000 for Lifetime. Eligible monthly and yearly plans include a seven-day free trial. Public Android prices and trial conditions will be listed here before public sales begin. Prices and eligibility are not guaranteed to be identical between stores.",
        "For prices outside Japan, contact <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a> and we will provide them by email without delay. Check the store purchase screen for the price, currency, and renewal conditions before purchasing."
      ]
    },
    {
      "heading": "Additional Charges",
      "paragraphs": [
        "The seller imposes no additional purchase charge. Internet access and data charges needed to download or use the App are your responsibility."
      ]
    },
    {
      "heading": "Payment Method and Timing",
      "paragraphs": [
        "Payment uses the method on the account for the store where you purchase: the App Store or Google Play. Lifetime is charged at purchase confirmation. Subscriptions are charged at purchase (or after an eligible free trial) and at subsequent renewals."
      ]
    },
    {
      "heading": "Delivery",
      "paragraphs": [
        "Inset Lab becomes available after the purchase is completed and validated. If payment is pending, wait for the store to complete processing."
      ]
    },
    {
      "heading": "Renewal, Cancellation, and Restoration",
      "paragraphs": [
        "Monthly and yearly plans renew unless cancelled. On iOS, cancel at least 24 hours before the period ends through <a href=\"https://support.apple.com/118428\">Apple</a>. On Android, cancel before the next renewal through <a href=\"https://support.google.com/googleplay/answer/7018481\">Google Play</a>. Uninstalling the App does not cancel a subscription. Check the store management screen for the access end date. Restore an eligible purchase through Restore Purchases in the App using the same account for the store where you purchased."
      ]
    },
    {
      "heading": "Returns, Cancellations, and Refunds",
      "paragraphs": [
        "Because this is a digital service, returns or cancellations are generally not accepted after access begins. Cancelling a subscription stops future renewals. Refund eligibility, including any prorated refund, follows applicable law and the conditions of the store where you purchased. See <a href=\"https://reportaproblem.apple.com/\">Apple’s Report a Problem</a> for iOS or <a href=\"https://support.google.com/googleplay/answer/15574908\">Google Play refund guidance</a> for Android. Contact <a href=\"mailto:contact@atelier-yohaku.com\">contact@atelier-yohaku.com</a> when developer assistance is needed. This does not limit rights under applicable law."
      ]
    },
    {
      "heading": "System Requirements",
      "paragraphs": [
        "iOS: iPhone with iOS 17.0 or later. Android: photos on Android 8 and later, video saving on Android 10 and later, for videos up to five minutes. Some media formats or device limitations may prevent export. Check the store compatibility information and the App before purchasing."
      ]
    }
  ]
},
};

export function getLegalDocument(kind: LegalKind, locale: Locale): LegalDocument {
  const documents: Record<LegalKind, Localized<LegalDocument>> = {
    privacy: privacyDocuments,
    terms: termsDocuments,
    legal: commercialDisclosureDocuments
  };
  return documents[kind][locale];
}

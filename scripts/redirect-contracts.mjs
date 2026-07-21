export const siteOrigin = "https://inset.page";

const appStoreCampaignUrl = "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=inset_web_202607&mt=8";
const instagramCampaignUrl = "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=instagram_jp_202607&mt=8";
const instagramAbInstagramUrl = "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=instagram_jp_ab_ig_202607&mt=8";
const instagramAbAdvantageUrl = "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=instagram_jp_ab_adv_202607&mt=8";
const instagramUsCampaignUrl = "https://apps.apple.com/us/app/inset-photo-frames/id6776488290?pt=128992117&ct=instagram_us_202607&mt=8";

export const criticalRedirects = [
  ...["en", "ja"].flatMap((locale) =>
    ["hero", "closing", "pricing", "support"].map((placement) => ({
      source: `/go/app-store/${locale}/${placement}`,
      target: appStoreCampaignUrl,
      status: 302,
      purpose: `App Store CTA (${locale}/${placement})`
    }))
  ),
  {
    source: "/go/instagram-jp-202607",
    target: instagramCampaignUrl,
    status: 302,
    purpose: "Instagram JP paid campaign (July 2026)"
  },
  {
    source: "/go/instagram-jp-ab-ig-202607",
    target: instagramAbInstagramUrl,
    status: 302,
    purpose: "Instagram JP placement A/B — Instagram-only cell (July 2026)"
  },
  {
    source: "/go/instagram-jp-ab-adv-202607",
    target: instagramAbAdvantageUrl,
    status: 302,
    purpose: "Instagram JP placement A/B — Advantage+ placements cell (July 2026)"
  },
  {
    source: "/go/instagram-us-202607-r2",
    target: instagramUsCampaignUrl,
    status: 302,
    purpose: "Instagram US paid campaign (July 2026)"
  }
];

export function formatRedirect({ source, target, status }) {
  return `${source} ${target} ${status}`;
}

export function parseRedirects(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [source, target, status, ...extra] = line.split(/\s+/);
      return { line, source, target, status: Number(status), extra };
    });
}

export function validateCriticalRedirects(text) {
  const errors = [];
  const redirects = parseRedirects(text);
  const expectedBySource = new Map(criticalRedirects.map((redirect) => [redirect.source, redirect]));
  const actualGoRedirects = redirects.filter((redirect) => redirect.source?.startsWith("/go/"));
  const counts = new Map();

  for (const redirect of redirects) {
    if (!redirect.source || !redirect.target || !Number.isInteger(redirect.status) || redirect.extra.length > 0) {
      errors.push(`invalid redirect syntax: ${redirect.line}`);
      continue;
    }
    counts.set(redirect.source, (counts.get(redirect.source) ?? 0) + 1);
  }

  for (const [source, count] of counts) {
    if (count > 1) errors.push(`duplicate redirect source: ${source}`);
  }

  for (const expected of criticalRedirects) {
    const actual = actualGoRedirects.find((redirect) => redirect.source === expected.source);
    if (!actual) {
      errors.push(`critical redirect missing: ${expected.source}`);
      continue;
    }
    if (actual.target !== expected.target) {
      errors.push(`critical redirect target mismatch: ${expected.source}`);
    }
    if (actual.status !== expected.status) {
      errors.push(`critical redirect status mismatch: ${expected.source}`);
    }
  }

  for (const actual of actualGoRedirects) {
    if (!expectedBySource.has(actual.source)) errors.push(`uncontracted /go/ redirect: ${actual.source}`);
  }

  return errors;
}

import { getLegalDocument, type LegalDocument, type LegalKind } from "./legal";
import { releasePath, pathFor } from "./site";
import type { ReleaseEntry } from "./releases";

const commonStyle = `:root{color-scheme:light;--bg:#fbfaf6;--fg:#1a1a18;--mut:#74726b;--line:#e3e0d8;--serif:"Iowan Old Style",Baskerville,"Hiragino Mincho ProN","Yu Mincho",serif;--sans:"Avenir Next",Avenir,"Hiragino Sans",system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.85 var(--sans)}a{color:inherit}.wrap{width:min(840px,calc(100% - 40px));margin:auto;padding:52px 0 100px}.top{display:flex;justify-content:space-between;gap:24px;align-items:center;padding-bottom:32px;border-bottom:1px solid var(--line)}.brand{font-weight:700;text-decoration:none}.languages{display:flex;gap:16px}.languages a{min-height:44px;display:inline-flex;align-items:center}.legacy-js [data-legacy-lang]{display:none}.legacy-js[data-legacy-lang="ja"] [data-legacy-lang="ja"],.legacy-js[data-legacy-lang="en"] [data-legacy-lang="en"]{display:block}article{padding-top:50px}h1,h2{font-family:var(--serif);font-weight:400}h1{font-size:clamp(44px,8vw,72px);line-height:1.2}h2{margin-top:46px;font-size:28px}.updated,.intro,p,li,time{color:var(--mut)}.intro{font-size:17px}li+li{margin-top:8px}.canonical{margin-top:64px;padding-top:24px;border-top:1px solid var(--line)}`;
const languageScript = `document.documentElement.classList.add("legacy-js");const requested=new URLSearchParams(location.search).get("lang");document.documentElement.dataset.legacyLang=requested==="en"||requested==="ja"?requested:(navigator.language.startsWith("ja")?"ja":"en");`;

function documentBody(document: LegalDocument, locale: "en" | "ja", kind: LegalKind) {
  const sections = document.sections.map((section) => `<section><h2>${section.heading}</h2>${(section.paragraphs ?? []).map((paragraph) => `<p>${paragraph}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}</section>`).join("");
  const linkLabel = locale === "ja" ? "新しい正規ページを開く" : "Open the canonical page";
  const updated = locale === "ja" ? "最終更新" : "Last updated";
  return `<article data-legacy-lang="${locale}" lang="${locale}"><h1>${document.heading}</h1><p class="updated">${updated}: ${document.updated}</p><p class="intro">${document.intro}</p>${sections}<p class="canonical"><a href="https://inset.page${pathFor(kind, locale)}">${linkLabel}</a></p></article>`;
}

export function renderLegacyLegal(kind: LegalKind) {
  const ja = getLegalDocument(kind, "ja");
  const en = getLegalDocument(kind, "en");
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>Inset — ${ja.heading} / ${en.heading}</title><link rel="canonical" href="https://inset.page${pathFor(kind, "en")}"><script>${languageScript}</script><style>${commonStyle}</style></head><body><div class="wrap"><header class="top"><a class="brand" href="https://inset.page/">Inset</a><nav class="languages" aria-label="Language"><a href="?lang=ja">日本語</a><a href="?lang=en">English</a></nav></header>${documentBody(ja, "ja", kind)}${documentBody(en, "en", kind)}</div></body></html>`;
}

export function renderLegacyRelease(release: ReleaseEntry) {
  const body = (["ja", "en"] as const).map((locale) => {
    const changed = locale === "ja" ? "このバージョンの変更" : "What changed";
    const label = locale === "ja" ? "新しい正規ページを開く" : "Open the canonical page";
    return `<article data-legacy-lang="${locale}" lang="${locale}"><p>RELEASE</p><h1>${release.version}</h1><time datetime="${release.storePublishedAt ?? release.announcementDate}">${release.announcementDate}</time><p>${release.summary[locale]}</p><h2>${changed}</h2><ul>${release.highlights[locale].map((item) => `<li>${item}</li>`).join("")}</ul><p class="canonical"><a href="https://inset.page${releasePath(release.version, locale)}">${label}</a></p></article>`;
  }).join("");
  const releaseStyle = `${commonStyle}article h1{font-size:clamp(60px,12vw,110px);line-height:1;margin:10px 0 24px}`;
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>Inset ${release.version} — Release Notes</title><link rel="canonical" href="https://inset.page${releasePath(release.version, "en")}"><script>${languageScript}</script><style>${releaseStyle}</style></head><body><div class="wrap"><header class="top"><strong>Inset</strong><nav class="languages" aria-label="Language"><a href="?lang=ja">日本語</a><a href="?lang=en">English</a></nav></header>${body}</div></body></html>`;
}

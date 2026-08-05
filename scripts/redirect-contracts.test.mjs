import assert from "node:assert/strict";
import test from "node:test";
import { criticalRedirects, formatRedirect, validateCriticalRedirects } from "./redirect-contracts.mjs";

const validText = criticalRedirects.map(formatRedirect).join("\n");

test("accepts the complete redirect contract", () => {
  assert.deepEqual(validateCriticalRedirects(validText), []);
});

test("rejects a missing paid campaign redirect", () => {
  const withoutInstagram = validText
    .split("\n")
    .filter((line) => !line.startsWith("/go/instagram-jp-202607 "))
    .join("\n");

  assert.ok(
    validateCriticalRedirects(withoutInstagram).includes("critical redirect missing: /go/instagram-jp-202607")
  );
});

for (const source of [
  "/go/instagram-jp-ab-ig-202607",
  "/go/instagram-jp-ab-adv-202607"
]) {
  test(`rejects a missing placement A/B redirect: ${source}`, () => {
    const withoutCell = validText
      .split("\n")
      .filter((line) => !line.startsWith(`${source} `))
      .join("\n");

    assert.ok(
      validateCriticalRedirects(withoutCell).includes(`critical redirect missing: ${source}`)
    );
  });
}

test("placement A/B redirects preserve distinct ASC campaign tokens", () => {
  assert.match(validText, /\/go\/instagram-jp-ab-ig-202607 .*ct=instagram_jp_ab_ig_202607&mt=8 302/);
  assert.match(validText, /\/go\/instagram-jp-ab-adv-202607 .*ct=instagram_jp_ab_adv_202607&mt=8 302/);
});

test("rejects a missing US paid campaign redirect", () => {
  const withoutInstagramUs = validText
    .split("\n")
    .filter((line) => !line.startsWith("/go/instagram-us-202607-r2 "))
    .join("\n");

  assert.ok(
    validateCriticalRedirects(withoutInstagramUs).includes(
      "critical redirect missing: /go/instagram-us-202607-r2"
    )
  );
});

test("US paid campaign redirect preserves the US storefront and ASC campaign token", () => {
  assert.match(
    validText,
    /\/go\/instagram-us-202607-r2 https:\/\/apps\.apple\.com\/us\/app\/inset-photo-frames\/id6776488290\?pt=128992117&ct=instagram_us_202607&mt=8 302/
  );
});

test("rejects a missing France paid campaign redirect", () => {
  const withoutInstagramFrance = validText
    .split("\n")
    .filter((line) => !line.startsWith("/go/instagram-fr-202608-r2 "))
    .join("\n");

  assert.ok(
    validateCriticalRedirects(withoutInstagramFrance).includes(
      "critical redirect missing: /go/instagram-fr-202608-r2"
    )
  );
});

test("France paid campaign redirect preserves the exact ASC target and 302 status", () => {
  assert.match(
    validText,
    /\/go\/instagram-fr-202608-r2 https:\/\/apps\.apple\.com\/app\/apple-store\/id6776488290\?pt=128992117&ct=instagram_fr_202608&mt=8 302/
  );
});

test("rejects an altered France paid campaign redirect status", () => {
  const altered = validText.replace(
    /\/go\/instagram-fr-202608-r2 ([^\n]+) 302/,
    "/go/instagram-fr-202608-r2 $1 301"
  );

  assert.ok(
    validateCriticalRedirects(altered).includes(
      "critical redirect status mismatch: /go/instagram-fr-202608-r2"
    )
  );
});

test("rejects an altered target", () => {
  const altered = validText.replace("ct=instagram_jp_202607", "ct=wrong_campaign");
  assert.ok(
    validateCriticalRedirects(altered).includes("critical redirect target mismatch: /go/instagram-jp-202607")
  );
});

test("rejects an uncontracted tracking path", () => {
  const withUnexpected = `${validText}\n/go/untracked https://example.com 302`;
  assert.ok(validateCriticalRedirects(withUnexpected).includes("uncontracted /go/ redirect: /go/untracked"));
});

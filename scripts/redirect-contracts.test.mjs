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

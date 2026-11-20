import assert from "node:assert/strict";
import test from "node:test";
import {
  addedReleaseVersions,
  compareVersions,
  decide,
  parseVersion,
  resolveTargetVersion,
  storeVersionFromLookup,
  summarizeChecks,
  versionsFromBody
} from "./store-release.mjs";

const release = (version, id = `rel-${version}`) => ({ id, type: "release", appVersion: version });
const doc = (...announcements) => ({ version: 1, announcements });
const success = { state: "success", failing: [], pending: [] };
const readyPr = {
  draft: false,
  base: { ref: "main" },
  head: { repo: { full_name: "aritaka-cow/inset-site" } },
  mergeable: true,
  mergeable_state: "clean"
};
const decideWith = (overrides = {}) =>
  decide({
    storeVersion: "1.4.0",
    target: { version: "1.4.0", source: "announcements.json" },
    checks: success,
    pr: readyPr,
    repository: "aritaka-cow/inset-site",
    ...overrides
  });

test("parses and compares versions numerically", () => {
  assert.deepEqual(parseVersion("1.4"), [1, 4, 0]);
  assert.equal(parseVersion("1.4.0-beta"), null);
  assert.equal(compareVersions("1.10.0", "1.9.9"), 1);
  assert.equal(compareVersions("1.4", "1.4.0"), 0);
  assert.equal(compareVersions("1.3.2", "1.4.0"), -1);
});

test("reads Store-Release-Version from the PR body", () => {
  assert.deepEqual(versionsFromBody("Store-Release-Version: 1.4.0"), ["1.4.0"]);
  assert.deepEqual(versionsFromBody("<!-- store-release-version: `v1.4.1` -->"), ["1.4.1"]);
  assert.deepEqual(versionsFromBody("no marker"), []);
});

test("finds release entries added by the PR", () => {
  const base = doc(release("1.3.1"));
  const head = doc(release("1.4.0"), release("1.3.1"), { id: "news-x", type: "news" });
  assert.deepEqual(addedReleaseVersions(base, head), ["1.4.0"]);
  assert.deepEqual(addedReleaseVersions(null, head), ["1.4.0", "1.3.1"]);
});

test("infers the target from announcements.json", () => {
  const result = resolveTargetVersion({ body: "", baseDocument: doc(release("1.3.1")), headDocument: doc(release("1.4.0"), release("1.3.1")) });
  assert.deepEqual(result, { version: "1.4.0", source: "announcements.json" });
});

test("prefers the body marker when it agrees with the announcement", () => {
  const result = resolveTargetVersion({
    body: "Store-Release-Version: 1.4",
    baseDocument: doc(),
    headDocument: doc(release("1.4.0"))
  });
  assert.deepEqual(result, { version: "1.4", source: "body" });
});

test("accepts a body marker for PRs without a release announcement", () => {
  const result = resolveTargetVersion({ body: "Store-Release-Version: 1.4.0", baseDocument: doc(), headDocument: doc() });
  assert.equal(result.version, "1.4.0");
});

test("rejects a body marker that disagrees with the announcement", () => {
  const result = resolveTargetVersion({
    body: "Store-Release-Version: 1.4.1",
    baseDocument: doc(),
    headDocument: doc(release("1.4.0"))
  });
  assert.match(result.error, /一致しません/);
});

test("rejects ambiguous or missing targets", () => {
  assert.match(
    resolveTargetVersion({ body: "", baseDocument: doc(), headDocument: doc(release("1.4.0"), release("1.5.0")) }).error,
    /複数/
  );
  assert.match(resolveTargetVersion({ body: "", baseDocument: doc(), headDocument: doc() }).error, /分かりません/);
});

test("summarizes check runs and commit statuses", () => {
  assert.equal(summarizeChecks([{ name: "build", status: "completed", conclusion: "success" }]).state, "success");
  assert.equal(summarizeChecks([{ name: "build", status: "in_progress", conclusion: null }]).state, "pending");
  assert.equal(summarizeChecks([{ name: "build", status: "completed", conclusion: "failure" }]).state, "failure");
  assert.equal(summarizeChecks([], { statuses: [] }).state, "none");
  assert.equal(
    summarizeChecks([{ name: "build", status: "completed", conclusion: "success" }], {
      statuses: [{ context: "external", state: "error" }]
    }).state,
    "failure"
  );
});

test("uses the latest run when a check was re-run", () => {
  const checks = summarizeChecks([
    { name: "build", status: "completed", conclusion: "failure", started_at: "2026-11-20T00:00:00Z" },
    { name: "build", status: "completed", conclusion: "success", started_at: "2026-11-20T01:00:00Z" }
  ]);
  assert.equal(checks.state, "success");
});

test("waits while the App Store serves an older version", () => {
  assert.equal(decideWith({ storeVersion: "1.3.2" }).outcome, "wait-release");
  // Even failing checks only wait before the release; nothing is due yet.
  assert.equal(decideWith({ storeVersion: "1.3.2", checks: { state: "failure", failing: ["build"], pending: [] } }).outcome, "wait-release");
});

test("merges once the App Store version reaches the target", () => {
  assert.equal(decideWith().outcome, "merge");
  assert.equal(decideWith({ storeVersion: "1.4.1" }).outcome, "merge");
});

test("blocks or waits on unsafe pull request states after release", () => {
  assert.equal(decideWith({ checks: { state: "failure", failing: ["build (failure)"], pending: [] } }).outcome, "blocked");
  assert.equal(decideWith({ checks: { state: "none", failing: [], pending: [] } }).outcome, "blocked");
  assert.equal(decideWith({ checks: { state: "pending", failing: [], pending: ["build"] } }).outcome, "wait");
  assert.equal(decideWith({ pr: { ...readyPr, draft: true } }).outcome, "blocked");
  assert.equal(decideWith({ pr: { ...readyPr, base: { ref: "dev" } } }).outcome, "blocked");
  assert.equal(decideWith({ pr: { ...readyPr, head: { repo: { full_name: "someone/fork" } } } }).outcome, "blocked");
  assert.equal(decideWith({ pr: { ...readyPr, mergeable: false, mergeable_state: "dirty" } }).outcome, "blocked");
  assert.equal(decideWith({ pr: { ...readyPr, mergeable: null } }).outcome, "wait");
  assert.equal(decideWith({ target: { error: "対象の版が分かりません" } }).outcome, "blocked");
});

test("reads the version from an iTunes Lookup payload", () => {
  const payload = { resultCount: 1, results: [{ trackId: 6776488290, version: "1.4.0" }] };
  assert.equal(storeVersionFromLookup(payload, "6776488290"), "1.4.0");
  assert.throws(() => storeVersionFromLookup({ resultCount: 0, results: [] }, "6776488290"), /App ID/);
  assert.throws(() => storeVersionFromLookup({ results: [{ trackId: 6776488290, version: "" }] }, "6776488290"), /不正/);
});

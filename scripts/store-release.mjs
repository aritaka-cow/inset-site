// Pure decision logic for publishing a prepared pull request once the App Store
// serves the target version. Network access lives in
// auto-publish-on-store-release.mjs so this module can be tested offline.

export const PUBLISH_LABEL = "publish-on-store-release";

const VERSION_PATTERN = /^v?(\d+)\.(\d+)(?:\.(\d+))?$/;
const BODY_MARKER_PATTERN = /store-release-version\s*[:：]\s*`?v?(\d+\.\d+(?:\.\d+)?)`?/gi;

export function parseVersion(value) {
  const match = VERSION_PATTERN.exec(String(value ?? "").trim());
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3] ?? 0)];
}

export function compareVersions(a, b) {
  const left = parseVersion(a);
  const right = parseVersion(b);
  if (!left || !right) throw new Error(`cannot compare versions: ${a} / ${b}`);
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] < right[index] ? -1 : 1;
  }
  return 0;
}

export function versionsFromBody(body) {
  const versions = new Set();
  for (const match of String(body ?? "").matchAll(BODY_MARKER_PATTERN)) {
    versions.add(match[1]);
  }
  return [...versions];
}

function releaseEntries(document) {
  const entries = document?.announcements;
  if (!Array.isArray(entries)) return [];
  return entries.filter((entry) => entry && entry.type === "release" && typeof entry.appVersion === "string");
}

// Release versions whose announcement id is new in the pull request.
export function addedReleaseVersions(baseDocument, headDocument) {
  const baseIds = new Set(releaseEntries(baseDocument).map((entry) => entry.id));
  const versions = new Set();
  for (const entry of releaseEntries(headDocument)) {
    if (!baseIds.has(entry.id)) versions.add(entry.appVersion);
  }
  return [...versions];
}

// Returns { version, source } or { error }.
export function resolveTargetVersion({ body, baseDocument, headDocument }) {
  const declared = versionsFromBody(body);
  const added = addedReleaseVersions(baseDocument, headDocument);

  if (declared.length > 1) {
    return { error: `PR本文の Store-Release-Version が複数あります: ${declared.join(", ")}` };
  }
  for (const version of [...declared, ...added]) {
    if (!parseVersion(version)) return { error: `バージョンの形式が不正です: ${version}` };
  }
  if (declared.length === 1) {
    const [version] = declared;
    if (added.length > 0 && !added.some((candidate) => compareVersions(candidate, version) === 0)) {
      return {
        error: `PR本文の Store-Release-Version (${version}) と、announcements.json に追加された release の appVersion (${added.join(", ")}) が一致しません`
      };
    }
    return { version, source: "body" };
  }
  if (added.length === 1) return { version: added[0], source: "announcements.json" };
  if (added.length > 1) {
    return {
      error: `announcements.json に複数の release が追加されています (${added.join(", ")})。PR本文に Store-Release-Version: x.y.z を書いてください`
    };
  }
  return {
    error: "対象の版が分かりません。PR本文に Store-Release-Version: x.y.z を書くか、announcements.json に release のお知らせを追加してください"
  };
}

const PASSING_CONCLUSIONS = new Set(["success", "neutral", "skipped"]);

// checkRuns: GitHub check-runs API items; combinedStatus: GitHub combined status API.
// Returns { state: "success" | "pending" | "failure" | "none", failing, pending }.
export function summarizeChecks(checkRuns = [], combinedStatus = { state: "success", statuses: [] }) {
  const failing = [];
  const pending = [];

  const latestRuns = new Map();
  for (const run of checkRuns) {
    const previous = latestRuns.get(run.name);
    if (!previous || String(run.started_at ?? "") > String(previous.started_at ?? "")) {
      latestRuns.set(run.name, run);
    }
  }
  for (const run of latestRuns.values()) {
    if (run.status !== "completed") pending.push(run.name);
    else if (!PASSING_CONCLUSIONS.has(run.conclusion)) failing.push(`${run.name} (${run.conclusion})`);
  }

  for (const status of combinedStatus?.statuses ?? []) {
    if (status.state === "pending") pending.push(status.context);
    else if (status.state !== "success") failing.push(`${status.context} (${status.state})`);
  }

  const total = latestRuns.size + (combinedStatus?.statuses?.length ?? 0);
  let state = "success";
  if (failing.length > 0) state = "failure";
  else if (pending.length > 0) state = "pending";
  else if (total === 0) state = "none";
  return { state, failing, pending };
}

// Decide what to do with one labelled pull request.
// Outcomes:
//   merge            all conditions hold
//   wait-release     the App Store does not serve the target version yet
//   wait             transient state (checks running, mergeability not computed)
//   blocked          the release is live but the PR cannot be merged; needs the owner
export function decide({ storeVersion, target, checks, pr, baseBranch = "main", repository }) {
  if (target.error) return { outcome: "blocked", reason: target.error };
  if (compareVersions(storeVersion, target.version) < 0) {
    return {
      outcome: "wait-release",
      reason: `App Store の公開版は ${storeVersion}。${target.version} の公開待ち`
    };
  }
  if (pr.draft) return { outcome: "blocked", reason: "PR が Draft のままです" };
  if (pr.base?.ref !== baseBranch) {
    return { outcome: "blocked", reason: `PR のマージ先が ${baseBranch} ではありません (${pr.base?.ref})` };
  }
  if (repository && pr.head?.repo?.full_name !== repository) {
    return { outcome: "blocked", reason: "フォークからの PR は自動マージしません" };
  }
  if (checks.state === "failure") {
    return { outcome: "blocked", reason: `チェックが失敗しています: ${checks.failing.join(", ")}` };
  }
  if (checks.state === "none") {
    return { outcome: "blocked", reason: "PR の最新コミットにチェック結果がありません" };
  }
  if (checks.state === "pending") {
    return { outcome: "wait", reason: `チェックの完了待ち: ${checks.pending.join(", ")}` };
  }
  if (pr.mergeable === false || pr.mergeable_state === "dirty") {
    return { outcome: "blocked", reason: "main とコンフリクトしています" };
  }
  if (pr.mergeable === null || pr.mergeable === undefined) {
    return { outcome: "wait", reason: "GitHub がマージ可否を計算中です" };
  }
  return {
    outcome: "merge",
    reason: `App Store の公開版 ${storeVersion} が対象の ${target.version} 以上になりました`
  };
}

// iTunes Lookup response -> version string.
export function storeVersionFromLookup(payload, appId) {
  const results = Array.isArray(payload?.results) ? payload.results : [];
  const app = results.find((result) => String(result.trackId) === String(appId));
  if (!app) throw new Error(`iTunes Lookup の結果に App ID ${appId} がありません`);
  if (!parseVersion(app.version)) throw new Error(`iTunes Lookup の version が不正です: ${app.version}`);
  return app.version;
}

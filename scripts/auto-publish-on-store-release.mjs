// Merges a labelled pull request once the App Store serves its target version.
//
// Environment:
//   GITHUB_TOKEN        token with contents:write and pull-requests:write (read-only is enough for DRY_RUN)
//   GITHUB_REPOSITORY   owner/name
//   DRY_RUN=true        report decisions without merging or commenting
//   STORE_VERSION_OVERRIDE  pretend the App Store serves this version (DRY_RUN only)
//   DRY_RUN_PR          evaluate this PR number even without the label (DRY_RUN only)
//   APP_STORE_APP_ID / APP_STORE_COUNTRY / PUBLISH_LABEL  optional overrides
//
// Local dry run:
//   GITHUB_TOKEN=$(gh auth token) GITHUB_REPOSITORY=aritaka-cow/inset-site DRY_RUN=true \
//     node scripts/auto-publish-on-store-release.mjs
import { appendFileSync } from "node:fs";
import {
  PUBLISH_LABEL,
  decide,
  resolveTargetVersion,
  storeVersionFromLookup,
  summarizeChecks
} from "./store-release.mjs";

const env = process.env;
const repository = env.GITHUB_REPOSITORY;
const token = env.GITHUB_TOKEN;
const dryRun = env.DRY_RUN === "true";
const appId = env.APP_STORE_APP_ID || "6776488290";
const country = env.APP_STORE_COUNTRY || "jp";
const label = env.PUBLISH_LABEL || PUBLISH_LABEL;
const apiBase = env.GITHUB_API_URL || "https://api.github.com";
const runUrl = env.GITHUB_RUN_ID
  ? `${env.GITHUB_SERVER_URL || "https://github.com"}/${repository}/actions/runs/${env.GITHUB_RUN_ID}`
  : null;
const COMMENT_MARKER = "<!-- auto-publish-on-store-release";

if (!repository || !token) {
  console.error("GITHUB_REPOSITORY and GITHUB_TOKEN are required");
  process.exit(2);
}
if ((env.STORE_VERSION_OVERRIDE || env.DRY_RUN_PR) && !dryRun) {
  console.error("STORE_VERSION_OVERRIDE and DRY_RUN_PR are only allowed with DRY_RUN=true");
  process.exit(2);
}

async function github(path, { method = "GET", body, accept = "application/vnd.github+json" } = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    method,
    headers: {
      Accept: accept,
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "inset-site-auto-publish",
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`${method} ${path} -> ${response.status}: ${text.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }
  if (accept === "application/vnd.github.raw") return text;
  return text ? JSON.parse(text) : null;
}

async function fetchStoreVersion() {
  if (env.STORE_VERSION_OVERRIDE) return env.STORE_VERSION_OVERRIDE;
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}&country=${encodeURIComponent(country)}`;
  const response = await fetch(url, { headers: { "User-Agent": "inset-site-auto-publish" }, cache: "no-store" });
  if (!response.ok) throw new Error(`iTunes Lookup -> ${response.status}`);
  return storeVersionFromLookup(await response.json(), appId);
}

async function readAnnouncements(ref) {
  try {
    const text = await github(`/repos/${repository}/contents/announcements.json?ref=${encodeURIComponent(ref)}`, {
      accept: "application/vnd.github.raw"
    });
    return JSON.parse(text);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function readChecks(sha) {
  const checkRuns = [];
  for (let page = 1; page <= 5; page += 1) {
    const result = await github(`/repos/${repository}/commits/${sha}/check-runs?per_page=100&page=${page}`);
    checkRuns.push(...result.check_runs);
    if (checkRuns.length >= result.total_count || result.check_runs.length === 0) break;
  }
  const combinedStatus = await github(`/repos/${repository}/commits/${sha}/status`);
  return summarizeChecks(checkRuns, combinedStatus);
}

async function commentOnce(number, key, message) {
  const marker = `${COMMENT_MARKER}:${key} -->`;
  const comments = await github(`/repos/${repository}/issues/${number}/comments?per_page=100`);
  if (comments.some((comment) => comment.body?.includes(marker))) return false;
  await github(`/repos/${repository}/issues/${number}/comments`, {
    method: "POST",
    body: { body: `${marker}\n${message}${runUrl ? `\n\n実行ログ: ${runUrl}` : ""}` }
  });
  return true;
}

function writeOutput(name, value) {
  if (env.GITHUB_OUTPUT) appendFileSync(env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

function writeSummary(lines) {
  const text = `${lines.join("\n")}\n`;
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, text);
  console.log(text);
}

const OUTCOME_LABELS = {
  merge: "マージ",
  merged: "マージ済み",
  "would-merge": "マージ対象（dry run）",
  "wait-release": "公開待ち",
  wait: "待機",
  blocked: "要対応",
  skipped: "次回に持ち越し",
  error: "エラー"
};

async function main() {
  const pulls = (await github(`/repos/${repository}/pulls?state=open&per_page=100`))
    .filter((pr) =>
      env.DRY_RUN_PR ? String(pr.number) === env.DRY_RUN_PR : pr.labels.some((item) => item.name === label)
    )
    .sort((a, b) => a.number - b.number);

  const summary = [`## App Store 公開でお知らせを自動公開${dryRun ? "（dry run）" : ""}`, ""];
  if (pulls.length === 0) {
    summary.push(`ラベル \`${label}\` の付いた未マージの PR はありません。`);
    writeSummary(summary);
    writeOutput("merged", "false");
    return 0;
  }

  const storeVersion = await fetchStoreVersion();
  summary.push(`App Store（${country}）の公開版: **${storeVersion}**${env.STORE_VERSION_OVERRIDE ? "（上書き値）" : ""}`, "");
  summary.push("| PR | 対象の版 | 判定 | 理由 |", "|---|---|---|---|");

  let merged = null;
  let blockedCount = 0;

  for (const listed of pulls) {
    const number = listed.number;
    let row;
    try {
      const pr = await github(`/repos/${repository}/pulls/${number}`);
      const target = resolveTargetVersion({
        body: pr.body,
        baseDocument: await readAnnouncements(pr.base.sha),
        headDocument: await readAnnouncements(pr.head.sha)
      });
      const checks = await readChecks(pr.head.sha);
      const decision = decide({ storeVersion, target, checks, pr, repository });
      row = { number, version: target.version ?? "?", ...decision };

      if (decision.outcome === "merge") {
        if (merged) {
          row = { ...row, outcome: "skipped", reason: `${decision.reason}。1回の実行でマージするのは1件のため、次回に回します` };
        } else if (dryRun) {
          row.outcome = "would-merge";
        } else {
          const result = await github(`/repos/${repository}/pulls/${number}/merge`, {
            method: "PUT",
            body: { merge_method: "squash", sha: pr.head.sha }
          });
          merged = { number, version: target.version, sha: result.sha };
          row.outcome = "merged";
          await commentOnce(
            number,
            `merged:${result.sha}`,
            `App Store で Inset ${storeVersion} の公開を確認したため、このPRを自動でマージしました（対象: ${target.version}）。\nGitHub Pages と inset.page への公開を続けて実行します。結果はこのPRに追記します。`
          );
        }
      } else if (decision.outcome === "blocked") {
        // decide() only blocks once the release is live or the target is unreadable.
        blockedCount += 1;
        if (!dryRun) {
          await commentOnce(
            number,
            `blocked:${pr.head.sha}:${decision.reason}`,
            `App Store で ${storeVersion} が公開されていますが、このPRを自動でマージできませんでした。\n\n理由: ${decision.reason}\n\n直したあとは次回の定期実行（15分ごと）で再確認します。急ぐ場合は手でマージしてください。`
          );
        }
      }
    } catch (error) {
      blockedCount += 1;
      row = { number, version: "?", outcome: "error", reason: error.message };
    }
    summary.push(`| #${row.number} | ${row.version} | ${OUTCOME_LABELS[row.outcome] ?? row.outcome} | ${row.reason.replaceAll("|", "\\|")} |`);
  }

  if (merged) {
    summary.push("", `#${merged.number} をマージしました（${merged.sha.slice(0, 12)}）。続けて GitHub Pages と inset.page に公開します。`);
  }
  writeSummary(summary);
  writeOutput("merged", merged ? "true" : "false");
  writeOutput("pr_number", merged?.number ?? "");
  writeOutput("version", merged?.version ?? "");
  writeOutput("merge_sha", merged?.sha ?? "");

  // Fail the run so GitHub notifies the owner when a published release is stuck.
  return blockedCount > 0 ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(error);
    writeSummary([`## App Store 公開でお知らせを自動公開`, "", `エラー: ${error.message}`]);
    writeOutput("merged", "false");
    process.exit(1);
  });

// Cloudflare Cron Trigger that starts the "Publish on App Store release"
// workflow with workflow_dispatch. GitHub's own `schedule` event is best-effort
// and was observed to drop most runs for this repository, while manual
// dispatches start within seconds.
//
// The Worker only dispatches while an open PR carries the publish label, so the
// workflow does not run when nothing is waiting for a release.
//
// Secret: GITHUB_DISPATCH_TOKEN, a fine-grained token limited to
// aritaka-cow/inset-site with "Actions: write" (and the default "Metadata: read").

export const REPOSITORY = "aritaka-cow/inset-site";
export const WORKFLOW_FILE = "auto-publish-on-store-release.yml";
export const PUBLISH_LABEL = "publish-on-store-release";
const API = "https://api.github.com";

function headers(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "inset-site-store-release-dispatcher"
  };
}

// Returns { dispatched, pullRequests, reason }.
export async function dispatchIfPending({ token, fetchImpl = fetch }) {
  if (!token) throw new Error("GITHUB_DISPATCH_TOKEN is not set");

  const listUrl = `${API}/repos/${REPOSITORY}/issues?state=open&labels=${encodeURIComponent(PUBLISH_LABEL)}&per_page=100`;
  const listResponse = await fetchImpl(listUrl, { headers: headers(token) });
  if (!listResponse.ok) {
    throw new Error(`listing labelled pull requests failed: ${listResponse.status} ${await listResponse.text()}`);
  }
  const pullRequests = (await listResponse.json())
    .filter((issue) => issue.pull_request)
    .map((issue) => issue.number);

  if (pullRequests.length === 0) {
    return { dispatched: false, pullRequests, reason: "no open pull request is labelled" };
  }

  const dispatchUrl = `${API}/repos/${REPOSITORY}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
  const dispatchResponse = await fetchImpl(dispatchUrl, {
    method: "POST",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({ ref: "main" })
  });
  if (dispatchResponse.status !== 204 && dispatchResponse.status !== 200) {
    throw new Error(`workflow dispatch failed: ${dispatchResponse.status} ${await dispatchResponse.text()}`);
  }
  return { dispatched: true, pullRequests, reason: "dispatched" };
}

export default {
  async scheduled(controller, env) {
    const result = await dispatchIfPending({ token: env.GITHUB_DISPATCH_TOKEN });
    console.log(JSON.stringify({ cron: controller.cron, ...result }));
  }
};

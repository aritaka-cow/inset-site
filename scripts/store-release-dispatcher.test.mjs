import assert from "node:assert/strict";
import test from "node:test";
import { dispatchIfPending } from "../workers/store-release-dispatcher.js";

function fakeFetch(issues, dispatchStatus = 204) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url, init });
    if (url.includes("/issues?")) return new Response(JSON.stringify(issues), { status: 200 });
    if (url.endsWith("/dispatches")) return new Response(null, { status: dispatchStatus });
    throw new Error(`unexpected ${url}`);
  };
  return { calls, fetchImpl };
}

test("does not dispatch without a labelled pull request", async () => {
  const { calls, fetchImpl } = fakeFetch([{ number: 7 }]);
  const result = await dispatchIfPending({ token: "t", fetchImpl });
  assert.equal(result.dispatched, false);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /labels=publish-on-store-release/);
});

test("dispatches the workflow on main when a labelled pull request is open", async () => {
  const { calls, fetchImpl } = fakeFetch([{ number: 52, pull_request: {} }]);
  const result = await dispatchIfPending({ token: "t", fetchImpl });
  assert.deepEqual(result, { dispatched: true, pullRequests: [52], reason: "dispatched" });
  assert.match(calls[1].url, /actions\/workflows\/auto-publish-on-store-release\.yml\/dispatches$/);
  assert.equal(calls[1].init.method, "POST");
  assert.deepEqual(JSON.parse(calls[1].init.body), { ref: "main" });
  assert.equal(calls[1].init.headers.Authorization, "Bearer t");
});

test("fails loudly when the token is missing or GitHub rejects the dispatch", async () => {
  await assert.rejects(dispatchIfPending({ token: "", fetchImpl: fakeFetch([]).fetchImpl }), /not set/);
  const { fetchImpl } = fakeFetch([{ number: 52, pull_request: {} }], 403);
  await assert.rejects(dispatchIfPending({ token: "t", fetchImpl }), /dispatch failed: 403/);
});

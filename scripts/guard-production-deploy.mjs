import { execFileSync } from "node:child_process";

function git(args, options = {}) {
  const output = execFileSync("git", args, {
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : ["ignore", "pipe", "pipe"]
  });
  return options.inherit ? "" : output.trim();
}

try {
  git(["fetch", "--quiet", "origin", "main"], { inherit: true });

  const branch = git(["branch", "--show-current"]);
  const head = git(["rev-parse", "HEAD"]);
  const remoteMain = git(["rev-parse", "origin/main"]);
  const dirty = git(["status", "--porcelain"]);

  if (branch !== "main") {
    throw new Error(`production deploy requires branch main; current branch is ${branch || "detached HEAD"}`);
  }
  if (head !== remoteMain) {
    throw new Error(`production deploy requires HEAD === origin/main; HEAD=${head}, origin/main=${remoteMain}`);
  }
  if (dirty) {
    throw new Error("production deploy requires a clean worktree");
  }

  console.log(`Production deploy guard passed: main@${head.slice(0, 12)}`);
} catch (error) {
  console.error(`Production deploy blocked: ${error.message}`);
  process.exit(1);
}

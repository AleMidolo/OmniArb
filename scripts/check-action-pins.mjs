import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const workflowDir = ".github/workflows";
const workflowFiles = readdirSync(workflowDir)
  .filter((name) => name.endsWith(".yml") || name.endsWith(".yaml"))
  .sort();

const remoteUsePattern = /^\s*uses:\s*([^\s#]+)\s*(?:#.*)?$/gm;
const fullCommitShaPattern = /^[0-9a-f]{40}$/i;
const violations = [];

for (const file of workflowFiles) {
  const path = join(workflowDir, file);
  const source = readFileSync(path, "utf8");

  for (const match of source.matchAll(remoteUsePattern)) {
    const reference = match[1];
    if (reference.startsWith("./") || reference.startsWith("docker://")) continue;

    const at = reference.lastIndexOf("@");
    const revision = at >= 0 ? reference.slice(at + 1) : "";
    if (!fullCommitShaPattern.test(revision)) {
      const line = source.slice(0, match.index).split("\n").length;
      violations.push(`${path}:${line}: ${reference}`);
    }
  }
}

if (violations.length > 0) {
  console.error("Remote GitHub Actions must be pinned to immutable 40-character commit SHAs:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Verified immutable action pins in ${workflowFiles.length} workflow files.`);

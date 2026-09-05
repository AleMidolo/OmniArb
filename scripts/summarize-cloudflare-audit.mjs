import { readFileSync, writeFileSync } from "node:fs";

const [inputPath = "cloudflare-toolchain-audit.json", outputPath = "cloudflare-toolchain-audit.md"] = process.argv.slice(2);
const audit = JSON.parse(readFileSync(inputPath, "utf8"));
const counts = audit.metadata?.vulnerabilities ?? {};
const vulnerabilities = Object.values(audit.vulnerabilities ?? {}).sort((a, b) =>
  `${a.severity}:${a.name}`.localeCompare(`${b.severity}:${b.name}`),
);

const lines = [
  "# Cloudflare migration toolchain audit",
  "",
  `Generated with npm ${process.env.NPM_VERSION ?? "(workflow pinned version)"} from the exact SEC-001 toolchain package set.`,
  "",
  "## Vulnerability counts",
  "",
  "| Severity | Count |",
  "|---|---:|",
  `| Critical | ${counts.critical ?? 0} |`,
  `| High | ${counts.high ?? 0} |`,
  `| Moderate | ${counts.moderate ?? 0} |`,
  `| Low | ${counts.low ?? 0} |`,
  `| Info | ${counts.info ?? 0} |`,
  `| Total | ${counts.total ?? 0} |`,
  "",
  "## Findings",
  "",
];

if (vulnerabilities.length === 0) {
  lines.push("No vulnerabilities were reported by npm audit.", "");
}

for (const vulnerability of vulnerabilities) {
  lines.push(`### ${vulnerability.name} — ${vulnerability.severity}`);
  lines.push("");
  lines.push(`- Direct dependency: ${vulnerability.isDirect ? "yes" : "no"}`);
  lines.push(`- Affected range: \`${vulnerability.range ?? "unknown"}\``);
  if (Array.isArray(vulnerability.nodes) && vulnerability.nodes.length > 0) {
    lines.push(`- Installed nodes: ${vulnerability.nodes.map((node) => `\`${node}\``).join(", ")}`);
  }
  if (vulnerability.fixAvailable !== undefined) {
    const fix = typeof vulnerability.fixAvailable === "object"
      ? JSON.stringify(vulnerability.fixAvailable)
      : String(vulnerability.fixAvailable);
    lines.push(`- npm fix available: ${fix}`);
  }

  const via = Array.isArray(vulnerability.via) ? vulnerability.via : [];
  for (const advisory of via) {
    if (typeof advisory === "string") {
      lines.push(`- Via: \`${advisory}\``);
      continue;
    }
    const title = advisory.title ?? advisory.name ?? "advisory";
    const source = advisory.source ?? "unknown";
    const url = advisory.url ? ` — ${advisory.url}` : "";
    lines.push(`- Advisory ${source}: ${title}${url}`);
    if (advisory.range) lines.push(`  - Advisory range: \`${advisory.range}\``);
  }
  lines.push("");
}

writeFileSync(outputPath, `${lines.join("\n")}\n`);
console.log(`Wrote ${outputPath} with ${counts.total ?? 0} reported vulnerabilities.`);

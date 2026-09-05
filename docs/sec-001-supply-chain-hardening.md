# SEC-001 — Supply-Chain Hardening Record

**Status:** Developer implementation complete; independent QA and architecture/security review required before merge  
**Date:** 2026-09-05  
**Scope:** GitHub Actions and the ephemeral vinext/Cloudflare deployment toolchain  
**Deployment mode:** `PRE_LAUNCH`

## 1. Purpose

SEC-001 hardens the build and deployment supply chain without changing product behavior or enabling commercial functionality. The accepted CI → browser validation → Worker validation → deployment ordering remains authoritative, and Cloudflare deployment credentials remain restricted to trusted same-repository deployment steps.

## 2. Baseline audit

The Cloudflare migration toolchain is intentionally installed ephemerally rather than committed to the application lockfile. SEC-001 therefore added an isolated npm project that resolves the **exact pinned migration package set**, records its package lock, runs `npm audit --json`, and publishes both raw and readable audit evidence.

With the pre-SEC-001 direct pins:

- `@cloudflare/vite-plugin` `1.31.0`
- `vite` `8.0.0`
- `wrangler` `4.80.0`
- `vinext` `1.0.0-beta.9`
- `@vinext/cloudflare` `1.0.0-beta.7`
- `@vitejs/plugin-rsc` `0.5.34`
- `react-server-dom-webpack` `19.2.8`

Cloudflare workflow run `33953433575` produced an isolated exact-package audit with **8 findings: 7 high, 1 low, 0 critical**. The earlier root no-save install had summarized the same ephemeral toolchain as 5 high, 2 moderate, and 1 low; the isolated audit is the SEC-001 authoritative evidence because it captures the exact deployment package set separately from the application dependency graph.

### High-severity findings and direct causes

| Package | Direct? | Baseline affected range/evidence | Disposition |
|---|---|---|---|
| `@cloudflare/vite-plugin` | Yes | `1.31.0` fell within the audited affected range through `1.46.0`; vulnerability paths included Wrangler, Miniflare, and `ws` | Upgrade to `1.54.3` |
| `vite` | Yes | `8.0.0` fell within affected ranges ending at `8.0.15`, including path traversal/file-read and Windows path-deny issues | Upgrade to `8.0.16` |
| `wrangler` | Yes | `4.80.0` fell within the audited affected range `4.16.0 - 4.113.0`; vulnerability paths included Miniflare/esbuild | Upgrade to `4.129.0` |
| `miniflare` | No | Transitive through the Cloudflare toolchain; inherited `sharp`, `undici`, and `ws` findings | Resolved by direct Cloudflare toolchain upgrades |
| `sharp` | No | `<0.35.0`, including GHSA-f88m-g3jw-g9cj | Resolved transitively |
| `undici` | No | Affected 7.x ranges included TLS/proxy, header, cache, cookie, response-desynchronization and DoS advisories | Resolved transitively |
| `ws` | No | Affected through `8.20.1`, including GHSA-58qx-3vcg-4xpx and GHSA-96hv-2xvq-fx4p | Resolved transitively |

The baseline also contained one low-severity transitive `esbuild` development-server finding (GHSA-g7r4-m6w7-qqqr), which was resolved by the same direct upgrades.

## 3. Remediation

The deployment toolchain now pins:

- `@cloudflare/vite-plugin` `1.54.3`
- `vite` `8.0.16`
- `wrangler` `4.129.0`
- `vinext` `1.0.0-beta.9`
- `@vinext/cloudflare` `1.0.0-beta.7`
- `@vitejs/plugin-rsc` `0.5.34`
- `react-server-dom-webpack` `19.2.8`
- npm `11.19.1`

The vinext packages and RSC bridge remain at the compatibility-tested versions because the audit did not require changing them. The direct vulnerable packages were upgraded instead of accepting the high-severity findings.

On commit `5bf8fd8ac4cb349c4b569f88761d2120c01358d7`, Cloudflare workflow run `33953570078` reported:

- application dependency install: **0 vulnerabilities**;
- isolated exact Cloudflare toolchain audit: **0 critical, 0 high, 0 moderate, 0 low — 0 total**;
- `vinext check`: **94% compatible, 8 supported, 1 partial (`reactStrictMode`), 0 issues**;
- vinext production build: **PASS** with Vite `8.0.16`;
- Worker bundle: **1.1 MB**;
- local Cloudflare Worker PRE_LAUNCH smoke: **PASS**.

The audit gate now fails Worker validation when either a **high** or **critical** vulnerability is present in the exact ephemeral toolchain.

## 4. GitHub Actions integrity

All remote Actions used by OmniArb workflows are pinned to immutable 40-character commit SHAs with readable release comments:

| Action | Pinned revision | Release comment |
|---|---|---|
| `actions/checkout` | `3d3c42e5aac5ba805825da76410c181273ba90b1` | `v7.0.1` |
| `actions/setup-node` | `249970729cb0ef3589644e2896645e5dc5ba9c38` | `v6.5.0` |
| `actions/upload-artifact` | `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a` | `v7.0.1` |

`scripts/check-action-pins.mjs` scans every workflow and fails CI if a remote `uses:` reference is not pinned to a full commit SHA. This prevents regression to mutable major-version tags.

## 5. Dependency and secret scanning

Application validation runs `npm audit --audit-level=high`, and the Cloudflare validation performs the separate exact-package audit described above. Weekly Dependabot configuration is committed for both npm and GitHub Actions so fixed dependency/action updates are surfaced as pull requests.

GitHub Dependency Review was evaluated during implementation, but its workflow failed because the repository's Dependency Graph is currently disabled. The unsupported workflow was removed rather than converted into a non-blocking check. The repository-controlled npm audit gates remain blocking dependency scans for both application and deployment-toolchain dependencies. Enabling the GitHub Dependency Graph later would add another signal but is not required for these blocking audits to function.

OmniArb is a public repository, for which GitHub provides platform-native secret scanning automatically. No additional third-party secret-scanning Action was added to the trusted workflow supply chain.

## 6. Trust boundaries preserved

SEC-001 does not change the deployment trust model:

- workflow default permissions remain read-only unless a job needs more;
- Cloudflare credentials remain `CLOUDFLARE_ACCOUNT_ID` plus the existing least-privilege `CLOUDFLARE_API_TOKEN`;
- those credentials are passed only to credential-check/deployment steps;
- the PR deployment job still requires the pull request head repository to equal the trusted OmniArb repository;
- untrusted fork code cannot enter the Cloudflare-secret preview deployment path;
- both preview and stable deploy jobs still require application validation, browser validation, and Worker validation;
- `OMNIARB_MODE=PRE_LAUNCH` remains explicit and commercial integrations remain disabled.

## 7. Validation and review gates

Developer validation is performed by the exact-head GitHub Actions runs because the current developer execution environment could not resolve `github.com` for a local clone. This environment limitation does not affect GitHub-hosted validation and is recorded rather than represented as a local test pass.

Before SEC-001 merges, independent QA must re-run/verify the acceptance criteria on the final PR head, including the hosted Cloudflare preview. Architecture/security review must confirm the dependency upgrades, immutable Action pins, audit gates, and preserved deployment trust boundaries.

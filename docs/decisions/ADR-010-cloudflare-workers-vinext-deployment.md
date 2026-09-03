# ADR-010: Deploy Next.js through vinext on Cloudflare Workers

**Status:** Accepted

**Date:** 2026-09-03

## Context

OmniArb needs an automatically deployed public `PRE_LAUNCH` informational site,
stable preview environments for pull requests, and a workflow that autonomous
agents can operate primarily through GitHub.

The previous deployment preference targeted Vercel. The Product Owner has
explicitly replaced that preference with Cloudflare Workers.

The application currently uses Next.js 16.3.4 with the App Router, React Server
Components, metadata, `not-found`, route handlers including
`POST /api/checkout/setup`, and `next.config.ts` response/security headers. The
`PRE_LAUNCH` commercial gate is security-critical and must behave identically on
the deployment target.

Cloudflare currently recommends **vinext** as the default path for running an
existing Next.js 16 application on Cloudflare Workers. Cloudflare documents App
Router, route handlers, metadata, server/static rendering and most `next/*`
APIs as supported. The vinext compatibility suite also covers `next.config`
headers on page and API responses.

vinext remains beta. Migration therefore requires compatibility and behavioral
verification rather than assuming framework parity.

## Decision

Deploy OmniArb to **Cloudflare Workers using vinext**.

The repository remains a Next.js/TypeScript application. vinext is a deployment
and build adapter/toolchain, not a product-framework rewrite. Existing domain,
security and module boundaries remain unchanged.

### Worker shape

For the M2 informational release:

- use one Worker named `omniarb-prelaunch` unless implementation discovers a
  Cloudflare naming constraint;
- enable the public `workers.dev` route;
- explicitly enable Worker Preview URLs;
- explicitly configure `OMNIARB_MODE=PRE_LAUNCH` in the Worker environment;
- do not configure Stripe, Telegram commercial provisioning, transactional
  email-provider or analytics credentials;
- keep the application-level safe default and fail-closed route behavior as a
  second line of defense.

The Cloudflare configuration should be explicit and version-controlled using
`vite.config.ts` and `wrangler.jsonc`. The Worker uses vinext's App Router fetch
handler and the Cloudflare Vite plugin with `nodejs_compat` as required by the
current vinext Cloudflare setup.

### Compatibility gate

Before committing the runtime migration, the Developer must:

1. run `npx vinext check` against the exact repository;
2. record and resolve any blocking compatibility finding;
3. preserve the existing Next.js validation path in parallel with the vinext
   build until Cloudflare-runtime QA passes;
4. verify the exact current application features under vinext/Workers,
   especially:
   - App Router rendering and Italian metadata;
   - unknown-route/not-found behavior;
   - security headers from `next.config.ts`;
   - absence of `X-Powered-By`;
   - `POST /api/checkout/setup` returning `503 COMMERCIAL_DISABLED` plus
     `Cache-Control: no-store` in `PRE_LAUNCH`;
   - forced `COMMERCIAL` remaining fail-closed before OMNI-004;
   - crafted query/body/header/method-override requests not bypassing the gate.

As of this decision, an upstream vinext issue exists around a generated
`deploy:vinext` script pointing at a stale output path. This is not an
architectural blocker because Wrangler can deploy the explicit generated Worker
configuration directly. The implementation must not depend blindly on a
scaffold-generated deploy script; use explicit build/deploy commands validated
against the pinned vinext/Wrangler versions.

### GitHub-driven deployment

GitHub Actions is the authoritative deployment orchestrator for OmniArb.
Cloudflare dashboard Git integration is not required for normal operation.

The target workflow is:

```text
GitHub push/PR
    |
    v
lint + typecheck + unit tests + Next.js build + browser tests
    |
    v
vinext build / Cloudflare runtime validation
    |
    +---------------------------+
    |                           |
    v                           v
PR: upload Worker version       main: deploy Worker
preview alias pr-<number>        stable workers.dev URL
```

Rules:

- deployment jobs run only after validation succeeds;
- `main` runs `wrangler deploy` for the stable Worker;
- same-repository PRs run `wrangler versions upload --preview-alias
  pr-<number>` after build;
- preview URLs must be posted or otherwise exposed in the PR workflow for QA;
- Cloudflare deployment jobs use only `CLOUDFLARE_ACCOUNT_ID` and a
  least-privilege `CLOUDFLARE_API_TOKEN` stored as GitHub secrets;
- workflows using Cloudflare secrets must not execute untrusted fork PR code;
- third-party GitHub Actions should be pinned to immutable revisions where
  practical;
- the production/main deployment remains `PRE_LAUNCH` until the separate M6
  commercial activation gate is explicitly approved.

Cloudflare Worker version preview aliases provide a stable URL for a PR while a
new version prefix provides commit-specific traceability.

### Free-tier posture

The informational M2 deployment should remain on Cloudflare Workers Free where
practical. At the time of this decision, the relevant Free limits include
100,000 requests/day, 10 ms CPU per invocation, 128 MB memory and a 3 MB Worker
size limit.

The current informational application has no database or provider side effects
and is expected to fit this profile, but this is an implementation assumption,
not a guarantee. DEP-001 must record the generated Worker size and surface any
concrete CPU/bundle incompatibility to Architecture. A paid Workers plan must
not be introduced silently merely to bypass an avoidable migration problem.

## Alternatives considered

### Vercel

Rejected by explicit Product Owner direction. Existing Vercel initialization
work is superseded and must not continue.

### Cloudflare Pages static export

Rejected as the primary architecture because OmniArb already has required
server-side route behavior and will later add webhook, entitlement and
integration endpoints. Cloudflare itself recommends Workers/vinext for full
stack Next.js applications.

### OpenNext Cloudflare adapter

Retained only as a contingency if `vinext check` or Cloudflare-runtime testing
finds a concrete vinext incompatibility that blocks required behavior.
Cloudflare recommends vinext for new/current Next.js Workers migrations, so
OpenNext is not the default path.

### Cloudflare dashboard Git integration

Not selected as the authoritative pipeline. It can create automatic branch
previews, but GitHub Actions provides clearer enforcement of the existing CI/QA
gate before deployment and is more directly operable by the autonomous agents.

## Consequences

- The deployment provider changes without changing OmniArb's domain
  architecture or commercial entitlement authority.
- The `PRE_LAUNCH` gate remains application/server authoritative and is tested
  again on the Cloudflare runtime.
- One-time Cloudflare account/subdomain/API-token bootstrap is still required,
  but routine deployments are GitHub-driven afterward.
- PRs receive stable, public `workers.dev` preview aliases suitable for QA.
- Cloudflare runtime limits and vinext beta compatibility become explicit
  operational risks that CI and QA must detect.
- Future persistence remains managed PostgreSQL/Prisma unless a later ADR
  deliberately changes it; adopting Workers does not imply D1/KV migration.
- Commercial provider credentials remain absent until their existing product,
  architecture, security and M6 gates are satisfied.

## Implementation and release handoff

- Developer: issue #13 (`DEP-001`) implements and validates vinext/Workers plus
  GitHub deployment workflows.
- Release / DevOps: issue #11 performs the minimal Cloudflare account/API-token
  bootstrap and verifies stable main + PR preview deployment after #13 merges.
- QA independently verifies behavior on a real Cloudflare preview before the
  migration is considered complete.

## References

- Cloudflare Next.js / vinext guide:
  https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Cloudflare Worker Preview URLs:
  https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/
- Cloudflare GitHub Actions deployment guidance:
  https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
- Cloudflare Workers limits:
  https://developers.cloudflare.com/workers/platform/limits/
- vinext upstream repository:
  https://github.com/cloudflare/vinext

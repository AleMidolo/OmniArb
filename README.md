# OmniArb

OmniArb is an Italian-language showcase website and subscription funnel for an
existing Telegram sports-arbitrage alert service.

The web project explains surebetting, presents the €50/month offer and seven-day
trial, manages Stripe billing and entitlement, and onboards eligible customers
to Telegram. It does not implement the arbitrage engine, place bets, hold
customer funds or provide an alerts dashboard.

## Current delivery state

- M0 product baseline: complete.
- M1 architecture baseline: complete; deployment architecture targets Cloudflare Workers through vinext.
- M2 Italian informational website: **complete, publicly released and verified in `PRE_LAUNCH`**.
- Stable informational URL: `https://omniarb-prelaunch.alemidolo.workers.dev`.
- Automatic same-repository PR previews and stable `main` deployment are active through GitHub Actions + Cloudflare Workers.
- M3 commercial-readiness prerequisites are blocked on legal/product-owner inputs and verification of the external Telegram provisioning contract.
- SEC-001 / issue #17 is the highest-priority currently unblocked engineering hardening task; it must be complete or explicitly risk-accepted before commercial activation.
- Commercial billing and Telegram fulfillment remain blocked until legal, operational, external-service, security and QA launch gates are complete.
- In `PRE_LAUNCH`, the CTA is **“Prossimamente”** and no trial, payment method or paid subscription may be activated.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

The safe default is `OMNIARB_MODE=PRE_LAUNCH`. In this increment, even an
explicit `COMMERCIAL` value does not expose checkout: the server route remains
fail-closed until OMNI-004 and the documented launch gates are complete.
The analytics adapter is also intentionally disabled until its consent and
retention design receives privacy approval.

The normal Next.js development path remains supported. Cloudflare/vinext is the
deployment adapter/toolchain rather than a product-framework rewrite.

## Validation

```bash
npm run check
npm run test:e2e
```

Cloudflare validation additionally runs vinext compatibility/build checks, local
Worker-runtime smoke tests, hosted PR smoke/browser tests and an exact-main
post-deploy release smoke check.

## Deployment target

The approved deployment target is **Cloudflare Workers through vinext**.
GitHub Actions is the authoritative CI/CD orchestrator:

- validated `main` deploys to the stable public `PRE_LAUNCH` Worker URL;
- validated same-repository pull requests receive stable Worker preview aliases
  suitable for QA;
- the post-deploy release workflow verifies the exact deployed `main` SHA;
- Cloudflare deployment credentials are limited to GitHub secrets and do not
  authorize commercial OmniArb functionality.

See ADR-010 for the deployment contract.

## Documentation

- [Product requirements](docs/product-requirements.md)
- [Product roadmap](docs/roadmap.md)
- [Prioritized backlog](docs/backlog.md)
- [User flows](docs/user-flows.md)
- [Architecture baseline](docs/architecture.md)
- [Feature specifications](specs/)
- [Architecture decisions](docs/decisions/)

## Product constraints

Customer-facing claims must distinguish mathematical arbitrage from real-world
execution risk. OmniArb does not promise unconditional realized profit or a
minimum alert frequency. Commercial content is Italian-only, intended for
eligible adults in Italy, and requires legal review before activation.

See [AGENTS.md](AGENTS.md) for team responsibilities and repository workflow.

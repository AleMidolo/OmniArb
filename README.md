# OmniArb

OmniArb is an Italian-language showcase website and subscription funnel for an
existing Telegram sports-arbitrage alert service.

The web project explains surebetting, presents the €50/month offer and seven-day
trial, manages Stripe billing and entitlement, and onboards eligible customers
to Telegram. It does not implement the arbitrage engine, place bets, hold
customer funds or provide an alerts dashboard.

## Current delivery state

- M0 product baseline: complete.
- M1 architecture baseline: complete; deployment architecture now targets Cloudflare Workers through vinext.
- M2 Italian informational website: implementation complete and QA/architecture accepted in `PRE_LAUNCH`.
- DEP-001 / issue #13 is the active P0 task to migrate the accepted Next.js 16 application to Cloudflare Workers and add automatic GitHub-driven PR previews plus stable `main` deployment.
- Issue #11 owns the minimal Cloudflare account/`workers.dev`/GitHub-secret bootstrap and final publication verification after DEP-001 merges.
- Commercial billing and Telegram fulfillment remain blocked until legal, operational, external-service and QA launch gates are complete.
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

The Cloudflare migration must preserve this normal Next.js development path.
vinext/Workers build and deployment commands will be added by DEP-001 after
compatibility validation.

## Validation

```bash
npm run check
npm run test:e2e
```

DEP-001 additionally requires `npx vinext check`, a vinext production build and
Cloudflare Worker runtime smoke tests before automatic deployment is enabled.

## Deployment target

The approved deployment target is **Cloudflare Workers through vinext**.
GitHub Actions is the authoritative CI/CD orchestrator:

- validated `main` deploys to a stable public `PRE_LAUNCH` Worker URL;
- validated same-repository pull requests receive stable Worker preview aliases
  suitable for QA;
- Cloudflare deployment credentials are limited to GitHub secrets and do not
  authorize commercial OmniArb functionality.

See ADR-010 and issue #13 for the migration contract.

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

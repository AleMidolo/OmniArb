# OmniArb

OmniArb is an Italian-language showcase website and subscription funnel for an
existing Telegram sports-arbitrage alert service.

The web project explains surebetting, presents the €50/month offer and seven-day
trial, manages Stripe billing and entitlement, and onboards eligible customers
to Telegram. It does not implement the arbitrage engine, place bets, hold
customer funds or provide an alerts dashboard.

## Current delivery state

- M0 product baseline: complete.
- M1 architecture baseline: complete.
- M2 Italian informational website: implementation complete, QA/architecture passed, and merged to `main` in `PRE_LAUNCH`; public Vercel publication remains blocked on project/account initialization tracked in issue #11.
- Commercial billing and Telegram fulfillment: blocked until legal, operational,
  external-service and QA launch gates are complete.
- In `PRE_LAUNCH`, the CTA is **“Prossimamente”** and no trial, payment method
  or paid subscription may be activated.

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

## Validation

```bash
npm run check
npm run test:e2e
```

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

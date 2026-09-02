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
- M2 Italian informational website: ready for development in `PRE_LAUNCH`.
- Commercial billing and Telegram fulfillment: blocked until legal, operational,
  external-service and QA launch gates are complete.
- In `PRE_LAUNCH`, the CTA is **“Prossimamente”** and no trial, payment method
  or paid subscription may be activated.

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

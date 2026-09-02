# ADR-003: Use PostgreSQL for durable commercial state

**Status:** Accepted

**Date:** 2026-09-02

## Context

Even without a customer dashboard, OmniArb must persist customer identity,
trial consumption, subscriptions, entitlement, integration-event deduplication,
fulfillment attempts and retryable side effects. These records require
transactions and uniqueness constraints.

## Decision

Use managed PostgreSQL as the authoritative application store and Prisma for
schema migrations and typed data access. Use database transactions for domain
state plus outbox/event records.

## Alternatives considered

- No database, relying only on Stripe metadata.
- Document/key-value storage.
- Multiple provider-specific stores.

## Consequences

- Relational constraints can protect identity, event and idempotency invariants.
- Schema migrations and backups become operational responsibilities.
- Data collection and retention must remain minimal.
- Card data, bookmaker credentials and betting/bankroll information are never
  stored.

# ADR-009: Use a database outbox and scheduled reconciliation

**Status:** Accepted

**Date:** 2026-09-02

## Context

Stripe, Telegram and email calls can be delayed, duplicated, delivered out of
order or fail after local state changes. OmniArb needs retryable side effects
and recovery, but MVP traffic and team size do not justify a message broker or
independent worker service.

## Decision

Write domain changes and versioned outbox events in one PostgreSQL transaction.
A bounded scheduled/triggered worker claims rows through database leases,
performs idempotent provider operations and records categorized outcomes.
Scheduled reconciliation compares incomplete local workflows with current
provider state and repairs or escalates them.

Webhook handlers authenticate, persist/deduplicate and acknowledge promptly;
they do not perform slow fulfillment or email work inline.

## Alternatives considered

- Perform provider side effects synchronously inside webhook requests.
- Use only provider retries with no local recovery state.
- Introduce a hosted queue/message broker for the MVP.
- Run separate billing and Telegram services.

## Consequences

- State plus intended side effects cannot be lost between separate local writes.
- Every consumer and provider operation still requires an idempotency key.
- The team must operate a scheduler, leases, retry limits, dead-letter alerts
  and reconciliation runbooks.
- PostgreSQL carries modest worker load that is appropriate for MVP scale.
- A queue can replace outbox delivery later without changing domain contracts.

## References

- Stripe webhook delivery behavior: <https://docs.stripe.com/webhooks#event-delivery-behaviors>

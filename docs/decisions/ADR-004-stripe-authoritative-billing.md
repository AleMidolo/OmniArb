# ADR-004: Treat verified Stripe state as authoritative for billing

**Status:** Accepted

**Date:** 2026-09-02

## Context

Browser redirects can be forged or interrupted, while Stripe delivers signed
events with retry behavior. Billing state must remain reliable across delayed,
duplicated and out-of-order client interactions.

## Decision

Use Stripe Checkout/Setup, Subscription Billing and Customer Portal. Update
local billing state only from verified server-side Stripe responses, signed
webhooks and reconciliation. Persist and deduplicate Stripe event IDs.

Use a payment-method setup flow before Telegram fulfillment. Create the final
subscription trial only after service availability is confirmed, with its trial
end aligned to seven actual days of service.

## Alternatives considered

- Grant access from a checkout success redirect.
- Start a fixed trial at the beginning of checkout and compensate for delays.
- Build custom card capture and subscription management.

## Consequences

- Redirect pages report progress but never grant entitlement.
- Webhook handlers require raw-body signature verification and idempotency.
- Reconciliation is required for missed or delayed events.
- The setup-then-subscribe orchestration is more explicit but protects the
  seven-actual-day promise.

# ADR-005: Separate service entitlement from billing state

**Status:** Accepted

**Date:** 2026-09-02

## Context

A Stripe subscription can exist while Telegram fulfillment is delayed or has
failed. Product rules also require access during cancellation periods and a
three-day payment-failure grace period, while an approved refund ends access.

## Decision

Model billing, Telegram fulfillment and OmniArb entitlement as separate but
correlated state. Entitlement transitions are domain decisions based on trusted
billing events, fulfillment facts and time-based rules.

## Alternatives considered

- Use Stripe subscription status directly as authorization.
- Use Telegram membership alone as the entitlement record.
- Represent all concerns in one status field.

## Consequences

- Product rules can be represented without overloading provider statuses.
- State transitions and reconciliation need dedicated tests.
- Partial failures require durable orchestration and compensating actions.
- OmniArb can prove when service became available and calculate the promised
  trial period correctly.

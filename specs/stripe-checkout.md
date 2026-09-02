# Feature Specification — OMNI-004 Stripe Checkout and Subscription Management

**Priority:** P0  
**Status:** ARCHITECTURE COMPLETE — COMMERCIAL IMPLEMENTATION BLOCKED

---

## 1. Objective

Provide the commercial payment and subscription-management experience for the approved OmniArb subscription using Stripe Subscription Billing.

This specification defines product behavior and security expectations. It does not prescribe framework, API layout, database technology or specific Stripe object design.

---

## 2. Confirmed requirements

### Checkout

The approved commercial flow must support:
- €50/month recurring subscription;
- seven-day full-access trial;
- payment method collected upfront;
- no charge at trial start;
- email identity;
- Telegram identity associated before or during checkout;
- one-trial-per-customer policy;
- clear automatic-renewal disclosure.

### Authority

OmniArb must treat verified server-side payment/subscription events as authoritative for commercial entitlement.

A success URL, browser redirect, query parameter or client request is not sufficient evidence of entitlement.

### Subscription management

Customers must normally be able to self-service:
- payment-method updates where supported;
- subscription cancellation;
- relevant billing/subscription information.

Email support is the fallback route.

No OmniArb password-based account/dashboard is required.

### Trial reminder

An email reminder must be sent approximately 24–48 hours before the first €50 charge.

### Failed payment

- three-day grace period;
- customer informed;
- path to update payment method;
- entitlement suspended if unresolved after grace.

### Refund

Support must be able to fulfill the approved voluntary policy:
- first paid charge only;
- seven-day request window;
- no questions asked;
- entitlement ends when refund is approved.

### Pre-commercial state

Stripe trial/subscription activation must not be reachable while the product is in the informational "Prossimamente" phase.

---

## 3. Security/privacy requirements

- Payment-card credentials are handled by the payment provider, not stored directly by OmniArb.
- Stripe secrets remain server-side.
- Event/webhook authenticity must be verified.
- Billing-event processing must tolerate retries without incorrectly duplicating entitlement actions.
- Customer-facing code must not be able to forge active subscription status.
- Only necessary commercial/customer metadata should be persisted.
- Logging must avoid unnecessary sensitive payment/customer data.

Exact controls are architecture decisions.

---

## 4. Customer communication requirements

The commercial experience must communicate in Italian:
- €0 at trial activation;
- 7 days of full service;
- €50/month thereafter unless cancelled;
- cancellation terms;
- the voluntary first-payment seven-day money-back guarantee;
- that mandatory legal rights are unaffected;
- how to manage the subscription;
- support contact once configured.

Final legal wording requires review before commercial launch.

---

## 5. Acceptance criteria

1. The approved CTA can enter the Stripe-backed trial flow only after commercial launch is enabled.
2. Trial activation collects a payment method but does not charge the €50 subscription price immediately.
3. The resulting commercial relationship is associated with the intended email and Telegram identity.
4. The billing flow supports the product requirement of seven actual days of service before first charge.
5. Verified server-side payment/subscription state controls entitlement.
6. Manipulating a frontend redirect or URL cannot create entitlement.
7. Cancellation can be initiated through a self-service path under normal circumstances.
8. A trial cancellation prevents the first charge.
9. A paid cancellation prevents future renewals.
10. A first-charge reminder is issued approximately 24–48 hours before billing.
11. Failed payment can enter the approved three-day grace behavior.
12. Unresolved failed payment can lead to entitlement suspension.
13. The approved first-payment refund can be processed.
14. An approved refund triggers the entitlement-ending workflow.
15. Payment-provider secrets are not exposed client-side.
16. Duplicate/retried provider events do not intentionally grant duplicate service access.
17. The flow is unavailable while the product remains in "Prossimamente" mode.

---

## 6. Dependencies

- OMNI-003 subscription/trial rules
- OMNI-005 entitlement/onboarding integration
- OMNI-006 approved legal/customer wording
- Seller/legal readiness
- Architecture baseline

---

## 7. Assumptions

- Stripe can support the approved Italian B2C commercial setup once seller/account configuration is completed.
- The Architect can design a mechanism that delays/aligns first billing with actual Telegram service availability.
- A transactional email capability will exist for the first-charge reminder and onboarding fallback.

---

## 8. Intentionally deferred

- Choice of application framework.
- Choice of database.
- Exact Stripe Checkout/Portal/API primitives.
- Exact webhook routing.
- Exact persistence schema.
- Alternative payment providers.
- Coupons/promotions.
- Annual billing.

**ARCHITECTURE COMPLETE — BLOCKED PENDING COMMERCIAL PREREQUISITES**

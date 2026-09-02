# Feature Specification — OMNI-003 Subscription and Trial Lifecycle

**Priority:** P0  
**Status:** ARCHITECTURE COMPLETE — COMMERCIAL IMPLEMENTATION BLOCKED

---

## 1. Objective

Define the customer entitlement lifecycle for a €50/month recurring B2C subscription with a seven-day full-access free trial, including cancellation, first-payment refund, payment failure and re-subscription rules.

This specification defines required behavior, not the technical state machine.

---

## 2. Confirmed commercial rules

### Price

- €50/month recurring.
- €50 is the final customer-facing advertised monthly price.
- Any tax/accounting treatment must preserve the approved customer-facing pricing promise unless the PM changes it.

### Free trial

- Seven days of full access.
- Payment method required upfront.
- No subscription charge at trial activation.
- Automatic conversion to €50/month unless cancelled.
- One free trial per customer.
- A customer who already used the trial is not entitled to a second one.
- Customer receives an email reminder approximately 24–48 hours before the first charge.

### Trial start

The customer must receive seven actual days of available service.

If checkout completes but Telegram service is not yet available because onboarding failed or is delayed, that unavailable time must not consume the promised seven days.

### Trial cancellation

If the customer cancels during the trial:
- no first €50 charge is collected;
- access remains available until the scheduled end of the trial;
- entitlement ends at trial expiry.

### Paid cancellation

If the customer cancels while paid:
- future renewal stops;
- access continues through the end of the current paid entitlement period;
- cancellation alone does not create a voluntary refund.

### First-payment voluntary refund

- No-questions-asked.
- Request window: seven days from first €50 paid charge.
- First subscription payment only.
- Once approved, entitlement ends.
- Later renewal payments are not covered by this voluntary policy.
- Mandatory statutory rights remain unaffected.

### Failed recurring payment

- Three-day grace period.
- Access continues during grace.
- Customer is informed and given a path to update payment information.
- If unresolved after grace, access is suspended.

---

## 3. Customer identity constraints

Entitlement is associated with:
- customer email; and
- one Telegram identity.

One subscription authorizes one Telegram identity at a time.

Telegram identity changes are handled through support.

No password-based OmniArb account is required.

---

## 4. Required customer-visible states

The experience must be able to represent, in customer-understandable terms where applicable:

- pre-commercial / coming soon;
- trial activation pending;
- trial active;
- trial cancelled but active until expiry;
- active paid subscription;
- paid subscription cancelled but active until period end;
- payment problem in grace period;
- access suspended for unresolved payment;
- refund requested/being handled where relevant;
- refunded / entitlement ended;
- subscription ended.

The Architect may model more internal states.

---

## 5. Commercial launch gate

No trial may be activated until:
- Telegram customer fulfillment is ready;
- seller/legal prerequisites are ready;
- payment and entitlement flows have passed QA.

---

## 6. Acceptance criteria

1. A trial-eligible customer can activate exactly one seven-day full-access trial.
2. Trial activation requires a payment method.
3. No €50 subscription charge occurs at the start of the free trial.
4. The first €50 charge is not due until the customer has received seven actual days of available service.
5. The customer is clearly informed before activation that the trial converts to €50/month unless cancelled.
6. The customer receives a first-charge reminder approximately 24–48 hours beforehand.
7. Cancelling during trial prevents the first charge and preserves access until trial expiry.
8. Cancelling a paid subscription prevents future renewal and preserves access until the current paid period ends.
9. A returning customer who already consumed a free trial does not receive another free trial.
10. A first-payment refund requested within the approved seven-day voluntary window can be handled without requiring a defect justification.
11. When that refund is approved, entitlement ends.
12. A failed renewal payment preserves access for up to the three-day grace period.
13. If the failed payment remains unresolved after grace, entitlement is suspended.
14. Subscription state cannot be upgraded to active merely from untrusted frontend input.
15. A single entitlement does not intentionally authorize multiple simultaneous Telegram identities.
16. Commercial activation remains disabled until the launch gates pass.

---

## 7. Dependencies

- OMNI-004 Stripe checkout/billing integration
- OMNI-005 Telegram fulfillment
- OMNI-006 legal/customer wording
- Architecture entitlement design
- Seller/legal readiness

---

## 8. Assumptions

- The billing architecture can satisfy the product rule that the free-trial clock corresponds to actual service availability.
- A reliable mechanism can determine whether a customer previously consumed a trial.
- Customer-facing tax treatment can preserve the approved €50/month final-price promise.

---

## 9. Intentionally deferred

- Annual plans.
- Multiple tiers.
- Family/multi-user plans.
- B2B invoicing.
- Promotional coupons.
- Loyalty offers.
- A second free trial after any cooldown period.

**ARCHITECTURE COMPLETE — BLOCKED PENDING COMMERCIAL PREREQUISITES**

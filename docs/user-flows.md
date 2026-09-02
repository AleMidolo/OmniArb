# OmniArb — User Flows

**Owner:** Project Manager / Product Owner  
**Status:** Approved product flows  
**Last review:** 2026-09-02  
**Scope:** Italian MVP, Italy-only B2C launch

---

## 1. Purpose

This document defines the customer-visible journeys and product rules that implementation and QA must preserve. Technical orchestration is defined in `docs/architecture.md`.

Common rules for every commercial flow:

- the customer is 18+ and commercially eligible under the final Italy-only rule;
- the MVP has no OmniArb password account or customer dashboard;
- email is the commercial/contact identity;
- one verified Telegram numeric identity is the service identity;
- one subscription authorizes one Telegram identity at a time;
- a browser redirect or frontend assertion never grants entitlement;
- trial time begins only when Telegram service is actually available;
- customer-facing content and transactional messages are Italian.

---

## 2. Flow A — Pre-launch visitor

**Goal:** Learn about OmniArb without entering a commercial flow.

1. Visitor lands on the Italian public page.
2. Visitor learns what sports arbitrage is, sees a clearly illustrative numerical example, and understands practical execution risks.
3. Visitor learns that OmniArb sends alerts through Telegram and does not place bets or hold funds.
4. Visitor sees the future offer: seven full-access days, then €50/month unless cancelled.
5. Primary CTA displays **“Prossimamente”**.
6. No trial, payment-method collection, waiting-list form or Telegram provisioning path is reachable.

**Outcome:** The visitor is informed; no commercial identity, payment method or entitlement is created.

**Failure/abuse rule:** A crafted request, hidden route or stale client must not bypass the server-side pre-launch gate.

---

## 3. Flow B — Trial activation and Telegram onboarding

**Entry conditions:** Commercial launch gate approved; customer is eligible; Telegram fulfillment is operational.

1. Visitor selects the active trial CTA.
2. The experience clearly discloses:
   - payment method required;
   - €0 charged at activation;
   - seven days of full access;
   - automatic conversion to €50/month unless cancelled;
   - one trial per customer;
   - cancellation and voluntary first-payment refund terms;
   - 18+ and Italy-only eligibility.
3. Customer supplies email and links one Telegram identity through the approved verification flow.
4. OmniArb checks trial eligibility using trusted customer/identity records.
5. Customer completes the Stripe-hosted payment-method setup.
6. Verified server-side billing evidence confirms the payment method is ready.
7. OmniArb attempts Telegram provisioning.
8. When service is actually available, OmniArb records service availability and creates the seven-day trial ending seven days later.
9. Website shows the onboarding action/status and email sends equivalent onboarding information.
10. A reminder is sent approximately 24–48 hours before the first €50 charge.

**Success outcome:** Trial is active, one Telegram identity has service access, and the customer has seven actual days of usable service.

**Important exception:** If Telegram provisioning is delayed or fails, no trial time is consumed, no €50 subscription charge is scheduled, and the website must not claim that service is active.

---

## 4. Flow C — Trial cancellation

1. Trial customer opens the verified self-service subscription-management flow.
2. Customer cancels before trial expiry.
3. The experience confirms that:
   - the first €50 charge will not occur;
   - access remains available until the original trial end.
4. At trial end, Telegram access ends unless another valid paid entitlement exists.

**Outcome:** No first charge; trial access preserved through its scheduled expiry.

---

## 5. Flow D — Trial conversion and renewal

1. Active trial approaches its scheduled end.
2. Customer receives the first-charge reminder approximately 24–48 hours beforehand.
3. If not cancelled, Stripe attempts the first €50 charge.
4. Verified successful payment moves the customer to paid entitlement without interrupting Telegram access.
5. At each later monthly renewal, verified successful payment extends paid entitlement for the new period.

**Outcome:** Continuous paid access while verified billing and entitlement remain valid.

**Rule:** Success-page navigation alone cannot cause conversion or renewal.

---

## 6. Flow E — Paid subscription cancellation

1. Paid customer enters the verified self-service subscription-management flow.
2. Customer cancels future renewal.
3. The experience confirms the paid-through date.
4. Telegram access continues until the end of the current paid entitlement period.
5. Access ends at period expiry unless the subscription was legitimately reactivated.

**Outcome:** No future renewal; no automatic voluntary refund; current paid access is preserved.

---

## 7. Flow F — Failed recurring payment

1. A recurring payment fails and OmniArb receives verified provider state.
2. Customer enters a three-day grace period.
3. Telegram access remains available during grace.
4. Customer receives an Italian payment-problem message with a verified path to update payment information.
5. If payment succeeds within grace, paid entitlement resumes without interruption.
6. If unresolved after three days, entitlement is suspended and Telegram access is removed/suspended.
7. A later verified recovery may restore access according to the billing state.

**Outcome:** Temporary failure does not immediately remove service; unresolved failure does not leave indefinite access.

---

## 8. Flow G — First-payment refund

**Entry condition:** Request concerns the first €50 subscription payment and is made within seven days of that charge.

1. Customer contacts email support.
2. Support verifies customer identity, charge eligibility and request timing.
3. No defect justification is required under the voluntary guarantee.
4. Support approves and processes the refund.
5. Entitlement ends when the refund is approved; Telegram access is revoked.
6. Customer receives confirmation.

**Outcome:** First payment refunded and access ended.

**Boundary:** Later renewals are outside this voluntary guarantee. Mandatory consumer rights remain unaffected.

---

## 9. Flow H — Onboarding failure and manual fallback

1. Customer completes identity and payment-method setup, but automated Telegram provisioning does not complete.
2. Website displays a truthful pending/failure state and a support route; it does not display active access.
3. Automatic retry/reconciliation proceeds according to the architecture.
4. If still unresolved, support verifies email, Telegram identity and pending entitlement flow.
5. Support completes or repairs provisioning without issuing a duplicate trial.
6. Trial begins only when service availability is confirmed.
7. Customer receives website/email onboarding confirmation.

**Outcome:** A valid customer receives all seven usable trial days; false or duplicate entitlement is avoided.

---

## 10. Flow I — Returning customer and second-trial denial

1. Returning customer supplies email and links Telegram identity.
2. Trusted records show that the email or verified Telegram identity has already consumed a trial.
3. The experience does not issue another automatic free trial.
4. The customer may continue through the approved returning-customer paid path when available, or contact support if the match is disputed.

**Outcome:** One-trial policy is enforced without silently creating a second grant.

---

## 11. Flow J — Telegram identity change

1. Entitled customer contacts email support.
2. Support verifies the commercial identity and current entitlement.
3. Support validates the new Telegram identity using the approved secure linking method.
4. Access for the previous identity is revoked.
5. Access is provisioned for the new identity.
6. The change is recorded for operational/audit purposes.

**Outcome:** Exactly one Telegram identity remains active for the subscription; the change does not create a new trial or extend entitlement.

---

## 12. Cross-flow customer-visible states

| State | Required customer meaning |
|---|---|
| Pre-launch | Offer explained; activation unavailable |
| Linking pending | Telegram identity is not yet verified |
| Payment setup pending | No trial or charge is active yet |
| Fulfillment pending | Service is not yet available; trial clock has not started |
| Trial active | Service available until stated trial end |
| Trial cancelled | No first charge; access remains until trial end |
| Paid active | Service available through the current paid period |
| Paid cancelled | No renewal; access remains through paid-through date |
| Payment grace | Payment needs attention; access temporarily continues |
| Suspended | Access unavailable because payment remains unresolved |
| Refunded/revoked | Voluntary refund approved; access ended |
| Ended | No active entitlement remains |

---

## 13. QA traceability

The flows above are acceptance-test sources for:

- pre-launch server-side commercial gating;
- identity linking and replay/duplicate handling;
- seven-actual-day trial timing;
- cancellation in trial and paid periods;
- first-charge reminder and conversion;
- renewal success and failure recovery;
- three-day grace expiry;
- first-payment refund revocation;
- automated onboarding and manual fallback;
- second-trial prevention;
- one-active-Telegram-identity enforcement.

Commercial flow testing remains blocked until the external Telegram provisioning contract, seller/legal setup and test environments are ready.

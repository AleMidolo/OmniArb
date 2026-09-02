# Feature Specification — OMNI-005 Telegram Identity and Customer Onboarding

**Priority:** P0  
**Status:** READY FOR ARCHITECTURE

---

## 1. Objective

Connect an entitled OmniArb customer to the existing Telegram-based alert service while keeping the web project separate from the arbitrage algorithm and existing bot's core functionality.

At commercial launch, onboarding should normally be automatic and must have a manual fallback.

---

## 2. Product boundary

### Website responsibilities

- collect/associate the customer's Telegram identity before or during checkout;
- associate that identity with the customer's commercial entitlement;
- trigger/provide customer onboarding after entitlement is valid;
- present onboarding information on the website;
- send onboarding information by email as a fallback;
- react to entitlement-ending/suspending events;
- support one Telegram identity per subscription;
- support identity changes through the support process.

### Explicitly not website responsibilities

- rebuild the arbitrage detection algorithm;
- become the alert-processing engine;
- place bets;
- hold betting funds;
- redesign the existing Telegram bot without a separate approved task.

If the existing Telegram service lacks a required capability, the Architect must document it as an external dependency or propose a separately scoped prerequisite.

---

## 3. Confirmed customer identity rules

- Commercial identity: email.
- Service identity: one Telegram identity.
- Telegram identity associated before or during checkout.
- One active Telegram identity per subscription.
- Subscription is personal and not intended for sharing.
- Telegram identity changes are allowed through email support.

The exact Telegram verification/linking method is an architecture decision.

---

## 4. Onboarding behavior

At commercial launch:

1. Customer completes the required identity and trial/subscription steps.
2. Server-side entitlement is verified.
3. Telegram onboarding is normally provisioned automatically.
4. The website immediately provides the onboarding action/information.
5. Equivalent onboarding information is delivered by email as a fallback.
6. If automation fails, a documented manual support path can fulfill a valid customer.
7. Failure must not be represented as successful access when service is not actually available.

### Trial timing

The customer's seven-day free trial starts from actual service availability.

A customer must not lose promised trial time because Telegram onboarding failed or was delayed.

The technical method for achieving this is owned by the Architect.

---

## 5. Entitlement effects

### Trial cancellation
Access remains until trial expiry.

### Paid cancellation
Access remains until the end of the current paid entitlement period.

### Approved first-payment refund
Access ends when the refund is approved.

### Failed recurring payment
Access remains during the three-day grace period and is suspended if the payment remains unresolved afterward.

### Subscription end
Access ends when no active/grace entitlement remains.

---

## 6. Access-sharing constraints

The onboarding design must not intentionally provide a reusable public access artifact that makes one personal subscription trivially shareable with multiple unrelated Telegram identities.

The exact token/invite/bot mechanism is not prescribed.

---

## 7. Manual fallback

Before commercial launch, the team must document a manual recovery path for a legitimately entitled customer when automated onboarding fails.

The fallback must:
- be available through email support;
- verify that the customer is entitled;
- avoid granting access to an unrelated identity;
- avoid silently creating duplicate entitlement;
- record enough operational information to resolve the incident consistently.

Exact support tooling is an architecture/operations decision.

---

## 8. Acceptance criteria

1. An entitled customer can be associated with one Telegram identity.
2. Telegram identity association occurs before or during checkout.
3. A customer without valid server-side entitlement cannot obtain working service access merely through frontend actions.
4. A newly entitled customer normally receives automated onboarding.
5. The website shows the onboarding action/information after valid activation.
6. The customer also receives onboarding information by email.
7. If automated onboarding fails, the experience does not falsely claim that access is available.
8. A manual support fallback can provision a legitimately entitled customer.
9. The customer receives seven actual days of trial service from availability.
10. Trial cancellation preserves access until trial expiry.
11. Paid cancellation preserves access until paid period end.
12. Approved refund ends access.
13. Failed payment preserves access through the approved three-day grace period.
14. Unresolved failed payment can suspend access.
15. One subscription does not intentionally authorize multiple Telegram identities simultaneously.
16. Support can handle a legitimate Telegram identity-change request.
17. Telegram/bot credentials and private integration secrets remain server-side.
18. The feature does not duplicate the arbitrage algorithm.

---

## 9. External prerequisites

Before commercial launch, the existing Telegram service must be capable of supporting multiple customer identities and the approved access lifecycle.

If this is not currently possible, commercial launch remains blocked.

---

## 10. Assumptions

- The existing Telegram bot/service can expose or support a safe onboarding/access mechanism.
- Customer access can be revoked/suspended according to entitlement changes.
- Email delivery is available as an onboarding fallback.

---

## 11. Intentionally deferred to architecture

- Telegram username vs numeric ID vs bot handshake.
- Invite link vs token vs direct bot authorization.
- Telegram Bot API endpoints/commands.
- Persistence model.
- Retry strategy.
- Idempotency strategy.
- Revocation implementation.
- Exact support/admin tooling.

**READY FOR ARCHITECTURE**

# OmniArb — Product Requirements

**Document owner:** Project Manager / Product Owner  
**Status:** Approved product baseline — architecture aligned; M2 handoff active  
**Initial market:** Italy  
**Initial language:** Italian only  
**Product type:** B2C subscription service  
**Last product-decision review:** 2026-09-02

---

## 1. Purpose

OmniArb is a conversion-focused showcase website for a sports-arbitrage (surebetting) alert service.

The core arbitrage-alert algorithm and an existing Telegram bot already exist outside this web project. The website does **not** reproduce the alert algorithm and does **not** become the primary service-delivery application.

The web product exists to:

1. educate prospective customers about sports arbitrage;
2. explain what OmniArb provides and what it does not provide;
3. build trust without unsupported performance claims;
4. present the commercial offer;
5. activate and manage a recurring subscription;
6. associate the customer's commercial identity with one Telegram identity;
7. onboard entitled customers into the existing Telegram-based service;
8. provide a self-service path for subscription management;
9. provide email support as a fallback.

The ongoing value of the product is delivered through Telegram, not through a web dashboard.

---

## 2. Product boundary

### 2.1 In scope

- Public Italian-language marketing website.
- Educational content about sports arbitrage.
- Static illustrative arbitrage calculation example.
- Real anonymized bot screenshots plus explanatory mockups.
- Pricing and trial presentation.
- Stripe-based recurring subscription flow.
- Seven-day full-access free trial.
- Customer email + Telegram identity association.
- Subscription entitlement lifecycle.
- Automated Telegram onboarding for commercial launch, with manual fallback.
- Self-service subscription management.
- Transactional/customer-service email communication.
- Minimal privacy-focused funnel analytics.
- Legal, privacy, eligibility, refund and risk disclosures required for launch.

### 2.2 Explicitly out of scope

- Reimplementation of the arbitrage-alert algorithm.
- Reimplementation of the existing Telegram bot unless separately approved as another project/task.
- Automatic placement of bets.
- Custody of customer bankroll or betting funds.
- A password-based OmniArb customer account.
- A web dashboard for alerts.
- Interactive arbitrage calculator for the MVP.
- Newsletter, waiting list or other pre-subscription lead-capture funnel.
- Customer testimonials or performance-based social proof at launch.
- B2B/company subscriptions.
- Multi-user/family subscriptions.
- English localization for the MVP.
- Commercial availability outside Italy.
- Guaranteed minimum number of alerts.

---

## 3. Target customer and eligibility

### Confirmed requirements

- The initial commercial market is **Italy only**.
- The service is **18+ only**.
- The initial product is **B2C only**.
- One subscription is personal and is associated with one Telegram identity at a time.
- A customer may request a Telegram identity change through support.
- The product must not be marketed as available outside Italy.

### Intentionally deferred

The precise legally sufficient rule for determining "Italy-only" eligibility (for example residence, domicile, billing address, location, or another criterion) must be defined during legal/compliance review before commercial activation.

The exact age-verification mechanism is also deferred pending legal/compliance review and architecture.

---

## 4. Customer value proposition

OmniArb provides alerts about detected sports-arbitrage opportunities through an existing Telegram-based service.

The product may explain that a correctly executed arbitrage can mathematically lock in a positive theoretical return **when all required bets are successfully placed at the quoted odds and remain valid**.

The website must also explain that real-world execution introduces risk, including but not limited to:

- odds changing before all bets are placed;
- stakes being rejected or limited;
- bets or markets being voided;
- bookmaker-specific rules;
- user execution error;
- insufficient balance or unavailable accounts;
- opportunity availability changing over time.

OmniArb must never claim that:

- every alert produces a realized profit;
- every user is guaranteed to make money;
- profit is guaranteed regardless of execution conditions;
- a minimum number of arbitrage opportunities will be available.

---

## 5. Service model

### Confirmed requirements

- OmniArb identifies and communicates arbitrage opportunities.
- Customers place bets themselves using their own bookmaker accounts and funds.
- OmniArb is not a bookmaker.
- OmniArb does not hold customer betting funds.
- OmniArb does not place bets on behalf of customers.
- Alert delivery and ongoing utility occur in Telegram.
- Sports, markets and bookmakers may be shown as representative examples when they are genuinely supported.
- Such examples must not be presented as permanent coverage commitments.
- Alert quantity and frequency vary according to available opportunities.
- No minimum alert count is guaranteed.

---

## 6. Marketing website

### Confirmed requirements

The public site must be a high-converting showcase that allows a first-time visitor to understand:

- what sports arbitrage is;
- how the mathematical principle works;
- how real-world execution can differ from the theoretical case;
- what OmniArb provides;
- how Telegram alerts are used;
- what the customer must do themselves;
- the subscription price and free-trial terms;
- who is eligible to subscribe;
- how cancellation and the refund guarantee work.

The visual direction is:

> **Professional financial/analytics foundation with subtle sports cues.**

The site should feel credible, precise, data-driven, modern and premium. It should not imitate an aggressive bookmaker/gambling visual identity.

### Evidence and demonstrations

At launch:

- do not use customer testimonials;
- do not use historical profit statistics as conversion claims;
- do not fabricate social proof;
- use genuine anonymized screenshots of the existing bot where provided;
- use explanatory mockups where helpful;
- clearly distinguish illustrative examples from real outcomes;
- use at least one static arbitrage calculation example;
- do not build an interactive calculator in the MVP.

The real screenshots and any real sport/bookmaker examples are pre-launch content inputs to be supplied by the product owner.

---

## 7. Language

### Confirmed requirement

The MVP is **Italian only**, including:

- marketing pages;
- pricing and trial copy;
- checkout-adjacent copy;
- onboarding;
- transactional emails;
- subscription-management guidance;
- support content;
- legal and privacy content.

### Intentionally deferred

English localization is a possible future expansion and is not an MVP acceptance criterion.

---

## 8. Commercial offer

### Confirmed requirements

- Price: **€50 per month recurring**.
- €50/month is the **final customer-facing advertised price**.
- Trial: **7 days of full access**.
- A payment method is required to start the trial.
- No subscription charge is collected at trial activation.
- Unless cancelled, the subscription converts to €50/month after the seven-day full-access trial.
- The customer must be clearly informed of this automatic conversion before activating the trial.
- A customer is eligible for the free trial **once only**.
- Returning customers who have already consumed a trial are not entitled to a new trial.
- The customer should receive an email reminder approximately **24–48 hours before the first charge**.

### Trial-start rule

The customer must receive **seven actual days of usable service**.

The trial period therefore begins from the point at which the Telegram service is actually available to the customer, not merely from an earlier checkout action that failed to provide access.

The Architect owns the technical design required to satisfy this product rule.

---

## 9. Customer identity

### Confirmed requirements

Each customer relationship uses:

- **email** as the commercial/contact identity; and
- **one Telegram identity** as the service-delivery identity.

The Telegram identity must be associated **before or during checkout** so that the service can be provisioned to the intended person.

One subscription authorizes one Telegram identity at a time.

A Telegram identity change may be requested through email support.

### Intentionally deferred

The following are architecture decisions, not product decisions:

- how a Telegram identity is verified;
- whether Telegram usernames, numeric IDs, bot handshakes, tokens or another method are used;
- how duplicate or changed identities are detected;
- how one-trial-per-customer rules are technically enforced.

---

## 10. Checkout and billing

### Confirmed requirements

- Stripe Subscription Billing is the payment provider.
- Payment-card data must be handled by the payment provider, not directly by OmniArb application code.
- Trial, recurring billing and subscription lifecycle must be represented reliably.
- The backend must treat authoritative payment/subscription events as the basis for commercial entitlement.
- A visitor must never obtain service entitlement merely by navigating to a success page or calling a public frontend route.

### Commercial launch gate

The informational site may launch before subscriptions are ready.

Before commercial readiness:

- pricing and future trial terms may be displayed;
- the primary conversion action must show **"Prossimamente"**;
- no trial may be activated;
- no payment method may be collected for the subscription;
- no paid subscription may be created.

Commercial activation is blocked until all of the following are ready:

1. customers can actually receive the Telegram service;
2. normal Telegram onboarding is automated, with a documented manual fallback;
3. the seller's legal identity is defined;
4. required Italian legal/privacy/consumer documentation has been reviewed;
5. the payment and entitlement flow has passed QA.

---

## 11. Cancellation

### During the free trial

- Cancellation prevents the first €50 charge.
- Trial access continues until the originally scheduled end of the seven-day trial.
- At trial expiry, access ends unless the customer has an active paid entitlement.

### During a paid subscription

- Cancellation stops future renewal.
- Access continues until the end of the current paid entitlement period.
- Cancellation alone does not trigger a voluntary refund.

Customers must normally be able to cancel through a self-service subscription-management flow, with email support available as a fallback.

---

## 12. Refund policy

### Confirmed voluntary guarantee

OmniArb provides a **no-questions-asked seven-day money-back guarantee on the first €50 subscription payment only**.

- The window starts from the first paid charge.
- It applies only to that first subscription payment.
- The customer does not need to prove a defect.
- If the refund is granted, service entitlement ends when the refund is approved.
- Subsequent renewal payments are not covered by this voluntary guarantee.

This voluntary guarantee must never be presented as replacing, shortening or limiting mandatory consumer rights under applicable law.

Refund requests are handled through email support unless a later product decision adds another route.

---

## 13. Failed payments

### Confirmed requirement

A failed recurring payment triggers a **three-day grace period**.

During the grace period:

- the customer retains service access;
- the customer should be informed that payment requires attention;
- the customer must have a reasonable path to update payment information.

If the payment remains unresolved after the grace period, service access is suspended.

The exact payment-retry schedule and provider configuration are architecture/operations decisions.

---

## 14. Telegram fulfillment

### Confirmed target experience

At commercial launch:

1. the customer supplies/associates email and Telegram identity;
2. the customer completes trial activation;
3. entitlement is verified;
4. access to the Telegram service is normally provisioned automatically;
5. the website immediately presents the Telegram onboarding action/information;
6. the same onboarding information is also delivered by email as a fallback;
7. a manual support process exists if automation fails;
8. the customer receives seven actual days of service from successful service availability.

The precise invite-link, access-token, bot, channel or Bot API mechanism is intentionally left to the Architect.

The existing bot is an external dependency. This website project must not silently expand into a rewrite of that bot.

---

## 15. Subscription management and support

### Confirmed requirements

- No OmniArb username/password customer account is required for the MVP.
- No customer dashboard is required.
- Subscription management must be self-service under normal circumstances.
- Email support is the fallback channel.
- Email support covers:
  - billing questions;
  - refund requests;
  - onboarding failures;
  - Telegram identity-change requests;
  - other subscription/service-access issues.

### Pre-launch configuration item

A customer-support email address must be defined before commercial activation.

---

## 16. Analytics and privacy

### Confirmed requirement

Use **minimal, privacy-focused analytics** sufficient to understand basic funnel performance.

Useful product-level measurements include:

- landing-page visits;
- engagement with pricing/trial content;
- attempts to start the trial;
- successful trial activation;
- successful onboarding where legally and technically appropriate to measure.

### Constraints

- No advertising/retargeting trackers are required for the MVP.
- Analytics must not override legal/privacy obligations.
- Provider choice, consent implementation, retention, event schema and technical design belong to architecture plus privacy/legal review.

---

## 17. Legal and trust requirements

Commercial activation requires reviewed Italian-language legal/customer information appropriate to an Italy-only, B2C, 18+ subscription service.

At minimum, the final experience must address as applicable:

- identity and contact details of the seller;
- terms of service;
- privacy information;
- cookie/analytics information where required;
- pricing and recurring billing;
- seven-day trial conditions;
- automatic conversion to €50/month;
- cancellation;
- voluntary first-payment refund guarantee;
- statutory consumer rights;
- 18+ eligibility;
- Italy-only availability;
- nature and limitations of arbitrage;
- execution risks;
- service scope and exclusions;
- support route.

### Intentionally deferred

The legal seller identity is not yet defined and must not be invented.

Legal text must be reviewed before commercial activation. The product documentation specifies commercial intent, not legal advice.

---

## 18. Accessibility and responsive behavior

### Confirmed product expectations

The marketing and commercial funnel must be usable on modern mobile and desktop viewports.

At minimum:

- essential content and CTAs must remain available on mobile;
- keyboard users must be able to operate interactive controls;
- focus state must be perceivable;
- meaningful images must have appropriate alternatives;
- non-text contrast and text readability must not depend on a specific device;
- errors in commercial forms must be understandable;
- content must not require a hover-only interaction;
- the site should respect reduced-motion preferences where motion is used.

The Architect/Developer may select the applicable standards and testing approach, but the user experience must meet these requirements.

---

## 19. Security and data-minimization requirements

- Secrets for Stripe, Telegram or email services must never be exposed to client-side users.
- Only data necessary for the product relationship should be collected.
- Service access must be based on verified entitlement, not frontend state.
- Webhook/event endpoints must not trust unauthenticated client assertions of payment state.
- Telegram access artifacts must not be intentionally reusable in a way that enables unauthorized sharing.
- Customer identity and billing metadata must be handled consistently with privacy requirements.
- No betting-account credentials are required by the website.

Implementation controls are owned by the Architect.

---

## 20. Product assumptions

These are assumptions for planning and must be validated by the Architect or product owner where relevant:

1. The existing Telegram service can be adapted/exposed so multiple entitled customers can receive service without rewriting the core arbitrage algorithm.
2. The product owner can provide real anonymized Telegram bot screenshots suitable for public display.
3. The product owner can provide representative currently supported sports/markets/bookmakers if examples are shown.
4. A commercially usable support email address will be available before payment activation.
5. The €50/month business model can be supported by the final seller/tax/accounting setup.
6. The informational website may be publicly deployed before the commercial funnel is activated.

If an assumption proves false, the affected feature must return to the PM for scope review instead of silently changing the requirement.

---

## 21. Intentionally deferred product items

The following are not blockers for architecture of the MVP unless an architectural choice would make them difficult to add later:

- English localization.
- Expansion outside Italy.
- B2B/company plans.
- Multi-user/family subscriptions.
- Customer dashboard/accounts.
- Interactive arbitrage calculator.
- Newsletter/waiting-list/lead-generation funnel.
- Advertising or retargeting integrations.
- Customer testimonials.
- Historical performance statistics as marketing material.
- Guaranteed alert-frequency claims.
- Additional support channels such as Telegram support.
- Alternative subscription tiers or annual pricing.
- Native mobile applications.
- Automatic bet execution.

---

## 22. Product decision record

| Decision | Recorded product choice |
|---|---|
| #1 | Existing Telegram bot/alert algorithm is outside the web project's implementation scope; website manages information, commercial funnel and service onboarding. |
| #2 | Customer identity uses email + Telegram identity. |
| #3 | Cancellation preserves access until the end of the current entitlement period. |
| #4 | Voluntary fixed refund window: 7 days after the first €50 payment, first payment only. |
| #5 | Initial commercial availability: Italy only; future geographic expansion deferred. |
| #6 | Service is 18+ only. |
| #7 | Launch without testimonials or performance-based social proof. |
| #8 | Payment method required upfront to start the free trial. |
| #9 | Telegram onboarding information appears on the website and is also sent by email. |
| #10 | Full bilingual experience was initially selected. **SUPERSEDED by #27.** |
| #11 | One free trial per customer. |
| #12 | Brand direction: professional analytics/financial foundation with subtle sports cues. |
| #13 | Self-service subscription management with support fallback. |
| #14 | Failed recurring payments receive a 3-day grace period. |
| #15 | No OmniArb website account/dashboard for MVP. |
| #16 | No separate lead-capture funnel for MVP. |
| #17 | €50/month is the final customer-facing advertised price. |
| #18 | Approved voluntary refund ends service entitlement. |
| #19 | Product rollout is phased: informational site, then commercial capability, then full customer fulfillment readiness as a launch gate. |
| #20 | Do not accept trial/payment until customer fulfillment is ready. |
| #21 | Email is the initial customer-support channel. |
| #22 | Before commercial launch, show the offer but use a "Prossimamente" CTA; no waiting list. |
| #23 | First-payment seven-day refund guarantee is no-questions-asked. |
| #24 | Minimal privacy-focused analytics; no ad/retargeting stack required at launch. |
| #25 | Explain mathematical certainty conditionally; never promise unconditional realized profit. |
| #26 | Trial cancellation preserves access through the scheduled end of the trial and prevents first charge. |
| #27 | MVP becomes Italian-only; English is deferred. This supersedes #10. |
| #28 | Use both real anonymized bot screenshots and explanatory mockups. |
| #29 | Use a static arbitrage calculation example; interactive calculator deferred. |
| #30 | Commercial launch requires normally automated Telegram onboarding with a manual fallback. |
| #31 | Trial begins from actual service availability so the customer receives seven real days of access. |
| #32 | Telegram identity is associated before or during checkout. |
| #33 | Initial customer type is B2C/private consumers only. |
| #34 | Describe alert coverage generally and use real representative sport/market/bookmaker examples without permanent coverage promises. |
| #35 | No guaranteed minimum alert frequency. |
| #36 | One subscription = one person = one Telegram identity at a time. |
| #37 | Telegram identity changes are allowed through support. |
| #38 | Seller legal identity/details are intentionally deferred and are a commercial-launch blocker. |
| #39 | OmniArb only sends alerts; it does not place bets or hold customer bankroll. |
| #40 | Send an email reminder approximately 24–48 hours before the first paid charge. |

---

## 23. Product handoff status

The architecture baseline and ADRs are approved in `docs/architecture.md` and
`docs/decisions/`. Product requirements remain authoritative if a conflict is
found.

The current delivery state is:

- M0 product baseline: complete;
- M1 architecture baseline: complete;
- OMNI-002 informational website in `PRE_LAUNCH`: ready for development;
- OMNI-003 through OMNI-005 commercial lifecycle: product-defined and
  architecture-designed, but blocked until commercial/legal and external
  Telegram prerequisites are satisfied;
- OMNI-008 commercial launch: blocked until every M6 gate passes.

Implementation sequencing and acceptance criteria are maintained in
`docs/backlog.md`. End-to-end customer journeys are maintained in
`docs/user-flows.md`.

**Status: ARCHITECTURE ALIGNED — OMNI-002 / PRE-LAUNCH READY FOR DEVELOPMENT**

# OmniArb — Product Roadmap

**Owner:** Project Manager / Product Owner  
**Status:** Approved initial roadmap  
**Scope:** Italian MVP, Italy-only B2C launch

---

## 1. Roadmap principles

1. The Git repository is the persistent source of truth.
2. Product requirements are defined before implementation.
3. The existing arbitrage algorithm and Telegram bot are external to the web project's core scope.
4. The informational site may launch before the commercial funnel.
5. OmniArb must not accept a trial or payment until actual customer fulfillment is ready.
6. Commercial activation also requires seller/legal readiness.
7. Architecture must be established before production implementation.
8. Every development task must be independently testable.
9. QA determines whether acceptance criteria are satisfied.
10. Production deployment and merge approval follow the repository's human-approval rules.

---

## 2. Milestones

### M0 — Product baseline

**Goal:** Persist the product decisions and prepare an architecture-ready backlog.

**Includes:**
- `docs/product-requirements.md`
- `docs/roadmap.md`
- feature specifications under `specs/features/`

**Exit criteria:**
- confirmed requirements are distinguished from assumptions and deferred items;
- commercial policies are documented;
- Telegram/bot scope boundary is explicit;
- feature dependencies are recorded.

**Status:** Ready to commit.

---

### M1 — Architecture baseline

**Goal:** Convert approved product requirements into a technical design without redefining them.

**Architect must address at minimum:**
- frontend/application architecture;
- hosting/deployment model;
- Stripe subscription/trial lifecycle;
- entitlement state model;
- Telegram identity association;
- automated onboarding plus manual fallback;
- reliable seven-actual-day trial start;
- cancellation/refund/failed-payment state transitions;
- self-service subscription management;
- transactional email;
- analytics/privacy integration boundaries;
- security controls and secret handling;
- persistence/data-minimization needs;
- failure recovery and idempotency;
- test strategy;
- commercial-launch feature flags/gating.

**Exit criteria:**
- architectural decisions are persisted in the repository;
- external Telegram-service prerequisites are explicit;
- no unresolved product decision is silently converted into a technical assumption.

**Dependency:** M0.

---

### M2 — Informational showcase MVP

**Goal:** Publish the Italian marketing/education experience without accepting subscriptions.

**Commercial state:** `PRE_LAUNCH`

**Required behavior:**
- full educational landing page;
- static arbitrage example;
- real anonymized screenshot slots and explanatory mockups;
- €50/month and seven-day trial offer may be explained;
- CTA shows **"Prossimamente"**;
- no trial activation;
- no payment collection;
- no waiting list;
- legal/risk information appropriate for a non-commercial informational launch;
- minimal analytics where legally ready.

**Exit criteria:**
- responsive and accessible landing experience passes QA;
- no live subscription path is reachable;
- claims comply with the approved product wording rules.

**Dependencies:** M1.

---

### M3 — Commercial-readiness prerequisites

**Goal:** Remove non-code and external-service blockers before accepting customers.

**Required prerequisites:**
- legal seller identity defined;
- support email defined;
- Italian legal/consumer/privacy documentation reviewed;
- Italy-only commercial eligibility rule defined;
- age/compliance requirements finalized;
- existing Telegram service ready for multiple customers;
- representative public screenshots/content approved;
- commercial email copy approved;
- operational manual-onboarding fallback documented.

**Exit criteria:**
- PM confirms all product/legal prerequisites are satisfied;
- Architect confirms Telegram fulfillment dependency is technically ready;
- QA has testable environments/data for billing and onboarding.

**Dependencies:** M1. Can progress in parallel with M2.

---

### M4 — Subscription, billing and entitlement

**Goal:** Implement the €50/month subscription and seven-day full-access trial without yet declaring commercial launch complete.

**Required behavior:**
- payment method captured at trial activation;
- first charge only after seven actual days of available service;
- one free trial per customer;
- cancellation lifecycle;
- first-payment seven-day no-questions-asked refund policy;
- refund terminates entitlement;
- three-day failed-payment grace period;
- self-service subscription management;
- 24–48 hour first-charge reminder;
- authoritative server-side entitlement state.

**Exit criteria:**
- all billing acceptance criteria pass in test mode;
- unauthorized users cannot create entitlement through frontend manipulation;
- lifecycle edge cases are verified by QA.

**Dependencies:** M1 and relevant items from M3.

---

### M5 — Telegram customer fulfillment

**Goal:** Complete the end-to-end commercial journey.

**Required behavior:**
- email + one Telegram identity associated before/during checkout;
- entitled customer normally receives automated Telegram onboarding;
- onboarding information shown immediately on the website;
- onboarding information also sent by email;
- manual fallback exists;
- customer receives seven actual days of service;
- cancellation/refund/payment-failure changes ultimately affect access according to product rules;
- one active Telegram identity per subscription;
- support-assisted identity change.

**Exit criteria:**
- end-to-end trial activation reaches working Telegram service;
- failure paths do not create false entitlement;
- manual fallback is tested;
- access lifecycle aligns with billing lifecycle.

**Dependencies:** M3 and M4.

---

### M6 — Commercial launch

**Goal:** Enable trial and paid subscriptions for eligible Italian B2C customers.

**Launch gate — ALL required:**
- M2 complete;
- M3 complete;
- M4 complete;
- M5 complete;
- legal seller information live;
- approved legal/privacy/customer content live;
- support email operational;
- production payment configuration approved;
- production Telegram fulfillment approved;
- analytics/privacy setup approved;
- security review complete;
- QA passes;
- human approval for production deployment/merge obtained.

**Commercial state change:**
- Replace `Prossimamente` CTA with active trial CTA only after the launch gate is satisfied.

---

### M7 — Post-launch validation

**Goal:** Measure funnel health and correct high-impact defects without expanding scope prematurely.

**Observe:**
- landing-page engagement;
- pricing/trial interaction;
- trial-start success;
- onboarding success/failure;
- subscription activation;
- cancellation;
- payment failures;
- refund requests;
- support volume.

**Possible future decisions, not pre-approved features:**
- English localization;
- expansion beyond Italy;
- additional pricing tiers;
- annual plan;
- interactive calculator;
- customer testimonials;
- verified performance/statistics presentation;
- B2B plans;
- multi-user plans;
- customer dashboard;
- additional support channels;
- marketing/retargeting integrations.

---

## 3. Initial feature backlog

| ID | Title | Priority | Milestone | Dependencies | Status |
|---|---|---:|---|---|---|
| OMNI-001 | Persist product baseline documentation | P0 | M0 | None | READY |
| OMNI-002 | Italian conversion-focused showcase landing page | P0 | M2 | OMNI-001, architecture baseline | READY FOR ARCHITECTURE |
| OMNI-003 | Subscription and trial lifecycle | P0 | M4 | OMNI-001, architecture baseline, commercial prerequisites | READY FOR ARCHITECTURE |
| OMNI-004 | Stripe checkout and subscription management | P0 | M4 | OMNI-003 | READY FOR ARCHITECTURE |
| OMNI-005 | Telegram identity and customer onboarding | P0 | M5 | OMNI-003, OMNI-004, external Telegram readiness | READY FOR ARCHITECTURE |
| OMNI-006 | Legal, trust, eligibility and risk presentation | P0 | M2/M3/M6 | OMNI-001, legal review for commercial activation | READY FOR ARCHITECTURE |
| OMNI-007 | Minimal conversion analytics | P1 | M2/M6 | architecture baseline, privacy review | READY FOR ARCHITECTURE |
| OMNI-008 | Commercial launch gate | P0 | M6 | OMNI-002 through OMNI-007 as applicable | BLOCKED until prerequisites pass |

---

## 4. Feature sequencing

```text
OMNI-001 Product baseline
        |
        v
Architecture baseline
        |
        +--------------------+
        |                    |
        v                    v
OMNI-002 Landing         OMNI-006 Legal/trust
        |                    |
        +----------+---------+
                   |
       M2 Informational launch
                   |
                   +-----------------------------+
                                                 |
Commercial prerequisites -----------------------+
                                                 |
OMNI-003 Subscription/trial
        |
        v
OMNI-004 Stripe + management
        |
        v
OMNI-005 Telegram onboarding
        |
        +--------> OMNI-007 Analytics/privacy
                         |
                         v
                   OMNI-008 Launch gate
                         |
                         v
                   Commercial launch
```

---

## 5. Explicit launch blockers

The following are **not optional backlog polish**; they block commercial activation:

- seller legal identity remains undefined;
- legal/privacy/customer terms have not been reviewed;
- Italy-only eligibility rule is not finalized;
- Telegram customer fulfillment is not ready;
- trial cannot reliably deliver seven actual days of service;
- payment entitlement cannot be authoritatively verified server-side;
- cancellation/refund/failed-payment behavior is not implemented and tested;
- support email is not operational;
- QA has not passed end-to-end commercial flows;
- human approval has not been obtained.

---

## 6. Intentionally deferred roadmap items

No task should be created automatically for the following without a new PM decision:

- English language.
- International expansion.
- B2B subscriptions.
- Annual/multi-tier pricing.
- Customer dashboard.
- Interactive calculator.
- Waiting list/newsletter.
- Testimonials.
- Historical performance marketing.
- Multi-user plans.
- Telegram support channel.
- Automatic betting/execution.

---

## 7. Architect handoff

The next owner is the **Software Architect**.

The Architect should produce a technical design that satisfies OMNI-002 through OMNI-007 and clearly identifies any external change required in the existing Telegram service.

The Architect must not:
- redesign the product into a web dashboard;
- reimplement the arbitrage algorithm;
- enable payments before the launch gates;
- replace product rules with easier technical alternatives without PM approval.

**READY FOR ARCHITECTURE**

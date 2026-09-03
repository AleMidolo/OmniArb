# OmniArb — Product Roadmap

**Owner:** Project Manager / Product Owner  
**Status:** Active — M0/M1 complete; M2 implementation accepted and awaiting public release setup  
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
10. Informational deployment does not imply commercial activation.

---

## 2. Milestones

### M0 — Product baseline

**Status:** COMPLETE — merged into `main`.

Product requirements, roadmap, backlog, user flows and feature specifications are persisted and distinguish confirmed requirements from assumptions/deferred decisions.

---

### M1 — Architecture baseline

**Status:** COMPLETE — architecture baseline and ADRs merged via PR #1 and refined by PR #8.

The approved architecture defines the modular-monolith boundary, Stripe lifecycle, entitlement model, Telegram integration boundary, security controls, persistence, failure recovery, testing strategy and commercial gating.

---

### M2 — Informational showcase MVP

**Goal:** Publish the Italian marketing/education experience without accepting subscriptions.

**Commercial state:** `PRE_LAUNCH`

**Implementation status:** COMPLETE AND QA ACCEPTED.

PR #9 implemented the Italian landing experience, static arbitrage example, explanatory Telegram mockups/placeholders, pricing/trial/risk content, server-side fail-closed commercial gate, disabled analytics adapter, responsive/accessibility hardening and persistent CI/browser validation.

Independent QA passed on head `f2d1eadd460c2497715bfff5b38e627a1768130c`; architecture review also passed. PR #9 merged to `main` as `626971d909f25f9812f90f6ab2dc3d875e3bece4`.

**Release status:** BLOCKED ONLY ON PUBLICATION INFRASTRUCTURE — issue #11 tracks Vercel project/account initialization and publication of the merged informational build.

**M2 exit criteria after release:**
- the merged `PRE_LAUNCH` site is publicly reachable;
- CTA remains `Prossimamente`;
- no live subscription/payment/Telegram commercial path is reachable;
- release verification confirms the fail-closed checkout route and healthy runtime/build logs.

The M2 implementation itself must not be reopened unless release verification finds a defect.

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

**Status:** BLOCKED — product-owner, legal and external-service inputs remain open.

---

### M4 — Subscription, billing and entitlement

**Goal:** Implement the €50/month subscription and seven-day full-access trial.

**Status:** BLOCKED — M3 prerequisites, PRE-003 and commercial test readiness required.

Required behavior remains: payment method at trial activation, seven actual service days before first charge, one trial per customer, cancellation/refund lifecycle, three-day failed-payment grace period, self-service management, first-charge reminder and authoritative server-side entitlement.

---

### M5 — Telegram customer fulfillment

**Goal:** Complete the end-to-end commercial journey.

**Status:** BLOCKED — external Telegram provisioning contract is not yet verified.

Commercial launch requires verified identity linking, automated provisioning/revocation, onboarding confirmation, email fallback, manual fallback, lifecycle alignment and one active Telegram identity per subscription.

---

### M6 — Commercial launch

**Goal:** Enable trial and paid subscriptions for eligible Italian B2C customers.

**Launch gate — ALL required:**
- M2 publicly released in `PRE_LAUNCH`;
- M3 complete;
- M4 complete;
- M5 complete;
- legal seller information and reviewed legal/privacy/customer content live;
- support email operational;
- production payment and Telegram fulfillment configuration approved;
- analytics/privacy setup approved;
- security review complete;
- end-to-end commercial QA passes;
- explicit human approval for commercial activation.

**Status:** BLOCKED.

The `Prossimamente` CTA must not be replaced with an active trial action before this gate is satisfied.

---

### M7 — Post-launch validation

**Status:** NOT STARTED.

After commercial launch, observe landing engagement, trial starts, onboarding success/failure, subscription activation, cancellation, payment failures, refund requests and support volume before expanding scope.

---

## 3. Feature backlog summary

| ID | Title | Priority | Milestone | Status |
|---|---|---:|---|---|
| OMNI-001 | Persist product baseline documentation | P0 | M0 | COMPLETE |
| OMNI-002 | Italian conversion-focused showcase landing page | P0 | M2 | COMPLETE / QA ACCEPTED |
| OMNI-003 | Subscription and trial lifecycle | P0 | M4 | BLOCKED — M3 and Telegram contract |
| OMNI-004 | Stripe checkout and subscription management | P0 | M4 | BLOCKED — OMNI-003 and seller/Stripe readiness |
| OMNI-005 | Telegram identity and customer onboarding | P0 | M5 | BLOCKED — external Telegram readiness |
| OMNI-006 | Legal, trust, eligibility and risk presentation | P0 | M2/M3/M6 | PRE-LAUNCH IMPLEMENTED; COMMERCIAL BLOCKED |
| OMNI-007 | Minimal conversion analytics | P1 | M2/M6 | ADAPTER COMPLETE/DISABLED; ENABLEMENT BLOCKED |
| OMNI-008 | Commercial launch gate | P0 | M6 | BLOCKED until all prerequisites pass |
| REL-001 / #11 | Publish M2 informational site on Vercel | P0 | M2 | BLOCKED — Vercel project/account initialization |

---

## 4. Current sequencing

```text
M0 Product baseline ........ COMPLETE
        |
M1 Architecture ............ COMPLETE
        |
M2 implementation .......... COMPLETE + QA/architecture PASS
        |
M2 public PRE_LAUNCH release ----> issue #11 / Release-DevOps
        |
        +------------------------------+
                                       |
M3 commercial prerequisites ----------+
        |
M4 subscription/billing
        |
M5 Telegram fulfillment
        |
M6 commercial launch gate
        |
M7 post-launch validation
```

---

## 5. Explicit commercial blockers

The following remain mandatory before commercial activation:

- seller legal identity remains undefined;
- legal/privacy/customer terms have not been reviewed;
- Italy-only eligibility rule is not finalized;
- age/compliance method is not finalized;
- Telegram customer fulfillment contract is not verified;
- trial cannot yet be proven to deliver seven actual days of service end-to-end;
- payment entitlement lifecycle is not implemented/tested;
- support email is not operational;
- commercial analytics/privacy rules are not approved;
- QA has not passed end-to-end commercial flows;
- explicit commercial activation approval has not been obtained.

---

## 6. Intentionally deferred roadmap items

No task should be created automatically for English localization, international expansion, B2B subscriptions, annual/multi-tier pricing, customer dashboards, interactive calculators, waiting lists/newsletters, testimonials, historical-performance marketing, multi-user plans, Telegram support channels or automatic betting/execution.

---

## 7. Current handoff

No further M2 application implementation is currently required. The highest-priority workflow item is issue #11: initialize/link the Vercel project and publish the already-merged informational site in `PRE_LAUNCH`, without configuring commercial credentials or enabling commerce.

**NEXT DELIVERY OWNER: RELEASE / DEVOPS — ISSUE #11.**

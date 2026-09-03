# OmniArb — Prioritized Product Backlog

**Owner:** Project Manager / Product Owner  
**Status:** Active  
**Last triage:** 2026-09-03  
**Current milestone:** M2 — Informational showcase MVP  
**Deployment mode:** `PRE_LAUNCH`

---

## 1. Status definitions

| Status | Meaning |
|---|---|
| READY FOR DEVELOPMENT | Product acceptance criteria and architecture are sufficient to implement now |
| READY AFTER DEPENDENCY | Work is defined but must wait for the named prerequisite |
| BLOCKED | A product, legal, external-service, release or QA prerequisite is unresolved |
| COMPLETE | Accepted repository artifact or completed work package |
| DEFERRED | Outside the approved MVP unless the PM explicitly reopens it |

---

## 2. Delivery order

### M2 informational release

The M2 implementation was completed in PR #9, independently QA accepted, architecture reviewed, and merged to `main` as `626971d909f25f9812f90f6ab2dc3d875e3bece4`.

| Order | ID | Work package | Priority | Owner | Status | Evidence |
|---:|---|---|---:|---|---|---|
| 1 | OMNI-002A | Application shell and server-side `PRE_LAUNCH` gate | P0 | Developer | COMPLETE | PR #9 / QA PASS |
| 2 | OMNI-002B | Italian landing-page structure and conversion copy | P0 | Developer | COMPLETE | PR #9 / QA PASS |
| 3 | OMNI-002C | Static illustrative surebet example | P0 | Developer | COMPLETE | PR #9 / QA PASS |
| 4 | OMNI-002D | Telegram alert explanation, mockups and screenshot slots | P0 | Developer | COMPLETE | PR #9 / QA PASS; genuine assets remain PRE-001 input |
| 5 | OMNI-002E | Pricing, trial, FAQ, eligibility and risk sections | P0 | Developer | COMPLETE | PR #9 / issue #10 verified fixed |
| 6 | OMNI-002F | Responsive, accessibility and SEO hardening | P0 | Developer | COMPLETE | QA desktop/mobile browser PASS |
| 7 | OMNI-002G | M2 automated checks and QA handoff | P0 | Developer / QA | COMPLETE | CI + Playwright PASS |
| 8 | OMNI-007A | Privacy-safe analytics adapter, disabled by default | P1 | Developer | COMPLETE | PR #9 architecture review; remains disabled |

### M2 release/publication

| ID | Work package | Priority | Owner | Status | Blocks |
|---|---|---:|---|---|---|
| REL-001 / issue #11 | Initialize/link Vercel project and publish merged informational build | P0 | Release / DevOps | BLOCKED — VERCEL PROJECT/ACCOUNT INITIALIZATION REQUIRED | Public M2 publication |

The release task is limited to the non-commercial `PRE_LAUNCH` site. It must not enable Stripe billing, trial activation, Telegram commercial provisioning or analytics collection.

### Parallel product-owner/external inputs

| ID | Work package | Priority | Owner | Status | Blocks |
|---|---|---:|---|---|---|
| PRE-001 | Supply approved anonymized bot screenshots and representative alert/coverage examples | P0 | Product Owner | BLOCKED — INPUT REQUIRED | Final real-evidence content freeze; honest mockups already accepted for M2 |
| PRE-002 | Define seller identity, support email, Italy-only rule and age/compliance requirements; obtain reviewed Italian legal/privacy/customer copy | P0 | Product Owner / Legal | BLOCKED — DECISION/REVIEW REQUIRED | Commercial launch |
| PRE-003 | Verify the existing Telegram service can link, provision and revoke access idempotently by numeric Telegram ID; document authenticated integration and manual fallback | P0 | Architect / External service owner | BLOCKED — CAPABILITY VERIFICATION REQUIRED | OMNI-003–005 |
| PRE-004 | Select/configure transactional email and privacy-approved analytics/consent rules | P1 | Product Owner / Architect / Privacy review | BLOCKED — DECISION/REVIEW REQUIRED | Commercial communications and enabled analytics |

### Later — commercial implementation

| ID | Epic | Priority | Status | Release condition |
|---|---|---:|---|---|
| OMNI-003 | Subscription and seven-actual-day trial lifecycle | P0 | BLOCKED | PRE-002 and PRE-003 complete; commercial test environment ready |
| OMNI-004 | Stripe setup, billing and self-service management | P0 | BLOCKED | OMNI-003 unblocked; seller/Stripe configuration approved |
| OMNI-005 | Telegram identity linking and customer onboarding | P0 | BLOCKED | PRE-003 complete; OMNI-003/004 integration ready |
| OMNI-006C | Final commercial legal/trust/eligibility content | P0 | BLOCKED | PRE-002 complete |
| OMNI-007C | Enable consented funnel analytics | P1 | BLOCKED | PRE-004 and privacy review complete |
| OMNI-008 | Commercial launch gate | P0 | BLOCKED | M2–M5 complete, security/QA pass, explicit commercial approval |

---

## 3. M2 acceptance record

Independent QA verified the merged implementation against the approved M2 acceptance criteria, including:

- Italian-only visible content and correct service boundaries;
- the illustrative surebet calculation and execution-risk disclosure;
- pricing/trial, trial-cancellation, paid-cancellation and first-payment-refund wording;
- 18+ / Italy-only pre-commercial presentation;
- `Prossimamente` CTA and absence of customer-data/payment capture;
- server-side fail-closed `PRE_LAUNCH` checkout behavior and crafted-request bypass attempts;
- desktop and Pixel 7 mobile Playwright coverage;
- keyboard operation, focus/skip-link behavior, reduced-motion handling, horizontal-overflow checks, console/runtime-error checks and image alternatives.

Issue #10 was verified fixed. The architecture gate also passed. These results authorize the informational M2 implementation to proceed through release in `PRE_LAUNCH`; they do not authorize commercial activation.

---

## 4. Product decisions still required

No developer should invent these outcomes:

| Decision | Why it matters | PM direction |
|---|---|---|
| Exact Italy-only eligibility rule | Determines who may subscribe and what evidence is needed | Use the least intrusive rule legal review confirms is sufficient |
| Age assurance method | Controls the approved 18+ restriction | Use the least intrusive legally sufficient method |
| Seller identity and support address | Required for commercial disclosures and operations | Supply verified real details before commercial activation |
| Analytics consent/retention | Determines whether events can be enabled | Keep adapter disabled until approved privacy decision |
| Telegram capability readiness | Determines whether automated fulfillment is achievable | Verify adapter contract first; do not move the arbitrage engine into this project |

---

## 5. Current workflow handoff

The implementation backlog for M2 is complete. The highest-priority unblocked workflow is release/publication of the already-merged informational site, tracked in issue #11.

Commercial implementation remains blocked by PRE-002 and PRE-003 at minimum. The Developer must not begin OMNI-003 through OMNI-005 merely because M2 implementation is complete.

**CURRENT HANDOFF: RELEASE / DEVOPS — ISSUE #11, PRE_LAUNCH PUBLICATION ONLY.**

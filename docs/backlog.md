# OmniArb — Prioritized Product Backlog

**Owner:** Project Manager / Product Owner  
**Status:** Active  
**Last triage:** 2026-09-05  
**Current milestone:** M3 — Commercial-readiness prerequisites  
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

### Completed — M2 informational application and Cloudflare release

The M2 product/application implementation was completed in PR #9, independently QA accepted, architecture reviewed, and merged to `main` as `626971d909f25f9812f90f6ab2dc3d875e3bece4`.

The Cloudflare Workers migration completed in DEP-001 / PR #15 after hosted QA and architecture PASS, and REL-001 / PR #18 added an exact-main post-deploy smoke gate. Release issue #11 then verified and closed the public `PRE_LAUNCH` publication on exact `main` SHA `659381a19068db5ba9da1528e42c080b53467155`.

Stable informational URL:

`https://omniarb-prelaunch.alemidolo.workers.dev`

| ID | Work package | Priority | Owner | Status | Evidence |
|---|---|---:|---|---|---|
| OMNI-002A | Application shell and server-side `PRE_LAUNCH` gate | P0 | Developer | COMPLETE | PR #9 / QA PASS |
| OMNI-002B | Italian landing-page structure and conversion copy | P0 | Developer | COMPLETE | PR #9 / QA PASS |
| OMNI-002C | Static illustrative surebet example | P0 | Developer | COMPLETE | PR #9 / QA PASS |
| OMNI-002D | Telegram alert explanation, mockups and screenshot slots | P0 | Developer | COMPLETE | PR #9 / QA PASS; genuine assets remain PRE-001 input |
| OMNI-002E | Pricing, trial, FAQ, eligibility and risk sections | P0 | Developer | COMPLETE | PR #9 / issue #10 verified fixed |
| OMNI-002F | Responsive, accessibility and SEO hardening | P0 | Developer | COMPLETE | QA desktop/mobile browser PASS |
| OMNI-002G | M2 automated checks and QA handoff | P0 | Developer / QA | COMPLETE | CI + Playwright PASS |
| OMNI-007A | Privacy-safe analytics adapter, disabled by default | P1 | Developer | COMPLETE | Architecture review; remains disabled |
| DEP-001 / #13 | Cloudflare Workers/vinext migration, PR previews and stable main deploy | P0 | Developer | COMPLETE | PR #15; hosted QA + architecture PASS |
| DEP-001-QA | Real Cloudflare Worker preview verification | P0 | QA | COMPLETE | Hosted 10/10 Playwright + smoke PASS |
| REL-001 / #11/#18 | Bootstrap Cloudflare, publish stable main and verify exact-main release | P0 | Release / DevOps | COMPLETE | Issue #11 closed; PR #18 QA PASS; exact-main smoke PASS |

The informational release remains strictly non-commercial. `OMNIARB_MODE=PRE_LAUNCH`, `Prossimamente`, fail-closed checkout and disabled commercial integrations remain mandatory until M6.

### Current unblocked engineering work

| ID | Work package | Priority | Owner | Status | Blocks |
|---|---|---:|---|---|---|
| SEC-001 / issue #17 | Harden Cloudflare CI/deployment supply chain: audit ephemeral vinext toolchain, address/accept findings, pin GitHub Actions immutably where practical, confirm scanning and least privilege | P1 now / P0 before M6 | Developer / Release-DevOps; Architect review | READY FOR DEVELOPMENT | Commercial security acceptance gate |

SEC-001 is the highest-priority currently unblocked autonomous engineering work. It must preserve the validated deployment DAG and `PRE_LAUNCH` safety boundary.

### Parallel product-owner/external inputs — M3 blockers

| ID | Work package | Priority | Owner | Status | Blocks |
|---|---|---:|---|---|---|
| PRE-001 / #4 | Supply approved anonymized bot screenshots and representative alert/coverage examples | P0 content input | Product Owner | BLOCKED — INPUT REQUIRED | Final real-evidence content freeze; honest mockups already accepted for M2 |
| PRE-002 / #6 | Define seller identity, support email, Italy-only rule and age/compliance requirements; obtain reviewed Italian legal/privacy/customer copy | P0 | Product Owner / Legal | BLOCKED — DECISION/REVIEW REQUIRED | OMNI-003, OMNI-004, OMNI-006C, OMNI-008 |
| PRE-003 / #7 | Verify existing Telegram linking/provisioning/revocation contract, availability signal, retries and manual fallback | P0 | Architect / External service owner | BLOCKED — CAPABILITY VERIFICATION REQUIRED | OMNI-003 through OMNI-005 and commercial launch |
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

## 3. M2 acceptance and release record

Independent QA verified the application against the approved M2 acceptance criteria, including:

- Italian-only visible content and correct service boundaries;
- the illustrative surebet calculation and execution-risk disclosure;
- pricing/trial, trial-cancellation, paid-cancellation and first-payment-refund wording;
- 18+ / Italy-only pre-commercial presentation;
- `Prossimamente` CTA and absence of customer-data/payment capture;
- server-side fail-closed `PRE_LAUNCH` checkout behavior and crafted-request bypass attempts;
- desktop and Pixel 7 mobile Playwright coverage;
- keyboard operation, focus/skip-link behavior, reduced-motion handling, horizontal-overflow checks, console/runtime-error checks and image alternatives.

The Cloudflare migration then independently verified the same behavior on a real hosted Worker preview. Final release verification on the stable Worker confirmed:

- homepage reachable at `https://omniarb-prelaunch.alemidolo.workers.dev`;
- expected security headers and no `X-Powered-By`;
- correct unknown-route behavior;
- `POST /api/checkout/setup` remains `503 COMMERCIAL_DISABLED` with `Cache-Control: no-store`;
- exact-main Cloudflare deploy completed successfully before post-deploy smoke ran.

Issue #10 and deployment defect #16 are closed. Issues #13 and #11 are closed as completed. M2 is complete.

---

## 4. SEC-001 acceptance direction

Issue #17 is ready under the existing architecture/security contracts and must satisfy its repository acceptance criteria without weakening release behavior.

At minimum:

- persist a detailed audit of the exact ephemeral vinext/Cloudflare toolchain findings;
- upgrade/pin compatible fixed versions where available, or record an explicit time-bounded risk acceptance for remaining findings;
- ensure no unaccepted high/critical deployment or application dependency finding remains before M6;
- replace mutable GitHub Action major tags with immutable full commit SHAs where practical, with readable version comments;
- add or confirm dependency and secret scanning appropriate to the repository;
- preserve least-privilege Cloudflare token scope and fork/untrusted-PR secret isolation;
- preserve CI → browser validation → Worker validation → deployment ordering;
- re-run normal CI, Cloudflare validation, hosted preview QA and stable smoke as appropriate after hardening;
- keep `OMNIARB_MODE=PRE_LAUNCH` and all commercial integrations disabled.

Architecture review is required before accepting changes that alter the deployment/security contract.

---

## 5. Product decisions still required

No developer should invent these outcomes:

| Decision | Why it matters | PM direction |
|---|---|---|
| Exact Italy-only eligibility rule | Determines who may subscribe and what evidence is needed | Use the least intrusive rule legal review confirms is sufficient |
| Age assurance method | Controls the approved 18+ restriction | Use the least intrusive legally sufficient method |
| Seller identity and support address | Required for commercial disclosures and operations | Supply verified real details before commercial activation |
| Analytics consent/retention | Determines whether events can be enabled | Keep adapter disabled until approved privacy decision |
| Telegram capability readiness | Determines whether automated fulfillment is achievable | Verify adapter contract first; do not move the arbitrage engine into this project |

---

## 6. Current workflow handoff

M2 is publicly released and complete. No further informational deployment work is pending.

PRE-002 and PRE-003 are higher-severity commercial blockers but are not currently autonomously implementable because they depend on legal/product-owner and external Telegram-service inputs. The highest-priority **unblocked** engineering task is SEC-001 / issue #17.

Commercial implementation OMNI-003 through OMNI-005 must remain blocked until the stated M3 prerequisites are actually satisfied.

**CURRENT HANDOFF: DEVELOPER — ISSUE #17 / SEC-001.**

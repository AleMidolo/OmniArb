# OmniArb — Prioritized Product Backlog

**Owner:** Project Manager / Product Owner  
**Status:** Active  
**Last triage:** 2026-09-02  
**Current milestone:** M2 — Informational showcase MVP  
**Deployment mode:** `PRE_LAUNCH`

---

## 1. Status definitions

| Status | Meaning |
|---|---|
| READY FOR DEVELOPMENT | Product acceptance criteria and architecture are sufficient to implement now |
| READY AFTER DEPENDENCY | Work is defined but must wait for the named prerequisite |
| BLOCKED | A product, legal, external-service or QA prerequisite is unresolved |
| COMPLETE | Accepted repository artifact or completed milestone |
| DEFERRED | Outside the approved MVP unless the PM explicitly reopens it |

---

## 2. Delivery order

### Now — M2 informational release

These work packages are the next implementation set. They do not enable checkout, payment collection or Telegram commercial provisioning.

| Order | ID | Work package | Priority | Owner | Status | Depends on |
|---:|---|---|---:|---|---|---|
| 1 | OMNI-002A | Application shell and server-side `PRE_LAUNCH` gate | P0 | Developer | READY FOR DEVELOPMENT | Architecture baseline |
| 2 | OMNI-002B | Italian landing-page structure and conversion copy | P0 | Developer | READY FOR DEVELOPMENT | OMNI-002A |
| 3 | OMNI-002C | Static illustrative surebet example | P0 | Developer | READY FOR DEVELOPMENT | OMNI-002B |
| 4 | OMNI-002D | Telegram alert explanation, mockups and screenshot slots | P0 | Developer | READY FOR DEVELOPMENT | OMNI-002B |
| 5 | OMNI-002E | Pricing, trial, FAQ, eligibility and risk sections | P0 | Developer | READY FOR DEVELOPMENT | OMNI-002B |
| 6 | OMNI-002F | Responsive, accessibility and SEO hardening | P0 | Developer | READY AFTER DEPENDENCY | OMNI-002B–E |
| 7 | OMNI-002G | M2 automated checks and QA handoff | P0 | Developer / QA | READY AFTER DEPENDENCY | OMNI-002A–F |
| 8 | OMNI-007A | Privacy-safe analytics adapter, disabled by default | P1 | Developer | READY FOR DEVELOPMENT | OMNI-002A |

### Parallel product-owner/external inputs

| ID | Work package | Priority | Owner | Status | Blocks |
|---|---|---:|---|---|---|
| PRE-001 | Supply approved anonymized bot screenshots and representative alert/coverage examples | P0 | Product Owner | BLOCKED — INPUT REQUIRED | Final OMNI-002D content freeze |
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
| OMNI-008 | Commercial launch gate | P0 | BLOCKED | M2–M5 complete, security/QA pass, human approval |

---

## 3. Acceptance criteria for the current implementation set

### OMNI-002A — Application shell and pre-launch gate

- Uses the approved architecture baseline.
- `PRE_LAUNCH` is the safe default.
- Pricing/trial information may render, but checkout, payment-method collection, subscription management and Telegram commercial provisioning are rejected server-side.
- Primary CTA reads **“Prossimamente”**.
- An automated test proves a crafted request cannot reach a commercial operation.
- No password account, customer dashboard, waiting list or arbitrage engine is introduced.

### OMNI-002B — Italian landing-page structure and copy

- Visible MVP content is Italian.
- Page clearly explains what surebetting is, what OmniArb does, and what customers do themselves.
- Information hierarchy covers hero/value proposition, education, how alerts work, example, risks, offer, FAQ and footer/legal links/placeholders.
- Copy never presents OmniArb as a bookmaker, betting executor or bankroll custodian.
- No testimonials, invented customer counts, historical-profit claims or minimum-alert promise appear.
- Visual direction remains professional/data-driven with subtle sports cues, not casino/bookmaker styling.

### OMNI-002C — Static illustrative surebet example

Use an illustrative two-outcome example that is mathematically self-consistent, such as:

- total stake: €100;
- decimal odds: 2.10 and 2.10;
- allocation: €50 on each outcome;
- gross return: €105 under either represented outcome;
- theoretical gross profit: €5 (5% of total stake).

Acceptance rules:

- example is explicitly labeled illustrative, not an expected return;
- it states that all wagers must be accepted at quoted odds and remain valid;
- nearby risk wording covers odds movement, rejected/limited stakes, voided markets, bookmaker rules and user execution error;
- no interactive calculator is added.

### OMNI-002D — Telegram explanation and visuals

- Explains the fields and action expected from a customer receiving an alert.
- Supports explanatory mockups without presenting them as real performance evidence.
- Provides clearly marked slots for genuine anonymized screenshots from PRE-001.
- No fabricated screenshot, bookmaker coverage or alert-frequency promise is used.
- Missing real assets do not block an honest pre-launch placeholder/mockup implementation.

### OMNI-002E — Pricing, FAQ, eligibility and risk

- Consistently displays: seven full-access days, payment method required at activation, €0 charged at activation, then €50/month unless cancelled.
- Explains trial cancellation, paid cancellation and the voluntary first-payment seven-day refund at product level.
- States 18+ and Italy-only without inventing the deferred legal eligibility test.
- Separates mathematical arbitrage conditions from practical execution risk.
- Commercial legal/seller fields remain truthful placeholders until PRE-002; no fabricated legal identity appears.
- CTA remains “Prossimamente”.

### OMNI-002F — Responsive, accessibility and SEO

- Essential content and CTA remain usable on modern mobile and desktop viewports.
- Interactive controls are keyboard operable with visible focus and no hover-only dependency.
- Meaningful images have appropriate text alternatives.
- Motion respects reduced-motion preferences.
- Public pages have semantic headings, useful Italian titles/descriptions and indexable rendered content.
- Layout does not obscure pricing, conditions or risk disclosures.

### OMNI-002G — M2 validation and QA handoff

- Formatting, linting, type checks and relevant automated tests pass.
- Automated pre-launch-gate test passes.
- QA verifies Italian-only visible content, mobile/desktop behavior, keyboard/focus behavior, meaningful image alternatives and claims compliance.
- QA confirms no live subscription, payment collection, Telegram provisioning or waiting-list path is reachable.
- Open defects are recorded and prioritized; M2 is not marked complete until P0 acceptance failures are resolved.

### OMNI-007A — Analytics adapter

- Implementation is provider-neutral and disabled by default.
- No advertising/retargeting tracker is introduced.
- No email, Telegram ID, Stripe ID or other direct identifier is included in events.
- Enabling collection remains blocked until the consent/privacy decision is approved.
- Absence of analytics configuration does not prevent the informational site from operating.

---

## 4. Product decisions still required

No developer should invent these outcomes:

| Decision | Why it matters | Reasonable options | PM recommendation |
|---|---|---|---|
| Exact Italy-only eligibility rule | Determines who may subscribe and what evidence is needed | Residence; billing address; physical location; legally reviewed combination | Use the least intrusive rule legal review confirms is sufficient |
| Age assurance method | Controls the approved 18+ restriction | Self-declaration; stronger verification; provider-supported check | Start with the least intrusive legally sufficient method |
| Seller identity and support address | Required for commercial disclosures and operations | Depends on actual business setup | Supply verified real details before commercial activation |
| Analytics consent/retention | Determines whether events can be enabled | No analytics; cookieless/minimized; consent-gated analytics | Prefer minimized analytics and disable until approved |
| Telegram capability readiness | Determines whether the promised automated fulfillment is achievable | Existing bot adapter; separately scoped bot enhancement; keep commerce blocked | Verify adapter contract first; do not move the arbitrage engine into this project |

The recommendation column is not an approval. Final decisions must be recorded in product documentation after the responsible review.

---

## 5. Definition of ready for Developer

A work package is ready only when:

- its acceptance criteria are testable;
- product dependencies are satisfied;
- the architecture covers required technical choices;
- required content/assets are available or an honest placeholder is explicitly accepted;
- it does not depend on unresolved legal interpretation;
- it cannot accidentally activate commerce before the launch gate.

**CURRENT HANDOFF: READY FOR DEVELOPMENT — OMNI-002A through OMNI-002E and OMNI-007A.**

OMNI-002F/G follow within the same M2 increment after their listed dependencies. OMNI-003 through OMNI-005 and OMNI-008 remain blocked.

# OmniArb — Product Roadmap

**Owner:** Project Manager / Product Owner  
**Status:** Active — M0/M1/M2 complete; M3 commercial-readiness prerequisites blocked  
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
11. Deployment target is Cloudflare Workers; `main` and same-repository PR previews are delivered through GitHub-controlled CI/CD.

---

## 2. Milestones

### M0 — Product baseline

**Status:** COMPLETE — merged into `main`.

Product requirements, roadmap, backlog, user flows and feature specifications are persisted and distinguish confirmed requirements from assumptions/deferred decisions.

---

### M1 — Architecture baseline

**Status:** COMPLETE — architecture baseline and ADRs merged via PR #1, refined by PR #8, and deployment amended by ADR-010.

The approved architecture defines the modular-monolith boundary, Stripe lifecycle, entitlement model, Telegram integration boundary, security controls, persistence, failure recovery, testing strategy, commercial gating and Cloudflare Workers deployment contract.

---

### M2 — Informational showcase MVP

**Goal:** Publish the Italian marketing/education experience without accepting subscriptions.

**Commercial state:** `PRE_LAUNCH`

**Status:** COMPLETE — APPLICATION, CLOUDFLARE MIGRATION, HOSTED QA AND PUBLIC RELEASE VERIFIED.

Delivery evidence:

- PR #9 implemented the Italian landing experience, static arbitrage example, explanatory Telegram mockups/placeholders, pricing/trial/risk content, server-side fail-closed commercial gate, disabled analytics adapter, responsive/accessibility hardening and baseline CI/browser validation.
- Independent application QA and architecture review passed before PR #9 merged as `626971d909f25f9812f90f6ab2dc3d875e3bece4`.
- ADR-010 / PR #14 replaced the previous Vercel preference with Cloudflare Workers through vinext.
- DEP-001 / PR #15 migrated the accepted Next.js 16 application to Cloudflare Workers, added validated same-repository PR previews and stable `main` deployment, and passed independent hosted Cloudflare QA plus architecture review before merge as `4f397af9dbc46e804ef1967c9ec7ef994d3adff4`.
- REL-001 / PR #18 added the exact-main post-deploy release smoke gate and passed independent QA before merge.
- Release issue #11 completed exact-main publication verification on `659381a19068db5ba9da1528e42c080b53467155` and is closed.

Stable public informational URL:

`https://omniarb-prelaunch.alemidolo.workers.dev`

Verified release behavior:

- `/` is publicly reachable;
- CTA remains `Prossimamente`;
- no live subscription/payment/Telegram commercial path is reachable;
- `POST /api/checkout/setup` remains `503 COMMERCIAL_DISABLED` with `Cache-Control: no-store`;
- expected security headers and unknown-route behavior are preserved;
- stable `main` deploys only after validation succeeds;
- same-repository PRs receive hosted Cloudflare preview aliases suitable for QA;
- exact-main post-deploy smoke waits for the matching Cloudflare deployment before testing the stable URL.

M2 is closed from a product/release perspective. Future PRE_LAUNCH defects are handled as normal defects; commercial activation remains governed by M3–M6.

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
- representative public screenshots/content approved where used;
- commercial email copy approved;
- operational manual-onboarding fallback documented.

**Status:** BLOCKED — product-owner/legal inputs and external Telegram capability verification remain open.

PRE-002 / issue #6 and PRE-003 / issue #7 are P0 commercial blockers. PRE-001 / issue #4 remains a real-content input but does not invalidate the already-released honest M2 mockup/placeholder experience.

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
- M2 complete and publicly released in `PRE_LAUNCH`;
- M3 complete;
- M4 complete;
- M5 complete;
- legal seller information and reviewed legal/privacy/customer content live;
- support email operational;
- production payment and Telegram fulfillment configuration approved;
- analytics/privacy setup approved;
- security review complete, including SEC-001 resolution or explicit risk acceptance;
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
| OMNI-002 | Italian conversion-focused showcase landing page | P0 | M2 | COMPLETE / PUBLICLY RELEASED |
| OMNI-003 | Subscription and trial lifecycle | P0 | M4 | BLOCKED — M3 and Telegram contract |
| OMNI-004 | Stripe checkout and subscription management | P0 | M4 | BLOCKED — OMNI-003 and seller/Stripe readiness |
| OMNI-005 | Telegram identity and customer onboarding | P0 | M5 | BLOCKED — external Telegram readiness |
| OMNI-006 | Legal, trust, eligibility and risk presentation | P0 | M2/M3/M6 | PRE-LAUNCH IMPLEMENTED; COMMERCIAL BLOCKED |
| OMNI-007 | Minimal conversion analytics | P1 | M2/M6 | ADAPTER COMPLETE/DISABLED; ENABLEMENT BLOCKED |
| OMNI-008 | Commercial launch gate | P0 | M6 | BLOCKED until all prerequisites pass |
| DEP-001 / #13 | Cloudflare Workers/vinext migration + GitHub previews/main deploy | P0 | M2 | COMPLETE |
| REL-001 / #11/#18 | Stable Cloudflare publication + exact-main post-deploy verification | P0 | M2 | COMPLETE |
| SEC-001 / #17 | Harden Cloudflare CI/deployment supply chain | P1 now / P0 before M6 | M3/M6 | READY FOR DEVELOPMENT |

---

## 4. Current sequencing

```text
M0 Product baseline ........ COMPLETE
        |
M1 Architecture ............ COMPLETE
        |
M2 PRE_LAUNCH application .. COMPLETE + PUBLICLY RELEASED ON CLOUDFLARE
        |
        +------------------------------+
        |                              |
        |                      SEC-001 hardening (#17)
        |                              |
        v                              v
M3 commercial prerequisites ..... BLOCKED on PRE-002 / PRE-003
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
- SEC-001 supply-chain findings must be resolved or explicitly accepted before the commercial security gate;
- QA has not passed end-to-end commercial flows;
- explicit commercial activation approval has not been obtained.

Cloudflare publication of the informational site removes only the M2 release blocker; it does not remove any commercial gate.

---

## 6. Intentionally deferred roadmap items

No task should be created automatically for English localization, international expansion, B2B subscriptions, annual/multi-tier pricing, customer dashboards, interactive calculators, waiting lists/newsletters, testimonials, historical-performance marketing, multi-user plans, Telegram support channels or automatic betting/execution.

---

## 7. Current handoff

M2 is complete and no deployment/release task remains open for the informational site.

The P0 commercial prerequisites PRE-002 and PRE-003 remain blocked on legal/product-owner and external-service verification. The highest-priority currently unblocked engineering task is **SEC-001 / issue #17**, which hardens the Cloudflare CI/deployment supply chain ahead of the later commercial security gate without enabling commerce.

Commercial implementation OMNI-003 through OMNI-005 must not begin merely because M2 is complete.

**NEXT DELIVERY OWNER: DEVELOPER — ISSUE #17 / SEC-001.**

# OmniArb — Security Architecture and Threat Model

**Owner:** Software Architect

**Status:** Approved control baseline; legal/privacy retention decisions pending

**Date:** 2026-09-02

---

## 1. Assets and trust boundaries

Protected assets are Stripe and Telegram credentials, customer email and
Telegram identity, saved payment-method relationship, trial eligibility,
billing records, entitlement, private Telegram access, operational audit data
and deployment configuration.

The browser, public internet, Stripe, the existing Telegram service,
transactional email provider, scheduler and database are separate trust
boundaries. No browser statement of payment, identity or entitlement is trusted.

---

## 2. Threats and required controls

| Threat | Required preventive controls | Detection/recovery |
|---|---|---|
| Stripe webhook spoofing | HTTPS; unmodified raw body; official SDK signature verification; environment-specific `whsec` secret; bounded body size | Count invalid signatures without logging payloads; alert on sustained failures |
| Replayed/duplicate Stripe events | Signature timestamp tolerance; unique `(provider, eventId)`; operation-level deduplication by event type/object/transition | Return `2xx` for already processed events; reconciliation repairs missed state |
| Out-of-order Stripe events | Never order by arrival or event `created`; retrieve current Stripe object; validate domain transition under transaction/version lock | Reconciliation compares provider and local state; alert irreconcilable regressions |
| Checkout redirect forgery | Redirect pages only display progress; verified provider facts and local orchestration grant entitlement | Security tests manipulate success URLs and session IDs |
| Duplicate fulfillment | Unique idempotency key, outbox row and fulfillment operation; adapter idempotency | Reconcile membership/allowlist; audit duplicate contract violations |
| Leaked Telegram invite | Prefer direct-bot allowlist or short-expiry join-request invite; approve only linked numeric ID; revoke link after decision; no reusable primary link | Decline wrong-user requests; revoke leaked link; rotate any primary links; incident audit |
| Unauthorized Telegram access after entitlement ends | `banChatMember`/external revoke or remove from bot allowlist; idempotent revocation; no indefinite public invite | Scheduled membership reconciliation and overdue-revocation alerts |
| Telegram link-token replay | At least 128 bits of randomness; store hash; short expiry; atomic single use; authenticated bot callback | Reject replay/conflicting identity; correlate and alert conflict |
| Unauthorized customer flow access | Opaque flow ID plus separate HttpOnly secret; SameSite cookie; origin/CSRF controls; no sequential IDs | Rate-limit failures and invalidate suspicious/expired flows |
| Billing portal account enumeration | Neutral `202`; rate limit by IP/email risk bucket; email magic link; token hash and single use | Monitor bursts without exposing whether an email exists |
| Email link scanner consumes token | GET is non-consuming confirmation; POST performs atomic consume | Customer can request a replacement; replay produces neutral expired response |
| Commercial gate bypass | Safe default; command-level `COMMERCIAL` check; no live price/secret in pre-launch where possible | Automated crafted-request tests and deployment configuration audit |
| Exposed API keys | Server-only environment/secret store; preview/prod isolation; no `NEXT_PUBLIC_` secrets; secret scanning | Rotate credential, inspect access logs and revoke derived sessions |
| Server-side request abuse/SSRF | No user-controlled provider base URLs or redirect URLs; allowlisted fixed origins; strict timeouts and response limits | Egress/error monitoring; tests with malicious URL inputs |
| Webhook endpoint abuse/DoS | Request size/time limits; cheap signature check before domain work; narrow event allowlist; asynchronous side effects | Rate/anomaly monitoring; provider delivery dashboard and recovery runbook |
| Injection/XSS | Parameterized Prisma access; schema validation; React escaping; sanitize any approved rich content; CSP and security headers | Dependency/static analysis and browser security tests |
| CSRF | SameSite cookies, origin validation and anti-CSRF token on browser state changes; provider webhooks use signature instead | Negative browser tests |
| Race between Stripe and Telegram | Separate states; row/version locks; stable idempotency keys; transactional outbox; compensating revoke; scheduled reconciliation | Alert stale pending states and orphaned provisional access |
| Trial abuse | Independent unique normalized-email and verified-Telegram denial keys; support override only with reason/audit | Abuse metrics with minimized identifiers; support dispute path |
| Support/admin abuse | Least-privilege provider roles; no shared admin credentials; audited refunds, overrides and identity changes | Periodic audit review and dual approval for high-risk production changes where feasible |
| Dependency vulnerability or supply-chain attack | Lockfile, minimal dependencies, automated vulnerability/secret scans, protected review, pinned CI actions | Patch SLA based on severity; rollback and credential rotation runbooks |
| Sensitive-data leakage in logs/analytics | Structured allowlist; redact email, IDs, raw tokens, provider payloads and secrets; analytics forbids direct identifiers | Log sampling review and deletion/incident process |

---

## 3. Telegram access decision

The delivery mechanism is chosen after PRE-003 verification in this order:

1. **Direct bot delivery with an entitlement allowlist.** The bot sends alerts
   only to authorized numeric user IDs and stops on revocation. No invite exists
   to share.
2. **Private channel/supergroup join request.** The bot creates a short-lived
   `creates_join_request` link, receives the requesting user's numeric ID,
   approves only the pre-linked identity, revokes the link and verifies
   membership. The bot needs invite and member-management administrator rights.
3. **Single-member invite link.** `member_limit=1` is not the default because a
   leaked link can be consumed first by the wrong user. It may be used only with
   an additional identity check that prevents that user gaining service.

Telegram-native paid subscription invite links are not used: Stripe is the
approved billing authority and parallel Telegram payment state would create a
second commercial source of truth.

When access ends in a private channel/supergroup, the adapter removes the user
with `banChatMember`. A later legitimate reactivation first unbans, then creates
a fresh controlled provisioning attempt. The exact behavior must be contract-
tested against the real chat type and bot permissions.

---

## 4. Secret and environment requirements

- Separate Stripe keys/webhook secrets, database credentials, Telegram bot or
  service credentials, email credentials and scheduler secrets per environment.
- Preview deployments never use production Stripe, Telegram membership or
  customer data.
- Startup validation checks presence and format, but never prints secret values.
- Credential rotation supports overlap where provider capabilities allow it.
- Production secret access is limited to the application runtime and explicitly
  authorized operators.

---

## 5. Security acceptance gate

Before commercial activation, QA/security review must verify:

- threat-table negative tests in `docs/api.md` pass;
- production webhook endpoint and API version are explicitly configured;
- CSP, HSTS, frame, content-type and referrer policies are reviewed for the
  deployed framework/provider flow;
- dependency and secret scans pass with no unaccepted critical/high findings;
- database backup/restore and credential rotation have been exercised;
- incident runbooks cover payment desynchronization, leaked Telegram access,
  secret exposure and failed revocation;
- retention/deletion and privacy/analytics decisions are approved;
- PRE-003 confirms the real Telegram permissions and lifecycle behavior;
- no commercial route is enabled before the M6 human approval gate.

Unresolved legal eligibility and age-assurance controls remain PM/legal
blockers and are not silently replaced by technical assumptions.

# OmniArb — API and Integration Contracts

**Owner:** Software Architect

**Status:** Approved logical contract; commercial routes remain blocked

**Date:** 2026-09-02

---

## 1. Conventions

- All routes are same-origin HTTPS in production.
- JSON inputs are schema-validated, size-limited and reject unknown fields on
  security-sensitive operations.
- Errors use `application/problem+json` with `type`, `title`, `status`, `code`
  and `correlationId`. They never expose provider payloads or secrets.
- Customer records use UUIDs internally. Browser flows use an opaque flow ID
  plus a high-entropy secret in a Secure, HttpOnly, SameSite cookie.
- State-changing browser requests require an origin check and CSRF protection.
- Public responses use neutral wording where account enumeration is possible.
- `PRE_LAUNCH` is checked inside every commercial command, not only middleware
  or UI. Disabled commercial commands return `404` or a stable
  `409 COMMERCIAL_DISABLED` according to the final route exposure policy.
- Redirect targets are server-configured allowlisted origins; callers cannot
  supply arbitrary success, cancel or return URLs.

Concrete route filenames may follow the chosen Next.js version. The behaviors
below are mandatory.

---

## 2. Customer-facing routes

### `POST /api/onboarding/flows`

Creates a commercial onboarding flow. It is unavailable in `PRE_LAUNCH`.

Request:

```json
{
  "email": "cliente@example.it",
  "eligibilityAcknowledgements": {
    "adult": true,
    "italyEligible": true
  }
}
```

The exact eligibility fields remain blocked on PRE-002 and must change to the
legally approved rule before commerce is enabled.

Response `201`:

```json
{
  "flowId": "opaque-uuid",
  "status": "TELEGRAM_LINK_REQUIRED"
}
```

The continuation secret is set only in an HttpOnly cookie and is never returned
in JSON or persisted in plaintext.

### `POST /api/onboarding/telegram-links`

Requires the valid flow cookie. Creates a random, short-lived, single-use bot
deep link and invalidates any previous unused link for the same flow.

Response `201`:

```json
{
  "telegramUrl": "https://t.me/configured_bot?start=opaque-token",
  "expiresAt": "2026-09-02T12:00:00Z"
}
```

The URL host and bot name come from trusted configuration.

### `GET /api/onboarding/flows/{flowId}`

Requires the matching valid flow cookie. Returns progress only:

```json
{
  "status": "FULFILLMENT_PENDING",
  "retryable": true,
  "supportAvailable": true
}
```

Allowed public statuses are `TELEGRAM_LINK_REQUIRED`, `PAYMENT_SETUP_REQUIRED`,
`PAYMENT_SETUP_PENDING`, `FULFILLMENT_PENDING`, `TRIAL_ACTIVE`, `FAILED` and
`EXPIRED`. The response contains no generic entitlement setter, provider secret
or sequential identifier.

### `POST /api/billing/setup-sessions`

Requires `COMMERCIAL`, a valid flow, a verified Telegram identity and a fresh
server-side trial-eligibility check. Creates a Stripe Checkout Session in
payment-method setup mode for the server-resolved Stripe customer. A stable
operation key is passed as Stripe's idempotency key.

Response `201`:

```json
{
  "url": "https://checkout.stripe.com/server-returned-session"
}
```

The browser redirect never marks payment setup, trial or entitlement complete.

### `POST /api/billing/portal-link-requests`

Request:

```json
{ "email": "cliente@example.it" }
```

Always returns `202` with the same neutral body. If a matching eligible
customer exists, a rate-limited email contains a short-lived management link.

### `GET /billing/manage` and `POST /billing/manage`

The GET validates token shape and renders a confirmation step without consuming
the token, protecting against email-link scanners. The POST atomically consumes
the token, creates a short-lived Stripe Customer Portal session for the
server-resolved customer and redirects to the provider URL. The return URL is
server-configured.

---

## 3. Provider and internal routes

### `POST /api/webhooks/stripe`

The Developer must pin the Stripe SDK and event-destination API version. The
subscription is created only after `serviceAvailableAt`, using a generally
available Stripe trial primitive that can set the exact end to seven days later.
Do not adopt a preview trial API without an ADR update and contract tests.

Required processing order:

1. read the unmodified raw request body;
2. verify `Stripe-Signature` using the environment-specific webhook secret and
   the SDK's bounded timestamp tolerance;
3. reject invalid signatures or oversized/malformed bodies;
4. insert/deduplicate the Stripe event ID;
5. retrieve the current provider object when event ordering could affect the
   decision;
6. apply state plus outbox records transactionally;
7. return `2xx` promptly; workers perform slow side effects.

Initial allowlist:

- `checkout.session.completed` and `checkout.session.expired` for the setup
  flow;
- `customer.subscription.created`, `customer.subscription.updated` and
  `customer.subscription.deleted`;
- `invoice.paid` and `invoice.payment_failed`;
- refund/charge events required by the approved support refund runbook.

The exact refund event set is finalized with the operational runbook. Unknown
event types are recorded as ignored or rejected by policy and never change
entitlement. Events may be duplicated or delivered out of order; `created`
timestamps are not used as an ordering lock.

### `POST /api/integrations/telegram/link-callback`

Proposed external contract, blocked on PRE-003 verification:

```json
{
  "linkToken": "opaque-token",
  "telegramUserId": "1234567890",
  "username": "optional_display_value",
  "eventId": "external-id"
}
```

The existing Telegram service must authenticate the request with a rotatable
service credential. Preferred authentication is a timestamped body signature
with a key ID and unique event ID; a private-network identity or managed
service-to-service mechanism is acceptable if it provides equivalent replay
and sender protection. Static query-string secrets are not acceptable.

The server verifies freshness, signature and event deduplication, then
atomically consumes the link token. Success and an already-completed identical
callback are both idempotent. A token linked to a different user returns a
conflict and raises an operational alert.

### Scheduled lifecycle and reconciliation commands

These are invoked only by the hosting platform's authenticated scheduler or an
operator with service credentials:

- process due outbox and fulfillment work;
- reconcile incomplete Stripe setup/subscription objects;
- verify Telegram provisioning where confirmation is pending;
- send first-charge reminders once;
- expire entitlements and payment grace periods;
- repair missed/delayed provider events.

Each invocation is bounded, lease-based and safe to repeat. The route rejects
arbitrary customer IDs or URLs from untrusted callers.

---

## 4. Adapter contracts

```ts
type TelegramAccessResult =
  | { status: "provisioned" | "already_provisioned"; availableAt: string }
  | { status: "pending_confirmation"; reference: string };

interface TelegramProvisioningService {
  provisionAccess(input: {
    customerId: string;
    telegramUserId: string;
    idempotencyKey: string;
  }): Promise<TelegramAccessResult>;

  verifyAccess(input: {
    telegramUserId: string;
    reference?: string;
  }): Promise<{ available: boolean; observedAt: string }>;

  revokeAccess(input: {
    customerId: string;
    telegramUserId: string;
    idempotencyKey: string;
  }): Promise<{ status: "revoked" | "already_revoked" }>;
}
```

`availableAt` is accepted only when the adapter can prove usable service. A
generated invite link alone is not proof. For a private chat/group/channel,
proof is the expected user becoming a member or an equivalent provider fact;
for direct bot delivery, proof is activation in the bot's entitlement allowlist.

Provider adapters must use bounded connect/read timeouts and categorize errors
as retryable, terminal, authentication/configuration or contract violations.

---

## 5. Contract-test matrix

| Boundary | Minimum tests |
|---|---|
| Commercial gate | default/missing config, crafted request, stale client, enabled test environment |
| Flow session | missing/wrong/expired cookie, cross-flow access, CSRF, concurrent request |
| Telegram link | valid consume, expiry, replay, different user, duplicate callback, invalid service signature |
| Stripe webhook | invalid signature, old replay signature, duplicate event ID, logical duplicate, out-of-order event, unknown type |
| Stripe setup/subscription | retry after timeout, stable idempotency key, Telegram failure before subscription, subscription failure after provisional access |
| Portal | neutral enumeration response, expired/replayed token, scanner GET, concurrent POST, fixed return URL |
| Scheduler/worker | unauthorized invocation, duplicate invocation, lease expiry, retry exhaustion, dead-letter alert |
| Telegram access | provision, already provisioned, pending confirmation, verify, revoke, already revoked, wrong member consumes leaked link |

---

## 6. Provider references

- Stripe webhook signatures, retries, duplicates and ordering:
  <https://docs.stripe.com/webhooks>
- Stripe subscription creation:
  <https://docs.stripe.com/api/subscriptions/create>
- Stripe Customer Portal sessions:
  <https://docs.stripe.com/api/customer_portal/sessions/create>
- Telegram Bot API:
  <https://core.telegram.org/bots/api>

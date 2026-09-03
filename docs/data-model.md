# OmniArb — Data Model

**Owner:** Software Architect

**Status:** Approved implementation contract

**Date:** 2026-09-02

**Scope:** Commercial data model; OMNI-002 may scaffold only the configuration it needs

---

## 1. Principles

- PostgreSQL is the application store; Stripe remains authoritative for billing.
- Billing, fulfillment and entitlement are separate correlated states.
- Provider IDs are opaque strings and are never parsed for business meaning.
- Telegram numeric user IDs are stored losslessly as decimal strings.
- Every externally retried operation has a durable idempotency key.
- Card data, betting credentials, bankroll data and raw secrets are never stored.
- Raw provider payload retention requires a documented operational need and a
  privacy-approved retention period.

The names below are logical. The Developer may use Prisma naming conventions
while preserving the constraints and transactions.

---

## 2. Entities

### `Customer`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key; never exposed as a public credential |
| `email` | text | Original customer-facing value |
| `normalizedEmail` | text | Lowercased/trimmed canonical lookup value; unique |
| `stripeCustomerId` | text, nullable | Unique once assigned |
| `createdAt`, `updatedAt` | timestamptz | Server-generated |

Email normalization must be deliberately conservative. Do not remove dots,
plus tags or otherwise apply provider-specific mailbox rules.

### `TelegramIdentityAssociation`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `customerId` | UUID | Foreign key to `Customer` |
| `telegramUserId` | text | Decimal numeric ID |
| `username` | text, nullable | Display-only snapshot; never authoritative |
| `linkedAt` | timestamptz | Verified-link time |
| `endedAt` | timestamptz, nullable | Null only for the current association |
| `changeReason`, `changedBy` | text, nullable | Required for support-assisted replacement |

Required database constraints:

- at most one association with `endedAt IS NULL` per customer;
- at most one association with `endedAt IS NULL` per Telegram user ID;
- all identity changes append/end records; they do not overwrite audit history.

Prisma cannot express every partial unique index declaratively. Add those
indexes in the SQL migration and cover them with integration tests.

### `TrialGrant`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `customerId` | UUID | Foreign key |
| `normalizedEmail` | text | Immutable eligibility key at consumption |
| `telegramUserId` | text | Immutable verified identity at consumption |
| `consumedAt` | timestamptz | Written exactly once |
| `source` | enum | `AUTOMATIC` or `SUPPORT_OVERRIDE` |
| `overrideReason`, `overriddenBy` | text, nullable | Required together for an override |

Unique constraints on `normalizedEmail` and `telegramUserId` independently
enforce the approved denial rule. A privacy/legal retention decision is
required before launch because deleting these keys can weaken one-trial
enforcement.

### `BillingSubscription`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `customerId` | UUID | Foreign key |
| `stripeSubscriptionId` | text | Unique |
| `stripePriceId` | text | Expected configured monthly price |
| `providerStatus` | text | Last reconciled Stripe status; not entitlement |
| `trialStart`, `trialEnd` | timestamptz, nullable | Provider boundaries |
| `currentPeriodStart`, `currentPeriodEnd` | timestamptz, nullable | Provider boundaries |
| `cancelAtPeriodEnd` | boolean | Last reconciled value |
| `firstPaidInvoiceId` | text, nullable | Unique; set from the first verified paid subscription invoice |
| `firstPaidAt` | timestamptz, nullable | Set with `firstPaidInvoiceId` and never moved by a renewal |
| `firstPaymentRefundedAt` | timestamptz, nullable | Set from the verified approved-refund outcome |
| `lastProviderSyncAt` | timestamptz | Reconciliation time |

Store a reference to the Stripe object version or latest relevant event where
available, but never use webhook arrival order as a state ordering guarantee.

### `BillingSetup`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `customerId` | UUID | Foreign key to `Customer` |
| `flowId` | UUID | Unique foreign key to `OnboardingFlow` |
| `operationKey` | text | Unique, stable Stripe idempotency key |
| `stripeCheckoutSessionId` | text, nullable | Unique once assigned |
| `stripeSetupIntentId` | text, nullable | Unique once observed |
| `stripePaymentMethodId` | text, nullable | Server-side correlation; never exposed as customer proof |
| `status` | enum | `PENDING`, `SESSION_CREATED`, `SUCCEEDED`, `FAILED`, `EXPIRED` |
| `completedAt` | timestamptz, nullable | Verified payment-method readiness time |
| `failureCategory` | text, nullable | Sanitized provider/contract category |
| `createdAt`, `updatedAt` | timestamptz | Server-generated |

The setup is `SUCCEEDED` only after a verified provider event and reconciliation
confirm setup mode, the expected Stripe customer, a succeeded SetupIntent and a
reusable PaymentMethod attached to that customer. The application uses the
server-resolved PaymentMethod as the subscription default; browser-supplied
provider IDs never satisfy this transition.

### `Entitlement`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `customerId` | UUID | Unique active domain record |
| `billingSubscriptionId` | UUID, nullable | Correlation, not authorization by itself |
| `status` | enum | See state set below |
| `serviceAvailableAt` | timestamptz, nullable | First verified usable-service time |
| `validUntil` | timestamptz, nullable | Trial/paid access boundary |
| `graceUntil` | timestamptz, nullable | Set only during payment grace |
| `suspendedAt`, `revokedAt` | timestamptz, nullable | Domain audit times |
| `version` | integer | Optimistic-concurrency version |

Allowed states are `NONE`, `PENDING_FULFILLMENT`, `TRIAL_ACTIVE`,
`TRIAL_CANCELLED`, `ACTIVE`, `CANCELLED_ACTIVE`, `GRACE`, `SUSPENDED`,
`EXPIRED` and `REVOKED`. Transitions use domain commands and compare/update the
`version`; application code must not expose a generic "set status" operation.

### `OnboardingFlow`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Public correlation ID, not a credential |
| `customerId` | UUID | Foreign key |
| `secretHash` | bytea/text | Hash of high-entropy browser continuation secret |
| `status` | enum | Linking/setup/fulfillment progress only |
| `expiresAt`, `consumedAt` | timestamptz | Short-lived and single-use where applicable |
| `createdAt`, `updatedAt` | timestamptz | Server-generated |

Only the hash is stored. The plaintext continuation secret is held in a
Secure, HttpOnly, SameSite cookie. Status never grants entitlement.

### `TelegramLink`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `flowId` | UUID | Foreign key |
| `tokenHash` | bytea/text | Unique hash of random bot deep-link token |
| `expiresAt`, `consumedAt` | timestamptz | Short-lived; atomic consume |
| `linkedTelegramUserId` | text, nullable | Written only by authenticated callback |

### `FulfillmentAttempt`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `customerId` | UUID | Foreign key |
| `operation` | enum | `PROVISION`, `REVOKE`, `VERIFY` |
| `idempotencyKey` | text | Unique |
| `status` | enum | `PENDING`, `RUNNING`, `SUCCEEDED`, `RETRYABLE_FAILURE`, `TERMINAL_FAILURE` |
| `attemptCount`, `nextAttemptAt` | integer/timestamptz | Retry scheduling |
| `leaseUntil` | timestamptz, nullable | Prevents concurrent workers |
| `failureCategory` | text, nullable | Sanitized, non-secret category |
| `createdAt`, `updatedAt` | timestamptz | Server-generated |

### `IntegrationEvent`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `provider` | enum | `STRIPE` or `TELEGRAM` |
| `externalEventId` | text | Unique with provider |
| `eventType` | text | Allowlisted during processing |
| `objectId` | text, nullable | Provider object correlation |
| `status` | enum | `RECEIVED`, `PROCESSED`, `IGNORED`, `FAILED` |
| `payloadDigest` | text | Integrity/diagnostic digest, not the secret payload |
| `receivedAt`, `processedAt` | timestamptz | Audit timestamps |
| `failureCategory` | text, nullable | Sanitized category |

For Stripe's rare logical duplicates represented by different event IDs, the
handler also applies an operation-level deduplication key based on event type,
provider object and target transition.

### `OutboxEvent`

| Field | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key |
| `eventType`, `payloadVersion` | text/integer | Versioned internal contract |
| `aggregateType`, `aggregateId` | text/UUID | Domain correlation |
| `deduplicationKey` | text | Unique |
| `payload` | jsonb | Minimal data; no secrets or raw tokens |
| `status`, `attemptCount`, `nextAttemptAt`, `leaseUntil` | mixed | Durable worker state |
| `createdAt`, `completedAt` | timestamptz | Audit timestamps |

### `PortalAccessToken`, `EmailDelivery`, `AuditEvent`

- `PortalAccessToken` stores a token hash, customer, purpose, expiry and atomic
  consumption time. GET requests never consume it; the confirmation POST does.
- `EmailDelivery` stores template, customer, deduplication key, provider message
  reference and delivery status.
- `AuditEvent` records support overrides, refunds, identity changes and manual
  fulfillment with actor, action, target, reason and timestamp. It contains no
  authentication secrets.

---

## 3. Required transaction boundaries

1. **Consume Telegram link:** lock token, validate expiry/unconsumed status,
   end any superseded pending link, create identity association and mark the
   token consumed in one transaction.
2. **Accept provider event:** insert/deduplicate `IntegrationEvent` and insert a
   versioned processing `OutboxEvent` in one short transaction. Once this
   commits, duplicate deliveries are acknowledged and local retries own the
   remaining work.
3. **Process provider event:** retrieve any required current provider object
   outside a long-held database transaction; then lock the affected aggregate,
   revalidate the transition, apply it, enqueue resulting outbox work and mark
   the integration event processed in one transaction.
4. **Start the trial:** after verified Telegram availability, lock customer and
   entitlement, recheck trial eligibility, create/reconcile the Stripe
   subscription using a stable idempotency key, then persist provider IDs,
   `TrialGrant`, trial entitlement and outbox messages without an observable
   half-granted state. External calls cannot be inside a long database lock;
   use the durable orchestration state and compensation described in the
   architecture.
5. **Identity change:** verify the support decision, create revoke/provision
   attempts, and change the active association only when the old and new access
   outcomes satisfy the runbook. Record an audit event.
6. **Outbox claim:** claim work with row locking/`SKIP LOCKED` or an equivalent
   lease so concurrent workers cannot deliver the same row intentionally.

---

## 4. Retention and deletion blockers

Before commercial launch, PM/privacy/legal review must define retention for
customer contact data, one-trial denial keys, audit events, integration event
metadata, email delivery data and backups. The Developer must implement the
approved policy; this architecture does not invent legal retention periods.

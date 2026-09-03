# ADR-008: Use identity-bound Telegram access

**Status:** Accepted direction, subject to PRE-003 external capability verification

**Date:** 2026-09-02

## Context

One subscription authorizes one Telegram identity. A reusable invite can be
shared or consumed by someone other than the linked customer, and creation of
an invite alone does not prove that service became usable. The existing bot and
its delivery topology remain external and have not yet been verified.

## Decision

Provision by verified numeric Telegram user ID through the existing service's
idempotent adapter.

- Prefer direct bot delivery controlled by an entitlement allowlist when the
  bot can target individual users.
- For a private channel or supergroup, create a short-lived join-request invite,
  approve only the pre-linked user ID, revoke the link after the decision and
  verify membership before recording service availability.
- Revoke expired entitlement by removing/banning the numeric user ID or by
  removing it from the bot allowlist.

The adapter, not web-domain code, contains the topology-specific behavior.

## Alternatives considered

- Reusable primary invite link.
- A link limited only by `member_limit=1`.
- Telegram-native paid subscription invite links.
- Telegram username as identity.
- Reimplementing the existing bot inside the web application.

## Consequences

- Leaked links cannot authorize an unrelated identity when join approval is
  enforced correctly.
- The bot needs the relevant invite/member administrator permissions for a
  channel or supergroup.
- Provisioning requires a distinct confirmation step; an issued link is not
  enough to start the seven-day trial.
- PRE-003 remains a commercial blocker until provision, confirm, revoke and
  retry behavior are tested against the real service.
- Stripe remains the only billing authority.

## References

- Telegram Bot API: <https://core.telegram.org/bots/api#createchatinvitelink>
- Telegram Bot API: <https://core.telegram.org/bots/api#approvechatjoinrequest>
- Telegram Bot API: <https://core.telegram.org/bots/api#banchatmember>

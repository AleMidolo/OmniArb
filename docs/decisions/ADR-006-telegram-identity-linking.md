# ADR-006: Link customers using Telegram numeric user IDs

**Status:** Accepted, subject to external capability verification

**Date:** 2026-09-02

## Context

Telegram usernames are optional and changeable. OmniArb needs to associate one
commercial customer with one stable Telegram identity before or during
checkout, while keeping the existing alert service external.

## Decision

Use Telegram's numeric user ID as the service identity. Verify possession with
a bot deep-link handshake using a random, short-lived, single-use token. Store
the token hashed and require authenticated server-to-server communication from
the bot/integration. Provision and revoke access through an idempotent adapter.

## Alternatives considered

- Use Telegram username as the authoritative key.
- Ask customers to paste an unverified identifier.
- Issue reusable public invite links.
- Move the existing bot and arbitrage engine into the web application.

## Consequences

- Identity remains stable when usernames change.
- The existing Telegram service must support authenticated linking,
  idempotent provisioning and revocation by numeric ID.
- Replays, expired tokens and concurrent links require database constraints.
- Missing external capabilities block commercial launch and must be separately
  scoped; they do not expand the website into the arbitrage service.

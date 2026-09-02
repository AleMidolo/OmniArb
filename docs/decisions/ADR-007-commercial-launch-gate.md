# ADR-007: Enforce a server-side commercial launch gate

**Status:** Accepted

**Date:** 2026-09-02

## Context

The informational site may launch before payments, legal readiness and customer
fulfillment are complete. Hiding a button in the browser would not prevent a
crafted request from reaching unfinished commercial routes.

## Decision

Introduce a deployment-level mode with `PRE_LAUNCH` as the secure default and
`COMMERCIAL` as the explicitly enabled state. In `PRE_LAUNCH`, all payment,
subscription and commercial provisioning operations reject requests on the
server, while the site displays the approved `Prossimamente` CTA.

The mode may change to `COMMERCIAL` only after the roadmap launch gates, QA and
human approval are recorded as complete.

## Alternatives considered

- Hide/disable the CTA only in the frontend.
- Deploy commercial endpoints but rely on secret URLs.
- Maintain separate informational and commercial applications.

## Consequences

- The informational site can be deployed safely before commercial readiness.
- Automated tests must prove that commercial routes are unavailable in
  `PRE_LAUNCH`.
- Production configuration changes require controlled approval and validation.
- One application can support both phases without duplicating the website.

# ADR-001: Use a modular monolith

**Status:** Accepted

**Date:** 2026-09-02

## Context

OmniArb needs one public website, one commercial workflow, one database and a
small number of external integrations. The initial team and operational scale
do not justify independently deployed services.

## Decision

Build one deployable application with explicit internal modules for customers,
billing, entitlements, Telegram, email and analytics. Modules communicate
through domain interfaces and do not leak provider SDK types across boundaries.

## Alternatives considered

- Separate frontend and API deployments.
- Microservices for billing, entitlement and Telegram fulfillment.
- Serverless functions with no shared domain/module structure.

## Consequences

- Deployment, transactions, local development and observability remain simple.
- Strong module boundaries are required to prevent a tightly coupled codebase.
- A module can be extracted later if measured scale or ownership requires it.
- Distributed-system failure handling is limited to unavoidable external
  provider interactions.

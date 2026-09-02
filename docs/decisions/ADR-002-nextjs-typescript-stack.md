# ADR-002: Use Next.js and TypeScript

**Status:** Accepted

**Date:** 2026-09-02

## Context

The MVP combines a content-heavy marketing site with a small set of secure
server routes, webhook handlers and onboarding pages. It needs strong SEO,
accessible responsive UI and one language at launch.

## Decision

Use Next.js with TypeScript for both UI and server functionality. Prefer
server/static rendering and introduce client components only where interaction
requires them. Target a Vercel-compatible deployment. Use Vitest for
unit/integration tests and Playwright for browser tests.

## Alternatives considered

- Separate React SPA and backend API.
- A purely static site plus independent billing service.
- A heavier full-stack framework or custom Node server.

## Consequences

- Marketing and commercial routes share types, deployment and conventions.
- Server/client boundaries and secret handling must be reviewed carefully.
- Framework versions and dependencies must be pinned and validated by the
  Developer.
- No client state library is introduced until a demonstrated need exists.

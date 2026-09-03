# ADR-002: Use Next.js and TypeScript

**Status:** Accepted — deployment target amended by ADR-010

**Date:** 2026-09-02  
**Deployment amendment:** 2026-09-03

## Context

The MVP combines a content-heavy marketing site with a small set of secure
server routes, webhook handlers and onboarding pages. It needs strong SEO,
accessible responsive UI and one language at launch.

## Decision

Use Next.js with TypeScript for both UI and server functionality. Prefer
server/static rendering and introduce client components only where interaction
requires them. Use Vitest for unit/integration tests and Playwright for browser
tests.

The application remains Next.js; deployment is now targeted to **Cloudflare
Workers through vinext** as defined by ADR-010. The earlier Vercel-compatible
deployment preference is superseded.

vinext is treated as a deployment/build adapter rather than a reason to rewrite
application or domain code. Because vinext is beta, exact Next.js compatibility
must be checked and tested against the Cloudflare runtime before merge.

## Alternatives considered

- Separate React SPA and backend API.
- A purely static site plus independent billing service.
- A heavier full-stack framework or custom Node server.
- Replacing Next.js as part of the Cloudflare migration.

The deployment-provider alternatives are evaluated in ADR-010.

## Consequences

- Marketing and commercial routes share types, deployment and conventions.
- Server/client boundaries and secret handling must be reviewed carefully.
- Framework, vinext, Vite, Cloudflare plugin and Wrangler versions must be
  pinned and validated by the Developer.
- Existing Next.js behavior remains the compatibility baseline during the
  Cloudflare migration.
- Cloudflare-specific APIs/bindings must remain behind integration boundaries;
  domain modules must not become coupled to the Workers runtime without a
  separate architectural reason.
- No client state library is introduced until a demonstrated need exists.

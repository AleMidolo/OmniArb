# Feature Specification — OMNI-002 Italian Showcase Landing Page

**Priority:** P0  
**Owner of WHAT:** Project Manager / Product Owner  
**Status:** IMPLEMENTED AND QA ACCEPTED — PRE_LAUNCH; CLOUDFLARE PUBLICATION MIGRATION ACTIVE

---

## 1. Objective

Create an Italian-language, conversion-focused showcase that educates prospective customers about sports arbitrage and explains the OmniArb subscription without requiring a web dashboard.

Before commercial launch, the page must present the future offer transparently while keeping trial/payment activation unavailable.

---

## 2. Confirmed requirements

### Content

A first-time visitor must be able to understand, from the site alone:

- what sports arbitrage/surebetting is;
- why it differs from a normal directional bet;
- that the theoretical arbitrage result depends on successfully placing all required bets at the quoted odds;
- important execution risks;
- that OmniArb sends alerts rather than placing bets;
- that users need their own bookmaker accounts and funds;
- that the ongoing service is delivered through Telegram;
- that alert availability varies;
- that no minimum number of alerts is guaranteed;
- that the eventual offer is a seven-day full-access trial followed by €50/month recurring unless cancelled;
- that the service is for adults (18+) and initially commercialized only in Italy.

### Educational example

Include at least one static illustrative arbitrage calculation that shows:

- odds;
- total amount considered;
- stake allocation;
- return under the represented outcomes;
- theoretical positive margin/profit.

It must be clearly labeled as an illustrative mathematical example and not as an expected customer return.

No interactive arbitrage calculator is required.

### Telegram demonstration

Use both:

1. real anonymized screenshots of the existing bot, when supplied by the product owner; and
2. explanatory mockups that make alert fields understandable.

Real screenshots are evidence of product format/existence, not performance proof.

### Social proof

At launch:
- no customer testimonials;
- no fabricated testimonials;
- no invented customer counts;
- no historical profit statistics used as conversion claims.

### Pricing/trial presentation

The site may state:
- 7-day full-access free trial;
- payment method required at activation;
- then €50/month recurring unless cancelled;
- first paid charge covered by a voluntary seven-day no-questions-asked money-back guarantee, first payment only;
- mandatory rights are unaffected.

Exact legally approved consumer wording is a pre-commercial-launch dependency.

### Pre-commercial state

Until all commercial launch gates pass:
- no active trial/signup action;
- no payment collection;
- no waiting list;
- primary conversion CTA must communicate **"Prossimamente"**.

### Visual direction

Professional financial/analytics foundation with subtle sports cues.

Avoid an aggressive bookmaker/casino aesthetic.

### Language

Italian only for MVP.

### Responsive/accessibility expectations

The page must:
- work on modern mobile and desktop sizes;
- preserve essential content and CTAs on smaller screens;
- support keyboard navigation for interactive elements;
- expose visible focus;
- not depend on hover-only interactions;
- provide appropriate text alternatives for meaningful images;
- keep errors and notices understandable;
- respect reduced-motion preferences when motion is used.

---

## 3. Claims policy

Allowed:
- conditional explanation of mathematical arbitrage;
- clearly illustrative calculations;
- genuine bot screenshots for format demonstration;
- representative examples of genuinely supported sports/markets/bookmakers.

Not allowed:
- unconditional "guaranteed profit" claims;
- promise that every alert yields profit;
- guaranteed minimum alert frequency;
- fabricated testimonials or evidence;
- implication that OmniArb places bets;
- implication that the website holds customer bankroll;
- implication that example sport/bookmaker coverage is permanent.

---

## 4. Analytics requirement

Use minimal privacy-focused measurement sufficient to understand funnel performance.

Product-level events of interest may include:
- page visit;
- pricing/trial-section engagement;
- trial CTA interaction once commercial activation is enabled.

No advertising/retargeting requirement exists for MVP.

Provider, consent model and event implementation belong to architecture/privacy review.

---

## 5. Inputs required from product owner before final content freeze

- approved real bot screenshots, anonymized;
- representative real alert example(s);
- representative sport/market/bookmaker examples if shown;
- final support email before commercial launch;
- seller/legal information before commercial launch;
- legally reviewed final disclosure text before commercial launch.

---

## 6. Acceptance criteria

1. The page is fully usable in Italian without relying on English content.
2. A first-time visitor can identify what OmniArb does and does not do.
3. The page contains at least one complete static arbitrage calculation example.
4. The calculation example is labeled illustrative.
5. The page explains that execution conditions can prevent theoretical results from being realized.
6. The page explains that the customer places bets themselves.
7. The page explains Telegram as the service-delivery channel.
8. The page displays the future/active commercial terms consistently: 7-day full-access trial, then €50/month recurring unless cancelled.
9. The page does not state or imply a guaranteed realized profit.
10. The page does not promise a minimum alert count.
11. No testimonial or customer-performance claim is fabricated.
12. Bot screenshots shown as real are genuine and anonymized.
13. Before commercial activation, the primary CTA is "Prossimamente" and no subscription/payment path is reachable.
14. After commercial activation, the CTA can lead to the approved trial flow.
15. Essential navigation and CTA controls are keyboard operable.
16. Essential content remains usable on mobile and desktop.
17. Meaningful images have an accessible alternative.
18. The page identifies 18+ and Italy-only commercial availability in the legally approved manner.
19. Any analytics enabled comply with the approved privacy/consent design.
20. No frontend-only action can grant paid/trial entitlement.

---

## 7. Dependencies

- `docs/product-requirements.md`
- Architecture baseline
- OMNI-006 for final legal/trust wording
- Product-owner visual/content inputs
- OMNI-004/OMNI-005 before active commercial CTA

---

## 8. Assumptions

- The product owner can supply suitable genuine bot screenshots.
- Representative alert examples can be anonymized without making them misleading.
- The informational site can be published before commercial activation.

---

## 9. Intentionally deferred

- English localization.
- Interactive calculator.
- Testimonials.
- Historical performance marketing.
- Waiting list/newsletter.
- Customer dashboard.
- Advertising/retargeting.

---

## 10. Delivery record

- Implemented via PR #9.
- Independent QA passed on head `f2d1eadd460c2497715bfff5b38e627a1768130c`, including desktop/mobile Playwright coverage and verification of the `PRE_LAUNCH` commercial gate.
- Architecture review passed on the same head.
- Merged to `main` as `626971d909f25f9812f90f6ab2dc3d875e3bece4`.
- Deployment architecture now targets Cloudflare Workers through vinext under ADR-010.
- DEP-001 / issue #13 owns migration/runtime parity and GitHub-driven preview/main automation.
- Release / DevOps issue #11 owns minimal Cloudflare bootstrap and stable publication after DEP-001 passes QA.
- The Cloudflare migration must preserve accepted landing-page behavior; commercial activation remains blocked by M3–M6.

**IMPLEMENTED AND QA ACCEPTED — PRE_LAUNCH; CLOUDFLARE RELEASE PENDING**

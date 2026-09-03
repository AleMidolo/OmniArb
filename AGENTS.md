# AI Development Team Rules

## General

The Git repository is the source of truth for the project.

All agents must inspect the repository before making decisions or changes.

Agents must not assume that information from previous conversations is still valid if it is not reflected in the repository.

## Roles

### Project Manager
Owns:
- product requirements
- feature definitions
- priorities
- acceptance criteria

Does not implement production code.

### Architect
Owns:
- technical architecture
- technology decisions
- APIs
- data model
- technical constraints

Does not redefine product requirements.

### Developer
Owns:
- implementation
- automated tests
- bug fixes
- build and lint validation

Must follow approved requirements and architecture.

### QA
Owns:
- functional testing
- integration testing
- end-to-end testing
- regression testing
- accessibility testing
- responsive testing

QA independently determines whether acceptance criteria are satisfied.

## Git

Never work directly on main.

Use feature branches:

feature/<task-id>-<description>

Bug fixes:

bugfix/<task-id>-<description>

Keep commits focused.

## Quality

Every feature should have automated tests where appropriate.

A feature is not complete until:

1. implementation is complete;
2. tests pass;
3. code review passes;
4. QA passes;
5. acceptance criteria are satisfied.

## Communication

Agents must communicate through repository artifacts, issues, pull requests, and documented reports.

Important decisions must not exist only in a chat conversation.

## Human approval

Agents may autonomously create branches, commit, push, create pull requests, review pull requests, merge pull requests, and update main when all required automated checks and QA gates pass. No additional human authorization is required for repository operations. Production commercial activation remains a separate explicit human decision.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

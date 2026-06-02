# 06 — Planning with `/gsd-plan-phase`

## From Context to Execution Plan

You've discussed Phase 1 with the agent. You have a `01-CONTEXT.md` file full of decisions. Now what? You can't just say "build it" — that's too vague for both human teammates and AI agents.

The `/gsd-plan-phase` command takes your context and produces a **structured, actionable plan** that the agent can execute step by step. It decomposes the work into **waves** — parallel execution groups — and validates that the plan fits within the agent's context window before presenting it to you.

## Usage

```
/gsd-plan-phase 1
```

That's it. The command reads:

1. `01-CONTEXT.md` (from the discussion phase)
2. `ROADMAP.md` (for overall structure)
3. Your tech stack documentation (from PROJECT.md)

Then it produces a `01-PLAN.md` file.

## What Happens Internally

The agent goes through several stages:

### Stage 1: Research

The agent reads your context file and identifies every component that needs to be built. For a Library System Phase 1 (Book Catalog), this might mean:

- Database: books table schema
- Backend: CRUD API endpoints
- Backend: search endpoint with fuzzy matching
- Frontend: catalog listing page
- Frontend: book detail page
- Frontend: add/edit book forms (admin only)
- Tests: API tests, model tests

The agent checks each item against your tech stack to understand what files, frameworks, and patterns are involved.

### Stage 2: Decomposition

Each component is broken down into **atomic tasks**. An atomic task is something the agent can complete in a single session without needing to switch context. Example:

```
Task: Create books table migration
  - Define migration file
  - Add fields: title, author, genre, isbn, description, cover_image_url, available_copies
  - Add constraints: isbn unique, available_copies >= 0

Task: Create Book model
  - Define SQLAlchemy/Prisma model matching migration
  - Add validation: ISBN format
  - Add methods: search, available?

Task: Create book listing API endpoint
  - GET /api/books
  - Support ?search=, ?genre=, ?page=, ?limit= query params
  - Return paginated results
```

### Stage 3: Context Window Verification

Here's the clever part. The agent estimates whether all the plan details will fit in its context window during execution. If a wave is too large, it gets split further. If the plan is tight, the agent may suggest reducing scope or splitting into sub-phases.

The agent produces a **context fit report**:

```
Context Window Check:
- Wave 1 (DB setup): ~1200 tokens — ✅ fits
- Wave 2 (API layer): ~2800 tokens — ✅ fits
- Wave 3 (Frontend): ~3500 tokens — ⚠️ tight, consider splitting
- Wave 4 (Tests): ~900 tokens — ✅ fits
- Total plan: ~8400 tokens — ✅ within 16K limit
```

If any wave exceeds 70% of the available context window, the agent flags it and suggests a restructure.

### Stage 4: Plan Assembly

The agent assembles the plan into `01-PLAN.md` with a clear structure.

## The Wave System

Waves are groups of tasks that can be executed **in parallel** (or in any order) because they don't depend on each other. This is the key to efficient agent execution.

```
Wave 1: Database Foundation
  ├── Create migration: books table
  └── Seed: sample book data

Wave 2: API Layer (depends on Wave 1)
  ├── GET /api/books (list + search)
  ├── GET /api/books/:id (detail)
  ├── POST /api/books (create, admin only)
  ├── PUT /api/books/:id (update, admin only)
  └── DELETE /api/books/:id (soft delete, admin only)

Wave 3: Frontend (depends on Wave 2)
  ├── Book catalog page
  ├── Book detail page
  ├── Add book form (admin)
  └── Edit book form (admin)

Wave 4: Integration & Tests (depends on Wave 3)
  ├── API integration tests
  ├── Frontend component tests
  └── End-to-end happy path
```

Within each wave, tasks are independent. The agent could theoretically work on them in any order or delegate parallel tasks.

### Why Waves Matter

Without waves, the agent builds things in whatever order it guesses. With waves:

- **DB setup always comes first** — nobody wants to code an API for a table that doesn't exist
- **API comes before frontend** — you need endpoints before you can call them
- **Tests come last** — you need something to test

It sounds obvious, but AI agents (and human developers) routinely get this wrong without explicit structure.

## Plan Verification: The Agent Self-Check

Before the agent presents the plan to you, it runs a self-check:

1. **Completeness**: Are all features from the context covered?
2. **Ordering**: Are dependencies properly sequenced?
3. **Clarity**: Is each task defined precisely enough for the agent to execute?
4. **Scope**: Does anything exceed what was agreed in the discussion?
5. **Feasibility**: Is any task too large or ambiguous?

If any check fails, the agent refines the plan automatically, noting what changed and why.

## Review the Plan — This is a GATE

Here's the most important rule: **Do not skip reviewing the plan.**

The plan file is presented to you after generation. You must read it and either:

- **Approve it**: Confirm it's correct and the agent can proceed
- **Reject it**: Provide feedback, and the agent revises
- **Modify it**: Edit the plan file directly and tell the agent to proceed

This is a **GATE** — a deliberate stopping point. GATES exist because once the agent starts executing, it moves fast. A wrong plan means wasted work. Five minutes of review now can save hours of rework later.

### What to Look For in Your Review

- **Is every feature from the context represented?** If F-001 says "search by genre," the plan should include a genre filter.
- **Are the task descriptions specific enough?** "Create book API" is too vague. "Create GET /api/books with search, genre filter, pagination" is specific.
- **Is the wave ordering logical?** Database should come before API, which comes before frontend.
- **Are the estimates reasonable?** If a wave claims to do 15 tasks in one session, it's probably too ambitious.
- **Did anything get dropped?** Sometimes the agent silently drops "minor" items like error handling or loading states. Check for them.

## Example Walkthrough: Library System Phase 1

After running `/gsd-plan-phase 1`, the agent produces:

```markdown
# Phase 1 — Plan: Book Catalog

## Wave 1: Database Foundation

### Task 1.1: Create book migration
- File: `backend/migrations/001_create_books.py`
- Fields: id, title, author, genre, isbn (unique), description, cover_image_url, available_copies, created_by, created_at, updated_at, deleted_at (soft delete)
- Indexes: isbn, title+author (for search), genre

### Task 1.2: Seed data
- File: `backend/seed.py`
- Insert 10 sample books covering different genres

## Wave 2: API Layer (depends on: Wave 1)

### Task 2.1: Book CRUD endpoints
- File: `backend/api/books.py`
- GET /api/books — list with ?search, ?genre, ?page, ?limit
- GET /api/books/{isbn} — detail
- POST /api/books — create (admin auth required)
- PUT /api/books/{isbn} — update (admin auth required)
- DELETE /api/books/{isbn} — soft delete (admin auth required)

## Wave 3: Frontend (depends on: Wave 2)

### Task 3.1: Book catalog page
- File: `frontend/pages/Catalog.tsx`
- Shows book grid with cover images
- Search bar with dropdown for field selection
- Genre filter sidebar
- Pagination (20 per page)

### Task 3.2: Book detail page
- File: `frontend/pages/BookDetail.tsx`
- Shows all book fields
- Borrow button (visible when authenticated + copies available)

### Task 3.3: Admin book forms
- Files: `frontend/components/BookForm.tsx`, `frontend/pages/AdminBooks.tsx`
- Add and edit forms with validation
- Admin-only route guard

## Wave 4: Tests (depends on: Wave 3)

### Task 4.1: Backend tests
- Test CRUD endpoints
- Test search functionality
- Test auth enforcement on admin endpoints

### Task 4.2: Frontend tests
- Test catalog page renders books
- Test search filters
- Test form validation

---

**Context fit**: ✅ All waves within limits
**Estimated sessions**: 4 (one per wave)
**Ready for review** — approve, reject, or modify.
```

You review, nod, and say "Approved." The agent proceeds to execute. Or you notice the agent forgot loading states — you add a note, and the agent updates the plan.

## Summary

| Aspect | Detail |
|---|---|
| **Command** | `/gsd-plan-phase <N>` |
| **Prerequisite** | Context file from `/gsd-discuss-phase` |
| **Output** | `{phase}-PLAN.md` |
| **Key concept** | Waves = parallel execution groups |
| **Auto-check** | Agent verifies completeness, ordering, context fit |
| **GATE** | You must review and approve before execution |
| **Est. time** | 2-5 minutes generation, 5-10 minutes review |

**Next**: With your plan approved, move to [07 — Choosing Your Tech Stack](07-tech-stack.md) (if you haven't already) or proceed to execution.

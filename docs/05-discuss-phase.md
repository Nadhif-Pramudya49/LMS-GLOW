# 05 — Capturing Decisions with `/gsd-discuss-phase`

## Why Discuss Before You Plan?

Every project failure story starts the same way: someone built the wrong thing. They coded for hours, maybe days, only to discover the feature they implemented doesn't match what the stakeholder actually needed. The `/gsd-discuss-phase` command exists to prevent exactly that.

This command runs an **adaptive questioning session** before any planning or coding begins. Its job is to pull context *out of your head* (or your team's head) and into structured files the agent can reference later. It prevents the AI from making assumptions about your project — and believe me, it will make assumptions if you let it.

## Prerequisites

Before you can run `/gsd-discuss-phase`, you need a roadmap. The command reads your `.planning/ROADMAP.md` file to understand the overall project structure, then drills into a specific phase.

```
isd-project/
├── .planning/
│   ├── ROADMAP.md          # ← Must exist
│   └── ... 
└── docs/
    └── ...
```

If you haven't created your roadmap yet, go back to tutorial [04-new-project.md](04-new-project.md) and do that first.

## How It Works

The command takes a phase number as its argument:

```
/gsd-discuss-phase 1
```

This tells the agent: "Phase 1 is up next. Before we write any code, interview me about it."

The agent will then ask a series of questions. The questions aren't random — they're generated dynamically based on:

- The **feature IDs** (F-IDs) assigned to this phase in ROADMAP.md
- The **type** of each feature (UI, API, database, auth, etc.)
- The **dependencies** between features
- The **tech stack** you've chosen (if documented)

### What Kind of Questions?

For a Library Management System Phase 1 (the catalog feature), expect questions like:

- "F-001 (Book Catalog CRUD): Should users be able to search books by title only, or also by author, genre, and ISBN?"
- "What fields do you need on a book record? Title, author, ISBN, cover image, description?"
- "Should the catalog be visible to unauthenticated users, or do they need to log in first?"
- "Any constraints on ISBN — must it be unique, valid format, optional?"
- "For the search feature, do you need fuzzy search (partial matches) or exact match only?"
- "Should the catalog support pagination? If so, how many results per page?"

Each answer becomes part of the permanent project record.

## Flags and Modes

The command supports several flags for different workflows:

### Interactive Mode (Default)

```
/gsd-discuss-phase 1
```

The agent asks one question at a time, waits for your answer, then adapts the next question based on what you said. This is the recommended mode for most sessions — you can think deeply about each decision without getting overwhelmed.

### Auto Mode

```
/gsd-discuss-phase 1 --auto
```

The agent generates a complete context document without asking you any questions. It uses:

- The ROADMAP.md definitions
- Common conventions for the tech stack
- Reasonable defaults for everything else

Use this for well-understood features where you don't need deep discussion, or when you want to get a first draft you can later edit.

> **Review required:** `--auto` output is only a draft. A human MUST read, correct, and approve the generated context before running `/gsd-plan-phase` — otherwise the plan can lock in bad assumptions the agent silently invented.

### Batch Mode

```
/gsd-discuss-phase 1 --batch
```

The agent pre-generates *all* its questions and presents them at once. You answer everything in a single shot. This is faster than interactive mode but loses the adaptive questioning — the agent can't follow up on a surprising answer.

### Analyze Mode

```
/gsd-discuss-phase 1 --analyze
```

The agent doesn't ask questions. Instead, it reads any existing context files for the phase and analyzes them for:

- **Gaps**: missing decisions that need to be made
- **Contradictions**: answers that conflict with each other
- **Risks**: decisions that might cause problems later

It produces a report you can use to improve your context before planning.

## What Gets Produced

Running `/gsd-discuss-phase 1` creates two files:

### `01-CONTEXT.md`

A structured document capturing all decisions for the phase. Example snippet for a library system:

```markdown
# Phase 1 — Context: Book Catalog

## F-001: Book CRUD

- Search fields: title, author, genre, ISBN
- Book fields: title, author, ISBN, publication_year, genre, description, cover_image_url, available_copies
- ISBN: required, unique, validated format (13-digit)
- Search: fuzzy (partial title match OK), paginated at 20 results/page
- Authentication required to add/edit books
- Unauthenticated users can browse and search

## F-002: Book Detail View

- URL pattern: /books/{isbn}
- Shows all fields + cover image
- Shows availability status
- "Borrow" button visible if authenticated and copies available

## Design Decisions

- Cover images: stored as URL (external), not uploaded
- Soft delete for books (hide from catalog but keep in DB)
- Audit log: track who added/edited each book
```

### `01-DISCUSSION-LOG.md`

A transcript of the conversation. This is useful for:

- **Audit**: see how decisions were arrived at
- **Revisiting**: if a decision turns out wrong, you can see the reasoning
- **Team handoff**: new team members can catch up on context

```markdown
# Phase 1 — Discussion Log

## Question 1: Search scope
**Agent**: Should users be able to search by...
**You**: Title, author, genre, and ISBN. But not description — that seems excessive for Phase 1.
**Resolution**: Added all four fields. Description search deferred to Phase 2.
```

## Why This Matters

Without `/gsd-discuss-phase`, the agent will eventually need to make assumptions. Here's what happens in practice:

| Without Discussion | With Discussion |
|---|---|
| Agent assumes ISBN is optional | You confirm ISBN is required |
| Agent builds exact-match search | You wanted fuzzy search |
| Agent exposes edit to everyone | You wanted auth required |
| Agent stores 10 results/page | You wanted 20 |

None of those are the agent being "wrong" — they're reasonable defaults. But "reasonable default" for a personal blog is different from "reasonable default" for a library system. The discussion phase bridges that gap.

## Walkthrough: Library System Phase 1

Let's walk through a real session for our Library Management System.

**Setup**: You've created ROADMAP.md with Phase 1 covering F-001 (Book CRUD) and F-002 (Book Detail View), assigned to the catalog feature.

```
/gsd-discuss-phase 1
```

**Agent**: "Let's discuss Phase 1: Book Catalog. Starting with F-001 — Book CRUD."

**Agent**: "Should users be able to search by title, author, genre, or ISBN?"

**You**: "All four, but ISBN should be exact match while the others are fuzzy."

**Agent**: *Records this, adapts next question* "Got it. Should the book record include a cover image? If so, should users upload files or provide a URL?"

**You**: "URL only. Uploading images adds complexity we don't need in Phase 1."

**Agent**: "Agreed. One more on F-001: who can add or edit books?"

**You**: "Only authenticated users with an admin role. Regular members can browse."

**Agent**: "Moving to F-002 — Book Detail View. Should this be at `/books/{id}` or `/books/{isbn}`?"

**You**: "ISBN makes more sense — it's stable and unique."

After about 15–20 questions, the agent confirms it has enough context and generates both files. Total time: ~10 minutes. And now you have a rock-solid foundation for planning Phase 1.

## Summary

| Aspect | Detail |
|---|---|
| **Command** | `/gsd-discuss-phase <N>` |
| **Purpose** | Gather context through adaptive questioning |
| **Prerequisite** | `.planning/ROADMAP.md` must exist |
| **Output** | `{phase}-CONTEXT.md`, `{phase}-DISCUSSION-LOG.md` |
| **Modes** | interactive (default), `--auto`, `--batch`, `--analyze` |
| **Key benefit** | Prevents agent assumptions from derailing your project |

**Next**: With context documented, you're ready for [06 — Planning with /gsd-plan-phase](06-plan-phase.md).

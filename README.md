# Information System Development with Agentic AI & GSD Core

[![GSD Core on npm](https://img.shields.io/npm/v/@opengsd/gsd-core?label=%40opengsd%2Fgsd-core)](https://www.npmjs.com/package/@opengsd/gsd-core)
[![GSD Core GitHub](https://img.shields.io/badge/GitHub-open--gsd%2Fgsd--core-blue)](https://github.com/open-gsd/gsd-core)
[![Audience](https://img.shields.io/badge/audience-CS%20undergraduates-purple)](#who-this-is-for)
[![Approach](https://img.shields.io/badge/approach-spec--first-green)](#core-principles)

A tutorial repo for learning **Information System Development** with agentic AI coding tools and the **open-gsd/gsd-core** framework.

This course teaches CS undergraduate students how to build software with AI coding agents such as **Claude Code** and **Codex**, while keeping humans in control through specification-driven development.

> This tutorial uses **open-gsd/gsd-core**: https://github.com/open-gsd/gsd-core  

Sample project: **Library Management System**.

---

## Table of Contents

- [Who This Is For](#who-this-is-for)
- [What You Will Build](#what-you-will-build)
- [Core Principles](#core-principles)
- [GSD Core Phase Loop](#gsd-core-phase-loop)
- [Two Agent Paths](#two-agent-paths)
- [Quick Start](#quick-start)
- [Tutorial Modules](#tutorial-modules)
- [Suggested Repository Structure](#suggested-repository-structure)
- [Team Collaboration with Git Worktrees](#team-collaboration-with-git-worktrees)
- [Learning Outcomes](#learning-outcomes)
- [Prerequisites](#prerequisites)
- [Reference Links](#reference-links)

---

## Who This Is For

This tutorial is designed for **computer science undergraduate students** who already know basic programming and want to learn how modern software teams can use AI coding agents responsibly.

You do not need to be an expert in AI. You do need to be willing to:

- Ask precise questions.
- Write and refine specifications before coding.
- Review AI-generated work critically.
- Use Git and GitHub professionally.
- Treat the AI agent as a collaborator, not an autopilot.

---

## What You Will Build

Throughout the modules, you will design and implement a **Library Management System**.

Possible features include:

- Book catalog management.
- Member registration.
- Borrowing and returning books.
- Loan history.
- Search and filtering.
- Admin workflows.
- Basic reports.
- Authentication and role-based access, if appropriate for your chosen stack.

The exact implementation is intentionally determined through the GSD process: discussion, planning, execution, verification, and shipping.

---

## Core Principles

### 1. Planning first

No code before specs.

Before asking an AI agent to implement anything, you will first define:

- Goals.
- Users.
- Requirements.
- Constraints.
- Data model.
- Workflows.
- Acceptance criteria.
- Verification steps.

### 2. Human responsibility

AI can generate code, tests, docs, and design options. Humans remain responsible for:

- Product decisions.
- Architecture decisions.
- Security and privacy review.
- Testing and verification.
- Final merge approval.

### 3. Spec-driven development

The specification is the source of truth. Agent output must be checked against the spec, not accepted because it looks plausible.

### 4. Small, reviewable changes

Large tasks are decomposed into smaller tasks that can be implemented, tested, reviewed, and merged safely.

---

## GSD Core Phase Loop

This tutorial uses the **GSD Core** phase loop:

```text
Discuss → Plan → Execute → Verify → Ship
```

Each phase has a clear purpose:

- **Discuss**: explore the problem, capture decisions, clarify requirements.
- **Plan**: research, decompose work, define acceptance criteria.
- **Execute**: implement planned work with an AI coding agent.
- **Verify**: test, inspect, and compare output against the plan.
- **Ship**: prepare the final change for review, merge, and release.

GSD Core provides slash commands such as:

- `/gsd-new-project`
- `/gsd-discuss-phase`
- `/gsd-plan-phase`
- `/gsd-execute-phase`
- `/gsd-verify-work`
- `/gsd-ship`

Install and usage are covered in [Module 3](docs/03-install-gsd-core.md).

---

## Two Agent Paths

This tutorial supports two implementation paths.

### Path A: Claude Code

Use **Claude Code** as the coding agent while following the GSD Core process.

Recommended for students who want a terminal-based agent workflow with strong project-context interaction.

See:

- [Module 2: Install Agent CLIs](docs/02-install-agent-cli.md)
- [Module 10: Build with Claude Code](docs/10-build-with-claude.md)

### Path B: Codex

Use **Codex** as the coding agent while following the same GSD Core process.

Recommended for students who want to compare agent behavior, output style, and workflow differences.

See:

- [Module 2: Install Agent CLIs](docs/02-install-agent-cli.md)
- [Module 11: Build with Codex](docs/11-build-with-codex.md)

Both paths use the same principle: **the plan comes before the code**.

---

## Quick Start

Follow these steps to begin the tutorial.

### 1. Clone this repository

```bash
git clone <your-repo-url> isd-project
cd isd-project
```

### 2. Check required tools

```bash
git --version
node --version
npm --version
gh --version
```

If any command is missing, start with [Module 1: Environment Setup](docs/01-setup-environment.md).

### 3. Install or run GSD Core

```bash
npx @opengsd/gsd-core@latest
```

For details, see [Module 3: Install GSD Core](docs/03-install-gsd-core.md).

### 4. Start the project specification

Use GSD Core to begin deep context gathering:

```text
/gsd-new-project
```

See [Module 4: New Project](docs/04-new-project.md).

### 5. Choose an agent path

Choose one:

- Claude Code path: continue to [Module 10](docs/10-build-with-claude.md).
- Codex path: continue to [Module 11](docs/11-build-with-codex.md).

Do not implement features until you have completed the relevant discussion and planning modules.

---

## Tutorial Modules

- [Module 0: Mindset](docs/00-mindset.md)  
  Why spec-first matters; what agentic AI is and is not.

- [Module 1: Environment Setup](docs/01-setup-environment.md)  
  Install and verify git, Node.js, npm, and GitHub CLI.

- [Module 2: Install Agent CLIs](docs/02-install-agent-cli.md)  
  Install and authenticate Claude Code and Codex.

- [Module 3: Install GSD Core](docs/03-install-gsd-core.md)  
  Run `npx @opengsd/gsd-core@latest` and learn what GSD Core provides.

- [Module 4: New Project](docs/04-new-project.md)  
  Use `/gsd-new-project` for deep context gathering.

- [Module 5: Discuss Phase](docs/05-discuss-phase.md)  
  Use `/gsd-discuss-phase` to explore requirements and capture decisions.

- [Module 6: Plan Phase](docs/06-plan-phase.md)  
  Use `/gsd-plan-phase` to research, decompose, and define verification criteria.

- [Module 7: Tech Stack](docs/07-tech-stack.md)  
  Choose the right stack with agent assistance.

- [Module 8: GitHub Workflow](docs/08-github-workflow.md)  
  Create repositories, branches, issues, and pull requests.

- [Module 9: Worktree Teamwork](docs/09-worktree-teamwork.md)  
  Use git worktrees for parallel team development.

- [Module 10: Build with Claude Code](docs/10-build-with-claude.md)  
  Use `/gsd-execute-phase` with Claude Code.

- [Module 11: Build with Codex](docs/11-build-with-codex.md)  
  Use `/gsd-execute-phase` with Codex.

- [Module 12: Verify & Ship](docs/12-verify-and-ship.md)  
  Use `/gsd-verify-work` and `/gsd-ship` before merging.

- [Module 13: Reviewing AI Code](docs/13-reviewing-ai-code.md)  
  Perform human and AI-assisted review before merge.

---

## Suggested Repository Structure

```text
isd-project/
├── README.md
├── docs/
│   ├── 00-mindset.md
│   ├── 01-setup-environment.md
│   ├── 02-install-agent-cli.md
│   ├── 03-install-gsd-core.md
│   ├── 04-new-project.md
│   ├── 05-discuss-phase.md
│   ├── 06-plan-phase.md
│   ├── 07-tech-stack.md
│   ├── 08-github-workflow.md
│   ├── 09-worktree-teamwork.md
│   ├── 10-build-with-claude.md
│   ├── 11-build-with-codex.md
│   ├── 12-verify-and-ship.md
│   └── 13-reviewing-ai-code.md
├── specs/
│   ├── project-brief.md
│   ├── requirements.md
│   ├── architecture.md
│   └── decisions.md
├── app/
│   └── library-management-system/
└── tests/
```

Your instructor may adjust this structure for a specific class, stack, or assignment.

---

## Team Collaboration with Git Worktrees

Students often work on different features at the same time. This tutorial includes a worktree-based workflow so each feature can be developed in isolation.

Example:

```bash
git worktree add ../isd-project-catalog feature/catalog
git worktree add ../isd-project-members feature/members
git worktree add ../isd-project-loans feature/loans
```

Benefits:

- Multiple branches can be open at once.
- Each teammate can work without constantly switching branches.
- AI agents can operate in separate directories with less risk of overwriting unrelated work.
- Pull requests stay smaller and easier to review.

See [Module 9: Worktree Teamwork](docs/09-worktree-teamwork.md).

---

## Learning Outcomes

By the end of this tutorial, students should be able to:

- Explain what agentic AI coding tools can and cannot do.
- Use GSD Core for spec-driven software development.
- Write useful project context, requirements, and implementation plans.
- Build a Library Management System with either Claude Code or Codex.
- Use GitHub issues, branches, pull requests, and reviews.
- Use git worktrees for parallel team development.
- Verify AI-generated code with tests, inspection, and acceptance criteria.
- Review AI-generated code before merging.

---

## Prerequisites

Recommended baseline:

- Basic programming experience.
- Basic command-line usage.
- Basic Git knowledge.
- A GitHub account.
- Node.js and npm.
- Access to Claude Code and/or Codex, depending on the selected path.

Detailed setup is covered in [Module 1](docs/01-setup-environment.md) and [Module 2](docs/02-install-agent-cli.md).

---

## Reference Links

- GSD Core GitHub: https://github.com/open-gsd/gsd-core
- GSD Core npm package: https://www.npmjs.com/package/@opengsd/gsd-core
- Git: https://git-scm.com/
- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/
- GitHub CLI: https://cli.github.com/
- Claude Code: https://docs.anthropic.com/en/docs/claude-code
- OpenAI Codex: https://openai.com/codex/

---

## Course Reminder

AI can accelerate implementation, but it does not remove the need for software engineering discipline.

**Discuss first. Plan carefully. Execute deliberately. Verify honestly. Ship responsibly.**

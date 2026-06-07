# 07 — Choosing Your Tech Stack

## Why Tech Stack Decisions Matter (Especially with AI)

Your tech stack determines everything: how fast you can build, what the agent can do, how easily your team can collaborate, and where you can deploy. A good stack makes the agent productive. A bad stack means fighting tooling instead of building features.

The AI agent in ISD can work with any stack, but it works *best* with stacks it has good training data for. Popular, well-documented frameworks get better results than niche or bleeding-edge tools.

## How to Decide: Requirements → Constraints → Stack

Follow this decision flow:

```
Project Requirements → Technical Constraints → Team Constraints → Stack Choice
```

### Step 1: List Your Project Requirements

Be specific. Don't say "a web app." Say:

- Users must register and log in (auth)
- Users can search and browse books, rooms, events (CRUD + search)
- Admin users can manage content (admin panel)
- Data must persist in a database (DB)
- Runs in a browser (web frontend)

### Step 2: Identify Constraints

**Technical constraints:**

- Deployment target: free tier (Render, Vercel, Railway), university server, or cloud?
- Performance needs: how many users? Real-time features?
- Integration requirements: do you need to talk to external APIs?

**Team constraints:**

- How many people? What's their experience?
- Do they know Python? JavaScript? TypeScript? Go?
- How much time do you have? (a semester, a hackathon, a month?)

### Step 3: Map to a Stack

Here are the most common stacks for student projects.

## Common Stacks for Student Projects

### FastAPI + React (TypeScript)

**Best for**: Teams that want a modern, type-safe full-stack app. FastAPI has excellent auto-generated docs (Swagger UI). React with TypeScript catches bugs early.

```
Frontend: React + TypeScript + Vite
Backend:  FastAPI (Python)
Database: PostgreSQL or SQLite
ORM:      SQLAlchemy or SQLModel
Deploy:   Render (free tier), Railway, or Vercel + Render
```

**Pros**: FastAPI is Python—easy for beginners. Auto-docs. TypeScript on frontend reduces runtime errors. Vite is fast.

**Cons**: Two languages (Python + TypeScript) means context switching. More boilerplate than all-in-one frameworks.

**Agent quality**: ⭐⭐⭐⭐⭐ — Excellent. Both FastAPI and React/TypeScript are very well-represented in training data.

### Express.js + Vue.js

**Best for**: Teams that want JavaScript/TypeScript end-to-end. Simpler learning curve than React.

```
Frontend: Vue 3 + JavaScript/TypeScript + Vite
Backend:  Express.js (Node.js)
Database: MongoDB or PostgreSQL
ORM/ODM:  Mongoose (Mongo) or Prisma (Postgres)
Deploy:   Render, Railway, Vercel
```

**Pros**: One language everywhere. Vue is easier to learn than React. Express is minimal and flexible.

**Cons**: Express has minimal built-in structure — you need to organize manually. MongoDB can be a trap for relational data.

**Agent quality**: ⭐⭐⭐⭐ — Good. Vue is less represented than React but still very popular.

### Django + HTMX

**Best for**: Small teams that want to move fast with minimal JavaScript. Django's "batteries included" philosophy gives you auth, admin panel, ORM, and migration system out of the box. HTMX lets you add dynamic behavior without writing much JS.

```
Frontend: HTML templates + HTMX + Alpine.js (optional)
Backend:  Django (Python)
Database: PostgreSQL or SQLite
Deploy:   Python Anywhere, Render, Railway
```

**Pros**: One language (Python). Django admin panel = instant CRUD UI. HTMX makes the frontend feel dynamic without a JS framework. Fastest path to a working app.

**Cons**: HTMX apps can become messy at high complexity. Fewer UI component libraries. Django's ORM is good but different from SQLAlchemy.

**Agent quality**: ⭐⭐⭐⭐⭐ — Excellent. Django is extremely well-covered. HTMX is a newer but well-documented addition.

### Next.js (Full-Stack)

**Best for**: Teams comfortable with React that want a single framework for frontend and backend. Next.js gives you API routes, file-based routing, and server-side rendering in one package.

```
Frontend + Backend: Next.js (React + Node.js)
Database:           PostgreSQL via Prisma or Supabase
Auth:               NextAuth.js or Clerk
Deploy:             Vercel (free tier)
```

**Pros**: Single deploy target (Vercel). File-based routing is intuitive. API routes co-located with pages. Excellent developer experience.

**Cons**: Lock-in to Vercel for best performance. Server components can be confusing. Less separation between frontend and backend logic.

**Agent quality**: ⭐⭐⭐⭐⭐ — Excellent. Next.js is one of the most popular frameworks in AI training data.

## Using the Agent to Help Decide

You don't have to figure this out alone. Prompt the agent with your requirements and constraints:

> "I'm building a Library Management System for a university course. 3 team members. We know Python but not much JavaScript. Needs auth, CRUD for books, search, and an admin panel. We'll deploy on the free Render tier. What stack do you recommend?"

The agent will analyze your situation and give a reasoned recommendation, including why each option fits or doesn't.

### Example Agent Response

```
Based on your constraints, I recommend:

**Django + HTMX** (primary suggestion)
- Your team knows Python → zero language switching
- Django admin panel = free admin interface for managing books
- HTMX handles search without page reloads
- SQLite for development, switch to PostgreSQL for production
- Deploys easily on Render free tier
- Auth built into Django (no extra library needed)

**FastAPI + React** (alternative)
- Better if you want practice with modern frontend frameworks
- More boilerplate, steeper learning curve
- Two languages to maintain

Trade-off: Django + HTMX gets you to a working prototype 2-3x faster.
Trade-off: FastAPI + React gives you better separation of concerns.
```

## Document the Decision in PROJECT.md

Once you've chosen, document it. This goes in `PROJECT.md` at the root of your project:

```markdown
# Project Configuration

## Tech Stack

- **Frontend**: Django templates + HTMX + Alpine.js
- **Backend**: Django 5.x (Python)
- **Database**: PostgreSQL (production), SQLite (development)
- **ORM**: Django ORM
- **Auth**: Django built-in authentication
- **Deployment**: Render free tier
- **Testing**: pytest + Django TestCase

## Why This Stack

- Team knows Python, not JavaScript
- Django admin panel reduces admin UI work by ~80%
- HTMX enables dynamic search without a JS framework
- Render provides free PostgreSQL + Python hosting
- Single language = faster development

## Alternatives Considered

- FastAPI + React: rejected because team lacks JS experience
- Next.js: rejected because team isn't familiar with full-stack JS
```

This documentation helps the agent make better decisions during execution. When it needs to create a model, it knows to use Django ORM. When it routes a page, it knows to use Django URL patterns. The stack is a *constraint* that guides all future code generation.

## Checklist

Before moving on:

- [ ] Team skill levels inventoried
- [ ] Deployment target chosen
- [ ] Database decided (SQLite vs PostgreSQL vs others)
- [ ] Frontend framework selected
- [ ] Backend framework selected
- [ ] Decision documented in PROJECT.md
- [ ] Team agrees on the choice

## Summary

| Stack | Best For | Language | Agent Quality |
|---|---|---|---|
| FastAPI + React | Type-safe full-stack | Python + TS | ⭐⭐⭐⭐⭐ |
| Express + Vue | JS end-to-end, simpler | JavaScript | ⭐⭐⭐⭐ |
| Django + HTMX | Fast MVP, Python-only | Python | ⭐⭐⭐⭐⭐ |
| Next.js | All-in-one React | TypeScript | ⭐⭐⭐⭐⭐ |

**Rule of thumb**: Pick the stack where your team knows at least one language well. The agent adapts to your stack, not the other way around.

**Next**: With your tech stack chosen, head to [08 — GitHub Workflow for Agent-Driven Development](08-github-workflow.md) to set up your repository.

# 00 — Why Spec-First Matters

Welcome to the very first lesson of this tutorial. Before you install a single tool or type a single command, you need to understand *how to think* about building software with AI. This mindset is the foundation everything else rests on. Skip it, and you will spend hours fighting your tools. Internalize it, and the rest of this tutorial will feel almost effortless.

## What Agentic AI Actually Is

You have probably heard a lot of hype about AI writing code. Tools like **Claude Code** and **Codex** are part of a new category called *agentic AI* — AI systems that don't just answer questions, but actually *take actions* on your behalf. They can read your files, write new files, run commands in your terminal, search the web, run tests, and fix the bugs they find.

Think of an agentic AI like an extremely fast, tireless, and well-read junior developer. It has read more documentation than any human ever could. It can type at superhuman speed. It never gets bored or tired. Give it a clear, well-scoped task and it will often produce excellent results in seconds.

But — and this is the part the hype videos never tell you — that junior developer has some serious quirks:

- It has **no memory** of yesterday's conversation unless you give it one.
- It is **eager to please**, which means it will happily *guess* when it doesn't know something.
- It has **no idea what you actually want** unless you tell it precisely.
- It works in a **limited window of attention** that fills up and degrades over time.

## What Agentic AI Is *Not*

Let's be blunt: **agentic AI is not magic.** It is not a mind reader. It cannot intuit the unstated requirements living inside your head. It does not "just know" that your library system needs to handle overdue fines, or that your e-commerce app must support refunds, unless you write that down somewhere it can read.

When people are disappointed by AI coding tools, it is almost never because the AI is "dumb." It is because the human gave a vague instruction like *"build me a task management app"* and then was surprised when the result didn't match the very specific app they were imagining.

Here is the uncomfortable truth: **the AI built exactly what you asked for. You just asked for the wrong thing — or asked too vaguely.**

This brings us to the single most important principle in this entire course.

## The Core Principle: Spec-First, Always

> **An information system shall NEVER be built without proper specifications first.**

Read that again. Burn it into your memory. This is not a "nice to have." It is the law of this course.

A *specification* (or "spec") is simply a clear, written description of:

- **What** you are building
- **Who** it is for
- **What** it must do (features and behaviors)
- **What** it must *not* do (scope boundaries)
- **What** constraints apply (technology, deadlines, rules)

When you have a spec, the AI has a source of truth to anchor itself to. When you don't, the AI is forced to invent one — and that is where everything goes wrong.

## The Danger of "Just Build It"

The most tempting and most destructive thing you can do is open your AI tool and type:

```
build me a library management system
```

It feels productive. The AI will start typing immediately. Code will fly across your screen. It looks like magic.

Then you actually look at what it built, and you find:

- It assumed you wanted a web app, but you needed a command-line tool.
- It invented a "membership tier" feature you never asked for.
- It used a database you've never heard of and can't run.
- It skipped the one feature you actually cared about.
- Half the features contradict the other half.

This phenomenon has a name: **hallucinated requirements.** When you don't give the AI a spec, it doesn't stop and refuse to work. Instead, it *fills the gaps with plausible-sounding guesses.* Each guess seems reasonable in isolation, but together they form a system nobody asked for. And because the AI is confident, it presents these guesses as if they were your decisions.

The worst part? You often don't notice until you're hundreds of lines deep, at which point unwinding the wrong assumptions costs more time than starting over would have.

## The House-Building Analogy

Imagine you hire a contractor to build your dream house. You meet them on an empty lot and say:

> "Build me a house. I'll be back in three months."

Then you leave. No blueprints. No discussion of how many bedrooms. No mention of your budget, the local building codes, or the fact that you need wheelchair access.

What do you think you'll come back to?

You might get a beautiful house — but it will be *the contractor's* dream house, not yours. Maybe it has one bedroom when you needed four. Maybe the kitchen is gorgeous but there's no garage for your car. Maybe it violates code and has to be torn down.

No competent contractor would actually accept that job. They would insist on **blueprints first.** They would sit with you and ask: How many rooms? What's your budget? Where do the pipes go? What does the city require? Only *after* the blueprint is signed off do they pour a single bag of concrete.

**A specification is your blueprint.** And your AI agent is the contractor. You would never let a contractor build without blueprints — so never let an AI build without specs.

## GSD Core: A Disciplined Phase Loop

Knowing you *should* write specs is one thing. Actually doing it consistently, with structure, is another. This is where **GSD Core** comes in — the framework this entire tutorial is built around.

GSD Core enforces a repeating loop of phases. Every meaningful piece of work flows through these five stages, in order:

### 1. Discuss

Before any code is written, you and the AI *talk through* what you're about to build. You capture decisions: Which approach? Which library? What are the edge cases? These decisions get written down so they survive the conversation. This is where you catch wrong assumptions *before* they become code.

### 2. Plan

The AI researches the problem, breaks the work into small concrete steps, and produces a detailed plan. Crucially, the plan is *verified* before execution — you and the AI check that it actually addresses the spec. A good plan reads like a recipe: anyone could follow it.

### 3. Execute

Now — and *only* now — does code get written. The AI follows the plan step by step. Because there's a plan and a spec to anchor against, there's no room for hallucinated requirements. Execution can even happen in parallel "waves" for speed.

### 4. Verify

The work is tested against the spec. Does it actually do what the spec said? GSD Core includes user-acceptance testing (UAT) with automatic diagnosis when something fails. Verification catches the gap between "the code runs" and "the code does what we wanted."

### 5. Ship

Finally, the finished, verified work is packaged up — typically as a pull request — and the phase is archived. The project moves forward cleanly, with a permanent record of what was done and why.

Then the loop repeats for the next phase. **Discuss → Plan → Execute → Verify → Ship.** Over and over. Each cycle is small, focused, and grounded in specs.

## The Hidden Enemy: Context Rot

There's one more concept you must understand, because it explains *why* GSD's structure works so well. It's called **context rot.**

Every AI model has a "context window" — the amount of text it can pay attention to at once. Think of it like the AI's working memory or its desk space. As your conversation grows — more files read, more commands run, more back-and-forth — that desk gets more and more cluttered.

Here's the problem: **AI quality degrades as the context fills up.** This isn't a bug; it's a fundamental property of how these models work. When the window is nearly full, the AI:

- Starts forgetting earlier instructions
- Loses track of decisions made hours ago
- Confuses details from unrelated parts of the project
- Gets slower and less precise
- Begins re-hallucinating things you already corrected

You may have experienced this yourself: a long chat that started great but gradually became frustrating, as if the AI got "dumber" over time. It didn't get dumber — its desk just got buried in clutter.

### How GSD Solves Context Rot

GSD Core's structure is specifically designed to fight context rot. The key insight is this: **don't make one AI do everything in one giant conversation.**

Instead, GSD spins up **fresh subagents** for focused tasks. A subagent is a brand-new AI instance with a clean desk — empty context, full attention. It receives only the specific spec and plan it needs for its narrow task, does that task brilliantly, reports back, and then disappears.

Because each subagent starts fresh, it never suffers from context rot. It never gets buried in irrelevant history. The structured artifacts — your spec files, plan files, and state files — act as the *durable memory* that survives between subagents. The AI's working memory stays clean; the project's knowledge lives safely in files on disk.

This is the magic that *actually* makes AI development reliable. Not bigger models. Not cleverer prompts. **Structure.** Specs that persist, plans that guide, and fresh agents that never rot.

## Summary

Let's summarize the mindset you're carrying into the rest of this tutorial:

1. **Agentic AI is a powerful tool, not magic.** It does exactly what you ask — so ask precisely.
2. **Never build without a spec.** Vague instructions produce hallucinated requirements.
3. **Specs are blueprints.** You wouldn't build a house without them; don't build software without them either.
4. **Follow the phase loop:** Discuss → Plan → Execute → Verify → Ship.
5. **Beware context rot.** Long conversations degrade AI quality.
6. **Let structure save you.** GSD uses fresh subagents and persistent files so quality never rots.

The mindset is simple: **the spec is the truth, the code is just an implementation detail.** If the spec is wrong, the code will be wrong. If the spec is right, the agent can build it.

If this feels like more discipline than just "chatting with an AI," that's because it *is.* But it's the difference between a hobbyist who occasionally gets lucky and a professional who reliably ships working systems. By the end of this course, this discipline will feel natural — and you'll never want to "just build it" again.

In the next chapter, we'll get our hands dirty and set up the development environment you'll need.

➡️ Continue to [01 — Setting Up Your Environment](01-setup-environment.md)

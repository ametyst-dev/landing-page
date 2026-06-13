# Sprint 0006 — landing-v2

## Meta
channel: sprint-0006-landing-v2
agent_name: landing-page
sprint_goal: Rebuild the Ametyst landing page around access-first positioning with a Hermes-style animated chat demo as the hero centerpiece, converting to discovery calls. Copy is locked in the "Locked copy source" section below (verbatim source of truth). No product links until Patrick's product-ready signal.

## Context

This sprint rebuilds the public landing page (ametyst.ai) from its current thin, off-positioning state into the access-first showcase defined in PRD-landing-v2. The hero becomes "One key. Every AI service." with a scripted typing chat demo replacing the "Product demo coming soon" placeholder. New Problem and Personas sections tell the two-sided story (access for the champion, spend visibility for the buyer). All product links (skill URLs, setup-mode section, Skill.md in the TopBar) are removed until the product-ready signal. Primary conversion is the discovery call (`/book`); the waitlist is secondary everywhere. Visual identity (palette, fonts, light mode) is untouched, and the metadata gets a GEO pass so the page doubles as GEO seed page #1.

Repo context: Next.js 15 App Router + TypeScript + Tailwind, `output: 'standalone'` (do not remove). Single page assembled in `app/page.tsx` from 5 components: `TopBar`, `Hero`, `HowItWorks`, `Waitlist`, `EndStrip`. NOTE: `EndStrip.tsx` is the footer (X/LinkedIn links); the CTA section + waitlist form is `Waitlist.tsx`. Palette is semantic CSS vars defined in `app/globals.css` and aliased in `tailwind.config.ts` (`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-btn-bg`, `text-btn-fg`, `border-btn-border`); current components violate the no-hex repo rule with inline `#7A1FFF` styles — all rewritten code must use the semantic aliases. Waitlist API (`app/api/waitlist/route.ts`, honeypot field — never remove) and `/book` (Cal.com embed) stay untouched at the backend level. No animation libraries are present and none may be added.

### Dependencies and risks
- Step 0 first; Step 1 before Step 2 (page shell and section order must exist). Inside Step 2, order the chunks: Problem + Personas first, then ChatDemo, then metadata + acceptance sweep last (the sweep validates everything before it).
- Copy verbatim risk: guarded by the Step 2 acceptance sweep + the ChatDemo script test.
- Demo script is illustrative: label it as such until aligned with real MCP output (open item, not blocking).
- Honeypot/waitlist regression: the Waitlist.tsx rewrite must keep the hidden field and POST shape; covered by Step 0 tests.
- Stabilization can span multiple iterations per repo, each with its own STEP_DONE and incremented macro_step number.

## Architecture Decision Records

### ADR-001 — ChatDemo as a pure React + CSS scripted animation
- **Context:** The hero demo must show typing + staggered tool calls + loop, with no backend and no live LLM.
- **Decision:** Client component with a timer-driven state machine over a typed constant array of script lines; CSS transitions for reveals; `prefers-reduced-motion` renders the complete static script.
- **Alternatives:** Animation library (framer-motion) — rejected: not in the repo, adds bundle weight for one component. Video/GIF — rejected: heavy, not crisp, hard to update when the script aligns with real MCP output later.
- **Consequences for this repo:** Zero new runtime dependencies; script updates are a one-constant edit; animation logic is testable.

### ADR-002 — One waitlist form; hero secondary CTA scrolls to it
- **Context:** "Join the waiting list" appears in the hero and in the final CTA, but duplicating the form means duplicate state/submission paths.
- **Decision:** The form lives only in the final CTA section (`Waitlist.tsx`); the hero secondary button smooth-scrolls to its anchor (same pattern as TopBar's `scrollToSection`).
- **Alternatives:** Two forms — rejected: double honeypot/state handling, no conversion benefit. Modal — rejected: new pattern, more code.
- **Consequences for this repo:** `/api/waitlist` untouched; one submission path to test; hero stays light.

### ADR-003 — Keep existing component names; map by role
- **Context:** The PRD table names a `Footer` component and an `EndStrip` final CTA, but in the repo `EndStrip.tsx` is the footer and `Waitlist.tsx` is the CTA section.
- **Decision:** Map by role, not by PRD name: Final CTA = `Waitlist.tsx` (rewrite), Footer = `EndStrip.tsx` (edit). Document the mapping in `docs/README.md`.
- **Alternatives:** Rename to match the PRD — rejected: churn in imports/docs with zero user-facing value.
- **Consequences for this repo:** Smallest diff; PRD traceability handled by the docs update in Step 2 (Part C).

## Test strategy

- **Test command:** `npm test` (Vitest — set up in Step 0)
- **Unit tests:** waitlist API validation (email format, honeypot rejection, Google Script fetch mocked); ChatDemo script constant matches the locked copy verbatim; ChatDemo reduced-motion static render.
- **Integration tests:** render the `app/page.tsx` composition and assert section order and key headings.
- **Not tested:** animation timing aesthetics, Cal.com embed internals, Google Sheets forwarding (external), metadata content.
- **Credentials:** none needed — `GOOGLE_SCRIPT_URL` is only used at runtime by the API route and is mocked in tests. No `.env.test` required (document this in CLAUDE.md `## Testing`).

## Macro steps

### Step 0 — Test infrastructure setup
**What:** Add Vitest + React Testing Library (jsdom environment). Add a `test` script to `package.json`, a `vitest.config.ts`, a `## Testing` section to the repo CLAUDE.md (test command, framework, conventions, note that no `.env.test` is required — `GOOGLE_SCRIPT_URL` is mocked in tests), and 2-3 exemplary tests: waitlist API route validation (valid email accepted, missing/invalid email rejected, filled honeypot rejected — mock the Google Script fetch) and a render test of an existing component.
**Why:** The repo has zero test infrastructure; later steps (ChatDemo state machine, copy verbatim checks) need a place to put logic tests.
**Output:** `npm test` runs green; CLAUDE.md documents the test setup.
**Touches in this repo:**
- `package.json`, `vitest.config.ts` — test tooling (devDependencies: vitest, @testing-library/react, @testing-library/jest-dom, jsdom)
- `__tests__/` (or `*.test.tsx` colocated) — exemplary tests
- `CLAUDE.md` — add `## Testing` section

### Step 1 — Shell + existing sections rewrite (locked copy)
**What:** Apply the locked copy (see "Locked copy source" at the bottom of this file) verbatim to all existing components. TopBar: remove the `Skill.md` link entirely, relabel the CTA to "Book a discovery call" → `/book`. Hero: H1 "One key. Every AI service.", sub "Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use.", primary CTA (purple, links `/book`) "Book a discovery call" + secondary CTA (white/outline) "Join the waiting list" that smooth-scrolls to the waitlist form anchor; remove the video placeholder block. HowItWorks: rewrite as the 3 wallet-centric steps from the locked copy (Create your wallet / Set the policies / Connect your agents to the wallet), and DROP the entire setup-mode block (skill URL code snippet, copy button, agent-assisted/manual cards). Waitlist.tsx becomes the Final CTA section: header "Give your agents a wallet.", primary CTA "Book a discovery call" → `/book`, waitlist form kept as secondary (form markup, honeypot field, POST shape, success/error states all unchanged). EndStrip (footer): add tagline "Wallets for agents. Built in Europe. © 2026 Ametyst." and keep the X / LinkedIn links. Replace all hardcoded hex with semantic Tailwind aliases in every touched file.
**Why:** Gets the page on-positioning end-to-end with locked copy before new components land; removes all product links (PRD decision: no product links in v1).
**Output:** Page renders TopBar → Hero → HowItWorks → FinalCTA → Footer with v2 copy, no skill URLs anywhere, `npm run build` green.
**Touches in this repo:**
- `components/TopBar.tsx` — drop Skill.md link, relabel CTA
- `components/Hero.tsx` — new copy + 2 CTAs, drop video placeholder
- `components/HowItWorks.tsx` — 3 new steps, drop setup-mode block
- `components/Waitlist.tsx` — final CTA rewrite (form + honeypot kept)
- `components/EndStrip.tsx` — footer tagline

### Step 2 — Page completion: Problem + Personas + ChatDemo + metadata/acceptance sweep
> **Note:** this step merges the former Steps 2, 3 and 4 (guidelines updated 2026-06-11 by orchestrator — step numbers changed; the former Step 5 Stabilization is now Step 3). Plan it as a single macro step with chunked execution in this order: (A) Problem + Personas, (B) ChatDemo, (C) metadata + docs + acceptance sweep. Each part below keeps its full original spec.

**Part A — New sections: Problem + Personas**
Create `components/Problem.tsx` (header "Agents can do the work. Paying for it is broken.", two columns: access/keys left, invisible spend right) and `components/Personas.tsx` (champion left "Your whole day already runs through agents.", buyer right "Every call, on the books."), copy verbatim from the locked copy source. Insert into `app/page.tsx` in PRD order: Hero → (ChatDemo slot, added in Part B) → Problem → Personas → HowItWorks. Semantic aliases only, symmetric columns, mobile stacking (grid-cols-1 md:grid-cols-2). No policy code block in Personas.

**Part B — ChatDemo component**
Create `components/ChatDemo.tsx`: "See it in action" label + terminal-style card animating the locked demo script (the user prompt types itself character by character, tool-call lines reveal one by one with their costs, the done lines close, pause, then loop). Pure React client component with a timer-driven state machine + CSS transitions — no animation libraries. Script lines stored as a typed constant array with the EXACT strings from the locked copy script (see bottom of this file). Respect `prefers-reduced-motion`: render the complete static script with no animation. Style: light-mode terminal card within the existing palette and semantic aliases, monospace via Tailwind `font-mono`. Insert in `app/page.tsx` between Hero and Problem. Unit-test the script constant (verbatim match against expected strings) and the reduced-motion static render.

**Part C — Metadata, docs, acceptance sweep**
Update `app/layout.tsx` metadata with GEO phrasings ("MCP wallet", "agent payments", "let my agent pay for tools", "AI spend management") in description/keywords; title and description without em/en dashes, "agents" not "AI agents" in human-readable copy (keywords arrays may keep GEO phrases containing "AI"). Update `docs/README.md` "What's inside" with `ChatDemo`, `Problem`, `Personas` and the new section list (including the Waitlist→FinalCTA and EndStrip→footer role mapping). Verify footer X (x.com/ametyst_xyz) and LinkedIn (linkedin.com/company/ametyst-xyz) URLs resolve. Full acceptance sweep: grep rendered copy for em dashes and "AI agents", grep new code for hardcoded hex, confirm no skill URL/install command anywhere in the UI (`public/*.md` skill files stay on disk but unlinked), `npm run build` + `npm test` green.

**Why:** Completes the entire page in one macro step — the two-sided story sections, the demo centerpiece, and the GEO/acceptance closure. Single-repo sprint: one orchestration cycle instead of three.
**Output:** Full page renders in PRD order (TopBar → Hero → ChatDemo → Problem → Personas → HowItWorks → FinalCTA → Footer); demo animates and loops with reduced-motion fallback; all PRD acceptance criteria check out; build + tests green.
**Touches in this repo:**
- `components/Problem.tsx` — new component
- `components/Personas.tsx` — new component
- `components/ChatDemo.tsx` — new component
- `app/page.tsx` — imports + section order
- `app/layout.tsx` — GEO metadata
- `docs/README.md` — component inventory update
- `__tests__/` — script verbatim + reduced-motion tests, section render tests
- repo-wide — verification sweep only (no functional changes)

### Step 3 — Stabilization
**What:** Absorb fixes that surface after the main steps: visual polish on demo timing, responsive issues, copy mismatches found in review, link fixes. No pre-defined touches — this step absorbs upgrades and fixes that surface after the main steps are done.
**Why:** Standard final step. Stabilization can span multiple iterations per repo — each iteration produces its own STEP_DONE with an incremented macro_step number.
**Output:** Page fully matches the PRD acceptance criteria; ready for publish pending the GEO wiki pass (open item outside this sprint).
**Touches in this repo:** none pre-defined.

## Constraints

- Copy is LOCKED — every section's copy must match the "Locked copy source" below character-for-character. Never rephrase, summarize, or "improve" it.
- No em dashes anywhere in page copy. "agents", never "AI agents", in body copy.
- No product links: no skill URLs, no install commands, no onboarding into the product anywhere in the UI.
- No hardcoded hex in new/rewritten code — semantic Tailwind aliases only (`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-btn-bg`, `text-btn-fg`).
- Light mode only; palette and fonts untouched; no `dark:` variants.
- Do not remove `output: 'standalone'` from `next.config.js`. Do not touch the waitlist honeypot or `/api/waitlist` backend. Do not touch `/book`.
- No new runtime dependencies (dev-only test tooling from Step 0 is the exception).
- Honesty constraints (product V0): no banking/cards claims, no audited-contract claims, no EMI/MiCA claims.
- All UI sections are components in `components/`, imported in `app/page.tsx`. Update `docs/README.md` when adding components.

## Definition of done

- [ ] All sections render in PRD order with copy verbatim from the locked copy source
- [ ] Chat demo animates (typing + staggered tool calls + loop), matches script verbatim, reduced-motion fallback works
- [ ] No `Skill.md` in TopBar, no setup-mode section, no skill URL or install command anywhere
- [ ] Primary CTA → `/book` everywhere; waitlist posts to `/api/waitlist` successfully
- [ ] Footer tagline present; X / LinkedIn links verified
- [ ] No hardcoded hex in new code; palette/fonts/light-mode untouched; no em dashes; "AI agents" absent from body copy
- [ ] `docs/README.md` updated (`ChatDemo`, `Problem`, `Personas`); CLAUDE.md has `## Testing`
- [ ] `npm run build` passes; all tests pass

---

## Locked copy source (verbatim, from landing-copy-v2.md)

### TopBar
Left: **Ametyst** (logo, links home)
Right: **Book a discovery call** (button, links `/book`)

### 1. Hero
**H1:**
One key. Every AI service.

**Sub:**
Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use.

**CTA (primary, purple):** Book a discovery call
**CTA (secondary, white/outline):** Join the waiting list

### 2. Chat demo
**Label:** See it in action

**Script (illustrative, to align with real MCP output when testable):**

```
> Find 50 fintech founders across Europe with verified emails and draft my outreach

⏺ ametyst · wallet connected · policy gtm: €50/week, €18.40 used
⏺ exa.search   "fintech founders Europe"          €0.05
⏺ apify.linkedin   50 profiles                    €0.85
⏺ apollo.enrich   +verified emails                €1.20
⏺ claude   drafting 50 outreach messages          €0.31
✓ Done. Here's your file: outreach-fintech-eu.csv
  50 contacts, 50 drafts. Total €2.41, within policy.
```

### 3. Problem
**Header:** Agents can do the work. Paying for it is broken.

**Left column (access):**
Every service your agent calls wants its own account, its own credits, its own API key. Across a team that becomes hundreds of keys: created, pasted into Notion, shared in DMs, forgotten. One shared key in the wrong place and production goes down.

**Right column (spend):**
Meanwhile the AI bill grows and nobody can see it. No limits per person, no limits per agent, no view of where the money goes. Intelligence is becoming a real line on the P&L, and right now it's invisible.

### 4. Personas (two columns: champion left, buyer right)
**Left column (champion):**

#### Your whole day already runs through agents.
Every task you ship leans on a stack of external tools: search, scraping, enrichment, models. The bottleneck is everything around them: a subscription here, a credit pack there, another account to create. With one wallet your agents reach the best provider for every step of the task and pay only for what they use.

**Right column (buyer):**

#### Every call, on the books.
Spend per person, per agent, per service, in real time. Limits are enforced by the wallet itself, not a dashboard warning after the money is gone. Your team moves faster. You finally see the bill.

### 5. How it works
**Header:** How it works

**Step 1 — Create your wallet.**
Open your workspace and create a wallet for your agents.

**Step 2 — Set the policies.**
Decide how much the wallet can spend, and on which services.

**Step 3 — Connect your agents to the wallet.**
One command links them. From there they pay for what they use, within policy.

### 6. Final CTA
**Header:** Give your agents a wallet.

**CTA (primary, purple):** Book a discovery call
**CTA (secondary, white/outline):** Join the waiting list

### Footer
Wallets for agents. Built in Europe. © 2026 Ametyst.
[X] [LinkedIn] (verify both links work during build: x.com/ametyst_xyz, linkedin.com/company/ametyst-xyz)

# Sprint 0006 — Step 2: Page completion (Problem + Personas, ChatDemo, metadata/acceptance)

## Context

Macro Step 2 of sprint-0006-landing-v2 — the merged step (ex steps 2/3/4 are now Parts A/B/C of a single Step 2; Stabilization is Step 3). Steps 0-1 are merged (PRs #3, #4). This step completes the page: new Problem + Personas sections, the ChatDemo centerpiece, GEO metadata, docs update, and the full PRD acceptance sweep. Sub-branch: `landing-v2-step-2`.

## Findings from codebase analysis

- `app/page.tsx` current order: TopBar → Hero → HowItWorks → Waitlist → EndStrip. Target PRD order: TopBar → Hero → **ChatDemo** → **Problem** → **Personas** → HowItWorks → Waitlist(FinalCTA) → EndStrip.
- `app/layout.tsx` metadata violates the new constraints: title `"Ametyst – Wallets for AI Agents"` contains an en dash AND "AI Agents"; description says "AI agents"; keywords lack the 4 GEO phrasings. OG and Twitter blocks duplicate title/description — all three spots must change consistently.
- No `matchMedia` in jsdom by default → ChatDemo must guard `window.matchMedia` access, and tests must stub it.
- Existing test patterns to reuse: `__tests__/sections.test.tsx` (render + verbatim copy asserts, `afterEach(cleanup)`), `vi.stubGlobal` pattern.
- Demo script lines contain `⏺`, `·`, `€`, internal multi-space alignment — must be stored verbatim (test asserts character-for-character), rendered with `whitespace-pre` + `font-mono`.
- Locked copy for Problem/Personas contains apostrophes (`it's`, `Here's`) → use `&apos;` in JSX (existing pattern in Waitlist).
- Footer links to verify: `x.com/ametyst_xyz`, `linkedin.com/company/ametyst-xyz` (curl check during sweep).

## Decisions

- **ADR-001 applies (ChatDemo)**: pure React client component, timer-driven state machine over a typed constant array (`CHAT_DEMO_SCRIPT`, exported for the verbatim test), CSS transitions, zero animation libraries. `prefers-reduced-motion` → render the complete static script, no timers.
- **Script line model**: `{ kind: "prompt" | "status" | "tool" | "done" | "detail", text: string }[]` — text strings are byte-identical to the locked script (including alignment spaces). Prompt types char-by-char; the other lines reveal one-by-one; pause ~3s; loop by resetting state.
- **"Illustrative demo" caption**: per the guidelines' risk note ("Demo script is illustrative: label it as such"), a small `text-muted` caption `Illustrative demo` is rendered under the terminal card. It is a label, not locked page copy.
- **Metadata rewrite**: title `Ametyst | Wallets for Agents` (no dashes, no "AI agents"); description (no dashes, "agents" only): `Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use. Set policies, track every agent payment, and manage AI spend in real time.`; keywords gain the 4 GEO phrasings (`MCP wallet`, `agent payments`, `let my agent pay for tools`, `AI spend management`) — keywords may keep "AI" phrases. OG + Twitter mirror title/description.
- **Page-order integration test** (from sprint test strategy) lands in the final acceptance chunk, when the full PRD order exists.
- **ADR-002/003 untouched** (no new forms, no renames).

## Operational guide

### Part A — `components/Problem.tsx` + `components/Personas.tsx` (new), wire into page

**`components/Problem.tsx`** (new, server component):
- `<section id="problem" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">`
- h2 (verbatim): `Agents can do the work. Paying for it is broken.` — classes `text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center`
- `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">`, two symmetric `<p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">`:
  - Left (verbatim): `Every service your agent calls wants its own account, its own credits, its own API key. Across a team that becomes hundreds of keys: created, pasted into Notion, shared in DMs, forgotten. One shared key in the wrong place and production goes down.`
  - Right (verbatim): `Meanwhile the AI bill grows and nobody can see it. No limits per person, no limits per agent, no view of where the money goes. Intelligence is becoming a real line on the P&L, and right now it's invisible.` (`it&apos;s` in JSX)

**`components/Personas.tsx`** (new, server component):
- Same section shell, `id="personas"`.
- `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto`, two columns each with h3 (`font-body text-xl md:text-2xl font-bold text-fg mb-3`) + paragraph (`font-body text-base md:text-lg text-fg/80 leading-relaxed`):
  - Champion left — h3 (verbatim): `Your whole day already runs through agents.`; p (verbatim): `Every task you ship leans on a stack of external tools: search, scraping, enrichment, models. The bottleneck is everything around them: a subscription here, a credit pack there, another account to create. With one wallet your agents reach the best provider for every step of the task and pay only for what they use.`
  - Buyer right — h3 (verbatim): `Every call, on the books.`; p (verbatim): `Spend per person, per agent, per service, in real time. Limits are enforced by the wallet itself, not a dashboard warning after the money is gone. Your team moves faster. You finally see the bill.`
- No policy code block.

**`app/page.tsx`**: import Problem and Personas; order becomes Hero → Problem → Personas → HowItWorks (ChatDemo slot filled in Part B).

### Part B — `components/ChatDemo.tsx` (new) + wiring

- `"use client"`. Export the script constant for tests:
```ts
export type ScriptLine = { kind: "prompt" | "status" | "tool" | "done" | "detail"; text: string };
export const CHAT_DEMO_SCRIPT: ScriptLine[] = [
  { kind: "prompt", text: "> Find 50 fintech founders across Europe with verified emails and draft my outreach" },
  { kind: "status", text: "⏺ ametyst · wallet connected · policy gtm: €50/week, €18.40 used" },
  { kind: "tool",   text: "⏺ exa.search   \"fintech founders Europe\"          €0.05" },
  { kind: "tool",   text: "⏺ apify.linkedin   50 profiles                    €0.85" },
  { kind: "tool",   text: "⏺ apollo.enrich   +verified emails                €1.20" },
  { kind: "tool",   text: "⏺ claude   drafting 50 outreach messages          €0.31" },
  { kind: "done",   text: "✓ Done. Here's your file: outreach-fintech-eu.csv" },
  { kind: "detail", text: "  50 contacts, 50 drafts. Total €2.41, within policy." },
];
```
  Strings byte-identical to the locked script (alignment spaces included).
- State machine: `typedChars` (prompt typing, ~30ms/char), then reveal lines 1..7 one-by-one (~600ms each, CSS opacity transition), pause ~3000ms, reset and loop. Timers in `useEffect` with cleanup.
- Reduced motion: `const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches` (read once in state initializer or effect) → render ALL lines statically, no timers.
- Markup: section (`id="chat-demo"`, standard section shell) with label `<p>` (verbatim): `See it in action` (`font-body text-sm md:text-base font-bold text-muted uppercase tracking-wider text-center mb-6`), then the terminal card: `max-w-3xl mx-auto rounded-lg border-2 border-border bg-bg p-4 md:p-6 text-left font-mono text-xs md:text-sm text-fg overflow-x-auto`, each line a `<div className="whitespace-pre ...">` (prompt line + blank line + the 7 lines, matching the script's blank line after the prompt). Caption under the card: `<p className="text-xs text-muted text-center mt-3 font-body">Illustrative demo</p>`.
- `app/page.tsx`: insert `<ChatDemo />` between Hero and Problem.

### Part C — metadata, docs, acceptance sweep

**`app/layout.tsx`** — replace in all 3 spots (metadata, openGraph, twitter):
- title: `Ametyst | Wallets for Agents`
- description: `Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use. Set policies, track every agent payment, and manage AI spend in real time.`
- keywords: `["MCP wallet", "agent payments", "let my agent pay for tools", "AI spend management", "wallets for AI agents", "AI agent wallets", "agent tool access", "pay-per-use AI tools"]`
- og image alt: `Ametyst | Wallets for Agents`. Everything else (icons, metadataBase, locale, twitter site) unchanged.

**`docs/README.md`** — "What's inside": add `ChatDemo.tsx` (animated terminal demo), `Problem.tsx`, `Personas.tsx`; update the role-mapping notes (Waitlist.tsx = Final CTA section per ADR-003, EndStrip.tsx = footer); update the intro "six content sections" if inaccurate.

**Acceptance sweep** (all must pass):
- `grep -rn "—\|–" components/ app/layout.tsx app/page.tsx` → zero hits (em/en dashes)
- `grep -rn "AI agents" components/ app/page.tsx` → zero hits; `grep -n "AI agents" app/layout.tsx` → zero hits outside keywords array (keywords may contain "AI")
- `grep -rnE "#[0-9a-fA-F]{3,6}\b" components/` → zero hits
- `grep -rni "skill\|install" components/ app/page.tsx app/layout.tsx` → zero product-link hits (`public/*.md` stay on disk, unlinked)
- `curl -s -o /dev/null -w "%{http_code}" https://x.com/ametyst_xyz` and `https://www.linkedin.com/company/ametyst-xyz/` → 200/30x
- `npm test` + `npm run build` green; `git diff app/api/ next.config.js` empty

### Tests

- `__tests__/chatdemo.test.tsx`: (1) `CHAT_DEMO_SCRIPT` verbatim — assert the 8 `text` strings strictly equal the locked script lines; (2) reduced-motion static render — stub `window.matchMedia` to `{ matches: true, ... }`, render `<ChatDemo />`, assert all 8 lines present immediately (use `getByText` with exact strings; for whitespace-sensitive lines use a function matcher on textContent).
- `__tests__/new-sections.test.tsx`: Problem h2 + both paragraphs verbatim; Personas both h3 + both paragraphs verbatim.
- Page-order integration test: render `<Home />` from `@/app/page` (stub `matchMedia` for ChatDemo) and assert the visible section headings appear in PRD order (`One key. Every AI service.` → `See it in action` → `Agents can do the work. Paying for it is broken.` → `Your whole day already runs through agents.` → `How it works` → `Give your agents a wallet.`) by index order in `document.body.textContent`.

## Consumer verification list

- `app/page.tsx` imports `ChatDemo`, `Problem`, `Personas` (default exports) — names must match the new files.
- `CHAT_DEMO_SCRIPT` + `ScriptLine` exported from `components/ChatDemo.tsx` — consumed by `__tests__/chatdemo.test.tsx`.
- ChatDemo `matchMedia` guard — consumed implicitly by jsdom tests (must not throw when `matchMedia` is undefined).
- No changes to TopBar/Hero/HowItWorks/Waitlist/EndStrip — existing `sections.test.tsx` must stay green.

## Constraints to respect

- Copy LOCKED character-for-character (including the demo script's spacing); no em/en dashes in rendered copy; "agents" never "AI agents" in human copy (keywords arrays exempt for GEO).
- No animation libraries, no new runtime dependencies. Semantic aliases only, light mode only.
- `/api/waitlist`, `/book`, `next.config.js`, honeypot untouched. `public/*.md` files stay on disk but unlinked.
- Honesty constraints: no banking/cards/audited-contract/EMI/MiCA claims (metadata description included).

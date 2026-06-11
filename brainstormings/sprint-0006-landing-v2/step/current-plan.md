# Sprint 0006 — Step 1: Shell + existing sections rewrite (locked copy)

## Context

Macro Step 1 of sprint-0006-landing-v2. Step 0 (test infra) is merged (PR #3). This step applies the locked copy verbatim to all 5 existing components, removes every product link (Skill.md, setup-mode block, skill URLs), makes `/book` the primary CTA everywhere, and replaces all hardcoded hex with semantic Tailwind aliases. Sub-branch: `landing-v2-step-1`.

## Findings from codebase analysis

- Palette aliases available (tailwind.config.ts → globals.css vars): `bg`, `fg`, `muted`, `border`, `btn-bg` (#7A1FFF purple), `btn-fg` (#F8F8FF), `btn-border` (transparent). The brand purple as text/border = `text-btn-bg` / `border-btn-bg` (no dedicated "accent" alias; adding one would touch tailwind.config, which the repo CLAUDE.md discourages).
- `globals.css` already sets `html { scroll-behavior: smooth }`, but ADR-002 mandates the TopBar `scrollToSection` pattern for the hero secondary CTA → Hero becomes a `"use client"` component.
- Hex violations to fix: TopBar logo (`#7A1FFF` + textShadow), Hero video placeholder block (removed anyway), HowItWorks number boxes (`#7A1FFF`) + dark code card (`#1a1a1a`, `#252525`, `#ff5f56`, `#ffbd2e`, `#27c93f`, `#e0e0e0` — all removed with setup-mode block), Waitlist (focus border, submit button, success text).
- `HowItWorks.tsx` currently has NO header and uses `"use client"` + useState only for the copy button → after rewrite it becomes a pure server component.
- `Waitlist.tsx` form logic (state machine idle/loading/success/error, honeypot state, POST shape `{ email, honeypot }`) must be preserved exactly; only copy and styling change.
- `app/page.tsx` already renders TopBar → Hero → HowItWorks → Waitlist → EndStrip — **no change needed in this step**.
- Existing tests: `__tests__/endstrip.test.tsx` (X/LinkedIn hrefs — remain valid) and `__tests__/waitlist-route.test.ts` (API — untouched). Test command `npm test` (Vitest, CLAUDE.md ## Testing).

## Decisions

- **Step titles rendering**: the locked copy's "**Step 1 — Create your wallet.**" markdown is rendered as numbered box (1/2/3, existing visual pattern) + bold title "Create your wallet." + description. The "Step N —" prefix is markdown structure, not rendered copy — this respects the "no em dashes in page copy" constraint while keeping the copy strings verbatim.
- **Purple via `btn-bg` alias**: brand purple text/borders use `text-btn-bg`/`border-btn-bg`. No new CSS vars, no tailwind.config changes (repo rule).
- **Button case**: drop the `uppercase` Tailwind class on CTAs — copy is locked in sentence case ("Book a discovery call", "Join the waiting list"); CSS uppercase would visually break verbatim rendering.
- **`/book` link behavior**: keep the existing `target="_blank" rel="noopener noreferrer"` pattern on /book CTAs (matches current TopBar/HowItWorks behavior; smallest diff).
- **Form button = secondary style**: the waitlist submit button becomes white/outline (border `border-btn-bg`, text `text-btn-bg`, transparent bg) per locked copy "CTA (secondary, white/outline)".
- **ADR-002 applies**: one waitlist form only, in Waitlist.tsx (final CTA); Hero secondary CTA smooth-scrolls to its anchor `id="waitlist"` using the TopBar `scrollToSection` pattern.
- **ADR-003 applies**: Final CTA = Waitlist.tsx (rewrite), Footer = EndStrip.tsx (edit). No renames.
- **ADR-001 not in scope** (ChatDemo is Step 3).

## Operational guide

### 1. `components/TopBar.tsx` — drop Skill.md, relabel CTA, fix hex

- Keep `"use client"`, `scrollToSection`, fixed header layout.
- Logo button: remove `style={{ color: '#7A1FFF', textShadow: ... }}`; add `text-btn-bg` to its className.
- DELETE the `Skill.md` `<a>` entirely.
- CTA link: label `Book a discovery call` (verbatim), href `/book`, keep `target="_blank" rel="noopener noreferrer"`, className: keep `rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-2 px-5 text-xs md:text-sm transition-colors hover:opacity-90 ml-2` (REMOVE `uppercase`).

### 2. `components/Hero.tsx` — new copy, 2 CTAs, drop video placeholder

Rewrite as a client component (`"use client"` needed for scroll handler):
- H1 (verbatim): `One key. Every AI service.` — keep existing h1 classes, remove the inline `style` textShadow (keep `font-black`/weight via classes).
- Sub (verbatim): `Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use.`
- CTA row (flex, centered, gap-4, stacks on mobile `flex-col sm:flex-row`):
  - Primary `<a href="/book" target="_blank" rel="noopener noreferrer">`: `Book a discovery call` — purple solid: `rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90`.
  - Secondary `<button type="button" onClick={() => scrollToSection("waitlist")}>`: `Join the waiting list` — white/outline: `rounded-lg border-2 border-btn-bg bg-transparent text-btn-bg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90 cursor-pointer`.
  - `scrollToSection` helper: same implementation as TopBar's (`document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })` guarded).
- DELETE the entire video placeholder block (aspect-video div, play icon svg, "Product demo coming soon").
- Keep `id="hero"`, section padding/border classes as-is.

### 3. `components/HowItWorks.tsx` — 3 wallet steps, drop setup-mode block

Full rewrite as a server component (remove `"use client"`, `useState`, `handleCopy`, `codeContent`):
- Keep `<section id="how-it-works" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20 border-b border-border/20">`.
- Add header `<h2>` (verbatim): `How it works` — classes `text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center`.
- 3 columns (`grid grid-cols-1 md:grid-cols-3 gap-8`), each column centered with:
  - Number box: `w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-btn-fg text-2xl md:text-3xl mb-3 bg-btn-bg` with `1`/`2`/`3`.
  - Title `<p className="font-body text-base md:text-lg font-bold text-fg text-center mb-2">` (verbatim): `Create your wallet.` / `Set the policies.` / `Connect your agents to the wallet.`
  - Description `<p className="font-body text-sm md:text-base text-fg/70 text-center">` (verbatim): `Open your workspace and create a wallet for your agents.` / `Decide how much the wallet can spend, and on which services.` / `One command links them. From there they pay for what they use, within policy.`
- DELETE everything else: "Choose your setup mode" title, agent-assisted card, code snippet + copy button, manual card, all dark-theme hex styling, white card wrapper.

### 4. `components/Waitlist.tsx` — final CTA rewrite (form + honeypot kept)

- Add `id="waitlist"` and `scroll-mt-20` to the `<section>` (scroll target for Hero/TopBar with fixed header).
- Header `<h2>` (verbatim): `Give your agents a wallet.` — keep existing h2 classes.
- Below the header, primary CTA `<a href="/book" target="_blank" rel="noopener noreferrer">`: `Book a discovery call` — same purple solid classes as Hero primary; centered, `mb-8`.
- Form: KEEP UNCHANGED the state machine (`idle|loading|success|error`), honeypot input (hidden, tabIndex -1, aria-hidden), POST to `/api/waitlist` with body `{ email, honeypot }`, success/error messages (`You're on the list! We'll be in touch soon.` / `Something went wrong. Please try again.`).
- Style fixes only:
  - email input: `focus:border-[#7A1FFF]` → `focus:border-btn-bg`.
  - submit button: remove inline `style={{...}}` and `uppercase`; secondary white/outline classes: `rounded-lg border-2 border-btn-bg bg-transparent text-btn-bg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90 whitespace-nowrap disabled:opacity-50`.
  - button labels: loading `Sending...`, default `Join the waiting list` (verbatim).
  - success message: `style={{ color: '#7A1FFF' }}` → className `text-btn-bg`.

### 5. `components/EndStrip.tsx` — footer tagline

- Keep `<footer>` and both links (X → `https://x.com/ametyst_xyz`, LinkedIn → `https://www.linkedin.com/company/ametyst-xyz/`) exactly as they are.
- Add tagline `<p>` (verbatim): `Wallets for agents. Built in Europe. © 2026 Ametyst.` — classes `text-xs md:text-sm text-fg opacity-70 font-body text-center`. Layout: tagline + links row (e.g. flex-col items-center gap-3, links row unchanged inside).

### 6. Tests — `__tests__/sections.test.tsx` (new)

Render each component (jsdom default env) and assert the locked copy verbatim:
- TopBar: link "Book a discovery call" with href `/book`; NO text "Skill.md" anywhere (`queryByText` null).
- Hero: heading `One key. Every AI service.`; text `Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use.`; link "Book a discovery call" → `/book`; button "Join the waiting list".
- HowItWorks: heading `How it works`; the 3 titles and 3 descriptions verbatim; NO text matching `/skill/i` or `/setup/i`.
- Waitlist: heading `Give your agents a wallet.`; link "Book a discovery call" → `/book`; button "Join the waiting list"; hidden honeypot input present; submit with mocked `fetch` posts `{ email, honeypot }` to `/api/waitlist` (stub `fetch`, fire submit, assert call) and shows `You're on the list! We'll be in touch soon.`
- EndStrip: text `Wallets for agents. Built in Europe. © 2026 Ametyst.` plus the 2 existing link assertions remain green in `endstrip.test.tsx`.
- `afterEach(cleanup)` (pattern from `endstrip.test.tsx`).

### 7. Verification

- `npm test` green (existing 7 + new section tests).
- `npm run build` green.
- `grep -rn "7A1FFF\|#1a1a1a\|#252525\|ff5f56\|ffbd2e\|27c93f\|e0e0e0" components/` → zero hits.
- `grep -rni "skill" components/ app/page.tsx` → zero hits.
- `git diff app/api/ next.config.js` → empty.

## Consumer verification list

- `scrollToSection("waitlist")` in Hero → requires `id="waitlist"` on the Waitlist `<section>` (added in this step — verify both sides).
- `scrollToSection("hero")` in TopBar logo → `id="hero"` stays on Hero section (verify not dropped in rewrite).
- `Waitlist` form → POST `/api/waitlist` body `{ email, honeypot }` — unchanged, covered by existing API tests.
- `app/page.tsx` imports all 5 components by default export — names/exports unchanged.

## Constraints to respect

- Copy LOCKED character-for-character; no em dashes in rendered copy; "agents" never "AI agents" in body copy (H1 "Every AI service." is locked copy and allowed).
- No product links: no skill URLs, no install commands, no setup-mode UI.
- Semantic aliases only; no `dark:`; palette/fonts untouched; no new dependencies.
- `/api/waitlist` backend, `/book` page, `next.config.js` untouched.

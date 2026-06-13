# Sprint 0006 — Step 3: Stabilization (review fixes from step 2 PR)

## Context

Macro Step 3 (Stabilization) of sprint-0006-landing-v2. Steps 0-2 merged (PRs #3, #4, #5). The orchestrator's MACRO_STEP_START lists 3 items from the step 2 PR review; codebase analysis found 2 small adjacent items absorbed in the same pass. Sub-branch: `landing-v2-step-3`.

## Findings from codebase analysis

- `app/layout.tsx:12` — `metadataBase: new URL('https://ametyst.xyz')` (item 2)
- `app/layout.tsx:30` — `openGraph.url: "https://ametyst.xyz"` (item 2)
- `app/layout.tsx:46` — `twitter.site: "@ametyst_xyz"` (item 1)
- `docs/ARCHITECTURE.md:50` — stale: "Skill files … referenced as copyable skill URLs in `HowItWorks.tsx`" — HowItWorks no longer references them since step 1 (item 3)
- **Extra A**: `docs/ECOSYSTEM.md:12` still says visitors "land on `ametyst.xyz`" — same canonical-domain fix as item 2
- **Extra B** (a11y polish from step 2 review note): ChatDemo's not-yet-revealed lines are `opacity-0` but still in the DOM → screen readers read them before they appear. Fix: `aria-hidden` on unrevealed lines (revealed/reduced-motion lines stay readable)
- Metadata content is not covered by tests (per sprint test strategy) → test verification = existing suite + build must stay green
- `chatdemo.test.tsx` reduced-motion test must keep passing after the aria change (it stubs `matches: true`, where lines are all visible and NOT aria-hidden — `getByText` keeps working)

## Decisions

- **Canonical domain `https://ametyst.ai`** (HIL-confirmed per orchestrator message): applied to `metadataBase` and `openGraph.url`. Icons/keywords/descriptions untouched.
- **ARCHITECTURE.md skill line**: rewritten to state the files stay on disk but are intentionally unlinked (matches the sprint constraint "public/*.md stay on disk but unlinked").
- **ECOSYSTEM.md domain mention**: included (1-word fix, same review theme).
- **ChatDemo a11y**: `aria-hidden={!reducedMotion && i >= visibleLines}` on the staggered lines — hidden from assistive tech until revealed; static/reduced-motion render unaffected.
- No ADR impact (no architecture changes).

## Operational guide

### 1. `app/layout.tsx` — 3 value changes
- Line 12: `metadataBase: new URL('https://ametyst.ai')`
- Line 30 (openGraph): `url: "https://ametyst.ai"`
- Line 46 (twitter): `site: "@ametyst_ai"`
Nothing else changes in the file.

### 2. `docs/ARCHITECTURE.md` — fix stale skill-files line (line 50)
Replace:
`- **Skill files**: static \`.md\` files in \`public/\` are served at \`ametyst.xyz/setup-agent-owners-skill.md\` and \`ametyst.xyz/setup-saas-skill.md\` — referenced as copyable skill URLs in \`HowItWorks.tsx\``
with:
`- **Skill files**: static \`.md\` files in \`public/\` remain on disk and are served at the site root, but are intentionally NOT linked anywhere in the UI (product links removed in landing v2 until the product-ready signal)`

### 3. `docs/ECOSYSTEM.md` — canonical domain (line 12)
`ametyst.xyz` → `ametyst.ai` in the end-users line.

### 4. `components/ChatDemo.tsx` — a11y polish
On the staggered script lines (the `CHAT_DEMO_SCRIPT.slice(1).map(...)` divs), add:
`aria-hidden={!reducedMotion && i >= visibleLines}`
so unrevealed lines are hidden from screen readers. No other changes; `reducedMotion`, `visibleLines`, classNames stay as they are.

### 5. Verification
- `npm test` → all 20 tests green (especially `chatdemo.test.tsx` reduced-motion render and `page-order.test.tsx`).
- `npm run build` → green.
- `grep -rn "ametyst.xyz\|ametyst_xyz" app/ components/ docs/` → zero hits (the LinkedIn company slug `ametyst-xyz` in EndStrip is a different string and stays).
- `git diff app/api/ next.config.js` → empty.

## Consumer verification list

- `metadataBase` affects resolution of relative OG image URLs (`/icon.png` → now `https://ametyst.ai/icon.png`) — intended effect of the canonical-domain change.
- `chatdemo.test.tsx` reduced-motion test queries lines via text — unaffected because in reduced motion `aria-hidden` is false and elements remain queryable.
- No component APIs/exports change.

## Constraints to respect

- No copy changes (locked copy untouched). No new dependencies. No styling changes.
- `/api/waitlist`, `/book`, `next.config.js` untouched.
- LinkedIn URL (`linkedin.com/company/ametyst-xyz/`) is correct and must NOT change — only the Twitter handle and site domain.

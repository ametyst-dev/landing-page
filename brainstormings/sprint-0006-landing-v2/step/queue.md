# Chunk Queue

**Total chunks:** 1
**Test command:** `npm test` (Vitest, single run — see `## Testing` in CLAUDE.md)
**Source plan:** brainstormings/sprint-0006-landing-v2/step/current-plan.md

---

## Chunk 1 — Stabilization fixes (canonical domain, twitter handle, stale docs, ChatDemo a11y) [TEST]
**Status:** done
**Type:** test
**Commit point:** chunk 1
**Files:** `app/layout.tsx`, `docs/ARCHITECTURE.md`, `docs/ECOSYSTEM.md`, `components/ChatDemo.tsx`
**Done when:** all 4 edits applied, `npm test` green (20 tests), `npm run build` green, `grep -rn "ametyst.xyz\|ametyst_xyz" app/ components/ docs/` returns zero hits.
**Test:** verify existing tests still pass (no new tests; metadata is not test-covered per sprint test strategy).

Context (self-contained): these are review fixes from the step 2 PR. The canonical site domain is `https://ametyst.ai` (HIL-confirmed) and the X/Twitter handle is `@ametyst_ai`. The LinkedIn company URL `https://www.linkedin.com/company/ametyst-xyz/` is CORRECT (different string) and must NOT be touched. Copy is locked: no visible text changes anywhere.

1. **`app/layout.tsx`** — exactly 3 value changes, nothing else:
   - `metadataBase: new URL('https://ametyst.xyz')` → `metadataBase: new URL('https://ametyst.ai')`
   - in `openGraph`: `url: "https://ametyst.xyz"` → `url: "https://ametyst.ai"`
   - in `twitter`: `site: "@ametyst_xyz"` → `site: "@ametyst_ai"`

2. **`docs/ARCHITECTURE.md`** — the "Data / content flow" list has this stale line (HowItWorks no longer references skill URLs since the v2 rewrite):
   ```
   - **Skill files**: static `.md` files in `public/` are served at `ametyst.xyz/setup-agent-owners-skill.md` and `ametyst.xyz/setup-saas-skill.md` — referenced as copyable skill URLs in `HowItWorks.tsx`
   ```
   Replace it with:
   ```
   - **Skill files**: static `.md` files in `public/` remain on disk and are served at the site root, but are intentionally NOT linked anywhere in the UI (product links removed in landing v2 until the product-ready signal)
   ```

3. **`docs/ECOSYSTEM.md`** — in the end-users line (`- **End users / visitors**: agent owners and SaaS developers who land on \`ametyst.xyz\``), change `ametyst.xyz` → `ametyst.ai`.

4. **`components/ChatDemo.tsx`** — a11y fix. The component renders the staggered script lines like this:
   ```tsx
   {CHAT_DEMO_SCRIPT.slice(1).map((line, i) => (
     <div
       key={line.text}
       className={`whitespace-pre transition-opacity duration-500 ${
         reducedMotion || i < visibleLines ? "opacity-100" : "opacity-0"
       }`}
     >
       {line.text}
     </div>
   ))}
   ```
   Add `aria-hidden={!reducedMotion && i >= visibleLines}` to that div so not-yet-revealed lines are hidden from screen readers:
   ```tsx
     <div
       key={line.text}
       aria-hidden={!reducedMotion && i >= visibleLines}
       className={...unchanged...}
     >
   ```
   Touch nothing else in the file (state machine, script constant, classNames unchanged).

5. **Verification** (all must pass before commit):
   ```bash
   npm test                                                      # 20 tests green
   npm run build                                                 # green
   grep -rn "ametyst.xyz\|ametyst_xyz" app/ components/ docs/    # zero hits
   git diff app/api/ next.config.js                              # empty
   ```

6. Commit point: single commit with message `[sprint-0006] step 3: stabilization fixes (canonical domain, twitter handle, docs, demo a11y)`.

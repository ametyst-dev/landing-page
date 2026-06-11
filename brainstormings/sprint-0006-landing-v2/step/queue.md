# Chunk Queue

**Total chunks:** 7
**Test command:** `npm test` (Vitest, single run — see `## Testing` in CLAUDE.md)
**Source plan:** brainstormings/sprint-0006-landing-v2/step/current-plan.md

---

## Chunk 1 — Problem + Personas components
**Status:** done
**Files:** `components/Problem.tsx` (new), `components/Personas.tsx` (new)
**Done when:** both components exist as server components rendering the locked copy verbatim in two symmetric columns with mobile stacking; zero hardcoded hex.

Palette note: semantic Tailwind aliases only — `bg-bg`, `text-fg`, `text-muted`, `border-border`. NEVER write hex in classes or style props. Copy is LOCKED: character for character, no rephrasing. Apostrophes in JSX text use `&apos;`.

### Create `components/Problem.tsx` (server component, no "use client")

```tsx
export default function Problem() {
  return (
    <section id="problem" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          Agents can do the work. Paying for it is broken.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
            Every service your agent calls wants its own account, its own credits, its own API key. Across a team that becomes hundreds of keys: created, pasted into Notion, shared in DMs, forgotten. One shared key in the wrong place and production goes down.
          </p>
          <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
            Meanwhile the AI bill grows and nobody can see it. No limits per person, no limits per agent, no view of where the money goes. Intelligence is becoming a real line on the P&amp;L, and right now it&apos;s invisible.
          </p>
        </div>
      </div>
    </section>
  );
}
```

### Create `components/Personas.tsx` (server component, no "use client")

```tsx
export default function Personas() {
  return (
    <section id="personas" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-body text-xl md:text-2xl font-bold text-fg mb-3">
              Your whole day already runs through agents.
            </h3>
            <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
              Every task you ship leans on a stack of external tools: search, scraping, enrichment, models. The bottleneck is everything around them: a subscription here, a credit pack there, another account to create. With one wallet your agents reach the best provider for every step of the task and pay only for what they use.
            </p>
          </div>
          <div>
            <h3 className="font-body text-xl md:text-2xl font-bold text-fg mb-3">
              Every call, on the books.
            </h3>
            <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
              Spend per person, per agent, per service, in real time. Limits are enforced by the wallet itself, not a dashboard warning after the money is gone. Your team moves faster. You finally see the bill.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

No policy code block anywhere. Do not modify any other file in this chunk.

---

## Chunk 2 — Page wiring + new-section tests [TEST]
**Status:** done
**Type:** test
**Commit point:** chunks 1-2
**Files:** `app/page.tsx`, `__tests__/new-sections.test.tsx` (new)
**Done when:** `npm test` green; page renders Hero → Problem → Personas → HowItWorks → Waitlist → EndStrip.

Context (self-contained): `app/page.tsx` currently imports and renders, inside `<main className="min-h-screen bg-bg">`: `<TopBar /> <Hero /> <HowItWorks /> <Waitlist /> <EndStrip />` (all default exports from `@/components/*`). Two new server components exist: `components/Problem.tsx` (default export `Problem`, h2 "Agents can do the work. Paying for it is broken." + two paragraphs) and `components/Personas.tsx` (default export `Personas`, two h3 columns). Vitest + RTL are configured (`npm test`, jsdom, alias `@` → repo root, tests in `__tests__/`).

1. In `app/page.tsx`: add `import Problem from "@/components/Problem";` and `import Personas from "@/components/Personas";` and render them between `<Hero />` and `<HowItWorks />`:
```tsx
<TopBar />
<Hero />
<Problem />
<Personas />
<HowItWorks />
<Waitlist />
<EndStrip />
```
2. Create `__tests__/new-sections.test.tsx`:
```tsx
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Problem from "@/components/Problem";
import Personas from "@/components/Personas";

afterEach(() => cleanup());
```
Test cases:
- **Problem**: render; heading `Agents can do the work. Paying for it is broken.`; both paragraphs present verbatim — left: `Every service your agent calls wants its own account, its own credits, its own API key. Across a team that becomes hundreds of keys: created, pasted into Notion, shared in DMs, forgotten. One shared key in the wrong place and production goes down.`; right: `Meanwhile the AI bill grows and nobody can see it. No limits per person, no limits per agent, no view of where the money goes. Intelligence is becoming a real line on the P&L, and right now it's invisible.`
- **Personas**: render; h3 `Your whole day already runs through agents.` + paragraph `Every task you ship leans on a stack of external tools: search, scraping, enrichment, models. The bottleneck is everything around them: a subscription here, a credit pack there, another account to create. With one wallet your agents reach the best provider for every step of the task and pay only for what they use.`; h3 `Every call, on the books.` + paragraph `Spend per person, per agent, per service, in real time. Limits are enforced by the wallet itself, not a dashboard warning after the money is gone. Your team moves faster. You finally see the bill.`
3. Run `npm test` — ALL tests green (including the pre-existing `sections.test.tsx`, `endstrip.test.tsx`, `waitlist-route.test.ts`).
4. Commit point: commit chunks 1-2 (both components + page wiring + test file).

Constraints: do not touch any existing component. If a verbatim assert fails, fix the COMPONENT (copy is locked), not the expected string.

---

## Chunk 3 — ChatDemo component
**Status:** done
**Files:** `components/ChatDemo.tsx` (new)
**Done when:** the component compiles, exports `CHAT_DEMO_SCRIPT` and `ScriptLine`, animates (prompt typing → staggered line reveals → pause → loop), and renders the full static script when `prefers-reduced-motion` is set; zero hardcoded hex; no animation libraries.

Palette note: semantic Tailwind aliases only — `bg-bg`, `text-fg`, `text-muted`, `border-border`. NEVER write hex. No new dependencies (pure React + CSS transitions; ADR-001).

Create `components/ChatDemo.tsx` as a `"use client"` component:

1. Exported script constant — strings must be BYTE-IDENTICAL to these (alignment spaces matter; a unit test will compare strictly):
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
2. Reduced-motion detection (jsdom has no `matchMedia` — the guard must not throw):
```ts
const [reducedMotion, setReducedMotion] = useState(false);
useEffect(() => {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
}, []);
```
   Note: ALSO render the full static script when `matchMedia` reports reduce — and for tests, read the media query result during render via the state above. When `reducedMotion` is true, render all 8 lines fully, no timers.
3. Animation state machine (only when `reducedMotion` is false): `typedChars` counts characters of the prompt line (interval ~30ms/char); once complete, reveal lines 1..7 one at a time (~600ms apart) by incrementing `visibleLines`; when all lines are visible wait ~3000ms, then reset `typedChars`/`visibleLines` to 0 and loop. All timers created in `useEffect` hooks with proper cleanup (`clearInterval`/`clearTimeout` in the return).
4. Markup:
```tsx
<section id="chat-demo" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">
  <div className="max-w-7xl mx-auto">
    <p className="font-body text-sm md:text-base font-bold text-muted uppercase tracking-wider text-center mb-6">
      See it in action
    </p>
    <div className="max-w-3xl mx-auto rounded-lg border-2 border-border bg-bg p-4 md:p-6 text-left font-mono text-xs md:text-sm text-fg overflow-x-auto">
      {/* prompt line: when animating show CHAT_DEMO_SCRIPT[0].text.slice(0, typedChars); when reduced motion show full text */}
      {/* one empty line after the prompt (e.g. <div className="whitespace-pre"> </div>) — the locked script has a blank line there */}
      {/* lines 1..7: render each in <div className="whitespace-pre transition-opacity duration-500"> with opacity-100 when visible, opacity-0 when not yet revealed; in reduced motion all fully visible */}
    </div>
    <p className="text-xs text-muted text-center mt-3 font-body">Illustrative demo</p>
  </div>
</section>
```
   Every script line div MUST have `whitespace-pre` so internal spacing renders exactly. The label text `See it in action` is locked copy.
5. Do not modify `app/page.tsx` in this chunk (wiring is a separate chunk).

---

## Chunk 4 — ChatDemo wiring + tests [TEST]
**Status:** done
**Type:** test
**Commit point:** chunks 3-4
**Files:** `app/page.tsx`, `__tests__/chatdemo.test.tsx` (new)
**Done when:** `npm test` green; ChatDemo renders between Hero and Problem.

Context (self-contained): `components/ChatDemo.tsx` is a `"use client"` component (default export `ChatDemo`) that also exports `CHAT_DEMO_SCRIPT: ScriptLine[]` (8 entries with `kind` and `text`) and detects `prefers-reduced-motion` via `window.matchMedia` (guarded; renders the full static script when it matches). `app/page.tsx` renders `<TopBar /> <Hero /> <Problem /> <Personas /> <HowItWorks /> <Waitlist /> <EndStrip />`. Vitest + RTL configured (`npm test`, jsdom, alias `@`).

1. In `app/page.tsx`: add `import ChatDemo from "@/components/ChatDemo";` and insert `<ChatDemo />` between `<Hero />` and `<Problem />`.
2. Create `__tests__/chatdemo.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ChatDemo, { CHAT_DEMO_SCRIPT } from "@/components/ChatDemo";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const matchMediaMock = (matches: boolean) =>
  vi.fn().mockReturnValue({
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  });
```
Test cases:
- **Script verbatim**: assert `CHAT_DEMO_SCRIPT.map(l => l.text)` strictly equals (`toEqual`) this exact array:
```ts
[
  "> Find 50 fintech founders across Europe with verified emails and draft my outreach",
  "⏺ ametyst · wallet connected · policy gtm: €50/week, €18.40 used",
  "⏺ exa.search   \"fintech founders Europe\"          €0.05",
  "⏺ apify.linkedin   50 profiles                    €0.85",
  "⏺ apollo.enrich   +verified emails                €1.20",
  "⏺ claude   drafting 50 outreach messages          €0.31",
  "✓ Done. Here's your file: outreach-fintech-eu.csv",
  "  50 contacts, 50 drafts. Total €2.41, within policy.",
]
```
- **Reduced-motion static render**: `vi.stubGlobal("matchMedia", matchMediaMock(true))` BEFORE render; render `<ChatDemo />`; assert the label `See it in action` is present and ALL 8 script lines are in the document. For whitespace-sensitive lines use a custom matcher, e.g. `screen.getByText((_, el) => el?.textContent === CHAT_DEMO_SCRIPT[2].text)` or check `container.textContent` contains each line's trimmed content. (If the component reads matchMedia in an effect, the assertion still works because the effect runs synchronously under RTL before `getByText`.)
- **No-matchMedia safety**: render `<ChatDemo />` WITHOUT stubbing matchMedia (jsdom default: undefined) — must not throw; the label `See it in action` is present.
3. Run `npm test` — ALL tests green.
4. Commit point: commit chunks 3-4 (ChatDemo + wiring + tests).

Constraints: if the verbatim test fails, fix `CHAT_DEMO_SCRIPT` in the component (the expected array above is the locked source of truth). Do not add animation libraries.

---

## Chunk 5 — GEO metadata + docs inventory
**Status:** done
**Files:** `app/layout.tsx`, `docs/README.md`
**Done when:** metadata has the new title/description/keywords in all 3 spots (metadata, openGraph, twitter) with no em/en dashes and no "AI agents" outside the keywords array; docs/README.md lists ChatDemo, Problem, Personas with the role mapping.

### `app/layout.tsx`

The file exports `const metadata: Metadata` with `title`, `description`, `keywords`, `openGraph.{title,description,images[0].alt}`, `twitter.{title,description}`. Replace ONLY these values (keep `metadataBase`, `authors`, `icons`, `openGraph.{type,locale,url,siteName,images[0].{url,width,height}}`, `twitter.{card,site,images}` unchanged):
- All 3 titles (`title`, `openGraph.title`, `twitter.title`) AND `openGraph.images[0].alt`: `Ametyst | Wallets for Agents`
- All 3 descriptions: `Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use. Set policies, track every agent payment, and manage AI spend in real time.`
- keywords: `["MCP wallet", "agent payments", "let my agent pay for tools", "AI spend management", "wallets for AI agents", "AI agent wallets", "agent tool access", "pay-per-use AI tools"]`

Rules: no em dash (—) or en dash (–) anywhere in the file; the phrase "AI agents" may appear ONLY inside the keywords array (GEO exemption); honesty constraints (no banking/cards/audited/EMI/MiCA claims).

### `docs/README.md`

In the "What's inside" list (which currently lists TopBar, Hero, HowItWorks, Waitlist, EndStrip entries):
- Add after the Hero entry: `- \`components/ChatDemo.tsx\` — Animated terminal-style demo (scripted, illustrative) shown below the hero`
- Add: `- \`components/Problem.tsx\` — Two-column problem statement (access keys / invisible spend)`
- Add: `- \`components/Personas.tsx\` — Two-column personas section (champion / buyer)`
- Update the Waitlist entry to note it is the Final CTA section (role mapping per ADR-003) and the EndStrip entry to note it is the footer.
- If the intro paragraph mentions a section count (e.g. "six content sections"), correct it to match the actual page (8 sections: TopBar, Hero, ChatDemo, Problem, Personas, HowItWorks, Waitlist/FinalCTA, EndStrip/footer).

Do not modify any other file in this chunk.

---

## Chunk 6 — Acceptance sweep + page-order test [TEST]
**Status:** done
**Type:** test
**Commit point:** chunks 5-6
**Files:** `__tests__/page-order.test.tsx` (new)
**Done when:** `npm test` + `npm run build` green, all grep sweeps return zero matches, both footer links resolve.

Context (self-contained): `app/page.tsx` (default export `Home`) renders TopBar, Hero, ChatDemo, Problem, Personas, HowItWorks, Waitlist, EndStrip. ChatDemo uses `window.matchMedia` (guarded). Vitest + RTL configured (`npm test`, jsdom, alias `@`). The expected visible heading order: `One key. Every AI service.` → `See it in action` → `Agents can do the work. Paying for it is broken.` → `Your whole day already runs through agents.` → `How it works` → `Give your agents a wallet.`

1. Create `__tests__/page-order.test.tsx`: render `<Home />` from `@/app/page` (stub `matchMedia` with a vi mock returning `{ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), media: "", onchange: null, dispatchEvent: vi.fn() }` so ChatDemo renders statically). Get `document.body.textContent` and assert `indexOf` of each of the 6 strings above is `>= 0` AND strictly increasing in that order.
2. Run `npm test` — ALL tests green.
3. Run `npm run build` — green.
4. Sweeps (all must return zero matches / pass):
```bash
grep -rn "—\|–" components/ app/layout.tsx app/page.tsx                  # em/en dashes
grep -rn "AI agents" components/ app/page.tsx                            # body copy
grep -n "AI agents" app/layout.tsx | grep -v "keywords" || true          # only keywords may contain it (manually confirm hits are inside the keywords array)
grep -rnE "#[0-9a-fA-F]{3,6}\b" components/                              # hardcoded hex
grep -rni "skill" components/ app/page.tsx app/layout.tsx                # product links
git diff app/api/ next.config.js                                         # must be empty
```
5. Footer link checks:
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://x.com/ametyst_xyz
curl -s -o /dev/null -w "%{http_code}\n" "https://www.linkedin.com/company/ametyst-xyz/"
```
Accept 200 or a 30x redirect (LinkedIn often 999s bots — if 999, note it in the execution report as "blocked by bot protection, verified manually" and have HIL open it in a browser).
6. Commit point: commit chunks 5-6 (layout.tsx + docs/README.md + page-order test).

Constraints: this chunk adds ONE test file and runs verifications — no functional changes. If a sweep fails, fix the offending file (copy/aliases are the source of truth), re-run, and only then commit.

---

## Chunk 7 — Fix footer X link (correction from review) [TEST]
**Status:** done
**Type:** test
**Commit point:** chunk 7
**Files:** `components/EndStrip.tsx`, `__tests__/endstrip.test.tsx`
**Done when:** the footer X link points to `https://x.com/ametyst_ai`, the test asserts the new URL, `npm test` green.

Context (self-contained): during step review, `https://x.com/ametyst_xyz` was found to return HTTP 404 (profile does not exist). HIL provided the correct handle: `https://x.com/ametyst_ai` (verified: HTTP 200). The LinkedIn URL (`https://www.linkedin.com/company/ametyst-xyz/`) is correct and must NOT change. `components/EndStrip.tsx` is the footer: a tagline `<p>` followed by two `<a>` links with `aria-label="X"` and `aria-label="LinkedIn"`. `__tests__/endstrip.test.tsx` asserts both links' hrefs via `screen.getByRole("link", { name: "X" })` / `{ name: "LinkedIn" }`.

1. In `components/EndStrip.tsx`: change the X link `href` from `https://x.com/ametyst_xyz` to `https://x.com/ametyst_ai`. Touch NOTHING else (text, classes, LinkedIn link, tagline unchanged).
2. In `__tests__/endstrip.test.tsx`: update the X href assertion to `https://x.com/ametyst_ai`. The LinkedIn assertion stays `https://www.linkedin.com/company/ametyst-xyz/`.
3. Run `npm test` — ALL tests green.
4. Commit point: commit both files with message `[sprint-0006] step 2 chunk 7: fix footer X link to ametyst_ai`.

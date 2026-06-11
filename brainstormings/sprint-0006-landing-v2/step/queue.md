# Chunk Queue

**Total chunks:** 4
**Test command:** `npm test` (Vitest, single run — see `## Testing` in CLAUDE.md)
**Source plan:** brainstormings/sprint-0006-landing-v2/step/current-plan.md

---

## Chunk 1 — Waitlist final CTA + EndStrip footer tagline
**Status:** done
**Files:** `components/Waitlist.tsx`, `components/EndStrip.tsx`
**Done when:** Waitlist renders header "Give your agents a wallet.", a purple "Book a discovery call" link to `/book`, and the unchanged email+honeypot form with an outline "Join the waiting list" submit; EndStrip shows the tagline plus the existing X/LinkedIn links; zero hardcoded hex in both files.

Palette note (applies to every class below): the repo uses semantic Tailwind aliases backed by CSS vars — `bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-btn-bg` (brand purple #7A1FFF), `text-btn-fg` (#F8F8FF), `border-btn-border` (transparent). Brand purple as text/border = `text-btn-bg` / `border-btn-bg`. NEVER write hex values in class names or style props.

### `components/Waitlist.tsx`

The file is a `"use client"` component with `useState` for `email`, `honeypot`, `status` (`"idle" | "loading" | "success" | "error"`) and a `handleSubmit` that POSTs `JSON.stringify({ email, honeypot })` to `/api/waitlist`. KEEP all of that logic byte-identical — this chunk changes ONLY the JSX copy and styling:

1. `<section>`: add `id="waitlist"` and `scroll-mt-20` to the existing className (`py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20`).
2. `<h2>` text becomes exactly: `Give your agents a wallet.` (keep existing h2 classes).
3. Between the h2 and the form, add a centered primary CTA:
```tsx
<div className="flex justify-center mb-8">
  <a
    href="/book"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90"
  >
    Book a discovery call
  </a>
</div>
```
4. Form unchanged except styles/labels:
   - Honeypot input: keep exactly as is (`type="text"`, `style={{ display: "none" }}`, `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`).
   - Email input className: replace `focus:border-[#7A1FFF]` with `focus:border-btn-bg` (rest unchanged).
   - Submit button: REMOVE the inline `style={{ borderColor: '#7A1FFF', backgroundColor: '#7A1FFF', color: '#F8F8FF' }}` and the `uppercase` class. New className: `rounded-lg border-2 border-btn-bg bg-transparent text-btn-bg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90 whitespace-nowrap disabled:opacity-50`. Label: `{status === "loading" ? "Sending..." : "Join the waiting list"}`.
   - Success message `<p>`: REMOVE `style={{ color: '#7A1FFF' }}`, add `text-btn-bg` to its className. Text unchanged: `You&apos;re on the list! We&apos;ll be in touch soon.`
   - Error message unchanged: `Something went wrong. Please try again.`

### `components/EndStrip.tsx`

Currently a `<footer className="bg-bg py-6 px-8 md:px-16 lg:px-24 xl:px-32">` with one inner div holding two `<a>` links (X → `https://x.com/ametyst_xyz`, LinkedIn → `https://www.linkedin.com/company/ametyst-xyz/`). Keep both links byte-identical. Restructure the inner content to a column:
```tsx
<div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
  <p className="text-xs md:text-sm text-fg opacity-70 font-body text-center">
    Wallets for agents. Built in Europe. © 2026 Ametyst.
  </p>
  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
    {/* the two existing <a> links, unchanged */}
  </div>
</div>
```
The tagline text is LOCKED copy — character for character: `Wallets for agents. Built in Europe. © 2026 Ametyst.`

Constraints: do not touch `app/api/waitlist/route.ts`. Do not change the POST body shape or remove the honeypot. No new dependencies.

---

## Chunk 2 — TopBar (drop Skill.md, relabel CTA) + Hero (new copy, 2 CTAs)
**Status:** done
**Files:** `components/TopBar.tsx`, `components/Hero.tsx`
**Done when:** TopBar has no Skill.md link and its CTA reads "Book a discovery call" → `/book`; Hero renders the locked H1/sub, a purple `/book` CTA and an outline button that smooth-scrolls to the `waitlist` anchor; the video placeholder block is gone; zero hardcoded hex in both files.

Palette note: semantic Tailwind aliases only — `bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-btn-bg` (brand purple), `text-btn-fg`, `border-btn-border` (transparent). Purple text/border = `text-btn-bg` / `border-btn-bg`. NEVER write hex in classes or style props.

### `components/TopBar.tsx`

A `"use client"` fixed header with a `scrollToSection(id)` helper and a logo `<button>` + nav. Changes:
1. Logo button: REMOVE `style={{ color: '#7A1FFF', textShadow: '0 0 1px rgba(122, 31, 255, 0.3)' }}`; add `text-btn-bg` to its className (keep the rest of the className).
2. DELETE the entire `<a href="/skill.md">Skill.md</a>` element.
3. CTA `<a>`: href `/book` (keep `target="_blank" rel="noopener noreferrer"`), text exactly `Book a discovery call`, className `rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-2 px-5 text-xs md:text-sm transition-colors hover:opacity-90 ml-2` (the `uppercase` class is REMOVED).

### `components/Hero.tsx`

Full rewrite as a client component:
```tsx
"use client";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export default function Hero() {
  return (
    <section id="hero" className="flex flex-col items-center justify-start px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 pt-32 md:pt-40 lg:pt-48 bg-bg border-b border-border/20">
      <div className="max-w-7xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-fg mb-3 md:mb-4 leading-tight">
          One key. Every AI service.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-headline text-fg mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed">
          Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90"
          >
            Book a discovery call
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("waitlist")}
            className="rounded-lg border-2 border-btn-bg bg-transparent text-btn-bg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90 cursor-pointer"
          >
            Join the waiting list
          </button>
        </div>
      </div>
    </section>
  );
}
```
Notes:
- H1 and sub are LOCKED copy — character for character as above.
- The `waitlist` anchor target is `id="waitlist"` on the `<section>` in `components/Waitlist.tsx` (already present in this step's branch — verify it exists; if missing, add it there).
- The old video placeholder block ("Product demo coming soon", aspect-video div, play svg) must NOT survive.

Constraints: keep `id="hero"` (the TopBar logo scrolls to it). No new dependencies.

---

## Chunk 3 — HowItWorks rewrite (3 wallet steps, no setup-mode)
**Status:** done
**Files:** `components/HowItWorks.tsx`
**Done when:** the section renders heading "How it works" and exactly 3 numbered steps with the locked titles/descriptions; no "Choose your setup mode", no skill URL, no copy button, no `"use client"`, zero hardcoded hex.

Palette note: semantic Tailwind aliases only — `bg-bg`, `text-fg`, `bg-btn-bg` (brand purple), `text-btn-fg`. NEVER write hex in classes or style props.

Full rewrite of `components/HowItWorks.tsx` as a server component (no `"use client"`, no React imports needed):
```tsx
export default function HowItWorks() {
  const steps = [
    {
      title: "Create your wallet.",
      description: "Open your workspace and create a wallet for your agents.",
    },
    {
      title: "Set the policies.",
      description: "Decide how much the wallet can spend, and on which services.",
    },
    {
      title: "Connect your agents to the wallet.",
      description: "One command links them. From there they pay for what they use, within policy.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20 border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-btn-fg text-2xl md:text-3xl mb-3 bg-btn-bg">
                {i + 1}
              </div>
              <p className="font-body text-base md:text-lg font-bold text-fg text-center mb-2">
                {step.title}
              </p>
              <p className="font-body text-sm md:text-base text-fg/70 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
Titles and descriptions are LOCKED copy — character for character as above. Everything that existed before (setup-mode title, agent-assisted card with skill URL code snippet and copy button, manual card, dark hex styling) must NOT survive.

Constraints: keep `id="how-it-works"` and `scroll-mt-20`. No new dependencies.

---

## Chunk 4 — Section copy tests + build + sweeps [TEST]
**Status:** done
**Type:** test
**Commit point:** chunks 1-4
**Files:** `__tests__/sections.test.tsx` (new)
**Done when:** `npm test` green (existing 7 tests + new section tests), `npm run build` green, grep sweeps clean.
**Test:**
- Unit: locked copy verbatim per component (TopBar, Hero, HowItWorks, Waitlist, EndStrip), absence of Skill.md/setup-mode, waitlist form POST behavior with mocked fetch

Context (self-contained): Vitest + React Testing Library are configured (`npm test` = `vitest run`, jsdom default env, alias `@` → repo root, tests in `__tests__/`, setup file loads jest-dom matchers). Components under test (all default exports): `components/TopBar.tsx`, `components/Hero.tsx`, `components/HowItWorks.tsx`, `components/Waitlist.tsx`, `components/EndStrip.tsx`. Waitlist is a client component whose form POSTs `JSON.stringify({ email, honeypot })` to `/api/waitlist` and shows `You're on the list! We'll be in touch soon.` on success. Existing test files `__tests__/endstrip.test.tsx` and `__tests__/waitlist-route.test.ts` must keep passing.

1. Create `__tests__/sections.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Waitlist from "@/components/Waitlist";
import EndStrip from "@/components/EndStrip";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
```
Test cases:
- **TopBar**: render; `screen.getByRole("link", { name: "Book a discovery call" })` has `href="/book"`; `screen.queryByText("Skill.md")` is null.
- **Hero**: render; `screen.getByRole("heading", { name: "One key. Every AI service." })` exists; `screen.getByText("Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use.")` exists; link "Book a discovery call" → `/book`; `screen.getByRole("button", { name: "Join the waiting list" })` exists.
- **HowItWorks**: render; heading `How it works`; the 3 titles (`Create your wallet.`, `Set the policies.`, `Connect your agents to the wallet.`) and 3 descriptions (`Open your workspace and create a wallet for your agents.`, `Decide how much the wallet can spend, and on which services.`, `One command links them. From there they pay for what they use, within policy.`) all present verbatim; `screen.queryByText(/skill/i)` is null and `screen.queryByText(/setup/i)` is null.
- **Waitlist**: render; heading `Give your agents a wallet.`; link "Book a discovery call" → `/book`; submit flow: `vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })))`, type an email into the email input (`fireEvent.change`), `fireEvent.submit` the form (or click the "Join the waiting list" button), then `await waitFor(...)`: fetch called with `/api/waitlist` and a body containing the email, and `You're on the list! We'll be in touch soon.` appears.
- **EndStrip**: render; `screen.getByText("Wallets for agents. Built in Europe. © 2026 Ametyst.")` exists.
2. Run `npm test` — ALL tests green (the pre-existing `endstrip.test.tsx` link assertions and `waitlist-route.test.ts` API tests must still pass).
3. Run `npm run build` — green.
4. Sweeps (all must return zero matches):
```bash
grep -rn "7A1FFF\|#1a1a1a\|#252525\|ff5f56\|ffbd2e\|27c93f\|e0e0e0" components/
grep -rni "skill" components/ app/page.tsx
git diff app/api/ next.config.js
```
5. Commit point: commit everything from chunks 1-4 (5 components + test file).

Constraints: if a test fails because a component doesn't match the locked copy, fix the COMPONENT (copy is locked); if it fails due to a wrong selector, fix the TEST. Do not modify `app/api/waitlist/route.ts`.

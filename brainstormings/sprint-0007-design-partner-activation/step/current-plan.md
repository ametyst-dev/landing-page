# Step 2 — Access gate + Launch-app entry (landing-page slice)

**Repo:** landing-page (@ametyst-dev/landing-page)
**Sprint branch:** design-partner-activation
**Sub-branch:** step-2/launch-app-cta
**Macro step:** 2

## Goal
Give a real entry point from the marketing site into the business-app: add a
"Launch app" CTA in the TopBar pointing at the business-app URL. The production
business-app URL is DEFERRED — wire it through a new public env var
`NEXT_PUBLIC_APP_URL` now; the value is set later. No hardcoded prod URL.

## Decisions
- **Env-driven URL (hard constraint):** the button reads
  `process.env.NEXT_PUBLIC_APP_URL`. `NEXT_PUBLIC_*` is statically inlined by
  Next.js at build — exactly what we want for a deferred, build-time-configured
  public URL. When the value is set later + rebuilt, the button lights up.
- **Graceful when unset:** if `NEXT_PUBLIC_APP_URL` is empty/undefined, render
  nothing for the Launch-app CTA (no dangling `#` link in production). The
  existing "Book a discovery call" CTA stays as the primary CTA and is always
  visible.
- **Styling — mirror the existing CTA pattern:** same rounded-lg, border-2,
  font-bold, padding, and semantic color tokens (`btn-bg`/`btn-border`/
  `btn-fg`) as the "Book a discovery call" button, but as a secondary *outline*
  variant so the primary marketing CTA still dominates. No hardcoded hex
  (CLAUDE.md sharp edge).
- ADR-001 / ADR-005 apply: landing-page holds no keys and enforces no gate — it
  only provides the entry point. The gate itself is enforced downstream in
  credential-api after Google auth.

## Files to touch
1. `components/TopBar.tsx` — add the "Launch app" link inside the existing
   `<nav>`, before the "Book a discovery call" CTA. Read
   `process.env.NEXT_PUBLIC_APP_URL`; render the link only when it is a
   non-empty string.
2. `docs/README.md` — note the new `NEXT_PUBLIC_APP_URL` env var alongside the
   existing `GOOGLE_SCRIPT_URL` documentation; update the TopBar "What's inside"
   line to mention the Launch-app CTA.
3. `docs/ECOSYSTEM.md` — document `NEXT_PUBLIC_APP_URL` as the business-app
   entry-point URL (deferred value).
4. `README.md` — add `NEXT_PUBLIC_APP_URL` to the env-vars note.

## Expected output ("done")
- TopBar renders a "Launch app" CTA → `NEXT_PUBLIC_APP_URL` when the var is set,
  hidden when unset. "Book a discovery call" → /book, Skill.md, waitlist CTAs all
  intact.
- No hardcoded production URL anywhere.
- `npm run build` (next build) passes. (landing-page has no test infra for this
  slice — out of scope per sprint.)

## Consumer verification
- `components/TopBar.tsx` is imported by `app/layout.tsx` / `app/page.tsx` — no
  prop/signature change, so no consumer wiring changes required.

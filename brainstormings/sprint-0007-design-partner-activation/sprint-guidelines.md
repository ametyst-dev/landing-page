# Sprint 0007 — design-partner-activation

## Meta
channel: sprint-0007-design-partner-activation
agent_name: landing-page
sprint_goal: Frictionless NON-CUSTODIAL design-partner onboarding — the partner's passkey approves upfront a Full-access policy + curated merchants whitelisted in one signature + a 1-year key on a pre-provisioned session key; self-serve money locked (admin grant only); `ametyst init` one-command install runs an onboarding compound.

## Context
`landing-page` is Ametyst's public marketing site (Next.js). In this sprint it is a light-touch repo: it provides the real entry point into the product — a "Launch app" CTA in the top bar pointing at the business-app URL — and, in Step 0, it may need minimal test infrastructure added if none exists yet. Everything else in the sprint happens in the backend/app repos.

## Architecture Decision Records
- **ADR-001 — Fully non-custodial (hard principle, global):** Ametyst holds nothing and never signs for a customer. landing-page is a static marketing surface; it holds no keys and touches no wallet.
- **ADR-005 — Access gate = AllowedEmail:** the gate itself is enforced in credential-api after Google auth. landing-page only provides the "Launch app" entry point into business-app where that flow begins.

## Test strategy
- **Step 0 test-infra check:** if `landing-page` has no `## Testing` section in CLAUDE.md, add minimal vitest/test config + `.env.test` + a `## Testing` section (only if missing).
- The landing CTA and the prod business-app URL are explicitly NOT part of the sprint's tested surface.

## Macro steps

### Step 0 — Prep (no code) — TOUCHED (conditional)
**What/why:** Ensure this repo has minimal test infra so later steps can run tests, if it is missing.
**This repo's changes:**
- If there is no `## Testing` section, add minimal vitest/test config + `.env.test` + a `## Testing` section in CLAUDE.md. **Only if missing** — otherwise no change. Elsewhere in Step 0: the curated merchant payTo list is extracted from `merchant-fixtures` and the Full-access policy numbers are fixed.

### Step 1 — Frictionless defaults (non-custodial, approvals moved upfront)
**No changes required in this repo.** Elsewhere: sdk adds `whitelistMany`; business-app drives the upfront passkey approvals; buyer-api mirrors the batch rows; cli gains `importWallet`.

### Step 2 — Access gate + Launch-app entry — TOUCHED
**What/why:** Give a real entry point from the marketing site into the app.
**This repo's changes:**
- `components/TopBar.tsx` — a "Launch app" CTA → `NEXT_PUBLIC_APP_URL` (the prod business-app URL is deferred; wire the env var now, set the value later).

### Step 3 — Money lockdown (self-serve off)
**No changes required in this repo.** Elsewhere: credential-api adds a `withdrawEnabled` guard; business-app hides self-serve top-up/withdraw.

### Step 4 — `ametyst init` + onboarding compound
**No changes required in this repo.** Elsewhere: cli adds `ametyst init`; onboarding compound authored on the Ametyst workspace; business-app shows the one-liner.

### Step 5 — Stabilization
Cross-repo wiring, integration fixes, and polish that surface during execution. No pre-defined touches; may span multiple iterations with incremented macro_step numbers.

## Constraints
- NON-CUSTODIAL is a hard rule: the partner's passkey signs every approval; Ametyst holds nothing and never signs for a customer. landing-page holds no keys.
- SDK ships first within a feature (ADR-006): bump + publish @ametyst-dev/sdk (staging only, never prod) before any consumer bumps the dep.
- Never push to `main`. Work on a sub-branch → PR to the sprint branch `design-partner-activation`.
- The develop/step-plan/step-debug/step-review/step-ship skills live on the Ametyst workspace (compounds) — fetch/run them from there at runtime; they are NOT vendored into this repo.

## Definition of done
- [ ] This repo's slice of the sprint is implemented and tested.
- [ ] All tests pass.
- [ ] Each feature (macro step) merged to `main` and tested end-to-end in `main` before the next feature starts.

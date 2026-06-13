# Sprint Memory — 0006 / landing-page

## Info
channel: sprint-0006-landing-v2
started: 2026-06-11

## Message log

### Sent
<!-- format: [DATETIME] [TYPE] to: {recipient} — {one-line summary} -->
[2026-06-11] [STEP_START] to: orchestrator — starting macro step 0 on branch landing-v2-step-0: test infrastructure setup (Vitest + RTL, waitlist API tests, CLAUDE.md Testing section). NOTE: sub-branch uses `-` separator (landing-v2-step-0) because git cannot create landing-v2/step-0 while branch landing-v2 exists.
[2026-06-11] [STEP_DONE] to: orchestrator — macro step 0 done. PR: https://github.com/ametyst-dev/landing-page/pull/3
[2026-06-11] [STEP_START] to: orchestrator — starting macro step 1 on branch landing-v2-step-1: shell + existing sections rewrite with locked copy (TopBar, Hero, HowItWorks, Waitlist final CTA, EndStrip tagline), semantic aliases only
[2026-06-11] [STEP_DONE] to: orchestrator — macro step 1 done. PR: https://github.com/ametyst-dev/landing-page/pull/4
[2026-06-11] [STEP_START] to: orchestrator — starting macro step 2 on branch landing-v2-step-2: page completion merged step (A: Problem+Personas, B: ChatDemo, C: GEO metadata + docs + acceptance sweep)
[2026-06-11] [STEP_REDO] to: cursor — macro step 2 sent back for correction. Footer X link 404 (ametyst_xyz does not exist); chunk 7 added: fix to x.com/ametyst_ai (HIL-confirmed, curl 200) + test update.
[2026-06-11] [STEP_DONE] to: orchestrator — macro step 2 done. PR: https://github.com/ametyst-dev/landing-page/pull/5
[2026-06-11] [STEP_START] to: orchestrator — starting macro step 3 on branch landing-v2-step-3: stabilization (canonical domain ametyst.ai, twitter @ametyst_ai, stale docs lines, ChatDemo a11y)
[2026-06-11] [STEP_DONE] to: orchestrator — macro step 3 done. PR: https://github.com/ametyst-dev/landing-page/pull/6

### Received
<!-- format: [DATETIME] [TYPE] from: {sender} — {one-line summary} -->
[2026-06-11] [SPRINT_START] from: sprint-planner — sprint-0006 launched, repos: [ametyst-dev/landing-page], goal: rebuild landing page with access-first positioning + animated chat demo, copy locked, no product links
[2026-06-11] [PR_MERGED] from: orchestrator — macro step 0 PR merged into landing-v2 (https://github.com/ametyst-dev/landing-page/pull/3)
[2026-06-11] [MACRO_STEP_DONE] from: orchestrator — macro step 0 completed across all repos
[2026-06-11] [MACRO_STEP_START] from: orchestrator — macro step 1 started: shell + existing sections rewrite with locked copy (TopBar, Hero, HowItWorks, Waitlist final CTA, EndStrip tagline)
[2026-06-11] [PR_MERGED] from: orchestrator — macro step 1 PR merged into landing-v2 (https://github.com/ametyst-dev/landing-page/pull/4)
[2026-06-11] [MACRO_STEP_DONE] from: orchestrator — macro step 1 completed across all repos
[2026-06-11] [MACRO_STEP_START] from: orchestrator — macro step 2 started: new sections Problem + Personas (Part A of merged step 2)
[2026-06-11] [UPGRADE_REDIRECT] from: orchestrator — guidelines updated: ex steps 2/3/4 merged into single Step 2 (A: Problem+Personas, B: ChatDemo, C: metadata+docs+sweep), Stabilization now Step 3; priority before_next_step — HANDLED: pulled landing-v2 (commit aaf3737) and re-read sprint-guidelines.md before planning step 2
[2026-06-11] [PR_MERGED] from: orchestrator — macro step 2 PR merged into landing-v2 (https://github.com/ametyst-dev/landing-page/pull/5)
[2026-06-11] [MACRO_STEP_DONE] from: orchestrator — macro step 2 completed across all repos
[2026-06-11] [MACRO_STEP_START] from: orchestrator — macro step 3 started: stabilization with 3 items from step 2 PR review (twitter handle @ametyst_xyz→@ametyst_ai; metadataBase+OG URLs ametyst.xyz→https://ametyst.ai canonical; ARCHITECTURE.md stale skill-URL line) + eventual polish

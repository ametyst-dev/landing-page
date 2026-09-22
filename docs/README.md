# landing-page

## What is this
The public marketing site for Ametyst — it equips AI agents to work autonomously: a wallet and credits per agent, spending policies per agent and per person, and the Ametyst Agent, which keeps workflows sharp over time. It is a single-page Next.js 15 application with a fixed navigation bar, seven content sections (hero, three product blocks, real tasks, how we start, pricing, final CTA), an email API route kept for a future capture form (`/api/waitlist`, currently unused), and a dedicated booking page that embeds a Cal.com calendar.

## Why it exists
The landing page is the primary conversion surface for Ametyst in its early-stage validation phase. It communicates the product value proposition to two distinct audiences (agent owners and SaaS developers), captures waitlist emails to measure market interest, and provides a frictionless path to book a discovery call.

## What's inside
- `app/` — Next.js App Router root: layout, main page, globals CSS, and route handlers
- `app/api/waitlist/` — POST endpoint that validates email and forwards it to a Google Sheets script
- `app/book/` — Booking page embedding the Cal.com calendar (30-minute discovery call)
- `components/TopBar.tsx` — Fixed navigation bar: brand, section anchors, "Sign in" (business.ametyst.ai) and "Book a call" CTA
- `components/Hero.tsx` — Above the fold: the angle 3 headline, the identity subheadline, two CTAs, the harness logos, and the `HeroRun` terminal
- `components/Problem.tsx` — The three pains (only you can run it, you can't let it go, it breaks in silence), one short sentence pair each, on the tinted band
- `components/Frames.tsx` — Mock frames of the web app, Claude, Sheets and Notion. Not rendered since review round 2 (the page no longer shows the web app); `TaskFlow` and `AppsAgentsCard` still use them
- `components/HeroRun.tsx` — The headline shown: the same competitor-ads run side by side, without the Ametyst Agent (every call returns, 0 ads, the run says done; no placeholder boxes) and with it (step 1 updated before the run, output checked after), three outcome numbers under each. Pattern from typesafe.ai. Lines fade in with CSS delays. `components/TaskFlow.tsx` (the old four-frame demo) is no longer rendered
- `components/Terminal.tsx` — Flat dark terminal window shared by the hero run and step 01
- `components/Manifesto.tsx` — "Your workflows are your differentiation" band. Not rendered since playbook v1 (the Problem block took its place); kept for reuse
- `components/RealTasks.tsx` — Four real workflows as cards visible together: team, in, out, tool chips with favicons, cost per run. Anonymized, copy from the delivered HANDOFF files in domain-expansion
- `components/Pillars.tsx` — "Three things Ametyst does in every run": 01 the Ametyst Agent (full-width terminal), 02 every tool (company apps and providers, `ToolsCard`), 03 the spending policy of a task (competitor-ads: per run, per day, its tools, this morning's run with allowed, approved and denied calls; the same task the hero runs)
- `components/HowWeStart.tsx` — Design-partner process, four steps from the first call to maintenance and new workflows. Not rendered since the playbook v1 review; kept for reuse
- `components/Pricing.tsx` — Not rendered; its "never a share of your spend" line contradicts the 1.5% in the deck, fix before reusing it. Not rendered since the playbook v1 review (removed on Michele's request). Three plan cards mapped to the three steps (Free, Pro, Team) plus the usage line (apps per call or subscription, specialized agents per run, Ametyst Agent monthly credit). Never a share of spend, never seats
- `components/Faq.tsx` — Six questions, one-sentence answers, native `details`, `+` on the right in a narrow list, violet when open
- `components/Providers.tsx` — Tool data and views: `APPS` (company apps connected to the workspace), `PROVIDERS` (live on staging, logo-verified), `ToolIcon`, and `ToolsCard`, the visual of step 02. No longer a section of its own; keep `PROVIDERS` in sync with the staging allowlist
- `components/Cta.tsx` — Final call to action on the action angle ("Stop watching every run."): create workspace primary, talk to the team secondary
- `contexts/` — React context providers (currently empty, reserved for future global state)
- `hooks/` — Custom React hooks (currently empty, reserved for reusable client logic)
- `public/` — Static assets: `icon.png` (brand icon), `providers/<slug>.png` (favicons of the company apps and providers), `skill.md` (the agent-facing onboarding guide, linked from the footer) and other skill `.md` files served at root
- `tailwind.config.ts` — Tailwind configuration with semantic color aliases and font families
- `DESIGN.md` — The Ametyst design system in the Refero DESIGN.md format: tokens, type, shape, components, do/don't, agent prompt guide. Read it before any UI work
- `PALETTE-info.md` — Older palette notes (light and a never-shipped dark theme); superseded by `DESIGN.md`
- `scripts/snapshot.mjs` — `npm run snapshot`: builds the site and writes a self-contained static copy of the home page to `snapshot/` (gitignored) for publishing as a Claude artifact during design review

## Rules
- All UI sections are React components in `components/` — never add section markup directly inside `app/page.tsx`
- Never hardcode hex color values in components — always use Tailwind semantic aliases (`bg-bg`, `text-fg`, `text-muted`, etc.) defined in `tailwind.config.ts`
- Never commit `.env*.local` or expose `GOOGLE_SCRIPT_URL` client-side
- The page is light-mode only; do not introduce `dark:` Tailwind variants unless the design direction explicitly changes

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
- `components/Hero.tsx` — Above-the-fold: the hook question ("How many of your AI workflows run without you?"), the identity phrase, two CTAs, the €10 credits line, and the `TaskFlow` animation
- `components/Problem.tsx` — Block 02 of the playbook: the three pains (only you can run it, afraid to let it go, it breaks quietly), on the tinted band
- `components/Frames.tsx` — Product-faithful mock frames: `AmetystApp` (business-app shell: white sidebar, nav labels and Admin panel as in `index.html`, 10px-radius cards, Verification tabs Overview/Behaviours/Maintenance, `admin={false}` for the member view with the Admin panel collapsed), `NotionFrame`, `ClaudeFrame`, `SheetsFrame`. Keep `AmetystApp` in sync with business-app's sidebar when it changes
- `components/TaskFlow.tsx` — Four auto-advancing frames on the competitor-ads task (task in the web app → agent runs "scoreboard" and "genera 1-5" in Claude Desktop → Google Sheet with ranking and generated drafts → Verification page with Maintenance and Behaviours on); pauses on hover, tabs are clickable
- `components/Manifesto.tsx` — "Your workflows are your differentiation" band. Not rendered since playbook v1 (the Problem block took its place); kept for reuse
- `components/RealTasks.tsx` — Four real tasks (B2B prospecting, events CRM, the engineering agent, competitor ads), anonymized: no task slugs or client names on the page; copy comes from the delivered HANDOFF files in domain-expansion
- `components/Pillars.tsx` — How it works: the three blocks as three steps in order of use, each with the plan it opens (01 connect: workspace + agents, Free; 02 control: policies + invites, Pro/Team; 03 sharp: the Ametyst Agent, Pro and Team). Provider wall stays in sync with merchants-router `[env.production.vars]`
- `components/HowWeStart.tsx` — Design-partner process, four steps from the first call to maintenance and new workflows. Not rendered since the playbook v1 review; kept for reuse
- `components/Pricing.tsx` — Not rendered since the playbook v1 review (removed on Michele's request). Three plan cards mapped to the three steps (Free, Pro, Team) plus the usage line (apps per call or subscription, specialized agents per run, Ametyst Agent monthly credit). Never a share of spend, never seats
- `components/Faq.tsx` — Seven questions with native `details` accordions, including the two known confusions: model subscription vs Ametyst credits, and what a policy limit does
- `components/Providers.tsx` — Grid of providers live on Ametyst (name, what it does, favicon from `public/providers/`), between the real tasks and the FAQ; only providers with a verified logo, trimmed to fill the 4-column grid; keep in sync with the staging allowlist
- `components/Cta.tsx` — Final call to action on the action angle ("Stop watching every run."): create workspace primary, talk to the team secondary
- `contexts/` — React context providers (currently empty, reserved for future global state)
- `hooks/` — Custom React hooks (currently empty, reserved for reusable client logic)
- `public/` — Static assets: `icon.png` (brand icon), `providers/<slug>.png` (provider favicons for the Providers grid), `skill.md` (the agent-facing onboarding guide, linked from the footer) and other skill `.md` files served at root
- `tailwind.config.ts` — Tailwind configuration with semantic color aliases and font families
- `DESIGN.md` — The Ametyst design system in the Refero DESIGN.md format: tokens, type, shape, components, do/don't, agent prompt guide. Read it before any UI work
- `PALETTE-info.md` — Older palette notes (light and a never-shipped dark theme); superseded by `DESIGN.md`
- `scripts/snapshot.mjs` — `npm run snapshot`: builds the site and writes a self-contained static copy of the home page to `snapshot/` (gitignored) for publishing as a Claude artifact during design review

## Rules
- All UI sections are React components in `components/` — never add section markup directly inside `app/page.tsx`
- Never hardcode hex color values in components — always use Tailwind semantic aliases (`bg-bg`, `text-fg`, `text-muted`, etc.) defined in `tailwind.config.ts`
- Never commit `.env*.local` or expose `GOOGLE_SCRIPT_URL` client-side
- The page is light-mode only; do not introduce `dark:` Tailwind variants unless the design direction explicitly changes

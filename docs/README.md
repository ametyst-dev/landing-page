# landing-page

## What is this
The public marketing site for Ametyst — spend management for AI agents: one dashboard with what every agent and person spends on AI, a spending policy per agent, and a cheaper model or tool proposed for each step of a workflow, applied only when the customer approves. It is a single-page Next.js 15 application with a fixed navigation bar, seven content sections (hero, three product blocks, real tasks, how we start, pricing, final CTA), an email API route kept for a future capture form (`/api/waitlist`, currently unused), and a dedicated booking page that embeds a Cal.com calendar.

## Why it exists
The landing page is the primary conversion surface for Ametyst in its early-stage validation phase. It communicates the product value proposition to two distinct audiences (agent owners and SaaS developers), captures waitlist emails to measure market interest, and provides a frictionless path to book a demo.

## What's inside
- `app/` — Next.js App Router root: layout, main page, globals CSS, and route handlers
- `app/api/waitlist/` — POST endpoint that validates email and forwards it to a Google Sheets script
- `app/book/` — "Book a demo" page embedding the Cal.com calendar (30 minutes). Every booking button on the site says "Book a demo"
- `app/pricing/`, `app/terms/`, `app/refunds/`, `app/privacy/`, `app/contact/` — Static text pages the payment processor (Stripe) requires. All five are linked from the footer. Plans and how credits are bought, Terms of Service, Refund and Cancellation Policy, Privacy Policy, support contacts and company data. Copy rule: "credits", never "wallet"/"USDC"/"bank"
- `components/TopBar.tsx` — Fixed navigation bar, full width: brand, "Book a demo" and "Get started"
- `components/Hero.tsx` — Above the fold: the spend headline ("See what every agent does with your money."), the subheadline (spend management for AI agents), two CTAs and the harness logos (Claude Code, Codex, Cursor, OpenClaw, OpenCode). No demo under it
- `components/Problem.tsx` — "Nobody is watching what your agents cost.": the two pains (agents overpay at every step, nobody sees the whole picture), on the tinted band
- `components/Pillars.tsx` — "How Ametyst cuts your AI spend", two blocks without numbers: AI spend by agent (the spend dashboard: totals, policies near their limit, a month of spend by agent) and the cheaper route (`RouteCard`)
- `components/RouteCard.tsx` — Client component: the steps of one workflow next to the models and tools Ametyst can route each step to. Cycles every four seconds, pauses on hover
- `components/Terminal.tsx` — Flat dark terminal window with an optional title and aside. Not rendered today
- `components/Providers.tsx` — Tool data and views: `APPS` (the tools the company already uses), `PROVIDERS` (live on staging, logo-verified), `ToolIcon` (used by `RouteCard`), and `ToolsCard` (not rendered today). Keep `PROVIDERS` in sync with the staging allowlist
- `components/RealTasks.tsx` — Four workflow cards from our design partners. Not rendered today; kept for reuse
- `components/Faq.tsx` — Five questions, one-sentence answers, native `details`, `+` on the right in a narrow list, violet when open
- `components/Cta.tsx` — Final call to action ("See what your agents spend. Then spend less."): get started primary, book a demo secondary
- `components/EndStrip.tsx` — The one footer, shared with the text pages: one row with the legal links (Pricing/Terms/Refunds/Privacy/Contact) and the X and LinkedIn marks, then a short company data line in Italian. No Product links, no brand block and no line above it. The full set art. 2250 c.c. requires on the site (share capital, single shareholder) is on `/contact`: do not remove it from there
- `components/LegalPage.tsx` — Shell for the text pages (header with a link home, title, "Last updated", footer) plus the small typography helpers they share (`H2`, `P`, `UL`, `A`, `Table`). `LAST_UPDATED` lives here: bump it whenever Terms, Refunds or Privacy change
- `components/Pricing.tsx` — `PlansTable`: the three plans (Pay per use, Pro €15 per month for each person on Pro, Enterprise custom), everything priced in credits; the table lists only what differs (cheaper routes, agents connected: 1 on pay per use, support), what every workspace has (members, policies, full spend history, tools) is said once in the /pricing intro; no plan includes credits and the rate is the same on every plan; the plans differ in who finds the savings. Pro is per person: a workspace can mix people on Pro and people on pay per use. Used by the `/pricing` page, linked from the footer; there is no pricing section on the home page. Source of truth: domain-expansion data room `06-financials/01-financial-model.md` (plans table). When a plan changes, check Terms clause 6 and the Refund Policy too
- `components/Frames.tsx`, `components/TaskFlow.tsx`, `components/AppsAgentsCard.tsx`, `components/Manifesto.tsx` — Not rendered (the page no longer shows the web app); kept for reuse
- `contexts/` — React context providers (currently empty, reserved for future global state)
- `hooks/` — Custom React hooks (currently empty, reserved for reusable client logic)
- `public/` — Static assets: `icon.png` (brand icon), `providers/<slug>.png` (favicons of the company apps and providers), `skill.md` (the agent-facing onboarding guide: what Ametyst is, in the same words as the home page, then the setup steps; `__tests__/legal-copy.test.tsx` holds it to the copy rules)
- `tailwind.config.ts` — Tailwind configuration with semantic color aliases and font families
- `DESIGN.md` — The Ametyst design system in the Refero DESIGN.md format: tokens, type, shape, components, do/don't, agent prompt guide. Read it before any UI work
- `PALETTE-info.md` — Older palette notes (light and a never-shipped dark theme); superseded by `DESIGN.md`
- `scripts/snapshot.mjs` — `npm run snapshot`: builds the site and writes a self-contained static copy of the home page to `snapshot/` (gitignored) for publishing as a Claude artifact during design review

## Rules
- All UI sections are React components in `components/` — never add section markup directly inside `app/page.tsx`
- Never hardcode hex color values in components — always use Tailwind semantic aliases (`bg-bg`, `text-fg`, `text-muted`, etc.) defined in `tailwind.config.ts`
- Never commit `.env*.local` or expose `GOOGLE_SCRIPT_URL` client-side
- The page is light-mode only; do not introduce `dark:` Tailwind variants unless the design direction explicitly changes

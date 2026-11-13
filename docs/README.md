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
- `components/TopBar.tsx` — Fixed navigation bar, full width: brand, a "Pricing" link to the `#pricing` section of the home page (hidden on a phone), "Book a demo" and "Get started"
- `components/Hero.tsx` — Above the fold: the spend headline ("See what every agent does with your money."), the subheadline (spend management for AI agents), two CTAs and the harness logos (Claude Code, Codex, Cursor, OpenClaw, OpenCode). No demo under it
- `components/Problem.tsx` — "Nobody is watching what your agents cost.": the three pains in the order the page answers them (nobody sees the whole picture, nobody knows what it returned, agents overpay at every step), on the tinted band
- `components/Pillars.tsx` — "See the spend, know what it returned, then cut it.", without numbers: one wide block, AI spend categorized (`SpendSplit`), then three cards in one row that hang from it under "From the same spend data": the ROI of every agent (spend and cost of one result, with a Download CSV mark; no hours saved), make or buy with numbers (one case each way), and the cheaper route (`RouteCard`). The three cards stack on a phone
- `components/SpendSplit.tsx` — Client component: the spend dashboard of the first block. One total (€18,420) split by provider, model, project, member and agent; every split sums to the total. Turns every four seconds, pauses on hover, stops once a person picks a split
- `components/RouteCard.tsx` — Client component, the compact card inside `Pillars`: one step of a workflow, what runs it today, the cheaper model or tool, the saving a month and the Approve mark. Cycles every four seconds, pauses on hover
- `components/Terminal.tsx` — Flat dark terminal window with an optional title and aside. Not rendered today
- `components/Providers.tsx` — Tool data and views: `APPS` (the tools the company already uses), `PROVIDERS` (live on staging, logo-verified), `ToolIcon` (used by `RouteCard`), and `ToolsCard` (not rendered today). Keep `PROVIDERS` in sync with the staging allowlist
- `components/RealTasks.tsx` — Four workflow cards from our design partners. Not rendered today; kept for reuse
- `components/Faq.tsx` — Six questions, one-sentence answers, native `details`, `+` on the right in a narrow list, violet when open. The first says what does not work yet (Claude Cowork, ChatGPT); the last says when Pro is needed
- `components/Cta.tsx` — The closing call to action ("See what your agents spend. Then spend less."). Not rendered since 13 November 2026: the home page ends with the questions and the footer; kept for reuse
- `components/EndStrip.tsx` — The one footer, shared with the text pages: one row with the legal links (Pricing/Terms/Refunds/Privacy/Contact) and the X and LinkedIn marks, then a short company data line in Italian. No Product links, no brand block and no line above it. The full set art. 2250 c.c. requires on the site (share capital, single shareholder) is on `/contact`: do not remove it from there
- `components/LegalPage.tsx` — Shell for the text pages (header with a link home, title, "Last updated", footer) plus the small typography helpers they share (`H2`, `P`, `UL`, `A`, `Table`). `LAST_UPDATED` lives here: bump it whenever Terms, Refunds or Privacy change
- `components/Pricing.tsx` — The two plans, Pay per use (€0, no fixed fee) and Pro (€15 per seat per month); there is no Enterprise plan. `PlansTable` is the table for md and wider: rows in three groups, a tick, a dash or the limit, the Pro column framed. `PlanCards` are the same plans as two cards for a phone. `Plans` picks between them by width. The default export is the `#pricing` section of the home page; `/pricing` uses `Plans` under its own text. Pay per use: 2 spending policies, 1 agent and 1 wallet per member, 5 savings advice a month. Pro: all unlimited, plus the ROI data to download and a make-or-buy review with our team. When a plan changes, check Terms clause 6 (it still names Enterprise as agreed in writing) and the Refund Policy too
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

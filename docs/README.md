# landing-page

## What is this
The public marketing site for Ametyst — it equips AI agents to work autonomously: a wallet and credits per agent, spending policies per agent and per person, and the Ametyst Agent, which keeps workflows sharp over time. It is a single-page Next.js 15 application with a fixed navigation bar, seven content sections (hero, three product blocks, real tasks, how we start, pricing, final CTA), an email API route kept for a future capture form (`/api/waitlist`, currently unused), and a dedicated booking page that embeds a Cal.com calendar.

## Why it exists
The landing page is the primary conversion surface for Ametyst in its early-stage validation phase. It communicates the product value proposition to two distinct audiences (agent owners and SaaS developers), captures waitlist emails to measure market interest, and provides a frictionless path to book a discovery call.

## What's inside
- `app/` — Next.js App Router root: layout, main page, globals CSS, and route handlers
- `app/api/waitlist/` — POST endpoint that validates email and forwards it to a Google Sheets script
- `app/book/` — Booking page embedding the Cal.com calendar (30-minute discovery call)
- `app/pricing/`, `app/terms/`, `app/refunds/`, `app/privacy/`, `app/contact/` — Static text pages the payment processor (Stripe) requires. `/pricing` is unlisted (no links, `noindex`); the other four are linked from the footer. Plans and how credits are bought, Terms of Service, Refund and Cancellation Policy, Privacy Policy, support contacts and company data. Copy rule: "credits", never "wallet"/"USDC"/"bank"
- `components/TopBar.tsx` — Fixed navigation bar: brand, section anchors (How it works, Use cases), "Sign in" (business.ametyst.ai) and "Book a call" CTA
- `components/Hero.tsx` — Above-the-fold: "You have the agents. Let them work.", two CTAs, the €10 credits line, and the `TaskFlow` animation
- `components/Frames.tsx` — Product-faithful mock frames: `AmetystApp` (business-app shell: white sidebar, nav labels and Admin panel as in `index.html`, 10px-radius cards, Verification tabs Overview/Behaviours/Maintenance, `admin={false}` for the member view with the Admin panel collapsed), `NotionFrame`, `ClaudeFrame`, `SheetsFrame`. Keep `AmetystApp` in sync with business-app's sidebar when it changes
- `components/TaskFlow.tsx` — Four auto-advancing frames on the competitor-ads task (task in the web app → agent runs "scoreboard" and "genera 1-5" in Claude Desktop → Google Sheet with ranking and generated drafts → Verification page with Maintenance and Behaviours on); pauses on hover, tabs are clickable
- `components/Manifesto.tsx` — Full-width statement band between the three blocks and the real tasks: "Your workflows are your differentiation"
- `components/RealTasks.tsx` — Four real tasks (B2B prospecting, events CRM, the engineering agent, competitor ads), anonymized: no task slugs or client names on the page; copy comes from the delivered HANDOFF files in domain-expansion
- `components/Pillars.tsx` — The three blocks, in order: 01 every provider live on production (grouped wall, keep in sync with merchants-router `[env.production.vars]`), 02 policies + task sharing for the admin, 03 maintained and efficient workflows
- `components/Pricing.tsx` — `PlansTable`: the three plans (Pay per use, Pro €20/month, Team €25/member/month), everything priced in credits; the plans differ by feature (Ametyst Agent on request vs on its own, limits on policies, tasks and history, shared tasks and admin panel on Team only), not by credit price. Used only by the UNLISTED `/pricing` page: there is no pricing section on the home page and nothing links to `/pricing` (decision 2026-09-21). Source of truth for the numbers: domain-expansion `areas/product/devops/stripe-activation/01-site-content-drafts.md`
- `components/LegalPage.tsx` — Shell for the text pages (header with a link home, title, "Last updated", footer) plus the small typography helpers they share (`H2`, `P`, `UL`, `A`, `Table`). `LAST_UPDATED` lives here: bump it whenever Terms, Refunds or Privacy change
- `components/EndStrip.tsx` — The one footer: brand + tagline, three link columns (Product, Legal: Terms/Refunds/Privacy/Contact, Follow) and a short company data line in Italian. The full set art. 2250 c.c. requires on the site (share capital, single shareholder) is on `/contact`: do not remove it from there. Never links `/pricing`
- `components/Cta.tsx` — Final call to action (book a call, create workspace)
- `contexts/` — React context providers (currently empty, reserved for future global state)
- `hooks/` — Custom React hooks (currently empty, reserved for reusable client logic)
- `public/` — Static assets: `icon.png` (brand icon), `skill.md` (the agent-facing onboarding guide, linked from the footer) and other skill `.md` files served at root
- `tailwind.config.ts` — Tailwind configuration with semantic color aliases and font families
- `PALETTE-info.md` — Reference document describing the Ametyst color palette for both light and dark themes

## Rules
- All UI sections are React components in `components/` — never add section markup directly inside `app/page.tsx`
- Never hardcode hex color values in components — always use Tailwind semantic aliases (`bg-bg`, `text-fg`, `text-muted`, etc.) defined in `tailwind.config.ts`
- Never commit `.env*.local` or expose `GOOGLE_SCRIPT_URL` client-side
- The page is light-mode only; do not introduce `dark:` Tailwind variants unless the design direction explicitly changes

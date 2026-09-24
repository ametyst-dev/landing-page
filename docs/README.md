# landing-page

## What is this
The public marketing site for Ametyst — it equips AI agents to work autonomously: a wallet and credits per agent, spending policies per agent and per person, and the Ametyst Agent, which keeps workflows sharp over time. It is a single-page Next.js 15 application with a fixed navigation bar, seven content sections (hero, three product blocks, real tasks, how we start, pricing, final CTA), an email API route kept for a future capture form (`/api/waitlist`, currently unused), and a dedicated booking page that embeds a Cal.com calendar.

## Why it exists
The landing page is the primary conversion surface for Ametyst in its early-stage validation phase. It communicates the product value proposition to two distinct audiences (agent owners and SaaS developers), captures waitlist emails to measure market interest, and provides a frictionless path to book a discovery call.

## What's inside
- `app/` — Next.js App Router root: layout, main page, globals CSS, and route handlers
- `app/api/waitlist/` — POST endpoint that validates email and forwards it to a Google Sheets script
- `app/book/` — Booking page embedding the Cal.com calendar (30-minute discovery call)
- `app/pricing/`, `app/terms/`, `app/refunds/`, `app/privacy/`, `app/contact/` — Static text pages the payment processor (Stripe) requires. All five are linked from the footer. Plans and how credits are bought, Terms of Service, Refund and Cancellation Policy, Privacy Policy, support contacts and company data. Copy rule: "credits", never "wallet"/"USDC"/"bank"
- `components/TopBar.tsx` — Fixed navigation bar: brand, one section anchor (Use cases), "Talk to the team" and "Create your workspace"
- `components/Hero.tsx` — Above the fold: the angle 3 headline ("Your agent workflows break quietly."), the identity subheadline (the agent that looks after your workflows all the time, fixes what breaks and proposes new workflows from what the team does), two CTAs and the harness logos. No demo under it since the playbook v1 review
- `components/Problem.tsx` — "You built the workflow. Now it depends on you.": the three pains (only you can run it, you can't let it go, it breaks in silence), one short sentence pair each, on the tinted band
- `components/Pillars.tsx` — "How Ametyst keeps your workflows running", two blocks without numbers: the Ametyst Agent (a terminal feed: fixes made at night, between runs, and new workflows it proposes from what the team does by hand) and the workspace (every tool with one key, `ToolsCard`, and a spending policy for each workflow, said in the text)
- `components/Terminal.tsx` — Flat dark terminal window with an optional title and aside, used by the Ametyst Agent block
- `components/Providers.tsx` — Tool data and views: `APPS` (the tools the company already uses), `PROVIDERS` (live on staging, logo-verified), `ToolIcon`, and `ToolsCard`, the visual of the workspace block. Keep `PROVIDERS` in sync with the staging allowlist
- `components/RealTasks.tsx` — The social proof: "Running today with our design partners", four workflow cards visible together (team, title, one sentence on what the team gets, tool chips with favicons, cost per run). Anonymized, copy from the delivered HANDOFF files in domain-expansion
- `components/Faq.tsx` — Six questions, one-sentence answers, native `details`, `+` on the right in a narrow list, violet when open
- `components/Cta.tsx` — Final call to action ("Stop watching every run."): create workspace primary, talk to the team secondary
- `components/EndStrip.tsx` — The one footer, shared with the text pages: three link columns (Product, Legal: Pricing/Terms/Refunds/Privacy/Contact, Follow) and a short company data line in Italian. No brand block and no line above it. The full set art. 2250 c.c. requires on the site (share capital, single shareholder) is on `/contact`: do not remove it from there
- `components/LegalPage.tsx` — Shell for the text pages (header with a link home, title, "Last updated", footer) plus the small typography helpers they share (`H2`, `P`, `UL`, `A`, `Table`). `LAST_UPDATED` lives here: bump it whenever Terms, Refunds or Privacy change
- `components/Pricing.tsx` — `PlansTable`: the three plans (Pay per use, Pro €20/month, Team €25/member/month), everything priced in credits; the plans differ by feature, not by credit price. Used by the `/pricing` page, linked from the footer; there is no pricing section on the home page. Source of truth for the numbers: domain-expansion `areas/product/devops/stripe-activation/01-site-content-drafts.md`
- `components/Frames.tsx`, `components/TaskFlow.tsx`, `components/AppsAgentsCard.tsx`, `components/Manifesto.tsx` — Not rendered (the page no longer shows the web app); kept for reuse
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

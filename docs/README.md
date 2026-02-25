# landing-page

## What is this
The public marketing site for Ametyst — a banking platform for autonomous AI agents. It is a single-page Next.js 15 application with a fixed navigation bar, six content sections, a waitlist sign-up form backed by a Google Sheets API, and a dedicated booking page that embeds a Cal.com calendar.

## Why it exists
The landing page is the primary conversion surface for Ametyst in its early-stage validation phase. It communicates the product value proposition to two distinct audiences (agent owners and SaaS developers), captures waitlist emails to measure market interest, and provides a frictionless path to book a discovery call.

## What's inside
- `app/` — Next.js App Router root: layout, main page, globals CSS, and route handlers
- `app/api/waitlist/` — POST endpoint that validates email and forwards it to a Google Sheets script
- `app/book/` — Booking page embedding the Cal.com calendar (30-minute discovery call)
- `components/TopBar.tsx` — Fixed navigation bar with brand name and "Get started" CTA
- `components/Hero.tsx` — Above-the-fold section with headline, subheadline, and product demo video placeholder
- `components/HowItWorks.tsx` — Tabbed section explaining the product flow for agent owners and SaaS developers
- `components/Waitlist.tsx` — Email capture form with honeypot bot protection, wired to `/api/waitlist`
- `components/FAQ.tsx` — Frequently asked questions accordion
- `components/EndStrip.tsx` — Bottom strip / footer with social links and contact info
- `contexts/` — React context providers (currently empty, reserved for future global state)
- `hooks/` — Custom React hooks (currently empty, reserved for reusable client logic)
- `public/` — Static assets: `icon.png` (brand icon), skill `.md` files served at root
- `tailwind.config.ts` — Tailwind configuration with semantic color aliases and font families
- `PALETTE-info.md` — Reference document describing the Ametyst color palette for both light and dark themes

## Rules
- All UI sections are React components in `components/` — never add section markup directly inside `app/page.tsx`
- Never hardcode hex color values in components — always use Tailwind semantic aliases (`bg-bg`, `text-fg`, `text-muted`, etc.) defined in `tailwind.config.ts`
- Never commit `.env*.local` or expose `GOOGLE_SCRIPT_URL` client-side
- The page is light-mode only; do not introduce `dark:` Tailwind variants unless the design direction explicitly changes

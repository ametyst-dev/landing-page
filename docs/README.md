# landing-page

## What is this
The public marketing site for Ametyst — wallets that give AI agents on-demand access to every service they need. It is a single-page Next.js 15 application with a fixed navigation bar, eight content sections, a waitlist sign-up form backed by a Google Sheets API, and a dedicated booking page that embeds a Cal.com calendar.

## Why it exists
The landing page is the primary conversion surface for Ametyst in its early-stage validation phase. It communicates the product value proposition to two distinct audiences (agent owners and SaaS developers), captures waitlist emails to measure market interest, and provides a frictionless path to book a discovery call.

## What's inside
- `app/` — Next.js App Router root: layout, main page, globals CSS, and route handlers
- `app/api/waitlist/` — POST endpoint that validates email and forwards it to a Google Sheets script
- `app/book/` — Booking page embedding the Cal.com calendar (30-minute discovery call)
- `components/TopBar.tsx` — Fixed navigation bar with brand name, a "Launch app" CTA (business-app entry point, shown only when `NEXT_PUBLIC_APP_URL` is set), and the "Book a discovery call" CTA
- `components/Hero.tsx` — Above-the-fold section with the autonomy + spend-control headline, subheadline, and the two primary CTAs
- `components/ChatDemo.tsx` — Animated terminal-style demo (scripted, illustrative) shown immediately below the hero (no section heading)
- `components/ValueProps.tsx` — Three horizontal value-prop cards (agents pay per use, agents orchestrate, you set the spend policies)
- `components/HowItWorks.tsx` — Section with the 3 steps (create workspace, connect agents, start spending)
- `components/SpendLess.tsx` — Savings section: how Ametyst orchestrates and discovers cheaper paths, with an illustrative cost-saving example
- `components/Waitlist.tsx` — Final CTA section ("Give your agents real autonomy."): email capture form with honeypot bot protection, wired to `/api/waitlist`
- `components/EndStrip.tsx` — Footer with tagline, social links, and contact info
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

## Environment variables
- `GOOGLE_SCRIPT_URL` (server-only, required) — Google Apps Script webhook the waitlist API forwards emails to. Never expose client-side.
- `NEXT_PUBLIC_APP_URL` (public, optional) — the business-app URL the TopBar "Launch app" CTA points to. Public (inlined at build). Production value is deferred; when unset the "Launch app" CTA is hidden.

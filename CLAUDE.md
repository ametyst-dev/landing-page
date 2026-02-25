# CLAUDE.md — landing-page/

## Purpose
This is the public-facing landing page for Ametyst — a banking platform for autonomous AI agents. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. It serves as the main marketing surface: explains the product, collects waitlist sign-ups, and routes interested users to a discovery call booking page.

## Context triggers
- Load this when the task involves UI changes, new sections, routing, API endpoints, or styling
- Pair with `docs/ARCHITECTURE.md` before making structural changes to `app/` or `components/`
- Pair with `docs/ECOSYSTEM.md` before touching the waitlist API or any external integrations

## Boundaries (what's NOT here)
- No product application logic — this is a marketing/landing surface only
- No authentication or user sessions — see the main product repo
- No CMS or content management — copy is hardcoded in components

## Operations supported
- ✅ Do: read and edit components in `components/`
- ✅ Do: add new page sections as React components, then import them in `app/page.tsx`
- ✅ Do: add new routes under `app/` following Next.js App Router conventions
- ✅ Do: add new API routes under `app/api/`
- ✅ Do: when adding a new component → update `docs/README.md` under "What's inside"
- ✅ Do: when adding a new route or API endpoint → update `docs/ARCHITECTURE.md`
- ❌ Don't: add components directly at repo root — always place them in `components/`
- ❌ Don't: commit `.env*.local` or any file containing credentials
- ❌ Don't: use `export const dynamic = 'force-dynamic'` unless strictly necessary — this is a mostly static site

## Submodules map
- `app/` — Next.js App Router entry points (layout, pages, API routes); enter when working on routing, metadata, or server-side logic
- `app/api/` — API route handlers; enter when working on backend integrations (waitlist, future endpoints)
- `components/` — React UI components for all landing page sections; enter when working on visual layout or copy
- `contexts/` — React context providers (currently empty); enter when adding global client-side state
- `hooks/` — Custom React hooks (currently empty); enter when extracting reusable client logic
- `public/` — Static assets served at root path; enter when updating icons, images, or skill `.md` files

## Docs
- `./docs/README.md` — overview of this repo and what it contains
- `./docs/ARCHITECTURE.md` — how the codebase is structured and why
- `./docs/ECOSYSTEM.md` — how this repo relates to external services and the broader Ametyst system
- `./docs/CONTRIBUTING.md` — how to add new content correctly

## Safety / sharp edges
- `GOOGLE_SCRIPT_URL` in `.env.local` is the only required secret — never log or expose it client-side
- The waitlist API (`app/api/waitlist/route.ts`) includes a honeypot field for bot protection — do not remove it
- Tailwind colors are CSS custom properties (`var(--color-*)`) defined in `app/globals.css` — always use the semantic aliases (`bg-bg`, `text-fg`, etc.) rather than hardcoded hex values in new code
- The font `Neue Machina` is loaded from an external CDN in `globals.css` — if the CDN changes, headlines will fall back to Arial Black
- `next.config.js` uses `output: 'standalone'` — required for the Vercel/Docker deployment; do not remove

## Examples
- "Add a pricing section" → create `components/Pricing.tsx`, import it in `app/page.tsx` after `HowItWorks`, update `docs/README.md`
- "Add a new API endpoint" → create `app/api/<name>/route.ts`, update `docs/ARCHITECTURE.md`
- "Change the brand color" → update CSS custom properties in `app/globals.css`, do not change `tailwind.config.ts` color aliases
- "Update waitlist copy" → edit `components/Waitlist.tsx` only

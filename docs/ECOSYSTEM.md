# Ecosystem — landing-page

## Position
The landing page is the outermost public layer of the Ametyst system. It is a marketing-only surface with no direct connection to the product application. It sits at the intersection of the brand, the growth funnel, and the developer onboarding experience.

## Upstream (who feeds this)
- **Ametyst brand / design system**: color palette, typography, and visual identity defined in `PALETTE-info.md` and `tailwind.config.ts` — changes to brand identity must be reflected here
- **Product copy and messaging**: headlines and section content are hardcoded in components; any messaging updates come from product decisions by the Ametyst team
- **Skill files** (`public/*.md`): content is authored externally and placed in `public/` to be served as static URLs referenced in `HowItWorks.tsx`

## Downstream (who consumes this)
- **End users / visitors**: agent owners and SaaS developers who land on `ametyst.ai`
- **Google Sheets waitlist**: `app/api/waitlist/route.ts` forwards captured emails to a Google Apps Script webhook (`GOOGLE_SCRIPT_URL`)
- **Cal.com**: the `/book` page embeds a Cal.com calendar; bookings are managed in Patrick's Cal.com account (`patrick-pinta/30min`)
- **Business-app** (separate repo): the `TopBar.tsx` "Launch app" CTA is the entry point into the product; its URL is configured via the `NEXT_PUBLIC_APP_URL` env var (production value deferred). The gate itself (AllowedEmail, ADR-005) is enforced downstream in credential-api after Google auth — landing-page only provides the link.
- **Vercel**: the site is deployed and served via Vercel; the `standalone` output mode enables edge-compatible deployment

## Cross-domain relationships
- **Ametyst product app** (separate repo): the landing page is a standalone marketing site; it links to the product dashboard via the "Go to dashboard" CTA in `HowItWorks.tsx` and the "Launch app" CTA in `TopBar.tsx` (via `NEXT_PUBLIC_APP_URL`), but shares no code or state with it
- **External CDN (Neue Machina font)**: `globals.css` loads the headline font from `db.onlinewebfonts.com`; if this CDN becomes unavailable, headlines fall back to Arial Black
- **`@calcom/embed-react`**: npm package dependency that embeds the Cal.com booking widget; version is pinned in `package.json`

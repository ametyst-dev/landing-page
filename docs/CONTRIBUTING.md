# Contributing — landing-page

## The two rules — always apply these

**When you add a new file inside a folder:**
- Update `docs/README.md` (add the file to "What's inside")
- Update any other `docs/` files if the change affects architecture or integrations
- If the file is a new notable component or route, update `CLAUDE.md` submodules map too

**When you add a new folder:**
- Update `CLAUDE.md` submodules map
- Update `docs/README.md`
- Add a description entry in `docs/ARCHITECTURE.md` under the folder structure section
- Create a `CLAUDE.md` inside the new folder if it contains meaningful logic

## How to add a new landing page section
1. Create `components/<SectionName>.tsx`
2. Import it in `app/page.tsx` and place it in the desired render order
3. Give the section a root element with `id="<section-name>"` for anchor navigation
4. Use only Tailwind semantic color aliases (`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-btn-bg`, `text-btn-fg`) — never hardcode hex values
5. Update `docs/README.md` to list the new component

## How to add a new API route
1. Create `app/api/<endpoint-name>/route.ts`
2. Validate all inputs server-side before processing
3. Never expose secret env vars in response bodies or logs
4. Update `docs/ARCHITECTURE.md` data/content flow section

## How to add a new page route
1. Create `app/<route-name>/page.tsx`
2. Add `export const metadata` if SEO matters
3. Update `docs/ARCHITECTURE.md` folder structure section

## Naming conventions
- Component files: PascalCase (e.g. `MySection.tsx`)
- Route folders: lowercase, hyphen-separated (e.g. `app/my-page/`)
- API route folders: lowercase, hyphen-separated (e.g. `app/api/my-endpoint/`)
- Hooks: camelCase prefixed with `use` (e.g. `useScrollPosition.ts`)
- Context files: PascalCase suffixed with `Context` (e.g. `WaitlistContext.tsx`)
- Documentation files: always uppercase (`CLAUDE.md`, `README.md`, `ARCHITECTURE.md`, `ECOSYSTEM.md`, `CONTRIBUTING.md`)

## Styling rules
- Use CSS custom property aliases via Tailwind — never add raw hex values to component classes
- To change a color globally: edit the `--color-*` variable in `app/globals.css`
- To add a new semantic color token: add the variable in `globals.css` AND add the alias in `tailwind.config.ts`
- Light mode only — do not add `dark:` variants unless the design direction explicitly changes
- The page uses two font families: `font-body` (Inter) for body text and `font-headline` (Neue Machina) for headings

## What NOT to do
- ❌ Never commit `.env*.local`, `.env`, or any file containing API keys or secrets
- ❌ Never hardcode hex color values in component JSX — use Tailwind aliases
- ❌ Never add section markup directly inside `app/page.tsx` — always extract to a component
- ❌ Never remove the honeypot field from `Waitlist.tsx` — it is the only bot-protection mechanism
- ❌ Never change `output: 'standalone'` in `next.config.js` without verifying the deployment pipeline
- ❌ Never leave a new `app/` sub-route without a corresponding `page.tsx` file

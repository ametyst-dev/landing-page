# Architecture — landing-page

## Structure overview
The project follows Next.js 15 App Router conventions. The `app/` directory owns all routing and server-side concerns; `components/` contains all React UI components (client and server). Styling is handled exclusively through Tailwind CSS with a CSS custom property layer for theming.

## Key design decisions
- **App Router (not Pages Router)**: enables React Server Components, streaming, and the native metadata API without extra configuration
- **Flat `components/` directory**: all section components live at the same level; sub-folders are introduced only when a section grows to multiple files
- **CSS custom property theming**: colors are defined as `--color-*` variables in `globals.css` and aliased in `tailwind.config.ts` — changing a brand color requires touching one place only
- **Standalone output**: `next.config.js` uses `output: 'standalone'` for Vercel compatibility and potential Docker deployment
- **Server-side API route for waitlist**: email is never processed client-side; the browser POSTs to `/api/waitlist`, which validates and forwards to Google Sheets via a secret URL stored in env vars
- **Honeypot bot protection**: the `Waitlist` component includes a hidden form field; if filled, the API silently returns `200 OK` without registering the submission
- **No test suite**: MVP-phase project; testing is manual per the checklist in the top-level `README.md`

## Folder structure
```
landing-page/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts        # POST /api/waitlist
│   ├── book/
│   │   └── page.tsx            # /book — Cal.com embed
│   ├── globals.css             # Tailwind directives + CSS custom properties + @font-face
│   ├── layout.tsx              # Root layout: metadata, Inter font, body wrapper
│   └── page.tsx                # Main page: imports and orders all section components
├── components/
│   ├── TopBar.tsx              # Fixed header / nav
│   ├── Hero.tsx                # Above-the-fold hero
│   ├── HowItWorks.tsx          # Product walkthrough
│   ├── Waitlist.tsx            # Email capture form (client component)
│   └── EndStrip.tsx            # Footer / bottom strip
├── contexts/                   # (empty) React context providers
├── hooks/                      # (empty) Custom React hooks
├── public/                     # Static assets served at /
├── docs/                       # This documentation folder
├── tailwind.config.ts          # Tailwind theme: color aliases + font families
├── next.config.js              # Next.js config (standalone output)
├── tsconfig.json               # TypeScript config
├── postcss.config.js           # PostCSS config (Tailwind + Autoprefixer)
└── PALETTE-info.md             # Color palette reference
```

## Data / content flow
- **Waitlist form**: user fills email in `Waitlist.tsx` → browser POSTs to `app/api/waitlist/route.ts` → server validates email + honeypot → forwards to Google Sheets via `GOOGLE_SCRIPT_URL` env var → returns `{ ok: true }` → component shows success message
- **Booking**: `TopBar.tsx` "Get started" button links to `/book` → `app/book/page.tsx` renders a Cal.com embed (`@calcom/embed-react`) pointing to `patrick-pinta/30min`
- **Skill files**: static `.md` files in `public/` are served at `ametyst.xyz/setup-agent-owners-skill.md` and `ametyst.xyz/setup-saas-skill.md` — referenced as copyable skill URLs in `HowItWorks.tsx`
- **Fonts**: Inter is loaded via `next/font/google` in `layout.tsx`; Neue Machina is loaded via `@font-face` in `globals.css` pointing to an external CDN

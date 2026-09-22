---
name: Ametyst
theme: light
version: 0.1 (base, extracted from the landing page as it ships)
source: app/globals.css, tailwind.config.ts, components/*
---

# Ametyst design system

Ametyst is the agent that sits in every run of your workflows. The visual system says the same thing the copy says: a quiet, almost paper-white ground, one violet that does all the pointing, black headlines set heavy, and the product itself drawn on the page as faithful mock frames instead of illustrations. Nothing glows, nothing floats, nothing is a gradient. The violet is the only thing allowed to be loud.

This file is the reference every agent reads before touching Ametyst UI: the landing page today, the app and the docs tomorrow. Values are the ones in the code. Where the code is silent (status colors, dark theme, motion beyond one fade), this file says so instead of inventing.

## System overview

- **Ground**: lavender-white `#F8F8FF`, not pure white. Cards sit on it in pure white, so surfaces read as one step up.
- **Ink**: near-black `#0B0B0F`. Body copy is ink at 75 percent opacity, never a grey token.
- **Accent**: one violet, `#7A1FFF`. Buttons, links to product, eyebrows, active states, the coloured half of a headline. A single soft tint `#EFE8FF` for fills behind it.
- **Type**: a heavy geometric display (Neue Machina at 900) for every headline, Inter for everything else, monospace for eyebrows and small labels.
- **Shape**: buttons are pills, 12px on cards, full pills for badges and tabs. Borders are one pixel of lavender `#D6DAFF`, often at 40 percent.
- **Voice**: the product is shown, not described. Every section is heading + one lead + a real frame of the product or a real workflow with its cost.

## Tokens: colors

| Token | Hex | CSS variable | Tailwind | Role |
|---|---|---|---|---|
| Background | `#F8F8FF` | `--color-bg` | `bg-bg` | Page ground, mock app ground |
| Foreground | `#0B0B0F` | `--color-fg` | `text-fg` | Headlines, strong text; body at `/75` |
| Ink | `#0B0B0F` | `--color-ink` | `text-ink` | Alias of foreground, kept for mock frames |
| Muted | `#8A7A9F` | `--color-muted` | `text-muted` | Small labels, captions, footer line |
| Border | `#D6DAFF` | `--color-border` | `border-border` | Hairlines, card edges, dividers (often `/40` or `/60`) |
| Surface | `#FFFFFF` | `--color-surface` | `bg-surface` | Cards, pills, mock cards |
| Accent | `#7A1FFF` | `--color-accent` | `text-accent`, `bg-accent`, `border-accent` | The one loud colour |
| Accent strong | `#6717D9` | `--color-accent-strong` | `bg-accent-strong` | Primary button hover only |
| Accent soft | `#EFE8FF` | `--color-accent-soft` | `bg-accent-soft` | Tints, band sections (`/60`), active tabs |
| Button bg | `#7A1FFF` | `--color-btn-bg` | `bg-btn-bg` | Primary button fill |
| Button fg | `#F8F8FF` | `--color-btn-fg` | `text-btn-fg` | Text on accent |
| Button border | `transparent` | `--color-btn-border` | `border-btn-border` | Reserved |
| OK | `#1F8A5B` | `--color-ok` | `text-ok` | Policy outcome "Allowed", on light surfaces |
| Deny | `#C2334D` | `--color-deny` | `text-deny` | Policy outcome "Denied", on light surfaces |
| Terminal bg | `#16131D` | `--color-term-bg` | `bg-term-bg` | Terminal ground |
| Terminal fg | `#ECE9F3` | `--color-term-fg` | `text-term-fg` | Terminal text |
| Terminal muted | `#8E879C` | `--color-term-muted` | `text-term-muted` | Descriptions, footers |
| Terminal line | `#2B2636` | `--color-term-line` | `border-term-line` | Terminal border and dividers |
| Terminal accent | `#B892FF` | `--color-term-accent` | `text-term-accent` | Prompt, `ametyst ›`, the Ametyst Agent (the violet made readable on dark) |
| Window dots | `#FF5F57` / `#FEBC2E` / `#28C840` | `--color-term-red` / `-yellow` / `-green` | `bg-term-red` … | The three dots of a terminal title bar, nothing else |
| Terminal ok / warn | `#6FD49A` / `#F2C46D` | `--color-term-ok` / `--color-term-warn` | `text-term-ok` / `text-term-warn` | ✓ and fixed / held and proposal |

Opacity steps in use: `text-fg/70`, `text-fg/75`, `text-fg/80`, `text-fg/85`, `border-border/40`, `border-border/60`, `bg-accent-soft/40`, `bg-accent-soft/60`.

Status colours exist only for policy outcomes and terminal lines; never use them for decoration.

## Tokens: typography

| Role | Family | Weight | Sizes | Tracking, leading |
|---|---|---|---|---|
| Display | Neue Machina, Arial Black fallback | 900 (inline style) | h1 `text-4xl` to `text-6xl`, h2 `text-3xl` to `text-5xl` | `tracking-tight`, `leading-[1.05]` on h1, `leading-tight` on h2 |
| Body | Inter, system-ui fallback | 400, 500, 600, 700 | lead `text-base` to `text-xl`, copy `text-sm` | `leading-relaxed`; headings inside cards `font-semibold` |
| Label | ui-monospace, Menlo | 400 | `text-xs` to `text-sm` eyebrows, `text-[10px]` to `text-[11px]` badges | eyebrows are sentence case, section counters `01 · connect` |

Rules that make it look like Ametyst:
- Headlines are black with one phrase in accent (`<span className="text-accent">`). Never two accents in one headline.
- Body is `text-fg/75`; strong words inside it are `font-semibold text-fg`, not a colour.
- `text-balance` on every headline longer than one line.
- The font is `font-headline` for h1, h2 and big numbers only. Card titles and FAQ questions are Inter semibold.
- Type scale is Tailwind's default; no custom sizes outside the mock frames.

## Tokens: spacing and shape

| Token | Value | Where |
|---|---|---|
| Page gutter | `section-x` = `px-6 md:px-12 lg:px-20 xl:px-28` | every section |
| Content width | `max-w-6xl` (1152px), `max-w-xl` for a heading block, `max-w-3xl` for a centred CTA | every section |
| Section rhythm | `py-16 md:py-24`, sections separated by `border-b border-border/40` | every section |
| Block gap | `gap-10 lg:gap-16` two-column, `gap-4` card grids, `space-y-20 md:space-y-28` between steps | how it works, pricing |
| Radius | `rounded-full` buttons, pills and tabs, `rounded-lg` 8px small panels, `rounded-xl` 12px cards and frames, `rounded-[10px]` mock cards | everywhere |
| Border | 1px `border-border`; 2px `border-accent` for a highlighted card only | cards |
| Shadow | none on real UI; mock frames only: `shadow-[0_24px_60px_-32px_rgba(122,31,255,0.45)]` for the Ametyst app, the same with black at 0.25 for third-party apps | frames |
| Motion | one keyframe, `fadein` 6px rise over 300 to 350ms; tab rotation 3.8 to 4.2s, paused on hover | hero frames, tabs |

## Components

**Top bar**. Fixed, `h-14 sm:h-16`, `bg-bg/90 backdrop-blur`, hairline bottom. Brand word in display face in accent. Nav links `text-sm font-medium text-fg/70`, hidden under `md`. Right side: a text link (Sign in) and one primary button (Book a call).

**Button**. One class, `.btn` in `app/globals.css`: a pill (`rounded-full`), 44px tall (48px from `md`), `px-6`, Inter semibold, `text-sm` then `text-base`, 150ms colour transition, a 2px violet focus ring at 40 percent. Reference: ElevenLabs (pill, medium weight, hairline secondary), adapted to keep the violet fill.

- `.btn-primary`: violet fill `bg-btn-bg`, text `text-btn-fg`, hover `bg-accent-strong`. Create your workspace, one per block.
- `.btn-secondary`: white pill `bg-surface`, ink text, 1px `border-border`; hover turns border and text violet. Talk to the team.
- `.btn-sm`: 36px tall (40px from `md`), `px-4`, for the top bar.
- `.btn-lg`: 48px tall (56px from `md`), `px-7` then `px-9`, `text-base` then `text-lg`, for the hero pair and the closing pair.

Never stack more than two button styles in one group. Never put a shadow on a button.

**Eyebrow**. Not used: violet labels above headings were removed in review. A step may carry a plain grey number, `font-mono text-sm text-muted` (`01`).

**Section heading**. Display h2, one lead paragraph `text-fg/75`. Block of `max-w-xl`.

**Card**. `rounded-xl border border-border bg-surface p-5 md:p-6`. Highlighted variant: `border-accent bg-accent-soft/60`. Card title Inter semibold, body `text-sm text-fg/75`.

**Pill**. `rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-accent`. Plan names, step numbers, free/paid, coming soon. Filled variant `bg-accent text-btn-fg` for the active tab.

**Tab row**. Pills in a `flex flex-wrap gap-2`, or a grid of `rounded-md` cells with a mono counter and a label, active `bg-accent-soft`.

**Band**. A full-width section on `bg-accent-soft/60` for the one block that must feel different (The problem).

**Terminal**. `components/Terminal.tsx`: `rounded-xl border border-term-line bg-term-bg`, a title bar with the three macOS window dots in colour (`term-red`, `term-yellow`, `term-green`) and no path, no buttons, mono 12 to 13px, an optional footer. No shadow, no glow. Shows what the agent does. In the hero, two terminals side by side compare the same run without and with the Ametyst Agent; the agent's lines sit in `bg-term-line` blocks headed `Ametyst Agent`; the left terminal has no placeholder for the missing agent.

**Clean card for what a person sets**. A card (`bg-surface`, hairline) holding tools or a policy. Nothing boxed inside the tools card: bare 20px favicons (`ToolIcon bare`) next to the name, one hairline between groups. The policy card follows the same rule: bare icons, limits as a plain definition list. Outcome words in `text-ok`, `text-accent` (approved after a hold), `text-deny`.

**Mock frame (retired)**. `components/Frames.tsx` (`AmetystApp` and the Claude, Sheets, Notion frames) drew the web app with a violet shadow. Not rendered since review round 2: the page no longer shows the web app.

**Definition list**. `rounded-lg border border-border bg-bg divide-y divide-border/60`, rows of `dt text-xs text-muted` and `dd text-sm text-fg`. Used for run metadata and usage pricing.

**FAQ item**. Native `details` with `summary` in a `max-w-2xl` list, so the `+` on the right stays close to the question. Question Inter semibold, violet on hover and when open; mono `+` in accent that rotates 45 degrees when open. A one-sentence answer `text-fg/75` under it.

## Do

- Use the semantic Tailwind aliases (`bg-bg`, `text-fg`, `text-accent`) for any real UI. Hex only inside mock frames.
- Show the product. A block earns its place with a frame of the app or a workflow with its cost.
- Keep one accent phrase per headline and one primary button per block.
- Say workflow, workspace, agent, spending policies, budget, credits, limits.
- Write in sentences. Commas and full stops, no em dash, no exclamation mark.
- Keep the page light. Dark mode is not designed; do not add `dark:` variants.
- Put every new section in `components/` and give it an `id` for the nav.

## Don't

- Don't say bank, banking, wallet, neobank, skill, optimization, optimizer, platform in public copy.
- Don't add gradients, glows or coloured shadows anywhere, product views included. The violet aura read as AI-made and was removed.
- Don't introduce a second accent or a grey text token. Use opacity on ink.
- Don't use the display face for body text, card titles or buttons.
- Don't centre everything. Only the final CTA is centred.
- Don't add illustrations, stock photos or glyphs. No `✦` on the landing (removed on Michele's request): the Ametyst Agent is marked by its name in `text-term-accent` and its `bg-term-line` block. `__tests__/page-order.test.tsx` enforces it.
- Don't change tokens in `tailwind.config.ts`. Change the CSS variables in `app/globals.css`.

## Surfaces and elevation

| Level | Surface | Edge |
|---|---|---|
| 0, page | `#F8F8FF` | none |
| 1, card | `#FFFFFF` | 1px `#D6DAFF` |
| 1, tinted band | `#EFE8FF` at 60 percent | 1px `#D6DAFF` at 40 percent |
| 2, terminal | `#16131D` | 1px `#2B2636`, no shadow |

No hover elevation. Hover changes opacity (buttons) or border colour (tab pills).

## Imagery

The brand mark is the word Ametyst in the display face, in accent. The favicon is `public/icon.png`. Product views are never screenshots and never the web app: terminals for what the agent does, clean cards for what a person sets, drawn in code. Tool logos are real favicons in `public/providers/`.

## Layout

Single column of sections, each `max-w-6xl`. Two-column blocks alternate the frame left and right (`lg:order-2` on the text). Grids are 1, 2, 3 or 4 columns and collapse to one under `md`. The top bar is fixed, so every anchored section carries `scroll-mt-16`.

## Agent prompt guide

When asked to build or change Ametyst UI:
1. Read this file and `app/globals.css`.
2. Reuse an existing component pattern before inventing one. The list above covers every pattern on the page.
3. Copy comes from the communication playbook: hook, identity phrase, three steps, allowed and banned words.
4. Add the component under `components/`, import it in `app/page.tsx`, list it in `docs/README.md`.
5. Run `npm test`, then `npm run snapshot` to produce the review artifact.

## Similar systems

Vercel (monochrome discipline, one accent), Linear (violet on near-white, product drawn in code), Resend (heavy display headlines with one coloured phrase), Composio (product-faithful frames in the hero).

## Quick start

```css
:root {
  --font-neue-machina: "Neue Machina", "Arial Black", sans-serif;
  --color-bg: #F8F8FF;
  --color-fg: #0B0B0F;
  --color-muted: #8a7a9f;
  --color-border: #D6DAFF;
  --color-btn-bg: #7A1FFF;
  --color-btn-fg: #F8F8FF;
  --color-btn-border: transparent;
  --color-accent: #7A1FFF;
  --color-accent-soft: #EFE8FF;
  --color-surface: #FFFFFF;
  --color-ink: #0B0B0F;
}
```

```ts
// tailwind.config.ts (excerpt)
colors: {
  bg: "var(--color-bg)", fg: "var(--color-fg)", muted: "var(--color-muted)",
  border: "var(--color-border)", surface: "var(--color-surface)", ink: "var(--color-ink)",
  accent: "var(--color-accent)", "accent-soft": "var(--color-accent-soft)",
  "btn-bg": "var(--color-btn-bg)", "btn-fg": "var(--color-btn-fg)", "btn-border": "var(--color-btn-border)",
},
fontFamily: {
  headline: ["var(--font-neue-machina)", "Arial Black", "sans-serif"],
  body: ["var(--font-inter)", "system-ui", "sans-serif"],
  mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
},
```

## Known gaps, to fix in the next version

- No status colours. The app will need success, warning and danger tints that sit with the violet.
- No dark theme. `PALETTE-info.md` describes one, but the site never shipped it; treat that file as superseded by this one.
- Neue Machina is loaded from a third-party CDN with no licence on file. Decide whether to buy it, self-host it, or replace it.
- Display weight is forced to 900 with an inline style because the font is declared at one weight only.
- The mock frames carry their own hex palette. When the app gets tokens, the frames should read them.

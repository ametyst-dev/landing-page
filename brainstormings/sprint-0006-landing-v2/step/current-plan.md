# Sprint 0006 — Step 0: Test infrastructure setup

## Context

Sprint 0006 (landing-v2) rebuilds the Ametyst landing page. Macro Step 0 adds test infrastructure (the repo has zero today) so later steps (ChatDemo state machine, copy verbatim checks, waitlist regression guard) have a place to put tests. Sub-branch: `landing-v2/step-0`.

## Findings from codebase analysis

- `package.json`: no `test` script, no test deps. Next 15.1 + React 19 + TS 5. Node v22.22.3 local.
- No `vitest.config.ts`, no `__tests__/`, no jest config — clean slate.
- `CLAUDE.md` has no `## Testing` section (this step adds it).
- `app/api/waitlist/route.ts`: handler reads `process.env.GOOGLE_SCRIPT_URL` **inside** the handler (good — tests can set/unset it per test). Honeypot returns `{ ok: true }` silently. Validation: missing/non-string/regex-invalid email → 400; missing env → 500; upstream not-ok → 502.
- `components/EndStrip.tsx`: simplest component, pure presentational (X + LinkedIn links) — ideal render-test target.
- `tsconfig.json` alias `@/*` → `./*` — vitest config must replicate it.
- React 19 requires `@testing-library/react` ≥ 16.
- Route handler tests need Node-native `Request`/`Response`: run API tests with `// @vitest-environment node` docblock; component tests default to jsdom.

## Decisions

- **Vitest with `@vitejs/plugin-react`**: the guidelines list 4 devDeps (vitest, @testing-library/react, @testing-library/jest-dom, jsdom); `@vitejs/plugin-react` is added as a 5th for the JSX automatic runtime — dev-only, covered by the "dev-only test tooling" exception in the sprint constraints.
- **`npm test` = `vitest run`** (single pass, CI-friendly); `npm run test:watch` for dev loop.
- **Tests live in `__tests__/` at repo root**: the guidelines' Step 3 already references `__tests__/`, so standardize there now.
- **Per-file environment override**: jsdom is the config default (component tests); API route tests opt into node env via docblock. Avoids polyfilling fetch/Request in jsdom.
- ADRs 001–003 are not touched by this step (they concern Steps 1–3).

## Operational guide

### 1. Install dev dependencies

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

No runtime dependencies. Do not touch existing deps.

### 2. Create `vitest.config.ts` (repo root)

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

### 3. Create `vitest.setup.ts` (repo root)

```ts
import "@testing-library/jest-dom/vitest";
```

### 4. Update `package.json` scripts

Add (keep existing scripts untouched):
```json
"test": "vitest run",
"test:watch": "vitest"
```

### 5. Create `__tests__/waitlist-route.test.ts` — API validation tests

Header docblock (required, runs this file in node env):
```ts
// @vitest-environment node
```

Import: `import { POST } from "@/app/api/waitlist/route";`
Use `vi.stubGlobal("fetch", mockFn)` + `vi.stubEnv("GOOGLE_SCRIPT_URL", "https://script.example/mock")`; restore in `afterEach` (`vi.unstubAllGlobals()`, `vi.unstubAllEnvs()`).
Build requests as `new Request("http://localhost/api/waitlist", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } })`.

Test cases:
1. **Valid email accepted**: fetch mocked `{ ok: true }` → response 200, json `{ ok: true }`, fetch called once with the stubbed URL and body `{"email":"user@example.com"}`.
2. **Missing email rejected**: `{}` body → 400, json `{ error: "Invalid email" }`.
3. **Invalid email rejected**: `{ email: "not-an-email" }` → 400.
4. **Filled honeypot short-circuits**: `{ email: "user@example.com", honeypot: "bot" }` → 200 `{ ok: true }` AND `fetch` NOT called.
5. **Missing GOOGLE_SCRIPT_URL**: env unset (`vi.stubEnv` with `""` or delete) → 500 `{ error: "Missing server config" }`.

### 6. Create `__tests__/endstrip.test.tsx` — exemplary render test

`import { render, screen } from "@testing-library/react";` + `import EndStrip from "@/components/EndStrip";`
Assert: link with accessible name "X" has `href="https://x.com/ametyst_xyz"`; link "LinkedIn" has `href="https://www.linkedin.com/company/ametyst-xyz/"`.

### 7. Add `## Testing` section to `CLAUDE.md`

Content to add (after the "Submodules map" or before "Docs" — keep file structure tidy):

```markdown
## Testing
- Command: `npm test` (Vitest, single run) — `npm run test:watch` for watch mode
- Framework: Vitest + React Testing Library, jsdom environment by default
- API route tests run in node environment via `// @vitest-environment node` docblock (Web Request/Response are Node-native)
- Tests live in `__tests__/` at repo root, named `*.test.ts(x)`
- No `.env.test` required — `GOOGLE_SCRIPT_URL` is stubbed with `vi.stubEnv` and the Google Script fetch is mocked
```

### 8. Verification

- `npm test` → all tests green (6 tests across 2 files).
- `npm run build` → still green (test files must not break the Next build; `vitest.config.ts` and `__tests__/` are outside `app/`, no impact expected).

## Consumer verification list

No function/API/method is introduced or changed for consumers — test-only step. The waitlist route is exercised, not modified: its file must show **zero diff** at the end of the step.

## Constraints to respect

- No new runtime dependencies (dev-only is the allowed exception).
- Do not modify `app/api/waitlist/route.ts`, `next.config.js`, or any component.
- Do not commit `.env*` files; no credentials in tests (mock everything).

## What "done" looks like

- `npm test` runs green with the waitlist API + EndStrip tests.
- `CLAUDE.md` documents the test setup.
- `app/api/waitlist/route.ts` untouched (zero diff).

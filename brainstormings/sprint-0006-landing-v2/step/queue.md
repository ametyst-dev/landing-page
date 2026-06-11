# Chunk Queue

**Total chunks:** 3
**Test command:** `npm test` (Vitest — being set up in this very step; available from Chunk 1 onward)
**Source plan:** brainstormings/sprint-0006-landing-v2/step/current-plan.md

---

## Chunk 1 — Test tooling setup
**Status:** done
**Files:** `package.json`, `vitest.config.ts` (new), `vitest.setup.ts` (new)
**Done when:** `npx vitest run` executes without config errors ("no test files found" is the expected output at this stage), and `package.json` has `test` and `test:watch` scripts.

1. Install dev dependencies (dev-only, no runtime deps):
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```
2. Create `vitest.config.ts` at the repo root with exactly this content:
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
3. Create `vitest.setup.ts` at the repo root with exactly this content:
```ts
import "@testing-library/jest-dom/vitest";
```
4. In `package.json`, add to `scripts` (keep `dev`, `build`, `start`, `lint` untouched):
```json
"test": "vitest run",
"test:watch": "vitest"
```
5. Run `npx vitest run` — it must start and report no test files found (no config/transform errors).

Constraints: do not modify any file under `app/` or `components/`. Do not add runtime dependencies.

---

## Chunk 2 — Exemplary tests: waitlist API + EndStrip render [TEST]
**Status:** done
**Type:** test
**Commit point:** chunks 1-2
**Files:** `__tests__/waitlist-route.test.ts` (new), `__tests__/endstrip.test.tsx` (new)
**Done when:** `npm test` passes with 7 tests green across 2 files.
**Test:**
- Unit: waitlist API route validation (valid email, missing email, invalid email, honeypot, missing env) with the Google Script fetch mocked
- Unit: EndStrip render test (X and LinkedIn links with correct hrefs)

Context (self-contained): the repo has Vitest configured via `vitest.config.ts` at the root (jsdom default environment, setup file `vitest.setup.ts` loading jest-dom matchers, tests discovered in `__tests__/**/*.test.{ts,tsx}`, alias `@` → repo root). The test command is `npm test` (= `vitest run`). The route handler under test is `app/api/waitlist/route.ts`, exporting `POST(req: Request): Promise<NextResponse>`; it reads `process.env.GOOGLE_SCRIPT_URL` inside the handler, returns `{ ok: true }` (200) when honeypot is filled WITHOUT calling fetch, 400 `{ error: "Invalid email" }` for missing/invalid email, 500 `{ error: "Missing server config" }` when env is missing, and forwards `{ email }` via POST to the env URL otherwise. The footer component under test is `components/EndStrip.tsx` (default export `EndStrip`, no props) rendering two `<a>` links: accessible name "X" → `https://x.com/ametyst_xyz`, accessible name "LinkedIn" → `https://www.linkedin.com/company/ametyst-xyz/`.

1. Create `__tests__/waitlist-route.test.ts`. First line MUST be the docblock that switches this file to node environment (Web `Request`/`Response` are Node-native, not in jsdom):
```ts
// @vitest-environment node
```
Imports:
```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/waitlist/route";
```
Setup: in `beforeEach`, `vi.stubEnv("GOOGLE_SCRIPT_URL", "https://script.example/mock")` and `vi.stubGlobal("fetch", vi.fn(async () => new Response("ok", { status: 200 })))`. In `afterEach`, `vi.unstubAllEnvs()` and `vi.unstubAllGlobals()`.
Helper to build requests:
```ts
const makeReq = (body: unknown) =>
  new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
```
Test cases (5):
1. valid email accepted: `POST(makeReq({ email: "user@example.com" }))` → `res.status === 200`, `await res.json()` equals `{ ok: true }`, and the fetch mock was called once with `"https://script.example/mock"` and a body containing `"user@example.com"`.
2. missing email rejected: `POST(makeReq({}))` → status 400, json `{ error: "Invalid email" }`.
3. invalid email rejected: `POST(makeReq({ email: "not-an-email" }))` → status 400.
4. filled honeypot short-circuits: `POST(makeReq({ email: "user@example.com", honeypot: "bot" }))` → status 200, json `{ ok: true }`, and the fetch mock was NOT called.
5. missing GOOGLE_SCRIPT_URL: stub env to `""` for this test (`vi.stubEnv("GOOGLE_SCRIPT_URL", "")`) → status 500, json `{ error: "Missing server config" }`.

2. Create `__tests__/endstrip.test.tsx` (jsdom default environment, no docblock):
```ts
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EndStrip from "@/components/EndStrip";
```
Test cases (2):
1. X link: render `<EndStrip />`, `screen.getByRole("link", { name: "X" })` has attribute `href` = `https://x.com/ametyst_xyz`.
2. LinkedIn link: `screen.getByRole("link", { name: "LinkedIn" })` has attribute `href` = `https://www.linkedin.com/company/ametyst-xyz/`.

3. Run `npm test` — all 7 tests green.
4. Commit point: commit everything from Chunk 1 and Chunk 2 (deps, config, setup, scripts, both test files).

Constraints: do NOT modify `app/api/waitlist/route.ts` or `components/EndStrip.tsx` — if a test fails, fix the test, not the source. No credentials in tests.

---

## Chunk 3 — CLAUDE.md Testing section + build check [TEST]
**Status:** done
**Type:** test
**Commit point:** chunk 3
**Files:** `CLAUDE.md`
**Done when:** `CLAUDE.md` contains the `## Testing` section, and both `npm test` and `npm run build` pass.
**Test:** verify existing tests still pass (`npm test`) and the Next.js production build is unaffected (`npm run build`).

Context (self-contained): the repo root `CLAUDE.md` documents this repo for AI agents; it currently has sections `## Purpose`, `## Context triggers`, `## Boundaries`, `## Operations supported`, `## Submodules map`, `## Docs`, `## Safety / sharp edges`, `## Examples` — and no `## Testing` section. Vitest was configured in this macro step (`npm test` = `vitest run`, config in `vitest.config.ts`, tests in `__tests__/`).

1. In `CLAUDE.md`, insert a `## Testing` section between `## Submodules map` and `## Docs`, with exactly this content:
```markdown
## Testing
- Command: `npm test` (Vitest, single run) — `npm run test:watch` for watch mode
- Framework: Vitest + React Testing Library, jsdom environment by default
- API route tests run in node environment via `// @vitest-environment node` docblock (Web Request/Response are Node-native)
- Tests live in `__tests__/` at repo root, named `*.test.ts(x)`
- No `.env.test` required — `GOOGLE_SCRIPT_URL` is stubbed with `vi.stubEnv` and the Google Script fetch is mocked
```
2. Run `npm test` — all tests still green.
3. Run `npm run build` — build green (test files and `vitest.config.ts` must not leak into the Next build; if `tsc` complains about vitest types during build, add `vitest.config.ts`, `vitest.setup.ts`, and `__tests__` to the `exclude` array of `tsconfig.json` and re-run).
4. Verify `git diff app/api/waitlist/route.ts components/` is empty (source untouched).
5. Commit point: commit the CLAUDE.md change (and tsconfig.json only if step 3 required it).

Constraints: do not change any other CLAUDE.md section. Do not touch `next.config.js`.

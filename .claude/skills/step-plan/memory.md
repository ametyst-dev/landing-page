# Step Plan — Memory

## Investigation spikes

- **Kernel v3 internals**: When a macro step touches Kernel v3 signature handling (`_checkSignaturePolicy`, `isValidSignature`, signature advancement, policy data), propose an investigation spike before committing to an implementation approach. Kernel v3 reads `sig[0]` on the original unadvanced signature, which limits what can be injected via the signature payload. Sprint 0002 required 3 iterations on Path B signature design because this behavior wasn't understood upfront.

## Learnings

### From sprint-0001 (2026-03-30)
- **Next.js env vars on Vercel**: env vars read at module level (`const X = process.env.X` outside the handler) get inlined at build time by Next.js. If the env var wasn't set during build, it's empty forever in production. Always read `process.env` inside the request handler for runtime env vars on Vercel serverless.

### From sprint-0003 (2026-04-07)
- **List breaking changes explicitly in the plan**: When the current step involves API endpoint renames, guard changes, or response shape changes that affect other repos, list all breaking changes explicitly in the plan and flag them as "requires upgrade to {target repo}". This reduces surprise upgrade proposals mid-step.
- **Detect outdated sprint-guidelines.md**: At the start of step-plan, if UPGRADE_REDIRECT messages in sprint-memory.md mention "guidelines updated" or "step numbers changed", warn HIL that local sprint-guidelines.md may be outdated and suggest re-reading the latest guidelines from the Slack upgrade message before planning.

### From sprint-0004 (2026-04-17)
- **Counter/mapping increment/decrement pairs**: When introducing a counter or mapping with increment/decrement semantics (e.g. `merchantActiveAllowanceCount`), explicitly list the increment AND decrement paths as a self-check in the plan. Missing decrement was caught in sprint-0004 step 3 only during PR review, requiring a before_next_step upgrade fix.

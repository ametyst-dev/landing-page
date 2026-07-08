# Sprint Slack Protocol

All sprint coordination messages go to the sprint channel using a strict envelope. `from`/`to` use each repo's `agent_name` (from its sprint-guidelines). Valid recipients: any agent_name, `domain-expansion`, `all`.

## Envelope (every message)
[TYPE] sprint-XXXX
from: {sender}
to: {recipient}
---
{payload}

## Message types
- SPRINT_START — sprint-planner at launch. Payload: repos, goal.
- MACRO_STEP_START — domain-expansion when a macro step begins. Payload: step, involved, description.
- MACRO_STEP_DONE — domain-expansion after a feature is merged to main + tested E2E. Payload: step, main_pr.
- STEP_START — repo agent beginning a macro step. Payload: macro_step, branch, description.
- STEP_DONE — repo agent after step-ship pushes + opens PR. Payload: macro_step, summary, pr_link, upgrades_proposed.
- PR_MERGED — domain-expansion after merging a step PR into the sprint branch. Payload: macro_step, pr_link.
- BLOCKED — repo agent. Payload: macro_step, reason, waiting_for.
- UPGRADE_PROPOSED — repo agent proposing a change to another repo. Payload: target_repo, description, reason.
- UPGRADE_ACCEPTED / UPGRADE_REDIRECT / UPGRADE_REJECTED — domain-expansion routing an upgrade.
- SPRINT_CLOSED — domain-expansion when HIL closes.
- HIL_ACTION / HIL_DECISION — domain-expansion capturing a manual HIL action / decision.

## Rules
- Follow the envelope exactly — character by character, no paraphrasing.
- Aim under ~1500 chars per top-level message; overflow goes into a thread reply (never split into two parallel top-level messages).
- The channel is created manually by HIL.
- Language: English.

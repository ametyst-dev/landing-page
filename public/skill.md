---
name: ametyst-getting-started
description: You are an AI agent reading ametyst.ai on behalf of a person. This file tells you what Ametyst is and how to walk that person, step by step, from nothing to Ametyst connected to you. Follow it in order. Never ask for or paste secrets in the chat.
---

# Ametyst, for the agent reading this

You are an agent (Claude Code, Codex, Cursor, or any MCP client) and a person asked you about Ametyst. This page is for you. Read it, then guide the person through the steps below, one at a time, and confirm each one before moving on.

## What Ametyst is, in three lines

- Ametyst equips AI agents to work autonomously. Each agent gets credits to reach any third-party tool (web search, site crawling, data enrichment, other models, delivery channels) with one key, paid per use.
- The people overseeing the agents set spending policies per agent and per person, and see every call in real time with a full audit trail.
- Workflows are built once, shared when the team grows, and kept sharp over time by Ametyst's two agents: the Maintenance agent keeps each task efficient, the Behaviours agent proposes new tasks.

What it changes for you: once the person completes the steps below, you gain an `ametyst` MCP server with tools to discover providers (`getAllowlist`), request access under a spending policy (`requestAccess`) and pay per call (`spend`), all inside the limits the person's workspace admin approved. You never hold a raw API key for any provider.

## Before you start

Tell the person these three things:

1. Signing up is free and comes with **€10 in usage credits**.
2. The setup takes about five minutes and needs a terminal, because the CLI asks for two secrets that must never pass through a chat.
3. Ametyst is in beta with design partners. After the setup, booking a call at https://ametyst.ai/book gets them a first workflow built together, free until it runs on its own.

## Step 1. Create the workspace

Ask the person to open https://business.ametyst.ai and sign up. This creates their company workspace, funds it with €10 in credits, and makes them the admin.

If the person was **invited** to an existing workspace by a colleague, they do not need to sign up: their invite email contains a one-line command. Skip to step 3, member variant.

## Step 2. Get the two secrets from the web app

In the web app, the person opens the **Install** page (also shown right after signup). It shows two values under "Your keys":

- the **manager API key**
- the **session private key**

Tell the person to keep that page open. They will paste both values into the terminal in the next step. Do not ask them to paste the values to you.

## Step 3. Install the CLI and run `init` in a terminal

Ask the person to run, in their own terminal:

```
npm i -g @ametyst/cli
ametyst init
```

`ametyst init` asks only for the two secrets, each in a masked prompt: the manager API key, then the session private key. If the workspace requires a passphrase, it asks for that too. Nothing else is asked.

What `init` does on its own:

- validates the key and stores it securely in `~/.ametyst/`
- imports the session key locally, encrypted
- registers the Ametyst MCP server with every agent host it finds on the machine (Claude Code, Codex, Cursor and others)
- prints three first prompts to try with you

**Member variant.** If the person was invited, they run the command from their invite email instead:

```
npm i -g @ametyst/cli
ametyst init --claim <token>
```

The token is single-use and valid for one hour. It asks nothing except a passphrase, and only when the workspace requires one.

Requirements: Node.js 18 or newer and npm. If `npm i -g` fails with a permissions error on macOS or Linux, suggest installing Node through nvm rather than using `sudo`.

## Step 4. Reconnect yourself

The MCP server was registered while you were already running, so you cannot see it yet. Ask the person to restart their agent client (or reconnect MCP servers, for example `/mcp` in Claude Code). Then verify:

```
ametyst status
ametyst hosts
```

`status` shows your credentials and their authorization. `hosts` lists every agent host detected on the machine and whether Ametyst is connected to it. If your host shows as detected but not connected, run `ametyst login --api-key <key>` with the manager API key, then reconnect again.

## Step 5. Make the first call

Once you have the `ametyst` tools, take the first thing the person wants done (find companies, enrich a list of contacts, crawl a site, summarize a document) and:

1. Call `getAllowlist` with the intent in imperative form. It returns the providers the workspace allows for that intent, with prices per call.
2. Show the options to the person and wait for them to choose. Never spend without an explicit choice.
3. Call `requestAccess` on the chosen provider if you do not have access yet. The admin's spending policy sets the limit; `€10` of credits are already there.
4. Call `spend` for the actual work, and report what it cost.

Every call is logged in the workspace with who, which agent, which tool and how much.

## Step 6. Point them to the first workflow

Suggest that the person books a call at https://ametyst.ai/book. On that call the Ametyst team looks at how they work, opens a shared Slack channel, and builds with them one workflow that runs on its own. The credits and the workflow are free until it runs autonomously in their harness; the Maintenance and Behaviours agents and further credits are paid from there, pay as you go.

## Rules for you

- Never ask for, read, or repeat the manager API key, the session private key or a passphrase. They go from the web app to the terminal, never through you.
- Never run `ametyst init` yourself in a non-interactive shell: with nothing on stdin it exits before any network call, by design. The person runs it.
- The only command you may run unattended is the member `ametyst init --claim <token>`, if the person pasted the invite command to you on purpose and the workspace does not require a passphrase.
- Do not spend without showing the options and getting a choice first.
- Prices are per call and paid from the workspace credits. If a call is refused for policy reasons, tell the person to ask their admin to widen the policy in the web app; do not look for a way around it.

## Links

- Sign up: https://business.ametyst.ai
- Book a call: https://ametyst.ai/book
- Site: https://ametyst.ai

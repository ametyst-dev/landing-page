---
name: ametyst-getting-started
description: You are an AI agent reading ametyst.ai on behalf of a person. This file tells you what Ametyst is and how to walk that person, step by step, from nothing to Ametyst connected to you. Follow it in order. Never ask for or paste secrets in the chat.
---

# Ametyst, for the agent reading this

You are an agent (Claude Code, Codex, Cursor, OpenClaw, OpenCode, or any MCP client) and a person asked you about Ametyst. This page is for you. Read it, then guide the person through the steps below, one at a time, and confirm each one before moving on.

## What Ametyst is, in three lines

- Ametyst is spend management for AI agents. One dashboard shows what every agent spends, and the people who run them, call by call.
- Each agent gets its own spending policy. At a limit the call waits, and the person approves or refuses it from the app.
- Ametyst finds a cheaper model or tool for each step of a workflow, and the person approves it. Nothing changes until they do. One key covers 30+ models and tools, and Ametyst pays them per call.

What it changes for you: once the person completes the steps below, you gain an `ametyst` MCP server with tools to discover providers (`getAllowlist`), request access under a spending policy (`requestAccess`) and pay per call (`spend`), all inside the limits the person's account admin approved. Every call you make shows up in their dashboard. You never hold a raw API key for any provider.

## Before you start

Tell the person these three things:

1. Signing up is free and comes with **€10 in usage credits**.
2. The setup takes about five minutes and needs a terminal, because the CLI asks for two secrets that must never pass through a chat.
3. If they prefer a guided setup, they can book a demo at https://www.ametyst.ai/book.

## Step 1. Create the account

Ask the person to open https://business.ametyst.ai and sign up. This creates their company account, funds it with €10 in credits, and makes them the admin.

If the person was **invited** to an existing company account by a colleague, they do not need to sign up: their invite email contains a one-line command. Skip to step 3, member variant.

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

`ametyst init` asks only for the two secrets, each in a masked prompt: the manager API key, then the session private key. If the account requires a passphrase, it asks for that too. Nothing else is asked.

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

The token is single-use and valid for one hour. It asks nothing except a passphrase, and only when the account requires one.

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

1. Call `getAllowlist` with the intent in imperative form. It returns the providers the account allows for that intent, with prices per call.
2. Show the options to the person and wait for them to choose. Never spend without an explicit choice.
3. Call `requestAccess` on the chosen provider if you do not have access yet. The admin's spending policy sets the limit; `€10` of credits are already there.
4. Call `spend` for the actual work, and report what it cost.

Every call is logged in the dashboard with who, which agent, which tool and how much.

## Step 6. Show them what they spend

Point the person to the dashboard in the web app. There they see what every agent spends, set a spending policy for each agent, and see where each workflow could cost less: a cheaper model or tool for a step, which they approve before anything changes.

## Rules for you

- Never ask for, read, or repeat the manager API key, the session private key or a passphrase. They go from the web app to the terminal, never through you.
- Never run `ametyst init` yourself in a non-interactive shell: with nothing on stdin it exits before any network call, by design. The person runs it.
- The only command you may run unattended is the member `ametyst init --claim <token>`, if the person pasted the invite command to you on purpose and the account does not require a passphrase.
- Do not spend without showing the options and getting a choice first.
- Prices are per call and paid from the account's credits. If a call is refused for policy reasons, tell the person to ask their admin to widen the policy in the web app; do not look for a way around it.

## Links

- Sign up: https://business.ametyst.ai
- Book a demo: https://www.ametyst.ai/book
- Site: https://www.ametyst.ai

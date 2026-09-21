"use client";

import { useState } from "react";

type Task = {
  who: string;
  title: string;
  input: string;
  steps: string[];
  output: string;
  runsFrom: string;
  writesTo: string;
  providers: string[];
  cost: string;
};

const TASKS: Task[] = [
  {
    who: "a B2B sales team",
    title: "Attendee list → verified contacts and two drafts each, in the CRM",
    input: "A screenshot of an attendee list, a link, or rows added by hand in Notion.",
    steps: [
      "Verifies and qualifies every company, finds the right person and a verified email.",
      "Writes a LinkedIn message and an email per person, from one or two verified facts. A second model judges each draft.",
      "One row per person in the Notion CRM, and Gmail drafts if the team wants them. Nothing is ever sent.",
    ],
    output: "A pipeline the team drives. The agent drafts, people send.",
    runsFrom: "Claude Desktop",
    writesTo: "Notion, Gmail drafts",
    providers: ["exa", "companyenrich", "pdl", "hunter", "openrouter"],
    cost: "cents per person",
  },
  {
    who: "an events team",
    title: "Calls about events → one row per event, with takeaways and next steps",
    input: "Calls dropped into a Granola folder. Or just the name of an event.",
    steps: [
      "Reads each new call and extracts the facts verbatim: stand and m², price, suppliers, deadlines, who promised what.",
      "One row per event in the team's Google Sheet, compared with their playbook: takeaways and next steps. A second model reviews each row.",
      "An event named alone is researched and added.",
    ],
    output: "A living events sheet you can question: ask anything, get the answer with the call it came from.",
    runsFrom: "Claude Code",
    writesTo: "Google Sheets",
    providers: ["granola", "drive", "exa", "openrouter"],
    cost: "cents per call analyzed",
  },
  {
    who: "an engineering team",
    title: "Slack messages → structured backlog → shipped pull requests, every 30 minutes",
    input: "Messages in a Slack channel: a bug, a feature idea, a voice note, a yes or no to a question the agent asked.",
    steps: [
      "Turns each message into a structured backlog item and answers in the thread. Re-opens items you decided on.",
      "Fires every 30 minutes as a fresh engineer: investigates, plans, builds in a worktree, runs the tests.",
      "An independent agent reviews the diff before the pull request opens. Green merges to staging, anything else waits for you.",
    ],
    output: "Merged pull requests on staging and a board of what shipped, what is queued, what needs you.",
    runsFrom: "Scheduled, headless (CLI)",
    writesTo: "GitHub, Slack",
    providers: ["openrouter", "exa", "firecrawl", "browserbase"],
    cost: "€0 on a quiet run, €2 to €4 per shipped item",
  },
  {
    who: "a marketing team",
    title: "Competitors' Meta ads → a scoreboard and on-brand creatives",
    input: "The competitor list and the design system, once. Then “scoreboard”, “genera 1-5”, “genera in alta”.",
    steps: [
      "Pulls every active Meta ad of each competitor with the real EU reach, days live, format, hook, claim, CTA.",
      "Ranks them best to worst in the Ads tab, writes one on-brand concept per winner in the Scoreboard tab, checked against the design system.",
      "Turns the picked concepts into text-free drafts, then finals, with the copy to overlay next to each image.",
    ],
    output: "Who is winning and why, and the creatives to answer them. Never publishes.",
    runsFrom: "Claude Code",
    writesTo: "Google Sheets",
    providers: ["apify", "exa", "tavily", "openrouter", "stablestudio"],
    cost: "about €1.50 per scoreboard, €0.07 per draft, €0.21 per final",
  },
];

export default function RealTasks() {
  const [active, setActive] = useState(0);
  const t = TASKS[active];
  return (
    <section id="tasks" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-8">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
            Four workflows running today. One number each.
          </h2>
          <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">Built with our design partners, each one in a week with the team that uses it. Shown exactly as they run now, with what a run costs.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Tasks">
          {TASKS.map((task, i) => (
            <button key={task.who} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${active === i ? "border-accent bg-accent text-btn-fg" : "border-border bg-surface text-fg/80 hover:border-accent"}`}>
              {task.who}
            </button>
          ))}
        </div>
        <div key={t.who} className="rounded-xl border border-border bg-surface p-6 md:p-8 animate-[fadein_.3s_ease]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h3 className="font-body text-xl md:text-2xl font-semibold text-fg leading-snug mb-5">{t.title}</h3>
              <p className="font-body text-xs uppercase tracking-wide text-muted mb-1">Input</p>
              <p className="font-body text-sm text-fg/80 mb-5">{t.input}</p>
              <p className="font-body text-xs uppercase tracking-wide text-muted mb-2">What the agent does</p>
              <ol className="space-y-2 mb-5">
                {t.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 font-body text-sm text-fg/80">
                    <span className="font-mono text-xs text-accent pt-0.5 shrink-0">0{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="font-body text-xs uppercase tracking-wide text-muted mb-1">Output</p>
              <p className="font-body text-sm text-fg/80">{t.output}</p>
            </div>
            <div className="lg:col-span-5">
              <dl className="rounded-lg border border-border bg-bg divide-y divide-border/60">
                <div className="px-4 py-3">
                  <dt className="font-body text-xs text-muted mb-1">Cost</dt>
                  <dd className="font-headline text-lg md:text-xl text-accent leading-tight" style={{ fontWeight: 900 }}>{t.cost}</dd>
                </div>
                {[["Runs from", t.runsFrom], ["Writes to", t.writesTo]].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-3 px-4 py-3">
                    <dt className="font-body text-xs text-muted">{k}</dt>
                    <dd className="col-span-2 font-body text-sm text-fg">{v}</dd>
                  </div>
                ))}
                <div className="px-4 py-3">
                  <dt className="font-body text-xs text-muted mb-2">Providers</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {t.providers.map((p) => (
                      <span key={p} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] text-fg">{p}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 rounded-lg border-2 border-accent bg-accent-soft/40 p-4">
                <p className="font-body text-xs uppercase tracking-wide text-accent mb-1">Then, over time</p>
                <p className="font-body text-sm text-fg/85 leading-relaxed">The Ametyst Agent keeps it running when a provider or a case changes, and proposes what to build next.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

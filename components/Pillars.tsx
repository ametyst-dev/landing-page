import type { ReactNode } from "react";
import Terminal from "@/components/Terminal";
import ToolsCard, { ToolIcon, toolName } from "@/components/Providers";

/* The three things Ametyst does in every run, most important first:
 * 01 the Ametyst Agent (terminal), 02 the tools (company apps and
 * providers), 03 the spending policy of a task. The task in 03 is the one the
 * hero runs (competitor-ads, €1.50 per run, €10 a day), so the page tells one story. */

function StepHeading({ n, title, lead }: { n: string; title: string; lead?: ReactNode }) {
  return (
    <div className="max-w-xl">
      <p className="font-mono text-sm text-muted mb-3">{n}</p>
      <h3 className={`font-headline text-3xl md:text-4xl text-fg leading-tight tracking-tight text-balance ${lead ? "mb-4" : ""}`} style={{ fontWeight: 900 }}>
        {title}
      </h3>
      {lead && <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">{lead}</p>}
    </div>
  );
}

const WEEK: { task: string; what: string; how: string; status: "fixed" | "proposal" }[] = [
  {
    task: "event-crm",
    what: "The Granola folder was renamed, so 2 calls were skipped.",
    how: "Pointed it at the new folder and re-ran both.",
    status: "fixed",
  },
  {
    task: "competitor-ads",
    what: "Ads Library changed its response on Tuesday.",
    how: "Updated the parser before the next run, so no ads were lost.",
    status: "fixed",
  },
  {
    task: "competitor-ads",
    what: "A weekly alert when a competitor ad beats your best reach.",
    how: "Add it to the workflow?",
    status: "proposal",
  },
];

function AgentTerminal() {
  return (
    <Terminal footer="41 runs read this week · 2 fixed · 1 proposal">
      <p>
        <span className="text-term-accent">&gt;</span> ametyst, what happened in my workflows this week?
      </p>
      <p className="mt-4 text-term-accent">Ametyst Agent</p>
      <p className="mt-1 font-body text-[13px] md:text-sm">I read 41 runs across 4 workflows. Two things changed under them without an error. Both are fixed.</p>
      <ul className="mt-4 divide-y divide-term-line border-y border-term-line">
        {WEEK.map((w) => (
          <li key={w.what} className="grid grid-cols-[1fr_auto] sm:grid-cols-[9.5rem_1fr_auto] gap-x-4 gap-y-1 py-3">
            <span className="text-term-fg">{w.task}</span>
            <span className={`sm:order-last text-right ${w.status === "fixed" ? "text-term-ok" : "text-term-warn"}`}>{w.status}</span>
            <span className="col-span-2 sm:col-span-1 font-body text-[13px] md:text-sm">
              {w.what} <span className="text-term-muted">{w.how}</span>
            </span>
          </li>
        ))}
      </ul>
    </Terminal>
  );
}

const TASK_TOOLS = ["apify", "exa", "openrouter", "stablestudio"];

const CALLS: { time: string; tool: string; amount: string; outcome: "allowed" | "approved" | "denied"; note?: string }[] = [
  { time: "09:12", tool: "apify", amount: "€1.00", outcome: "allowed" },
  { time: "09:12", tool: "exa", amount: "€0.04", outcome: "allowed" },
  { time: "09:13", tool: "openrouter", amount: "€0.30", outcome: "allowed" },
  { time: "09:13", tool: "stablestudio", amount: "€0.35", outcome: "approved", note: "took the run over €1.50, held for you" },
  { time: "09:14", tool: "firecrawl", amount: "€0.02", outcome: "denied", note: "not a tool of this task" },
];

const OUTCOME = {
  allowed: "text-ok",
  approved: "text-accent",
  denied: "text-deny",
} as const;

/* The policy belongs to a task (competitor-ads), not to a team or an area:
 * what one run may spend, what a day may spend, which tools it may call, and
 * this morning's run checked against it. One card, nothing boxed inside. */
function PolicyCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-7 font-body">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted">Policy of the task</p>
          <p className="font-mono text-base font-semibold text-fg mt-0.5">competitor-ads</p>
        </div>
        <p className="text-right text-base font-semibold text-fg">€1.69 <span className="font-normal text-muted text-sm">of €10 today</span></p>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-accent-soft overflow-hidden" aria-hidden="true">
        <div className="h-full w-[17%] rounded-full bg-accent" />
      </div>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
        <dt className="text-muted">Per run</dt>
        <dd className="font-semibold text-fg">€1.50</dd>
        <dt className="text-muted">Per day</dt>
        <dd className="font-semibold text-fg">€10</dd>
        <dt className="text-muted">Tools</dt>
        <dd className="flex flex-wrap gap-x-4 gap-y-2">
          {TASK_TOOLS.map((slug) => (
            <span key={slug} className="flex items-center gap-1.5 text-fg">
              <ToolIcon slug={slug} size="sm" bare />
              {toolName(slug)}
            </span>
          ))}
        </dd>
      </dl>
      <div className="my-5 h-px bg-border" />
      <p className="mb-2 text-sm font-semibold text-fg">This morning&apos;s run</p>
      <ul className="divide-y divide-border/60">
        {CALLS.map((c) => (
          <li key={c.time + c.tool} className="grid grid-cols-[2.75rem_1fr_auto] sm:grid-cols-[2.75rem_1fr_3.5rem_5.5rem] items-center gap-x-3 py-2 text-sm">
            <span className="font-mono text-[11px] text-muted">{c.time}</span>
            <span className="flex items-center gap-2 min-w-0">
              <ToolIcon slug={c.tool} size="sm" bare />
              <span className="min-w-0">
                <span className="block truncate text-fg">{toolName(c.tool)}</span>
                {c.note && <span className="block truncate text-[11px] text-muted">{c.note}</span>}
              </span>
            </span>
            <span className="hidden sm:block text-right font-mono text-[12px] text-fg">{c.amount}</span>
            <span className={`text-right text-[13px] font-semibold capitalize ${OUTCOME[c.outcome]}`}>{c.outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pillars() {
  return (
    <section id="how-it-works" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        <h2 className="max-w-2xl mx-auto text-center -mb-4 md:-mb-10 font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance" style={{ fontWeight: 900 }}>
          Three things Ametyst does in every run.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <StepHeading
              n="01"
              title="The Ametyst Agent sits in every run."
              lead={<>It reads every run of your workflows. When one breaks, it tells you why and <strong className="font-semibold text-fg">fixes it</strong>. When one could do more, it <strong className="font-semibold text-fg">proposes the change</strong>. You ask it from the agent you already use.</>}
            />
          </div>
          <div className="lg:col-span-7"><AgentTerminal /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-4 lg:order-2">
            <StepHeading
              n="02"
              title="Every tool your workflows need, with one key."
              lead={<>The tools you already use and <strong className="font-semibold text-fg">50+ external providers</strong> in one workspace. Your agent picks the tool and Ametyst pays per call. No accounts to open, no keys on your machine.</>}
            />
          </div>
          <div className="lg:col-span-8 lg:order-1"><ToolsCard /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <StepHeading
              n="03"
              title="Spending policies you set once."
              lead={<>Each task gets its own policy: how much <strong className="font-semibold text-fg">one run</strong> can spend, how much <strong className="font-semibold text-fg">per day</strong>, and which tools it can call. A call over the limit waits for you. Policies protect whoever runs the task.</>}
            />
          </div>
          <div className="lg:col-span-7"><PolicyCard /></div>
        </div>
      </div>
    </section>
  );
}

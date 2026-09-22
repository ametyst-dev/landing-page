import type { ReactNode } from "react";
import Terminal from "@/components/Terminal";
import ToolsCard, { PROVIDERS, ToolIcon, toolName } from "@/components/Providers";

/* The three things Ametyst does in every run, most important first:
 * 01 the Ametyst Agent (full width, terminal), 02 the tools (company apps and
 * providers), 03 the spending policies. The policy in 03 is the same one the
 * hero run hits (Marketing, €1.50 per run, €10 a day), so the page tells one story. */

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
      <p className="mt-4 text-term-accent">✦ Ametyst Agent</p>
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

const CALLS: { time: string; tool: string; amount: string; outcome: "allowed" | "approved" | "denied"; note?: string }[] = [
  { time: "09:12", tool: "apify", amount: "€1.00", outcome: "allowed" },
  { time: "09:12", tool: "exa", amount: "€0.04", outcome: "allowed" },
  { time: "09:13", tool: "openrouter", amount: "€0.30", outcome: "allowed" },
  { time: "09:13", tool: "stablestudio", amount: "€0.35", outcome: "approved", note: "over €1.50 per run, held for you" },
  { time: "09:40", tool: "firecrawl", amount: "€0.02", outcome: "denied", note: "not in this policy" },
];

const OUTCOME = {
  allowed: "text-ok",
  approved: "text-accent",
  denied: "text-deny",
} as const;

function PolicyCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 md:p-5 font-body">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-fg">Marketing</p>
          <p className="font-mono text-[11px] text-muted mt-0.5">applies to competitor-ads</p>
        </div>
        <p className="text-right">
          <span className="block text-base font-semibold text-fg">€1.69 <span className="font-normal text-muted text-sm">of €10 today</span></span>
        </p>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-accent-soft overflow-hidden" aria-hidden="true">
        <div className="h-full w-[17%] rounded-full bg-accent" />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-px rounded-lg border border-border bg-border/60 overflow-hidden text-sm">
        {[
          ["Per day", "€10"],
          ["Per run", "€1.50"],
          ["Tools", "4 allowed"],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface px-3 py-2.5">
            <dt className="text-[11px] text-muted">{k}</dt>
            <dd className="font-semibold text-fg">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 mb-2 text-sm font-semibold text-fg">Today&apos;s calls</p>
      <ul className="divide-y divide-border/60 border-y border-border/60">
        {CALLS.map((c) => (
          <li key={c.time + c.tool} className="grid grid-cols-[2.75rem_1fr_auto] sm:grid-cols-[2.75rem_1fr_3.5rem_5.5rem] items-center gap-x-3 py-2 text-sm">
            <span className="font-mono text-[11px] text-muted">{c.time}</span>
            <span className="flex items-center gap-2 min-w-0">
              <ToolIcon slug={c.tool} size="sm" />
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
        <h2 className="max-w-2xl -mb-4 md:-mb-10 font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance" style={{ fontWeight: 900 }}>
          Three things Ametyst does in every run.
        </h2>

        <div className="space-y-8 md:space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-14 lg:items-end">
            <StepHeading n="01" title="The Ametyst Agent sits in every run." />
            <p className="max-w-xl font-body text-base md:text-lg text-fg/75 leading-relaxed">
              It reads every run of your workflows. When one breaks, it tells you why and <strong className="font-semibold text-fg">fixes it</strong>. When one could do more, it <strong className="font-semibold text-fg">proposes the change</strong>. You ask it from the agent you already use.
            </p>
          </div>
          <AgentTerminal />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start [&>*]:min-w-0">
          <div className="lg:col-span-4 lg:order-2 lg:sticky lg:top-24">
            <StepHeading
              n="02"
              title="Every tool your workflows need, with one key."
              lead={<>Your company apps and <strong className="font-semibold text-fg">{PROVIDERS.length} providers</strong> in one workspace. Your agent picks the tool and Ametyst pays per call. No accounts to open, no keys on your machine.</>}
            />
          </div>
          <div className="lg:col-span-8 lg:order-1"><ToolsCard /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <StepHeading
              n="03"
              title="Spending policies you set once."
              lead={<>Choose how much each agent can spend, <strong className="font-semibold text-fg">per run and per day</strong>, and on which tools. A call over the limit waits for you. Policies protect whoever runs the workflow.</>}
            />
          </div>
          <div className="lg:col-span-7"><PolicyCard /></div>
        </div>
      </div>
    </section>
  );
}

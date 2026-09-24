import type { ReactNode } from "react";
import Terminal from "@/components/Terminal";
import ToolsCard from "@/components/Providers";

/* What Ametyst does for your workflows, most important first, no step
 * numbers: the Ametyst Agent, which watches them all the time and not only
 * when a run starts, and proposes new workflows from what the team does in
 * the workspace (terminal), then the workspace: every tool with one key and a
 * spending policy for each workflow (tools card, policies in the text). */

function StepHeading({ title, lead }: { title: string; lead: ReactNode }) {
  return (
    <div className="max-w-xl">
      <h3 className="font-headline text-3xl md:text-4xl text-fg leading-tight tracking-tight text-balance mb-4" style={{ fontWeight: 900 }}>
        {title}
      </h3>
      <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">{lead}</p>
    </div>
  );
}

/* The agent's feed over a few days. The fixes happen at night, when nothing
 * is running; the proposals are new workflows built on what the team does by
 * hand, which is what landed in the demo calls. */
const FEED: { when: string; task: string; what: string; how: string; status: "fixed" | "proposal" }[] = [
  {
    when: "Mon 22:40",
    task: "event-crm",
    what: "The Granola folder was renamed.",
    how: "Pointed the workflow at the new folder before the next run.",
    status: "fixed",
  },
  {
    when: "Tue 03:12",
    task: "competitor-ads",
    what: "Ads Library changed its response.",
    how: "Updated the parser, so the 09:00 run lost no ads.",
    status: "fixed",
  },
  {
    when: "Wed 18:30",
    task: "new workflow",
    what: "After every demo call, your team copies the Granola notes into Notion by hand.",
    how: "A workflow can do it after each call. Build it?",
    status: "proposal",
  },
  {
    when: "Thu 16:20",
    task: "new workflow",
    what: "Every Monday someone collects last week's signups from Drive and posts them in Slack.",
    how: "A workflow can post the update for you. Build it?",
    status: "proposal",
  },
];

const STATUS = {
  fixed: "text-term-ok",
  proposal: "text-term-warn",
} as const;

function AgentTerminal() {
  return (
    <Terminal
      title="Ametyst Agent"
      aside={
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-term-ok animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          watching 4 workflows
        </span>
      }
    >
      <ul className="divide-y divide-term-line">
        {FEED.map((e) => (
          <li key={e.when} className="grid grid-cols-[1fr_auto] sm:grid-cols-[8.5rem_1fr_auto] gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0">
            <span>
              <span className="block text-term-muted">{e.when}</span>
              <span className={`block ${e.status === "proposal" ? "text-term-accent" : "text-term-fg"}`}>{e.task}</span>
            </span>
            <span className={`sm:order-last text-right ${STATUS[e.status]}`}>{e.status}</span>
            <span className="col-span-2 sm:col-span-1 font-body text-[13px] md:text-sm">
              {e.what} <span className="text-term-muted">{e.how}</span>
            </span>
          </li>
        ))}
      </ul>
    </Terminal>
  );
}

export default function Pillars() {
  return (
    <section id="how-it-works" className="section-x py-16 md:py-24 bg-bg scroll-mt-16">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        <h2 className="max-w-2xl mx-auto text-center -mb-4 md:-mb-10 font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance" style={{ fontWeight: 900 }}>
          How Ametyst keeps your workflows running.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <StepHeading
              title="The Ametyst Agent watches your workflows, all the time."
              lead={<>Not only when a run starts. When a tool changes under a workflow, it <strong className="font-semibold text-fg">fixes the workflow</strong> before the next run and tells you why. From what your team does every day in the workspace, it <strong className="font-semibold text-fg">proposes new workflows</strong> built for your company. You ask it from the agent you already use.</>}
            />
          </div>
          <div className="lg:col-span-7"><AgentTerminal /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-4 lg:order-2">
            <StepHeading
              title="One workspace: every tool, and a policy for each workflow."
              lead={<>The tools you already use, the LLMs and <strong className="font-semibold text-fg">50+ external providers</strong>, with one key. Ametyst pays per call: no accounts to open, no keys on your machine. Each workflow gets its own <strong className="font-semibold text-fg">spending policy</strong>: how much a run can spend, how much a day, and which tools it can call.</>}
            />
          </div>
          <div className="lg:col-span-8 lg:order-1"><ToolsCard /></div>
        </div>
      </div>
    </section>
  );
}

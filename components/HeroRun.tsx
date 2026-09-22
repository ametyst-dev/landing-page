import type { ReactNode } from "react";
import Terminal from "@/components/Terminal";

/* The headline, shown: the same run of competitor-ads side by side, the week
 * Ads Library changed its response. Without the Ametyst Agent every call
 * returns, the run says done and the scoreboard is empty. With it, the agent
 * that built the workflow updates step 1 before the run and checks the output
 * after. No markers on the left: the missing agent is the point. Pattern from typesafe.ai's side-by-side race. Lines fade in with CSS
 * delays, both columns in step, so the full text is in the HTML and reduced
 * motion shows it all at once. */

type Call = { tool: string; what: string; cost: string };

const WITHOUT: Call[] = [
  { tool: "apify", what: "response not read, 0 ads", cost: "€1.00" },
  { tool: "exa", what: "no pages to read", cost: "€0.00" },
  { tool: "openrouter", what: "no ads to rank", cost: "€0.02" },
  { tool: "stablestudio", what: "nothing to draft", cost: "€0.00" },
];

const WITH: Call[] = [
  { tool: "apify", what: "46 ads from 4 competitors", cost: "€1.00" },
  { tool: "exa", what: "4 landing pages", cost: "€0.04" },
  { tool: "openrouter", what: "6 concepts, reviewed", cost: "€0.30" },
  { tool: "stablestudio", what: "5 image drafts", cost: "€0.35" },
];

const STEP = 0.55;

function Line({ i, children, className = "" }: { i: number; children: ReactNode; className?: string }) {
  return (
    <div
      className={`animate-[fadein_.35s_ease_both] motion-reduce:animate-none ${className}`}
      style={{ animationDelay: `${0.3 + i * STEP}s` }}
    >
      {children}
    </div>
  );
}

function Calls({ calls, from, broken }: { calls: Call[]; from: number; broken?: boolean }) {
  return (
    <>
      {calls.map((c, n) => (
        <Line key={c.tool} i={from + n} className="grid grid-cols-[0.75rem_6.5rem_1fr_auto_0.75rem] gap-x-2 py-0.5">
          <span className="text-term-muted">{n + 1}</span>
          <span>{c.tool}</span>
          <span className={`truncate ${broken ? "text-term-warn" : "text-term-muted"}`}>{c.what}</span>
          <span className="text-right">{c.cost}</span>
          <span className="text-right text-term-ok">✓</span>
        </Line>
      ))}
    </>
  );
}

function Agent({ i, children }: { i: number; children: ReactNode }) {
  return (
    <Line i={i} className="my-2.5 rounded-lg bg-term-line px-3 py-2">
      <span className="text-term-accent">Ametyst Agent</span>
      <span className="block mt-0.5 font-body text-[13px] text-term-fg">{children}</span>
    </Line>
  );
}

function Outcome({ i, rows, accent }: { i: number; rows: [string, string][]; accent?: boolean }) {
  return (
    <Line i={i} className="mt-4 grid grid-cols-3 gap-3">
      {rows.map(([big, small]) => (
        <div key={small}>
          <p className={`font-headline text-xl md:text-2xl leading-tight ${accent ? "text-accent" : "text-fg"}`} style={{ fontWeight: 900 }}>{big}</p>
          <p className="font-body text-xs md:text-sm text-muted mt-1">{small}</p>
        </div>
      ))}
    </Line>
  );
}

export default function HeroRun() {
  const end = WITH.length + 3;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 text-left">
      <div className="min-w-0 flex flex-col">
        <p className="font-body text-sm md:text-base font-semibold text-muted mb-3">Without the Ametyst Agent</p>
        <Terminal className="flex-1">
          <Line i={0}><span className="text-term-accent">&gt;</span> run competitor-ads</Line>
          <Calls calls={WITHOUT} from={2} broken />
          <Line i={end}><span className="text-term-ok">✓</span> Done. Scoreboard updated in Google Sheets.</Line>
        </Terminal>
        <Outcome i={end + 1} rows={[["0 ads", "in the scoreboard"], ["€1.02", "spent for nothing"], ["Done", "says the run"]]} />
      </div>
      <div className="min-w-0 flex flex-col">
        <p className="font-body text-sm md:text-base font-semibold text-accent mb-3">With the Ametyst Agent</p>
        <Terminal className="flex-1">
          <Line i={0}><span className="text-term-accent">&gt;</span> run competitor-ads</Line>
          <Agent i={1}>Ads Library changed its response on Tuesday. I updated step 1 before this run.</Agent>
          <Calls calls={WITH} from={2} />
          <Agent i={WITH.length + 2}>Output checked: 46 ads, none empty.</Agent>
          <Line i={end}><span className="text-term-ok">✓</span> Scoreboard ready in Google Sheets.</Line>
        </Terminal>
        <Outcome i={end + 1} accent rows={[["46 ads", "ranked, 5 drafts ready"], ["€1.69", "for the run"], ["Fixed", "before you noticed"]]} />
      </div>
    </div>
  );
}

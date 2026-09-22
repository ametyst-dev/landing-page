"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Terminal from "@/components/Terminal";

/* One run of a real workflow (competitor-ads), shown the way it looks in the
 * agent: the tools it calls through Ametyst with their price, the policy check
 * that holds one call, and the Ametyst Agent note at the end. The three beats
 * mirror the subheadline. Lines appear one by one with a CSS delay, so the full
 * text is in the HTML and reduced motion shows it all at once. */

type Status = "ok" | "held";
const CALLS: { tool: string; what: string; cost: string; status: Status }[] = [
  { tool: "apify", what: "46 ads from 4 competitors", cost: "€1.00", status: "ok" },
  { tool: "exa", what: "4 landing pages", cost: "€0.04", status: "ok" },
  { tool: "openrouter", what: "6 concepts, reviewed", cost: "€0.30", status: "ok" },
  { tool: "stablestudio", what: "5 image drafts", cost: "€0.35", status: "held" },
];

const STEP = 0.6;

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

export default function HeroRun() {
  const [run, setRun] = useState(0);
  const last = CALLS.length + 4;
  return (
    <Terminal
      title="~/marketing"
      aside={
        <button type="button" onClick={() => setRun((r) => r + 1)} className="hover:text-term-fg transition-colors">
          ↻ Replay
        </button>
      }
      footer={
        <Line i={last} key={`f${run}`} className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-term-fg">Marketing policy</span>
          <span className="h-1.5 w-24 rounded-full bg-term-line overflow-hidden" aria-hidden="true">
            <span className="block h-full w-[17%] bg-term-accent" />
          </span>
          <span>€1.69 of €10 today · €1.50 per run</span>
        </Line>
      }
    >
      <div key={run} className="space-y-1.5">
        <Line i={0}>
          <span className="text-term-accent">&gt;</span> run competitor-ads
        </Line>
        {CALLS.map((c, n) => (
          <Line key={c.tool} i={n + 1} className="grid grid-cols-[6.5rem_1fr_auto_3.5rem] sm:grid-cols-[4.5rem_7rem_1fr_auto_3.5rem] gap-x-3">
            <span className="hidden sm:block text-term-accent">ametyst ›</span>
            <span>{c.tool}</span>
            <span className="truncate text-term-muted">{c.what}</span>
            <span className="text-right">{c.cost}</span>
            <span className={`text-right ${c.status === "ok" ? "text-term-ok" : "text-term-warn"}`}>{c.status === "ok" ? "✓" : "held"}</span>
          </Line>
        ))}
        <Line i={CALLS.length + 1} className="sm:pl-[5.25rem] text-term-warn">
          Held: the run would reach €1.69, over the €1.50 per run limit.
          <span className="text-term-muted"> Approved in the app.</span>
        </Line>
        <Line i={CALLS.length + 2} className="pt-2">
          <span className="text-term-ok">✓</span> Scoreboard updated in Google Sheets. 46 ads ranked, 5 drafts ready.
        </Line>
        <Line i={CALLS.length + 3} className="mt-2 rounded-lg border border-term-line px-3 py-2.5">
          <span className="text-term-accent">✦ Ametyst Agent</span>
          <span className="block text-term-fg mt-1 font-body text-[13px] md:text-sm">
            Ads Library changed its response on Tuesday, and two runs came back empty without an error. I fixed the parser and re-ran both.
          </span>
        </Line>
      </div>
    </Terminal>
  );
}

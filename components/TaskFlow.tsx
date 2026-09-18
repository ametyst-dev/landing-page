"use client";

import { useEffect, useState } from "react";
import { AmetystApp, AppButton, AppCard, AppTabs, ClaudeFrame, SheetsFrame } from "@/components/Frames";

const STAGES = ["A task in your workspace", "Your agent runs it", "The result lands", "Ametyst Agent keeps it sharp"];

function StageWorkspace() {
  return (
    <AmetystApp page="Tasks" admin={false}>
      <AppTabs tabs={["Mine", "Shared with me"]} active="Shared with me" />
      <AppCard className="border-2 border-[#7a1fff]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-[11px] font-semibold text-[#0b0b0f]">competitor-ads</p>
            <p className="mt-0.5 text-[10px] leading-snug text-[#8a7a9f]">Competitors' winning Meta ads, ranked by real EU reach. On-brand concepts and the creatives to answer them.</p>
          </div>
          <span className="shrink-0 rounded bg-[#efe8ff] px-1.5 py-0.5 font-mono text-[9px] text-[#7a1fff]">shared · 2</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[9px] text-[#8a7a9f]">policy Marketing · €10/day</span>
          <div className="flex gap-1.5"><AppButton secondary>Open</AppButton><AppButton>Run from your agent</AppButton></div>
        </div>
      </AppCard>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[["event-leads", "Attendee list → CRM drafts"], ["event-crm", "Calls → events sheet"]].map(([n, d]) => (
          <AppCard key={n}>
            <p className="font-mono text-[10px] font-semibold text-[#0b0b0f]">{n}</p>
            <p className="text-[9px] text-[#8a7a9f]">{d}</p>
          </AppCard>
        ))}
      </div>
    </AmetystApp>
  );
}

const RUN_1 = [
  ["apify", "Ads Library · 4 competitors · 46 ads", "$1.00"],
  ["exa", "landing pages behind the ads", "$0.04"],
  ["openrouter", "6 concepts + design-system review", "$0.30"],
];
const RUN_2 = [["stablestudio", "5 drafts · 1:1 · no text", "$0.35"]];

function ToolRow({ r }: { r: string[] }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-[#e8e4d8] bg-white px-2 py-1 font-mono text-[10px]">
      <span className="text-[#7a1fff]">▸ ametyst · spend</span>
      <span className="w-20 text-[#3d3929]">{r[0]}</span>
      <span className="flex-1 truncate text-[#8c8677]">{r[1]}</span>
      <span className="text-[#3d3929]">{r[2]}</span>
    </div>
  );
}

function StageAgent() {
  return (
    <ClaudeFrame>
      <div className="flex justify-end"><div className="rounded-2xl bg-[#f0eee6] px-3 py-2 text-[11px] text-[#3d3929]">scoreboard</div></div>
      <div className="mt-2 space-y-1">{RUN_1.map((r) => <ToolRow key={r[0]} r={r} />)}</div>
      <p className="mt-2 text-[11px] leading-relaxed text-[#3d3929]">46 ads ranked in the Ads tab. Plancraft leads on reach with a carousel live for 41 days. Six concepts in Scoreboard.</p>
      <div className="mt-3 flex justify-end"><div className="rounded-2xl bg-[#f0eee6] px-3 py-2 text-[11px] text-[#3d3929]">genera 1-5</div></div>
      <div className="mt-2 space-y-1">{RUN_2.map((r) => <ToolRow key={r[0]} r={r} />)}</div>
      <p className="mt-2 text-[11px] leading-relaxed text-[#3d3929]">Five drafts generated, no text, the copy to overlay next to each. $1.69 of the €10 daily policy.</p>
    </ClaudeFrame>
  );
}

const ROWS = [
  ["1", "Plancraft", "Carousel", "41", "1.2M", "Quote in 2 min"],
  ["2", "ACCA", "Static", "27", "640k", "Free trial, no card"],
  ["3", "Doorkeeper", "Video", "19", "410k", "Built for small firms"],
];

function StageResult() {
  return (
    <SheetsFrame title="Competitor ads · Q3" tabs={["Ads", "Scoreboard"]} active="Scoreboard">
      <table className="w-full text-left text-[9px]">
        <thead>
          <tr className="bg-[#f8f9fa] text-[#5f6368]">
            {["#", "Competitor", "Format", "Days", "Reach EU", "Hook"].map((h) => <th key={h} className="border-b border-r border-[#e0e0e0] px-2 py-1 font-normal">{h}</th>)}
          </tr>
        </thead>
        <tbody className="text-[#202124]">
          {ROWS.map((r) => (
            <tr key={r[0]}>{r.map((c, i) => <td key={i} className="border-b border-r border-[#e0e0e0] px-2 py-1">{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <div className="p-3">
        <p className="mb-1.5 text-[9px] text-[#5f6368]">Immagine · drafts 1-5, no text</p>
        <div className="grid grid-cols-5 gap-1.5">
          {["from-[#7a1fff] to-[#c9b3ff]", "from-[#1e8e3e] to-[#a8e6bc]", "from-[#0b0b0f] to-[#6b6b7a]", "from-[#d97757] to-[#f6c9b4]", "from-[#2b5cff] to-[#b9c9ff]"].map((g, i) => (
            <div key={g} className={`aspect-square rounded-md bg-gradient-to-br ${g} flex items-end p-1`}>
              <span className="rounded bg-white/85 px-1 font-mono text-[8px] text-[#202124]">0{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-[9px] text-[#5f6368]">Copy 01: “Your quote, before the coffee is ready.”</p>
      </div>
    </SheetsFrame>
  );
}

function StageSharp() {
  return (
    <AmetystApp page="Ametyst Agent" admin={false}>
      <AppCard>
        <p className="font-mono text-[11px] font-semibold text-[#0b0b0f]">competitor-ads · fixed</p>
        <p className="mt-0.5 text-[10px] text-[#0b0b0f]">Ads Library changed its response shape. Parser updated, 3 runs re-checked.</p>
        <p className="mt-1 font-mono text-[10px] text-[#7a1fff]">cost per scoreboard €1.50 → €0.90</p>
      </AppCard>
      <AppCard className="mt-2 border-2 border-[#7a1fff]">
        <p className="text-[9px] uppercase tracking-wide text-[#7a1fff]">Proposed by the Ametyst Agent</p>
        <p className="mt-0.5 text-[10px] text-[#0b0b0f]">Weekly alert when a competitor launches an ad that beats your best reach in 7 days.</p>
        <div className="mt-2 flex gap-1.5"><AppButton>Accept</AppButton><AppButton secondary>Later</AppButton></div>
      </AppCard>
      <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-[#7a1fff] bg-white px-2.5 py-1.5">
        <span className="text-[10px] text-[#7a1fff]">✦</span>
        <span className="min-w-0 flex-1 truncate text-[10px] text-[#8a7a9f]">Ask the Ametyst Agent: “why did competitor-ads cost more this week?”</span>
        <span className="rounded-[6px] bg-[#7a1fff] px-1.5 py-0.5 text-[9px] font-bold text-white">↵</span>
      </div>
    </AmetystApp>
  );
}

export default function TaskFlow() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 4200);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-3 grid grid-cols-4 gap-1.5" role="tablist" aria-label="How a task flows">
        {STAGES.map((label, i) => (
          <button key={label} type="button" role="tab" aria-selected={stage === i} onClick={() => setStage(i)}
            className={`rounded-md px-2 py-1.5 text-left transition-colors ${stage === i ? "bg-accent-soft" : "hover:bg-accent-soft/50"}`}>
            <span className={`block font-mono text-[10px] ${stage === i ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
            <span className={`block font-body text-[11px] leading-tight ${stage === i ? "text-fg" : "text-muted"}`}>{label}</span>
          </button>
        ))}
      </div>
      <div key={stage} className="animate-[fadein_.35s_ease]">
        {stage === 0 && <StageWorkspace />}
        {stage === 1 && <StageAgent />}
        {stage === 2 && <StageResult />}
        {stage === 3 && <StageSharp />}
      </div>
    </div>
  );
}

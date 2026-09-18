"use client";

import { useEffect, useState } from "react";
import { AmetystApp, AppCard, AppTabs } from "@/components/Frames";

const PROVIDER_GROUPS: { label: string; items: string[] }[] = [
  { label: "Search", items: ["exa", "tavily", "serper", "parallel"] },
  { label: "Read the web", items: ["firecrawl", "apify", "browserbase", "scrapecreators", "twitsh"] },
  { label: "People & companies", items: ["companyenrich", "fullenrich", "pdl", "clado", "minerva", "hunter"] },
  { label: "Think", items: ["openrouter"] },
  { label: "Create", items: ["stablestudio", "agentmail"] },
  { label: "Verify & comply", items: ["strale", "lionx402", "eucompliancetools", "greeneris", "website2vat"] },
  { label: "Markets", items: ["signalfuse"] },
];

function AppsView() {
  const total = PROVIDER_GROUPS.reduce((n, g) => n + g.items.length, 0);
  return (
    <AmetystApp page="Apps" admin={false}>
      <AppTabs tabs={["Whitelisted", "Catalog"]} active="Catalog" />
      <div className="space-y-2">
        {PROVIDER_GROUPS.map((g) => (
          <div key={g.label} className="grid grid-cols-[96px_1fr] items-start gap-2">
            <span className="pt-1 text-[10px] text-[#8a7a9f]">{g.label}</span>
            <div className="flex flex-wrap gap-1">
              {g.items.map((p) => (
                <span key={p} className="rounded-[6px] border border-[#d6daff] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#0b0b0f]">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[#8a7a9f]">{total} apps live · pay per call or by subscription · new ones every week</p>
    </AmetystApp>
  );
}

const AGENTS: { name: string; does: string }[] = [
  { name: "Data agents", does: "enrichment, research and lists done end to end, not one call at a time" },
  { name: "Legal and compliance agents", does: "contracts, checks and filings handled by a specialist" },
  { name: "Your use case", does: "agents built to do one job well, brought in as partners" },
];

function AgentsView() {
  return (
    <AmetystApp page="Specialized Agents" admin={false}>
      <p className="mb-2 inline-block rounded bg-[#efe8ff] px-1.5 py-0.5 font-mono text-[9px] text-[#7a1fff]">coming soon</p>
      <div className="space-y-2">
        {AGENTS.map((a) => (
          <AppCard key={a.name} className="border-dashed">
            <span className="text-[11px] font-semibold text-[#0b0b0f]">{a.name}</span>
            <p className="text-[10px] text-[#8a7a9f]">{a.does}</p>
          </AppCard>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[#8a7a9f]">specialized agents · you set a budget for the job, Ametyst checks the work before the money moves</p>
    </AmetystApp>
  );
}

export default function AppsAgentsCard() {
  const [view, setView] = useState<0 | 1>(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setView((v) => (v === 0 ? 1 : 0)), 3800);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-3 grid grid-cols-2 gap-1.5" role="tablist" aria-label="Apps and agents">
        {["Apps", "Specialized agents"].map((label, i) => (
          <button key={label} type="button" role="tab" aria-selected={view === i} onClick={() => setView(i as 0 | 1)}
            className={`rounded-md px-2 py-1.5 text-left transition-colors ${view === i ? "bg-accent-soft" : "hover:bg-accent-soft/50"}`}>
            <span className={`block font-body text-[11px] leading-tight ${view === i ? "text-fg" : "text-muted"}`}>{label}</span>
          </button>
        ))}
      </div>
      {/* both views share one grid cell, so the card keeps the same height whichever is shown */}
      <div className="grid">
        <div className={`[grid-area:1/1] transition-opacity duration-300 ${view === 0 ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={view !== 0}><AppsView /></div>
        <div className={`[grid-area:1/1] transition-opacity duration-300 ${view === 1 ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={view !== 1}><AgentsView /></div>
      </div>
    </div>
  );
}

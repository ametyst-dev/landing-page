import type { ReactNode } from "react";
import { AmetystApp, AppButton, AppCard, AppTabs } from "@/components/Frames";
import AppsAgentsCard from "@/components/AppsAgentsCard";

function SectionHeading({ index, title, lead }: { index: string; title: string; lead: ReactNode }) {
  return (
    <div className="max-w-xl">
      <p className="font-mono text-xs md:text-sm text-accent mb-3">{index}</p>
      <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
        {title}
      </h2>
      <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">{lead}</p>
    </div>
  );
}

function AdminCard() {
  return (
    <AmetystApp page="Permissions" admin={false}>
      <AppTabs tabs={["Policies", "Members", "Requests"]} active="Policies" />
      <div className="space-y-2">
        {[
          ["GTM daily", "€5 / day · €1 / run", "3 agents"],
          ["Research", "€20 / week", "2 agents"],
          ["Full access", "no cap · admin only", "1 agent"],
        ].map(([n, r, w]) => (
          <AppCard key={n}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#0b0b0f]">{n}</span>
              <span className="font-mono text-[9px] text-[#8a7a9f]">{w}</span>
            </div>
            <p className="text-[10px] text-[#8a7a9f]">{r}</p>
          </AppCard>
        ))}
        <AppCard className="border-dashed border-[#7a1fff]">
          <p className="text-[9px] text-[#8a7a9f]">Access request · 2 min ago</p>
          <p className="text-[10px] text-[#0b0b0f]">MB's agent requests access on “GTM daily”</p>
          <div className="mt-1.5 flex gap-1.5"><AppButton>Approve</AppButton><AppButton secondary>Refuse</AppButton></div>
        </AppCard>
      </div>
    </AmetystApp>
  );
}

function SharpCard() {
  return (
    <AmetystApp page="Agents" admin={false}>
      <AppTabs tabs={["Overview", "Catalog"]} active="Overview" />
      <div className="mb-2 grid grid-cols-2 gap-2">
        {[["Maintenance", "keeps the task working", "on"], ["Behaviours", "proposes what to add next", "on"]].map(([n, d, st]) => (
          <AppCard key={n} className="flex items-center justify-between gap-2">
            <div><p className="text-[10px] font-semibold text-[#0b0b0f]">{n}</p><p className="text-[9px] text-[#8a7a9f]">{d}</p></div>
            <span className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-full bg-[#7a1fff]"><span className="absolute right-0.5 h-3 w-3 rounded-full bg-white" /></span>
          </AppCard>
        ))}
      </div>
      <AppCard>
        <div className="mb-1 flex items-center justify-between"><p className="text-[10px] font-semibold text-[#0b0b0f]">Specialized agents on your tasks</p><span className="font-mono text-[10px] text-[#7a1fff]">pay per output</span></div>
        <table className="w-full text-[9px]">
          <thead><tr className="text-[#8a7a9f]"><th className="text-left font-normal">Task</th><th className="text-left font-normal">Kind</th><th className="text-left font-normal">Agent</th><th className="text-right font-normal">Last run</th></tr></thead>
          <tbody className="text-[#0b0b0f]">
            <tr><td className="font-mono">competitor-ads</td><td>Maintenance</td><td>Ametyst verifier</td><td className="text-right">fixed · €1.50 → €0.90</td></tr>
            <tr><td className="font-mono">competitor-ads</td><td>Behaviour</td><td>Ametyst verifier</td><td className="text-right">1 proposal</td></tr>
            <tr><td className="font-mono">event-crm</td><td>Maintenance</td><td>Ametyst verifier</td><td className="text-right">nothing to fix</td></tr>
          </tbody>
        </table>
      </AppCard>
    </AmetystApp>
  );
}

export default function Pillars() {
  return (
    <section id="how-it-works" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <SectionHeading
            index="01 · for your agents"
            title="Every app and every specialized agent. One key."
            lead={<><strong className="font-semibold text-fg">24 apps</strong> live today, paid per call or by subscription. <strong className="font-semibold text-fg">Specialized agents</strong> for the tasks that need one, paid per output. <strong className="font-semibold text-fg">One key</strong> from your workspace: no accounts, no keys on the machine.</>}
          />
          <AppsAgentsCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <div className="lg:order-2">
            <SectionHeading
              index="02 · for the admin"
              title="You set the rules. The work gets shared."
              lead={<><strong className="font-semibold text-fg">Policies</strong> say how much each agent and each person can spend, on what. An agent asks, <strong className="font-semibold text-fg">you approve</strong>. Build a task once: when someone joins, their agent <strong className="font-semibold text-fg">runs it the same way</strong>, inside your limits.</>}
            />
          </div>
          <div className="lg:order-1"><AdminCard /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <SectionHeading
            index="03 · over time"
            title="They stay sharp."
            lead={<>Every run leaves a <strong className="font-semibold text-fg">report</strong>: what it spent, what it did, what came back. Hand it to Ametyst's <strong className="font-semibold text-fg">Maintenance</strong> and <strong className="font-semibold text-fg">Behaviours</strong> agents, per task, per output, inside your budget. <strong className="font-semibold text-fg">Nothing changes without your word.</strong></>}
          />
          <SharpCard />
        </div>
      </div>
    </section>
  );
}

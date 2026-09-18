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

function AgentCard() {
  return (
    <AmetystApp page="Ametyst Agent" admin={false}>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <AppCard>
          <p className="text-[9px] text-[#8a7a9f]">Agent credit · this month</p>
          <p className="text-[13px] font-bold text-[#0b0b0f]">€9.40 <span className="text-[9px] font-normal text-[#8a7a9f]">left of €15</span></p>
          <div className="mt-1 h-1 w-full rounded-full bg-[#efe8ff]"><div className="h-1 w-[63%] rounded-full bg-[#7a1fff]" /></div>
        </AppCard>
        <AppCard>
          <p className="text-[9px] text-[#8a7a9f]">Watching</p>
          <p className="text-[13px] font-bold text-[#0b0b0f]">4 tasks</p>
          <p className="text-[9px] text-[#8a7a9f]">2 fixed · 1 proposal this week</p>
        </AppCard>
      </div>
      <AppCard>
        <p className="text-[9px] text-[#8a7a9f]">You · from Claude</p>
        <p className="text-[10px] text-[#0b0b0f]">Look at the workspace tasks. What went wrong this week?</p>
        <p className="mt-1.5 text-[9px] text-[#7a1fff]">Ametyst Agent</p>
        <p className="text-[10px] text-[#0b0b0f]">event-crm skipped 2 calls: the Granola folder was renamed. I pointed it at the new one and re-ran them. competitor-ads is fine, and €0.60 cheaper per run since Monday.</p>
      </AppCard>
      <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-[#7a1fff] bg-white px-2.5 py-1.5">
        <span className="text-[10px] text-[#7a1fff]">✦</span>
        <span className="min-w-0 flex-1 truncate text-[10px] text-[#8a7a9f]">Ask the Ametyst Agent: “why did competitor-ads cost more this week?”</span>
        <span className="rounded-[6px] bg-[#7a1fff] px-1.5 py-0.5 text-[9px] font-bold text-white">↵</span>
      </div>
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
            lead={<><strong className="font-semibold text-fg">24 apps</strong> live today, paid per call or by subscription. <strong className="font-semibold text-fg">Specialized agents</strong>, built to do one job well, are coming on the same rails: you set a budget, they do the work. <strong className="font-semibold text-fg">One key</strong> from your workspace: no accounts, no keys on the machine.</>}
          />
          <AppsAgentsCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <div className="lg:order-2">
            <SectionHeading
              index="02 · on your side"
              title="The Ametyst Agent. Always connected."
              lead={<>An agent of ours that <strong className="font-semibold text-fg">knows your workspace</strong>. Ask it anything, from your own agent or from the app: it looks at your tasks, tells you <strong className="font-semibold text-fg">what went wrong</strong>, fixes what breaks and proposes <strong className="font-semibold text-fg">what to build next</strong>. <strong className="font-semibold text-fg">Nothing changes without your word.</strong></>}
            />
          </div>
          <div className="lg:order-1"><AgentCard /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <SectionHeading
            index="03 · for the admin"
            title="You set the rules. The work gets shared."
            lead={<><strong className="font-semibold text-fg">Policies</strong> say how much each agent and each person can spend, on what. An agent asks, <strong className="font-semibold text-fg">you approve</strong>. Build a task once: when someone joins, their agent <strong className="font-semibold text-fg">runs it the same way</strong>, inside your limits.</>}
          />
          <AdminCard />
        </div>
      </div>
    </section>
  );
}

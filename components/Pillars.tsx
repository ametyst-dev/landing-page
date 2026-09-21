import type { ReactNode } from "react";
import { AmetystApp, AppButton, AppCard, AppTabs } from "@/components/Frames";
import AppsAgentsCard from "@/components/AppsAgentsCard";

function SectionHeading({ index, title, lead, plan }: { index: string; title: string; lead: ReactNode; plan: string }) {
  return (
    <div className="max-w-xl">
      <p className="font-mono text-xs md:text-sm text-accent mb-3">{index}</p>
      <h3 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
        {title}
      </h3>
      <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed mb-4">{lead}</p>
      <p className="inline-block rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] md:text-xs text-accent">{plan}</p>
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
        <div className="max-w-xl">
          <p className="font-mono text-xs md:text-sm text-accent mb-3">How it works</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
            Three steps, in the order you will use them.
          </h2>
          <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">Everything here is the product as it runs today. Each step opens a plan.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <SectionHeading
            index="01 · connect"
            title="Create a workspace. Connect your agents."
            lead={<><strong className="font-semibold text-fg">One key</strong> gives them <strong className="font-semibold text-fg">24 apps</strong> today, specialized agents soon. No accounts, no keys on the machine. Claude Code, Codex and Cursor.</>}
            plan="Free · until your first workflow runs on its own"
          />
          <AppsAgentsCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <div className="lg:order-2">
            <SectionHeading
              index="02 · control"
              title="Set spending policies. Invite your colleagues."
              lead={<>A <strong className="font-semibold text-fg">policy per agent</strong>: how much, on what, per run and per day. Workflows shared in the workspace, <strong className="font-semibold text-fg">a policy per person</strong>. Policies protect whoever runs the workflow. They are not a way to watch the team.</>}
              plan="Pro · policies   ·   Team · invites and sharing"
            />
          </div>
          <div className="lg:order-1"><AdminCard /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          <SectionHeading
            index="03 · sharp"
            title="The Ametyst Agent keeps them sharp."
            lead={<>It sits in every run. It tells you <strong className="font-semibold text-fg">what went wrong</strong>, fixes what broke, and proposes <strong className="font-semibold text-fg">what to build next</strong>. Ask it from your own agent or from the app.</>}
            plan="Pro and Team · a monthly credit for the agent"
          />
          <AgentCard />
        </div>
      </div>
    </section>
  );
}

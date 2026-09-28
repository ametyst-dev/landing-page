import type { ReactNode } from "react";
import RouteCard from "@/components/RouteCard";

/* How Ametyst cuts AI spend, in two blocks with no step numbers: the spend
 * dashboard (what every agent spends, and the people who run them, with a
 * spending policy for each agent), then the cheaper route (a cheaper model or
 * tool for each step of a workflow, applied only when approved). */

function StepHeading({ title, lead }: { title: string; lead: ReactNode }) {
  return (
    <div className="max-w-md">
      <h3 className="font-headline text-3xl md:text-4xl text-fg leading-tight tracking-tight text-balance mb-4" style={{ fontWeight: 900 }}>
        {title}
      </h3>
      <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">{lead}</p>
    </div>
  );
}

/* A month of spend, one bar a day split by agent. h is the bar height and s
 * the share of each agent in it (same order as AGENTS), both in percent of
 * the plot; l is the day total printed over every third bar. */
const AGENTS: [string, string][] = [
  ["pr-review", "bg-fg"],
  ["lead-research", "bg-accent"],
  ["competitor-ads", "bg-term-accent"],
  ["other", "bg-border"],
];

const DAYS: { h: number; s: number[]; l?: string }[] = [
  { h: 58.57, s: [37.8, 29.27, 14.63, 18.29], l: "€0.8K" },
  { h: 61.43, s: [36.05, 30.23, 13.95, 19.77] },
  { h: 64.29, s: [36.67, 30, 12.22, 21.11] },
  { h: 67.86, s: [38.95, 28.42, 12.63, 20], l: "€0.9K" },
  { h: 47.86, s: [38.81, 32.84, 11.94, 16.42] },
  { h: 65.71, s: [36.96, 31.52, 16.3, 15.22] },
  { h: 68.57, s: [39.58, 30.21, 15.62, 14.58], l: "€1.0K" },
  { h: 71.43, s: [36, 32, 13, 19] },
  { h: 70, s: [36.73, 28.57, 13.27, 21.43] },
  { h: 52.86, s: [40.54, 28.38, 14.86, 16.22], l: "€0.7K" },
  { h: 73.57, s: [39.81, 30.1, 14.56, 15.53] },
  { h: 75.71, s: [36.79, 28.3, 13.21, 21.7] },
  { h: 74.29, s: [40.38, 29.81, 13.46, 16.35], l: "€1.0K" },
  { h: 77.86, s: [39.45, 30.28, 12.84, 17.43] },
  { h: 57.14, s: [41.25, 31.25, 12.5, 15] },
  { h: 80, s: [39.29, 30.36, 15.18, 15.18], l: "€1.1K" },
  { h: 82.14, s: [40, 29.57, 15.65, 14.78] },
  { h: 84.29, s: [36.44, 30.51, 15.25, 17.8] },
  { h: 82.14, s: [36.52, 30.43, 12.17, 20.87], l: "€1.1K" },
];

const TREND =
  "2.63,41.43 7.89,40 13.16,38.57 18.42,35.48 23.68,40 28.95,39.52 34.21,39.29 39.47,31.43 44.74,30 50,35.24 55.26,34.52 60.53,32.62 65.79,25.48 71.05,24.05 76.32,30.24 81.58,28.33 86.84,26.9 92.11,17.86 97.37,17.14";

const STATS: { label: string; value: string; tag: string }[] = [
  { label: "Total spend", value: "€18,420 →", tag: "↑ 12%" },
  { label: "Policies near their limit", value: "2 →", tag: "of 14" },
];

const VIEWS = ["Overview", "Agents", "People", "Policies"];

function SpendDashboard() {
  return (
    <div className="rounded-xl border border-border bg-surface font-body overflow-hidden">
      <div className="px-5 md:px-7 pt-5 md:pt-6">
        <p className="text-xs text-muted">Insights</p>
        <p className="text-2xl md:text-3xl font-semibold text-fg tracking-tight mb-4">AI spend</p>
        <ul className="flex gap-5 text-sm border-b border-border/60" aria-label="Views">
          {VIEWS.map((v, i) => (
            <li key={v} className={`pb-2 -mb-px ${i === 0 ? "border-b-2 border-fg text-fg font-medium" : "text-muted"}`}>{v}</li>
          ))}
        </ul>
      </div>
      <div className="p-5 md:p-7 space-y-5">
        <dl className="grid grid-cols-2 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-lg border border-border/60 px-3 py-2.5">
              <dd className="flex items-center justify-between gap-2">
                <span className="text-lg md:text-xl font-semibold text-fg">{s.value}</span>
                <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[10px] text-accent">{s.tag}</span>
              </dd>
              <dt className="text-xs text-muted mb-1">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="rounded-lg border border-border/60">
          <p className="px-4 py-2.5 border-b border-border/60 text-xs font-semibold text-fg">Total spend over time</p>
          <div className="px-4 pt-4 pb-3">
            <div className="relative h-40 md:h-48">
              {[25, 50, 75].map((b) => (
                <span key={b} className="absolute inset-x-0 border-t border-dashed border-border/70" style={{ bottom: `${b}%` }} />
              ))}
              <div className="absolute inset-0 flex items-end gap-[3px] md:gap-1">
                {DAYS.map((d, i) => (
                  <div key={i} className="relative flex-1 flex flex-col-reverse" style={{ height: `${d.h}%` }}>
                    {d.s.map((share, n) => (
                      <span key={n} className={`block ${AGENTS[n][1]} ${n === d.s.length - 1 ? "rounded-t-[3px]" : ""}`} style={{ height: `${share}%` }} />
                    ))}
                    {d.l && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted whitespace-nowrap">{d.l}</span>
                    )}
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible text-muted" aria-hidden="true">
                <polyline points={TREND} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
              <span>Sep 1</span>
              <span>Sep 26</span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-label="Agents">
              {AGENTS.map(([name, colour]) => (
                <li key={name} className="flex items-center gap-1.5 text-[11px] text-fg/80">
                  <span className={`h-2 w-2 rounded-sm ${colour}`} />
                  <span className="font-mono">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pillars() {
  return (
    <section id="how-it-works" className="section-x py-16 md:py-24 bg-bg scroll-mt-16">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        <h2 className="max-w-2xl mx-auto text-center -mb-4 md:-mb-10 font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance" style={{ fontWeight: 900 }}>
          How Ametyst cuts your AI spend.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <StepHeading
              title="AI spend by agent."
              lead={<>One dashboard with what every agent spends, and the people who run them. Each agent gets its own <strong className="font-semibold text-fg">spending policy</strong>.</>}
            />
          </div>
          <div className="lg:col-span-7"><SpendDashboard /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5 lg:order-2">
            <StepHeading
              title="Same work, cheaper route."
              lead={<>Ametyst finds a cheaper model or tool for each step. <strong className="font-semibold text-fg">You approve it.</strong></>}
            />
          </div>
          <div className="lg:col-span-7 lg:order-1"><RouteCard /></div>
        </div>
      </div>
    </section>
  );
}

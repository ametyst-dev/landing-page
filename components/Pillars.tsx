import type { ReactNode } from 'react';
import RouteCard from '@/components/RouteCard';
import SpendSplit from '@/components/SpendSplit';

/* What Ametyst does with the spend, with no step numbers. One wide block for
 * the spend dashboard (the total split by provider, model, project, member
 * and agent, with a spending policy for each agent), then three cards in one
 * row that hang from it, because they are built on the same spend data: the
 * cost of one result for every agent, make or buy, and the cheaper route. On
 * a phone the three cards stack under the dashboard. */

function StepHeading({ title, lead }: { title: string; lead: ReactNode }) {
  return (
    <div className="max-w-md">
      <h3
        className="font-headline text-3xl md:text-4xl text-fg leading-tight tracking-tight text-balance mb-4"
        style={{ fontWeight: 900 }}
      >
        {title}
      </h3>
      <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">
        {lead}
      </p>
    </div>
  );
}

/* One of the three cards under the dashboard: title, one lead, then a frame
 * that fills the rest of the card so the three frames end on one line. */
function SubCard({
  title,
  lead,
  children,
}: {
  title: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6 flex flex-col font-body">
      <h3
        className="font-headline text-xl md:text-2xl text-fg leading-tight tracking-tight text-balance mb-2"
        style={{ fontWeight: 900 }}
      >
        {title}
      </h3>
      <p className="text-sm md:text-[15px] text-fg/75 leading-relaxed mb-5 lg:min-h-[4.6rem]">
        {lead}
      </p>
      {children}
    </div>
  );
}

/* What each agent spent in the month and the cost of one result. */
const RESULTS: {
  agent: string;
  made: string;
  spend: string;
  one: string;
  unit: string;
}[] = [
  {
    agent: 'lead-research',
    made: '412 leads',
    spend: '€5,520',
    one: '€13.40',
    unit: 'per lead',
  },
  {
    agent: 'pr-review',
    made: '1,240 reviews',
    spend: '€6,980',
    one: '€5.63',
    unit: 'per review',
  },
  {
    agent: 'competitor-ads',
    made: '96 briefs',
    spend: '€2,560',
    one: '€26.67',
    unit: 'per brief',
  },
  {
    agent: 'support-triage',
    made: '2,300 tickets',
    spend: '€1,890',
    one: '€0.82',
    unit: 'per ticket',
  },
];

function CostPerResult() {
  return (
    <div className="flex-1 rounded-lg border border-border/60 bg-bg">
      <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-border/60">
        <p className="text-xs font-semibold text-fg">Cost per result</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-fg">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v11" />
            <path d="m7 11 5 5 5-5" />
            <path d="M5 20h14" />
          </svg>
          Download CSV
        </span>
      </div>
      <table className="w-full border-collapse tabular-nums">
        <thead>
          <tr className="text-[10px] text-muted">
            <th scope="col" className="px-3 pt-2 pb-1 text-left font-normal">
              Agent
            </th>
            <th scope="col" className="px-2 pt-2 pb-1 text-right font-normal">
              Spend
            </th>
            <th scope="col" className="px-3 pt-2 pb-1 text-right font-normal">
              Cost of one
            </th>
          </tr>
        </thead>
        <tbody>
          {RESULTS.map((r) => (
            <tr key={r.agent} className="border-t border-border/50">
              <th
                scope="row"
                className="px-3 py-2.5 text-left align-top font-normal"
              >
                <span className="block font-mono text-[12px] text-fg">
                  {r.agent}
                </span>
                <span className="block text-[11px] text-fg/70">{r.made}</span>
              </th>
              <td className="px-2 py-2.5 text-right align-top text-sm text-fg/80">
                {r.spend}
              </td>
              <td className="px-3 py-2.5 text-right align-top">
                <span className="block text-sm font-semibold text-fg">
                  {r.one}
                </span>
                <span className="block font-mono text-[10px] text-muted">
                  {r.unit}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* One side of a make-or-buy case. The side that costs less is the lit one. */
function Side({
  kind,
  what,
  euro,
  wins,
}: {
  kind: 'BUY' | 'MAKE';
  what?: string;
  euro: string;
  wins: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${wins ? 'border-accent bg-surface' : 'border-border/60 bg-bg opacity-60'}`}
    >
      <p className="font-mono text-[10px] text-muted">{kind}</p>
      {what && <p className="text-xs text-fg leading-snug">{what}</p>}
      <p className="mt-1 text-base font-semibold text-fg tabular-nums">
        {euro}{' '}
        <span className="font-mono text-[10px] font-normal text-muted">
          / month
        </span>
      </p>
    </div>
  );
}

function MakeOrBuy() {
  return (
    <div className="flex-1 rounded-lg border border-border/60 bg-bg p-3 space-y-3">
      <div>
        <p className="font-mono text-[11px] text-muted mb-2">
          Lead enrichment ·{' '}
          <span className="text-fg">2,100 lookups a month</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Side kind="BUY" what="Enrichment suite" euro="€1,200" wins={false} />
          <Side kind="MAKE" what="Your own agent" euro="€310" wins />
        </div>
        <p className="mt-2 rounded-lg bg-honey-soft px-3 py-2 text-[13px] text-honey-ink">
          <strong className="font-semibold">Make it: €890 less a month.</strong>
        </p>
      </div>
      <div className="border-t border-border/60 pt-3">
        <p className="font-mono text-[11px] text-muted mb-2">
          Meeting notes · <span className="text-fg">140 meetings a month</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Side kind="BUY" euro="€216" wins />
          <Side kind="MAKE" euro="€390" wins={false} />
        </div>
        <p className="mt-2 rounded-lg border border-border/60 bg-surface px-3 py-2 text-[13px] text-fg/80">
          <strong className="font-semibold text-fg">Keep buying:</strong> €174
          less a month.
        </p>
      </div>
    </div>
  );
}

/* Where the outer drops of the branches land: the middle of the first and of
 * the last of three equal columns with a gap of 1rem. */
const EDGE = 'calc((100% - 2rem) / 6)';

export default function Pillars() {
  return (
    <section
      id="how-it-works"
      className="section-x py-16 md:py-24 bg-bg scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        <h2
          className="max-w-3xl mx-auto text-center -mb-4 md:-mb-10 font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance"
          style={{ fontWeight: 900 }}
        >
          See the spend, know what it returned, then cut it.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <StepHeading
              title="AI spend, categorized."
              lead={
                <>
                  Models, paid tools and subscriptions in one dashboard, split
                  by provider, model, project, member and agent. Each agent gets
                  its own{' '}
                  <strong className="font-semibold text-fg">
                    spending policy
                  </strong>
                  .
                </>
              }
            />
          </div>
          <div className="lg:col-span-7">
            <SpendSplit />
          </div>
        </div>

        <div className="!mt-10 md:!mt-12">
          <div className="flex flex-col items-center" aria-hidden="true">
            <span className="h-8 w-px bg-border" />
          </div>
          <p className="mx-auto w-fit rounded-full border border-border bg-surface px-4 py-2 font-body text-sm md:text-base font-semibold text-fg text-center">
            From the same spend data
          </p>
          <div className="hidden lg:block relative h-10" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-5 w-px bg-border" />
            <span
              className="absolute top-5 h-px bg-border"
              style={{ left: EDGE, right: EDGE }}
            />
            <span
              className="absolute top-5 h-5 w-px bg-border"
              style={{ left: EDGE }}
            />
            <span className="absolute left-1/2 top-5 h-5 w-px bg-border" />
            <span
              className="absolute top-5 h-5 w-px bg-border"
              style={{ right: EDGE }}
            />
          </div>
          <div
            className="lg:hidden flex flex-col items-center"
            aria-hidden="true"
          >
            <span className="h-6 w-px bg-border" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 [&>*]:min-w-0">
            <SubCard
              title="The ROI of every agent."
              lead={
                <>
                  What each agent spends and the cost of one result.{' '}
                  <strong className="font-semibold text-fg">
                    Download the data
                  </strong>{' '}
                  for your reports.
                </>
              }
            >
              <CostPerResult />
            </SubCard>
            <SubCard
              title="Make or buy, with numbers."
              lead={
                <>
                  Is a tool worth its subscription, or can your agents do the
                  job for less?{' '}
                  <strong className="font-semibold text-fg">
                    Based on your past runs.
                  </strong>
                </>
              }
            >
              <MakeOrBuy />
            </SubCard>
            <SubCard
              title="Same work, cheaper route."
              lead={
                <>
                  Ametyst finds a cheaper model or tool for each step.{' '}
                  <strong className="font-semibold text-fg">
                    You approve it.
                  </strong>
                </>
              }
            >
              <RouteCard />
            </SubCard>
          </div>
        </div>
      </div>
    </section>
  );
}

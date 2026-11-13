import type { ReactNode } from 'react';

/* The two plans, Pay per use and Pro, on the home page (the #pricing section)
 * and on /pricing. From md up they are one table with the rows in three
 * groups; on a phone they are two cards, one under the other. A row is true
 * (included), false (not included) or the limit as text. */

const APP_URL = 'https://business.ametyst.ai';

const LEAD =
  'Opening a workspace is free. Your agents pay for the models and tools they use, and nothing else.';

type Cell = boolean | string;

const GROUPS: {
  title: string;
  rows: { label: string; free: Cell; pro: Cell }[];
}[] = [
  {
    title: 'Everything you need to monitor your AI and work with your agents',
    rows: [
      {
        label: 'AI spend by provider, model, project, member and agent',
        free: true,
        pro: true,
      },
      { label: 'Unlimited members', free: true, pro: true },
      { label: '40+ models and tools from one wallet', free: true, pro: true },
    ],
  },
  {
    title: 'Everything an AI-native company needs to run many agents',
    rows: [
      { label: 'Spending policies', free: '2', pro: 'Unlimited' },
      { label: 'Agents per member', free: '1', pro: 'Unlimited' },
      { label: 'Wallets per member', free: '1', pro: 'Unlimited' },
    ],
  },
  {
    title: 'Understand and improve your business with AI',
    rows: [
      { label: 'Savings advice', free: '5 a month', pro: 'Unlimited' },
      { label: 'ROI data to download', free: false, pro: true },
      { label: 'Make-or-buy review with our team', free: false, pro: true },
    ],
  },
];

/* The Pro column is one framed, lightly tinted column from the plan name to
 * the last row: the frame is drawn inside every cell, so the rows keep their
 * hairlines. */
const PRO_SIDES =
  'bg-accent-soft/50 shadow-[inset_2px_0_0_var(--color-accent),inset_-2px_0_0_var(--color-accent)]';
const PRO_TOP =
  'rounded-t-xl bg-accent-soft/50 shadow-[inset_2px_0_0_var(--color-accent),inset_-2px_0_0_var(--color-accent),inset_0_2px_0_var(--color-accent)]';
const PRO_BOTTOM =
  'rounded-b-xl bg-accent-soft/50 shadow-[inset_2px_0_0_var(--color-accent),inset_-2px_0_0_var(--color-accent),inset_0_-2px_0_var(--color-accent)]';

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function Value({ v, pro = false }: { v: Cell; pro?: boolean }) {
  if (v === true)
    return (
      <span
        role="img"
        aria-label="Included"
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full align-middle ${pro ? 'bg-accent text-btn-fg' : 'bg-accent-soft text-accent'}`}
      >
        <Check />
      </span>
    );
  if (v === false)
    return (
      <span role="img" aria-label="Not included" className="text-muted">
        –
      </span>
    );
  return <span className={pro ? 'font-semibold text-fg' : 'text-fg'}>{v}</span>;
}

function PlanHead({
  name,
  price,
  note,
  primary = false,
}: {
  name: string;
  price: string;
  note: string;
  primary?: boolean;
}) {
  return (
    <>
      <span
        className="block font-headline text-lg md:text-xl text-fg"
        style={{ fontWeight: 900 }}
      >
        {name}
      </span>
      <span
        className="block mt-3 font-headline text-4xl md:text-5xl text-fg tracking-tight"
        style={{ fontWeight: 900 }}
      >
        {price}
      </span>
      <span className="block mt-1.5 text-xs text-muted">{note}</span>
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-sm mt-4 w-full ${primary ? 'btn-primary' : 'btn-secondary'}`}
      >
        Get started
      </a>
    </>
  );
}

export function PlansTable({ lead = false }: { lead?: boolean }) {
  const last = GROUPS.length - 1;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-3 md:p-6">
      <table className="w-full min-w-[620px] border-separate border-spacing-0 font-body text-sm md:text-[15px] text-fg/85 tabular-nums">
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            <td className="px-4 pb-5 pr-8 align-bottom text-left">
              {lead && (
                <span className="block text-sm md:text-[15px] text-fg/75 leading-relaxed">
                  {LEAD}
                </span>
              )}
            </td>
            <th
              scope="col"
              className="px-4 pt-5 pb-5 align-top text-center font-normal"
            >
              <PlanHead name="Pay per use" price="€0" note="no fixed fee" />
            </th>
            <th
              scope="col"
              className={`px-4 pt-5 pb-5 align-top text-center font-normal ${PRO_TOP}`}
            >
              <PlanHead
                name="Pro"
                price="€15"
                note="per seat, per month"
                primary
              />
            </th>
          </tr>
        </thead>
        {GROUPS.map((g, gi) => (
          <tbody key={g.title}>
            <tr>
              <th
                scope="colgroup"
                colSpan={2}
                className={`px-4 pb-2.5 text-left font-semibold text-fg border-b border-border ${gi === 0 ? 'pt-5' : 'pt-7'}`}
              >
                {g.title}
              </th>
              <td className={`border-b border-border ${PRO_SIDES}`} />
            </tr>
            {g.rows.map((r, ri) => {
              const end = ri === g.rows.length - 1;
              const bottom = end && gi === last;
              const line = end ? '' : 'border-b border-border/50';
              const pad = bottom ? 'px-4 pt-3.5 pb-5' : 'px-4 py-3.5';
              return (
                <tr key={r.label}>
                  <th
                    scope="row"
                    className={`${pad} text-left font-normal ${line}`}
                  >
                    {r.label}
                  </th>
                  <td className={`${pad} text-center ${line}`}>
                    <Value v={r.free} />
                  </td>
                  <td
                    className={`${pad} text-center ${line} ${bottom ? PRO_BOTTOM : PRO_SIDES}`}
                  >
                    <Value v={r.pro} pro />
                  </td>
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}

const FREE_LIST: ReactNode[] = [
  <>
    <strong className="font-semibold text-fg">AI spend</strong> by provider,
    model, project, member and agent
  </>,
  <strong className="font-semibold text-fg">Unlimited members</strong>,
  <>
    <strong className="font-semibold text-fg">40+ models and tools</strong> from
    one wallet
  </>,
  '2 spending policies',
  '1 agent and 1 wallet per member',
  '5 savings advice a month',
];

const PRO_LIST: ReactNode[] = [
  <strong className="font-semibold text-fg">
    Unlimited spending policies
  </strong>,
  <>
    <strong className="font-semibold text-fg">Unlimited agents</strong> per
    member
  </>,
  <>
    <strong className="font-semibold text-fg">Unlimited wallets</strong> per
    member
  </>,
  <strong className="font-semibold text-fg">Unlimited savings advice</strong>,
  <strong className="font-semibold text-fg">ROI data to download</strong>,
  <>
    <strong className="font-semibold text-fg">Make-or-buy review</strong> with
    our team
  </>,
];

function PlanCard({
  name,
  price,
  note,
  label,
  items,
  primary = false,
}: {
  name: string;
  price: string;
  note: string;
  label: string;
  items: ReactNode[];
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded-xl bg-surface p-6 flex flex-col font-body ${primary ? 'border-2 border-accent' : 'border border-border'}`}
    >
      <p className="font-headline text-xl text-fg" style={{ fontWeight: 900 }}>
        {name}
      </p>
      <p className="mt-4 flex items-baseline gap-2 flex-wrap">
        <span
          className="font-headline text-5xl text-fg tracking-tight"
          style={{ fontWeight: 900 }}
        >
          {price}
        </span>
        <span className="text-sm text-muted">{note}</span>
      </p>
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn mt-6 w-full ${primary ? 'btn-primary' : 'btn-secondary'}`}
      >
        Get started
      </a>
      <div className="mt-7 pt-6 border-t border-border/60">
        <p className="font-mono text-[11px] text-muted mb-4">{label}</p>
        <ul className="space-y-3 text-sm text-fg/85 leading-snug">
          {items.map((item, n) => (
            <li key={n} className="flex gap-3">
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PlanCards() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <PlanCard
        name="Pay per use"
        price="€0"
        note="no fixed fee"
        label="Included"
        items={FREE_LIST}
      />
      <PlanCard
        name="Pro"
        price="€15"
        note="per seat, per month"
        label="Everything in Pay per use, plus"
        items={PRO_LIST}
        primary
      />
    </div>
  );
}

/* The plans at every width: the table from md up, the two cards on a phone.
 * `lead` puts the one sentence about what is free in the corner of the table;
 * /pricing says it in its own text. */
export function Plans({ lead = false }: { lead?: boolean }) {
  return (
    <>
      <div className="hidden md:block">
        <PlansTable lead={lead} />
      </div>
      <div className="md:hidden">
        <PlanCards />
      </div>
    </>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-x py-16 md:py-24 bg-bg scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <h2
            className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance"
            style={{ fontWeight: 900 }}
          >
            Free for the whole team.{' '}
            <span className="text-accent">Pro for more agents.</span>
          </h2>
          <p className="md:hidden mt-4 font-body text-base text-fg/75 leading-relaxed text-balance">
            {LEAD}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Plans lead />
        </div>
      </div>
    </section>
  );
}

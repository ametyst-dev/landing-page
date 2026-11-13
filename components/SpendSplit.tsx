'use client';

import { useEffect, useState } from 'react';

/* The spend dashboard of the first block: one month of AI spend, the same
 * total split five ways. It turns to the next split every four seconds, stops
 * while the pointer is on it, and stops for good once a person picks a split.
 * Every split sums to TOTAL. */

const TOTAL = 18420;

type Row = { name: string; tag?: string; euro: number };

const SPLITS: { tab: string; title: string; rows: Row[] }[] = [
  {
    tab: 'Provider',
    title: 'Spend by provider',
    rows: [
      { name: 'Anthropic', tag: 'Models', euro: 8940 },
      { name: 'OpenAI', tag: 'Models', euro: 4310 },
      { name: 'Cursor', tag: 'Subscription', euro: 1920 },
      { name: 'Exa', tag: 'Paid tool', euro: 1480 },
      { name: '12 others', euro: 1770 },
    ],
  },
  {
    tab: 'Model',
    title: 'Spend by model',
    rows: [
      { name: 'Fable 5.1', tag: 'Anthropic', euro: 6210 },
      { name: 'GPT-5.6 Terra', tag: 'OpenAI', euro: 3480 },
      { name: 'Claude Haiku 4.5', tag: 'Anthropic', euro: 1120 },
      { name: 'Other models', euro: 2440 },
      { name: 'Tools and subscriptions', tag: 'not a model', euro: 5170 },
    ],
  },
  {
    tab: 'Project',
    title: 'Spend by project',
    rows: [
      { name: 'Outbound', euro: 6870 },
      { name: 'Code review', euro: 5340 },
      { name: 'Market research', euro: 3150 },
      { name: 'Support', euro: 1890 },
      { name: 'No project', euro: 1170 },
    ],
  },
  {
    tab: 'Member',
    title: 'Spend by member',
    rows: [
      { name: 'Giulia R.', tag: 'Sales', euro: 5480 },
      { name: 'Marco B.', tag: 'Engineering', euro: 4260 },
      { name: 'Sara L.', tag: 'Marketing', euro: 3720 },
      { name: 'Luca T.', tag: 'Engineering', euro: 2890 },
      { name: '9 others', euro: 2070 },
    ],
  },
  {
    tab: 'Agent',
    title: 'Spend by agent',
    rows: [
      { name: 'pr-review', tag: 'Marco B.', euro: 6980 },
      { name: 'lead-research', tag: 'Giulia R.', euro: 5520 },
      { name: 'competitor-ads', tag: 'Sara L.', euro: 2560 },
      { name: '11 others', euro: 3360 },
    ],
  },
];

const STATS: { label: string; value: string; tag: string }[] = [
  { label: 'Total spend', value: '€18,420 →', tag: '↑ 12%' },
  { label: 'Policies near their limit', value: '2 →', tag: 'of 14' },
];

const euro = (n: number) => `€${n.toLocaleString('en-US')}`;

export default function SpendSplit() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    if (held || picked) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % SPLITS.length), 4200);
    return () => clearInterval(id);
  }, [held, picked]);

  const split = SPLITS[i];
  const max = Math.max(...split.rows.map((r) => r.euro));

  return (
    <div
      className="rounded-xl border border-border bg-surface font-body"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <div className="px-5 md:px-7 pt-5 md:pt-6">
        <p className="text-xs text-muted">Insights</p>
        <p className="text-2xl md:text-3xl font-semibold text-fg tracking-tight mb-4">
          AI spend
        </p>
        <div
          className="flex items-end gap-3 sm:gap-4 text-[13px] sm:text-sm border-b border-border/60 overflow-x-auto"
          role="group"
          aria-label="Split by"
        >
          <span className="hidden sm:inline pb-2 text-xs text-muted shrink-0">
            Split by
          </span>
          {SPLITS.map((s, n) => (
            <button
              key={s.tab}
              type="button"
              aria-pressed={n === i}
              onClick={() => {
                setI(n);
                setPicked(true);
              }}
              className={`pb-2 -mb-px shrink-0 border-b-2 ${n === i ? 'border-fg text-fg font-medium' : 'border-transparent text-muted hover:text-fg'}`}
            >
              {s.tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 md:p-7 space-y-5">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse rounded-lg border border-border/60 px-3 py-2.5"
            >
              <dd className="flex items-center justify-between gap-2">
                <span className="text-lg md:text-xl font-semibold text-fg tabular-nums whitespace-nowrap">
                  {s.value}
                </span>
                <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[10px] text-accent whitespace-nowrap">
                  {s.tag}
                </span>
              </dd>
              <dt className="text-xs text-muted mb-1">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="rounded-lg border border-border/60">
          <p className="px-4 py-2.5 border-b border-border/60 text-xs font-semibold text-fg">
            {split.title}
          </p>
          <ul className="px-4 py-4 space-y-3.5">
            {split.rows.map((r) => (
              <li
                key={`${split.tab}-${r.name}`}
                className="animate-[fadein_0.3s_ease-out]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 truncate text-sm text-fg">
                    <span className="font-medium">{r.name}</span>
                    {r.tag && (
                      <span className="ml-2 font-mono text-[10px] text-muted">
                        {r.tag}
                      </span>
                    )}
                  </p>
                  <p className="shrink-0 text-sm text-fg tabular-nums">
                    <span className="font-semibold">{euro(r.euro)}</span>
                    <span className="ml-2 inline-block w-7 text-right font-mono text-[10px] text-muted">
                      {Math.round((r.euro / TOTAL) * 100)}%
                    </span>
                  </p>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-accent-soft">
                  <span
                    className="block h-2 rounded-full bg-accent"
                    style={{ width: `${((r.euro / max) * 100).toFixed(1)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

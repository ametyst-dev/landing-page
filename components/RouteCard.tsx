"use client";

import { useEffect, useState } from "react";
import { ToolIcon } from "@/components/Providers";

/* One workflow, step by step, and the model or tool Ametyst would route each
 * step to. It cycles through three steps every four seconds and stops while
 * the pointer is on it. Model marks are Simple Icons paths (24x24). */

type Option = { id: string; name: string; does: string; from: string; kind: "tool" | "model" };

const OPTIONS: Option[] = [
  { id: "exa", name: "Exa", does: "Web search built for agents, cheap per query.", from: "Tool", kind: "tool" },
  { id: "parallel", name: "Parallel", does: "Deep web research when a quick search is not enough.", from: "Tool", kind: "tool" },
  { id: "fable", name: "Fable 5.1", does: "The hardest steps, where quality matters more than cost.", from: "Anthropic", kind: "model" },
  { id: "terra", name: "GPT-5.6 Terra", does: "Strong writing and reasoning at a lower cost.", from: "OpenAI", kind: "model" },
  { id: "haiku", name: "Claude Haiku 4.5", does: "Fast and cheap for short, routine steps.", from: "Anthropic", kind: "model" },
  { id: "hunter", name: "Hunter", does: "Checks that an email address exists.", from: "Tool", kind: "tool" },
];

const STEPS: { n: string; ask: string; need: string }[] = [
  { n: "01", ask: "Find 40 fintech companies in Milan", need: "Web search" },
  { n: "02", ask: "Write a brief for each lead", need: "Writing" },
  { n: "03", ask: "Tag each lead by industry", need: "Classification" },
  { n: "04", ask: "Verify each email", need: "Lookup" },
];

const ROUTES: { step: number; option: string }[] = [
  { step: 1, option: "terra" },
  { step: 0, option: "exa" },
  { step: 2, option: "haiku" },
];

const OPENAI =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";
const ANTHROPIC =
  "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z";

function OptionMark({ o }: { o: Option }) {
  if (o.kind === "tool") return <ToolIcon slug={o.id} size="md" bare />;
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor" className="shrink-0 text-fg">
      <path d={o.from === "OpenAI" ? OPENAI : ANTHROPIC} />
    </svg>
  );
}

const DOTS: [number, number][] = [[12, 4], [5, 8], [19, 8], [12, 12], [5, 16], [19, 16], [12, 20]];

function RouterMark() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" className="text-accent">
      {DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill="currentColor" />
      ))}
    </svg>
  );
}

const rowClass = (on: boolean) =>
  `rounded-lg border px-3 py-2.5 transition-all duration-300 ${on ? "border-accent bg-surface" : "border-border/60 bg-bg opacity-45"}`;

export default function RouteCard() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROUTES.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  const route = ROUTES[i];

  return (
    <div
      className="rounded-xl border border-border bg-surface p-5 md:p-7 font-body"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-center">
        <div className="min-w-0">
          <p className="font-mono text-[11px] text-muted mb-2">Agent · <span className="text-fg">lead-research</span></p>
          <ul className="space-y-2">
            {STEPS.map((s, n) => (
              <li key={s.n} className={rowClass(n === route.step)}>
                <p className="font-mono text-[10px] text-muted">{s.n} / STEP</p>
                <p className="text-sm text-fg leading-snug">“{s.ask}”</p>
                <p className="font-mono text-[10px] text-muted mt-1">{s.need}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden sm:flex justify-center"><RouterMark /></div>
        <div className="min-w-0">
          <p className="font-mono text-[11px] text-muted mb-2">Models and tools</p>
          <ul className="space-y-2">
            {OPTIONS.map((o) => {
              const on = o.id === route.option;
              return (
                <li key={o.id} className={rowClass(on)}>
                  <p className="flex items-center gap-2">
                    <OptionMark o={o} />
                    <span className="text-sm font-semibold text-fg truncate">{o.name}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted shrink-0">{o.from}</span>
                  </p>
                  <p className={`text-xs mt-1 truncate ${on ? "text-fg/80" : "text-muted"}`}>{o.does}</p>
                  {on && <p className="mt-1.5 font-mono text-[10px] text-ok">■ Selected</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export type ScriptLine = { kind: "prompt" | "status" | "tool" | "done" | "detail"; text: string };

export const CHAT_DEMO_SCRIPT: ScriptLine[] = [
  { kind: "prompt", text: "> Find 50 fintech founders across Europe with verified emails and draft my outreach" },
  { kind: "status", text: "⏺ calling ametyst · matching intent to authorized providers" },
  { kind: "tool",   text: "⏺ fund a wallet · €5.00 top-up · policy gtm €50/week" },
  { kind: "tool",   text: "⏺ calling exa.search   \"fintech founders Europe\"   €0.02" },
  { kind: "tool",   text: "⏺ calling fullenrich.contacts   +50 verified emails   €0.90" },
  { kind: "tool",   text: "⏺ calling hunter.verify   50 emails   €0.08" },
  { kind: "tool",   text: "⏺ calling claude   drafting 50 outreach messages   €0.31" },
  { kind: "done",   text: "✓ Done — outreach-fintech-eu.csv" },
  { kind: "detail", text: "  sources: techcrunch.com · sifted.eu · eu-startups.com" },
  { kind: "detail", text: "  50 contacts, 50 drafts. Total €1.31, within policy." },
];

export default function ChatDemo() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const promptText = CHAT_DEMO_SCRIPT[0].text;

  useEffect(() => {
    if (reducedMotion) return;

    if (typedChars < promptText.length) {
      const interval = setInterval(() => {
        setTypedChars((prev) => prev + 1);
      }, 30);
      return () => clearInterval(interval);
    }

    if (visibleLines < CHAT_DEMO_SCRIPT.length - 1) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timeout);
    }

    const loopTimeout = setTimeout(() => {
      setTypedChars(0);
      setVisibleLines(0);
    }, 3000);
    return () => clearTimeout(loopTimeout);
  }, [reducedMotion, typedChars, visibleLines, promptText.length]);

  const displayPrompt = reducedMotion ? promptText : promptText.slice(0, typedChars);

  return (
    <section id="chat-demo" className="pt-0 pb-16 md:pb-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto rounded-xl border border-black/30 shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 bg-zinc-900 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
          </div>
          <div className="bg-black p-4 md:p-8 text-left font-mono text-[11px] leading-relaxed md:text-sm md:leading-normal text-white overflow-x-auto">
            <div className="whitespace-pre-wrap break-words md:whitespace-pre py-1.5">{displayPrompt}</div>
            <div className="whitespace-pre"> </div>
            {CHAT_DEMO_SCRIPT.slice(1).map((line, i) => (
              <div
                key={line.text}
                aria-hidden={!reducedMotion && i >= visibleLines}
                className={`whitespace-pre-wrap break-words md:whitespace-pre py-1.5 transition-opacity duration-500 ${
                  reducedMotion || i < visibleLines ? "opacity-100" : "opacity-0"
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";

export type ScriptLine = { kind: "prompt" | "status" | "tool" | "done" | "detail"; text: string };

export const CHAT_DEMO_SCRIPT: ScriptLine[] = [
  { kind: "prompt", text: "> Find 50 fintech founders across Europe with verified emails and draft my outreach" },
  { kind: "status", text: "⏺ ametyst · wallet connected · policy gtm: €50/week, €18.40 used" },
  { kind: "tool",   text: "⏺ exa.search   \"fintech founders Europe\"          €0.05" },
  { kind: "tool",   text: "⏺ apify.linkedin   50 profiles                    €0.85" },
  { kind: "tool",   text: "⏺ apollo.enrich   +verified emails                €1.20" },
  { kind: "tool",   text: "⏺ claude   drafting 50 outreach messages          €0.31" },
  { kind: "done",   text: "✓ Done. Here's your file: outreach-fintech-eu.csv" },
  { kind: "detail", text: "  50 contacts, 50 drafts. Total €2.41, within policy." },
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
    <section id="chat-demo" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <p className="font-body text-sm md:text-base font-bold text-muted uppercase tracking-wider text-center mb-6">
          See it in action
        </p>
        <div className="max-w-3xl mx-auto rounded-lg border-2 border-border bg-bg p-4 md:p-6 text-left font-mono text-xs md:text-sm text-fg overflow-x-auto">
          <div className="whitespace-pre">{displayPrompt}</div>
          <div className="whitespace-pre"> </div>
          {CHAT_DEMO_SCRIPT.slice(1).map((line, i) => (
            <div
              key={line.text}
              className={`whitespace-pre transition-opacity duration-500 ${
                reducedMotion || i < visibleLines ? "opacity-100" : "opacity-0"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted text-center mt-3 font-body">Illustrative demo</p>
      </div>
    </section>
  );
}

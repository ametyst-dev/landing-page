import type { ReactNode } from "react";
import EndStrip from "@/components/EndStrip";

export const LAST_UPDATED = "21 September 2026";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-headline text-xl md:text-2xl text-fg leading-tight tracking-tight mt-12 mb-3" style={{ fontWeight: 900 }}>
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="font-body text-sm md:text-base text-fg/80 leading-relaxed mb-4">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="font-body text-sm md:text-base text-fg/80 leading-relaxed mb-4 list-disc pl-5 space-y-2">{children}</ul>;
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-accent underline underline-offset-2 hover:opacity-80">
      {children}
    </a>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto mb-6 rounded-xl border border-border bg-surface">
      <table className="w-full font-body text-xs md:text-sm text-fg/80 border-collapse">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="text-left font-semibold text-fg px-4 py-3 border-b border-border align-top">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LegalPage({
  title,
  updated = true,
  children,
}: {
  title: string;
  updated?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg/90 backdrop-blur border-b border-border/40">
        <div className="w-full section-x">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <a href="/" className="text-lg md:text-2xl font-headline font-bold tracking-tighter text-accent leading-none">
              Ametyst
            </a>
            <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main">
              <a href="/pricing" className="hidden md:inline text-sm font-medium text-fg/70 hover:text-fg transition-colors font-body">
                Pricing
              </a>
              <a href="/contact" className="hidden md:inline text-sm font-medium text-fg/70 hover:text-fg transition-colors font-body">
                Contact
              </a>
              <a
                href="/book"
                className="rounded-lg bg-btn-bg text-btn-fg font-bold py-2 px-4 md:px-5 text-xs md:text-sm transition-opacity hover:opacity-90 font-body"
              >
                Book a call
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="section-x pt-28 pb-20">
        <article className="max-w-3xl mx-auto">
          <h1 className="font-headline text-3xl md:text-5xl text-fg leading-tight tracking-tight mb-3" style={{ fontWeight: 900 }}>
            {title}
          </h1>
          {updated && <p className="font-mono text-xs text-muted mb-8">Last updated: {LAST_UPDATED}</p>}
          {children}
        </article>
      </main>
      <EndStrip />
    </div>
  );
}

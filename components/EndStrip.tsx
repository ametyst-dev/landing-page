const linkClass = "text-sm text-fg/70 hover:text-fg transition-colors font-body";
const headClass = "font-mono text-[11px] uppercase tracking-wider text-muted mb-4";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function EndStrip() {
  return (
    <footer className="bg-bg section-x pt-14 pb-8 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-6">
            <a href="/" className="text-2xl font-headline font-bold tracking-tighter text-accent leading-none">
              Ametyst
            </a>
            <p className="font-body text-sm text-fg/70 mt-3 max-w-xs">You have the agents. Let them work.</p>
          </div>

          <nav className="md:col-span-2" aria-label="Product">
            <p className={headClass}>Product</p>
            <ul className="space-y-3">
              <li>
                <a href="https://business.ametyst.ai" {...external} className={linkClass}>
                  Sign in
                </a>
              </li>
              <li>
                <a href="/book" className={linkClass}>
                  Book a call
                </a>
              </li>
              <li>
                <a href="/skill.md" className={linkClass}>
                  skill.md for agents
                </a>
              </li>
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Legal">
            <p className={headClass}>Legal</p>
            <ul className="space-y-3">
              <li>
                <a href="/terms" className={linkClass}>
                  Terms
                </a>
              </li>
              <li>
                <a href="/refunds" className={linkClass}>
                  Refunds
                </a>
              </li>
              <li>
                <a href="/privacy" className={linkClass}>
                  Privacy
                </a>
              </li>
              <li>
                <a href="/contact" className={linkClass}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Follow">
            <p className={headClass}>Follow</p>
            <ul className="space-y-3">
              <li>
                <a href="https://x.com/ametyst_ai" {...external} className={linkClass} aria-label="X">
                  X
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/89660894/" {...external} className={linkClass} aria-label="LinkedIn">
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p lang="it" className="font-body text-xs text-muted mt-12 pt-6 border-t border-border/40 leading-relaxed">
          AMETYST SRL · Corso Magenta 56, 20123 Milano (MI) · P.IVA e C.F. 14681630969 · REA MI-2800625 · Capitale sociale €
          10.000,00 i.v.
        </p>
      </div>
    </footer>
  );
}

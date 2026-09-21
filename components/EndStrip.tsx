const linkClass =
  "text-xs md:text-sm font-medium text-fg/70 hover:text-fg transition-colors font-body";

export default function EndStrip() {
  return (
    <footer className="bg-bg section-x py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs md:text-sm text-muted">
          Ametyst · You have the agents. Let them work.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Footer">
          <a href="https://business.ametyst.ai" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Sign in
          </a>
          <a href="/skill.md" className={linkClass}>
            skill.md for agents
          </a>
          <a href="https://x.com/ametyst_ai" target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="X">
            X
          </a>
          <a
            href="https://www.linkedin.com/company/89660894/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-[11px] md:text-xs text-muted text-center md:text-left">
          AMETYST SRL società con socio unico · Corso Magenta 56, 20123 Milano (MI), Italy · VAT no. / C.F. / Milan Companies
          Register 14681630969 · REA MI-2800625 · Share capital €10,000.00 i.v.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 shrink-0" aria-label="Legal">
          <a href="/pricing" className={linkClass}>
            Pricing
          </a>
          <a href="/terms" className={linkClass}>
            Terms
          </a>
          <a href="/refunds" className={linkClass}>
            Refunds
          </a>
          <a href="/privacy" className={linkClass}>
            Privacy
          </a>
          <a href="/contact" className={linkClass}>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

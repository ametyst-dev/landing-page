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
    </footer>
  );
}

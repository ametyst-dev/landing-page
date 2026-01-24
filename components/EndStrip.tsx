export default function EndStrip() {
  return (
    <footer className="bg-bg border-t border-border py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a
          href="https://x.com/ametyst_xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-fg transition-colors"
          aria-label="X (Twitter)"
        >
          X (Twitter)
        </a>
        <a
          href="https://www.linkedin.com/company/ametyst-xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-fg transition-colors"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

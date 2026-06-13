export default function EndStrip() {
  return (
    <footer className="bg-bg py-6 px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
        <p className="text-xs md:text-sm text-fg opacity-70 font-body text-center">
          Wallets for agents. Built in Europe. © 2026 Ametyst.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="https://x.com/ametyst_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm font-medium text-fg opacity-70 hover:opacity-100 transition-opacity font-body"
            aria-label="X"
          >
            X
          </a>
          <a
            href="https://www.linkedin.com/company/ametyst-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm font-medium text-fg opacity-70 hover:opacity-100 transition-opacity font-body"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

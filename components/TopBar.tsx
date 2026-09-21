"use client";

const navLinkClass =
  "hidden md:inline text-sm font-medium text-fg/70 hover:text-fg transition-colors font-body";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg/90 backdrop-blur border-b border-border/40">
      <div className="w-full section-x">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a
            href="#hero"
            className="text-lg md:text-2xl font-headline font-bold tracking-tighter text-accent leading-none"
          >
            Ametyst
          </a>
          <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main">
            <a href="#how-it-works" className={navLinkClass}>
              How it works
            </a>
            <a href="#tasks" className={navLinkClass}>
              Use cases
            </a>
            <a
              href="https://business.ametyst.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-semibold text-fg/80 hover:text-fg transition-colors font-body"
            >
              Sign in
            </a>
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-btn-bg text-btn-fg font-bold py-2 px-4 md:px-5 text-xs md:text-sm transition-opacity hover:opacity-90 font-body"
            >
              Book a call
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

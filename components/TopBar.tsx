"use client";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg/90 backdrop-blur border-b border-border/40">
      <div className="w-full px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a
            href="#hero"
            className="flex items-center h-full text-2xl md:text-3xl font-headline font-bold tracking-tighter text-accent leading-none"
          >
            Ametyst
          </a>
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm hidden sm:inline-flex"
            >
              Book a demo
            </a>
            <a
              href="https://business.ametyst.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Get started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

"use client";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg/90 backdrop-blur border-b border-border/40">
      <div className="w-full section-x">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16">
          <a
            href="#hero"
            className="text-lg md:text-2xl font-headline font-bold tracking-tighter text-accent leading-none"
          >
            Ametyst
          </a>
          <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main">
            <a
              href="https://business.ametyst.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Create your workspace
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

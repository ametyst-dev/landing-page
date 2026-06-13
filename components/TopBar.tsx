"use client";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg border-b border-fg/10">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-2xl md:text-3xl font-headline font-bold text-btn-bg opacity-100 tracking-tighter bg-transparent border-none cursor-pointer p-0 hover:opacity-90 transition-opacity leading-none mt-1"
          >
            Ametyst
          </button>
          <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-2 md:py-2.5 px-5 text-xs md:text-base transition-colors hover:opacity-90"
            >
              Book a discovery call
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

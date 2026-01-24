"use client";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

const navButtonClass =
  "text-sm font-medium text-muted hover:text-fg transition-colors bg-transparent border-none cursor-pointer p-0 font-sans";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-14 sm:h-16">
          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Main">
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className={navButtonClass}
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("faq")}
              className={navButtonClass}
            >
              FAQ
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

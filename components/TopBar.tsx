"use client";

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-end h-14 sm:h-16">
          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Main">
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, "how-it-works")}
              className="text-sm font-medium text-muted hover:text-fg transition-colors"
            >
              How it works
            </a>
            <a
              href="#faq"
              onClick={(e) => scrollToSection(e, "faq")}
              className="text-sm font-medium text-muted hover:text-fg transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

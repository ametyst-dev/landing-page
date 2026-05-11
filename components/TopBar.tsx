"use client";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

const navButtonClass =
  "text-xs md:text-sm font-medium text-fg opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer p-0 font-body";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg border-b border-border/20">
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-lg md:text-2xl font-headline font-bold opacity-100 tracking-tighter bg-transparent border-none cursor-pointer p-0 hover:opacity-90 transition-opacity leading-none"
            style={{ color: '#7A1FFF', textShadow: '0 0 1px rgba(122, 31, 255, 0.3)' }}
          >
            Ametyst
          </button>
          <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main">
            <a
              href="/skill.md"
              className={navButtonClass}
            >
              Skill.md
            </a>
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-2 px-5 text-xs md:text-sm transition-colors hover:opacity-90 uppercase ml-2"
            >
              Get started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

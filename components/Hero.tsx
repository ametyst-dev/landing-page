"use client";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export default function Hero() {
  return (
    <section id="hero" className="flex flex-col items-center justify-start px-8 md:px-16 lg:px-24 xl:px-32 pb-14 md:pb-20 pt-32 md:pt-40 lg:pt-48 bg-bg">
      <div className="max-w-7xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-fg mb-3 md:mb-4 leading-tight">
          Give your agents one key to pay for every AI service.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-headline text-fg mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed">
          Ametyst equips your agents with a wallet. One key for every model, tool, and data service they need, pay-per-use.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90"
          >
            Book a discovery call
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("waitlist")}
            className="rounded-lg border-2 border-btn-bg bg-transparent text-btn-bg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90 cursor-pointer"
          >
            Join the waiting list
          </button>
        </div>
      </div>
    </section>
  );
}

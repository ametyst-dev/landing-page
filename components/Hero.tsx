export default function Hero() {
  return (
    <section id="hero" className="flex flex-col items-center justify-start px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 pt-32 md:pt-40 lg:pt-48 bg-bg border-b border-border/20">
      <div className="max-w-7xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-fg mb-3 md:mb-4 leading-tight" style={{ fontWeight: 900, textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
          Agents cannot pay for Services
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl font-headline text-fg mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed">
         Ametyst is a banking platform built for them
        </p>

        {/* Video Placeholder - Smaller */}
        <div className="mt-8 md:mt-10 max-w-lg mx-auto">
          <div
            className="aspect-video w-full border-2 rounded-lg flex items-center justify-center"
            style={{ borderColor: '#7A1FFF', backgroundColor: 'rgba(122, 31, 255, 0.1)' }}
            aria-label="Video placeholder - Product demo coming soon"
          >
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-full border-2" style={{ borderColor: '#7A1FFF' }}>
                <svg
                  className="w-6 h-6 text-fg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-fg">Product demo coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

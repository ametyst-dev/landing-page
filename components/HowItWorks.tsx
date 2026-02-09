export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-bg scroll-mt-20">
      <div className="max-w-5xl w-full mx-auto">
        {/* Video Placeholder */}
        <div className="mb-8">
          <div
            className="aspect-video w-full max-w-4xl mx-auto bg-bg border-2 border-border rounded-lg flex items-center justify-center"
            aria-label="Video placeholder - Product demo coming soon"
          >
            <div className="text-center px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full border-2 border-border">
                <svg
                  className="w-10 h-10 text-fg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-fg">Product demo coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

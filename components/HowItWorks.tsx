export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">
          See Ametyst in Action
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Discover how AI-native founders unlock the agentic economy in 60 minutes
        </p>

        {/* Video Placeholder */}
        <div className="mb-8">
          <div
            className="aspect-video w-full bg-gradient-to-br from-background to-secondary/20 border-2 border-secondary rounded-lg flex items-center justify-center"
            aria-label="Video placeholder - Product demo coming soon"
          >
            <div className="text-center px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-secondary/30 border-2 border-secondary">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-primary">Product demo coming soon</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
          Watch how Ametyst enables your AI agents to spend and receive money autonomously—in just 60 minutes of integration.
        </p>
      </div>
    </section>
  );
}

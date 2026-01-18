export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Scritta Ametyst e Unbebank */}
          <div className="text-center">
            <h2 className="text-white text-4xl sm:text-5xl font-bold mb-2">
              Ametyst
            </h2>
            <p className="text-white text-2xl sm:text-3xl font-semibold">Own the bank</p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-sm mb-3 text-gray-300">Follow us:</p>
            <div className="flex gap-6 justify-center">
              <a
                href="https://x.com/ametyst_xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                X (Twitter)
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="https://www.linkedin.com/company/ametyst-xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/20 w-full text-center">
            <p className="text-sm text-gray-300">
              © 2026 Ametyst. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

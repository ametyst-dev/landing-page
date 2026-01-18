"use client";

import { useState, FormEvent } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Optional: Log email or send to endpoint
      console.log("Email submitted:", email);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-24 pt-32 md:pt-40">
      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 md:mb-8 leading-tight">
          The agentic economy is where you find defensibility
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed">
          Your business model is unclear. Your GTM is unclear. Your UX is unclear.
          <br className="hidden md:block" />
          In a market with uncertain defensibility and high competition, the path to clarity
          <br className="hidden md:block" />
          is the agentic economy.
        </p>

        {/* UVP Statement */}
        <p className="text-base md:text-lg text-gray-600 mb-10 md:mb-12 max-w-3xl mx-auto">
          Unlock the agentic economy with the banking platform that powers it.
          <br className="hidden sm:block" />
          Spend and receive money through agents.
        </p>

        {/* Email Form or Success Message */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 text-base border-2 border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Join the Waitlist
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary bg-opacity-20 border-2 border-secondary rounded-lg px-8 py-6">
              <p className="text-xl font-semibold text-primary">
                Thank you! We&apos;ll be in touch soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState, FormEvent } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-24 pt-24 md:pt-28 bg-bg">
      <div className="max-w-5xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-fg mb-6 md:mb-8 leading-tight">
          Agents can&apos;t pay services.
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-fg mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed">
          A banking platform to spend and receive money through agents
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6 md:mt-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-4 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 bg-transparent border-0 border-b-2 border-border rounded-none px-0 py-3 text-base text-fg placeholder:text-muted focus:outline-none focus:border-fg transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="shrink-0 rounded-none border-2 border-btn-border bg-btn-bg text-btn-fg font-medium py-3 px-6 text-base transition-colors hover:opacity-90"
              >
                Join Waitlist
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-xl mx-auto">
            <p className="text-lg text-fg">
              Thank you! We&apos;ll be in touch soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

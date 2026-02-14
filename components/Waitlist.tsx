"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });
      if (!r.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          Start working with agent-native banking
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 max-w-md px-4 py-3 rounded-lg border-2 border-border/20 bg-bg text-fg placeholder-muted focus:outline-none focus:border-[#7A1FFF] transition-colors font-body"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg border-2 border-btn-border bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-colors hover:opacity-90 whitespace-nowrap uppercase disabled:opacity-50"
            style={{ borderColor: '#7A1FFF', backgroundColor: '#7A1FFF', color: '#F8F8FF' }}
          >
            {status === "loading" ? "SENDING..." : "JOIN THE WAITING LIST"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-center text-sm mt-4 font-body" style={{ color: '#7A1FFF' }}>
            You&apos;re on the list! We&apos;ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm mt-4 text-red-500 font-body">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}

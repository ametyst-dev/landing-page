import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ChatDemo, { CHAT_DEMO_SCRIPT } from "@/components/ChatDemo";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const matchMediaMock = (matches: boolean) =>
  vi.fn().mockReturnValue({
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  });

describe("ChatDemo", () => {
  it("exports CHAT_DEMO_SCRIPT verbatim", () => {
    expect(CHAT_DEMO_SCRIPT.map((l) => l.text)).toEqual([
      "> Find 50 fintech founders across Europe with verified emails and draft my outreach",
      "⏺ calling ametyst · matching intent to authorized providers",
      "⏺ fund a wallet · €5.00 top-up · policy gtm €50/week",
      "⏺ calling exa.search   \"fintech founders Europe\"   €0.001",
      "⏺ calling apollo.enrich   +verified emails   €1.20",
      "⏺ calling claude   drafting 50 outreach messages   €0.31",
      "✓ Done — outreach-fintech-eu.csv",
      "  sources: techcrunch.com · sifted.eu · eu-startups.com",
      "  50 contacts, 50 drafts. Total €1.31, within policy.",
    ]);
  });

  it("renders full static script when prefers-reduced-motion", () => {
    vi.stubGlobal("matchMedia", matchMediaMock(true));
    const { container } = render(<ChatDemo />);

    expect(screen.getByText("See it in action")).toBeInTheDocument();

    CHAT_DEMO_SCRIPT.forEach((line) => {
      expect(
        screen.getByText((_, el) => el?.textContent === line.text)
      ).toBeInTheDocument();
    });

    expect(container.textContent).toContain(CHAT_DEMO_SCRIPT[2].text);
  });

  it("does not throw when matchMedia is undefined", () => {
    expect(() => {
      render(<ChatDemo />);
    }).not.toThrow();

    expect(screen.getByText("See it in action")).toBeInTheDocument();
  });
});

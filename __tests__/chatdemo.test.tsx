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
      "⏺ ametyst · wallet connected · policy gtm: €50/week, €18.40 used",
      "⏺ exa.search   \"fintech founders Europe\"          €0.05",
      "⏺ apify.linkedin   50 profiles                    €0.85",
      "⏺ apollo.enrich   +verified emails                €1.20",
      "⏺ claude   drafting 50 outreach messages          €0.31",
      "✓ Done. Here's your file: outreach-fintech-eu.csv",
      "  50 contacts, 50 drafts. Total €2.41, within policy.",
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

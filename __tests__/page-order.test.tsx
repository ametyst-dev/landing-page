import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Home from "@/app/page";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Page section order", () => {
  it("renders headings in the correct order", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        media: "",
        onchange: null,
        dispatchEvent: vi.fn(),
      })
    );

    render(<Home />);

    const text = document.body.textContent ?? "";
    const headings = [
      "Let your agents run on their own — spending only what you allow",
      "Your agents pay per use",
      "How it works",
      "Spend less the more they run",
      "Give your agents real autonomy.",
    ];

    const indices = headings.map((h) => text.indexOf(h));
    indices.forEach((idx) => expect(idx).toBeGreaterThanOrEqual(0));

    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThan(indices[i - 1]);
    }
  });
});

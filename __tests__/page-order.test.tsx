import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Home from "@/app/page";

afterEach(() => cleanup());

describe("Page section order", () => {
  it("renders the sections in the locked order", () => {
    render(<Home />);
    const text = document.body.textContent ?? "";
    const headings = [
      "Let them work.",
      "Every app and every specialized agent. One key.",
      "The Ametyst Agent. Always connected.",
      "You set the rules. The work gets shared.",
      "Your workflows are your differentiation.",
      "Built with our design partners. Running on their own.",
      "Free until the workflow runs. Paid from there.",
      "You pay for what your agents do.",
      "Get your first workflow running on its own.",
    ];
    const indices = headings.map((h) => text.indexOf(h));
    indices.forEach((idx, i) => expect(idx, headings[i]).toBeGreaterThanOrEqual(0));
    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThan(indices[i - 1]);
    }
  });

  it("never says wallet anywhere on the page", () => {
    render(<Home />);
    expect((document.body.textContent ?? "").toLowerCase()).not.toContain("wallet");
  });
});

import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import EndStrip from "@/components/EndStrip";

afterEach(() => {
  cleanup();
});

describe("EndStrip", () => {
  it("renders X link with correct href", () => {
    render(<EndStrip />);
    expect(screen.getByRole("link", { name: "X" })).toHaveAttribute(
      "href",
      "https://x.com/ametyst_ai"
    );
  });

  it("renders LinkedIn link with correct href", () => {
    render(<EndStrip />);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/ametyst-ai/"
    );
  });
});

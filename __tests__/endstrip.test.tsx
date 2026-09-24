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
      "https://www.linkedin.com/company/89660894/"
    );
  });

  it("links the legal pages and shows the company data in Italian", () => {
    render(<EndStrip />);
    for (const [name, href] of [
      ["Pricing", "/pricing"],
      ["Terms", "/terms"],
      ["Refunds", "/refunds"],
      ["Privacy", "/privacy"],
      ["Contact", "/contact"],
    ]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(screen.getByText(/AMETYST SRL · Corso Magenta 56/)).toBeInTheDocument();
    expect(screen.getByText(/P\.IVA e C\.F\. 14681630969/)).toBeInTheDocument();
  });

  it("has no brand block, no tagline and no line above it", () => {
    const { container } = render(<EndStrip />);
    expect(container.textContent).not.toContain("You have the agents");
    expect(screen.queryByRole("link", { name: "Ametyst" })).toBeNull();
    expect(container.querySelector("footer")?.className).not.toMatch(/border-t/);
  });

});

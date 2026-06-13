import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Features from "@/components/Features";

afterEach(() => cleanup());

describe("Features", () => {
  it("renders the section label", () => {
    render(<Features />);
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("renders all feature titles", () => {
    render(<Features />);
    [
      "One key, every service",
      "Pay only for what they use",
      "Policies that enforce themselves",
      "Spend, fully on the books",
      "The right provider for every step",
    ].forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  it("renders a feature description verbatim", () => {
    render(<Features />);
    expect(
      screen.getByText(
        "Set how much each wallet can spend, and on which services. Limits live in the wallet, not in a warning email."
      )
    ).toBeInTheDocument();
  });
});

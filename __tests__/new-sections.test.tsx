import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ValueProps from "@/components/ValueProps";
import SpendLess from "@/components/SpendLess";

afterEach(() => cleanup());

describe("ValueProps", () => {
  it("renders the section heading", () => {
    render(<ValueProps />);
    expect(
      screen.getByRole("heading", { name: "What Ametyst unlocks" })
    ).toBeInTheDocument();
  });

  it("renders all three value-prop titles", () => {
    render(<ValueProps />);
    [
      "Your agents pay per use",
      "Your agents orchestrate",
      "You set the spend policies",
    ].forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  it("renders a value-prop description verbatim", () => {
    render(<ValueProps />);
    expect(
      screen.getByText(
        "Set how much each agent can spend, and on which services. The limits are enforced by the wallet itself."
      )
    ).toBeInTheDocument();
  });
});

describe("SpendLess", () => {
  it("renders the section heading", () => {
    render(<SpendLess />);
    expect(
      screen.getByRole("heading", { name: "Spend less the more they run" })
    ).toBeInTheDocument();
  });

  it("renders the savings example", () => {
    render(<SpendLess />);
    expect(screen.getByText("With Ametyst")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Orchestrated across Exa, FullEnrich and Hunter, using a smaller model wherever a bigger one isn't needed."
      )
    ).toBeInTheDocument();
  });
});

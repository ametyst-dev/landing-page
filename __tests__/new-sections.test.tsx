import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Problem from "@/components/Problem";
import Personas from "@/components/Personas";

afterEach(() => cleanup());

describe("Problem", () => {
  it("renders the heading", () => {
    render(<Problem />);
    expect(
      screen.getByRole("heading", {
        name: "Agents can do the work. Paying for it is broken.",
      })
    ).toBeInTheDocument();
  });

  it("renders both paragraphs verbatim", () => {
    render(<Problem />);
    expect(
      screen.getByText(
        "Every service your agent calls wants its own account, its own credits, its own API key. Across a team that becomes hundreds of keys: created, pasted into Notion, shared in DMs, forgotten. One shared key in the wrong place and production goes down."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Meanwhile the AI bill grows and nobody can see it. No limits per person, no limits per agent, no view of where the money goes. Intelligence is becoming a real line on the P&L, and right now it's invisible."
      )
    ).toBeInTheDocument();
  });
});

describe("Personas", () => {
  it("renders champion column", () => {
    render(<Personas />);
    expect(
      screen.getByRole("heading", {
        name: "Your whole day already runs through agents.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Every task you ship leans on a stack of external tools: search, scraping, enrichment, models. The bottleneck is everything around them: a subscription here, a credit pack there, another account to create. With one wallet your agents reach the best provider for every step of the task and pay only for what they use."
      )
    ).toBeInTheDocument();
  });

  it("renders buyer column", () => {
    render(<Personas />);
    expect(
      screen.getByRole("heading", { name: "Every call, on the books." })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Spend per person, per agent, per service, in real time. Limits are enforced by the wallet itself, not a dashboard warning after the money is gone. Your team moves faster. You finally see the bill."
      )
    ).toBeInTheDocument();
  });
});

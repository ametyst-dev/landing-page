import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import { PlansTable } from "@/components/Pricing";
import Cta from "@/components/Cta";
import Pillars from "@/components/Pillars";
import Faq from "@/components/Faq";

afterEach(() => cleanup());

describe("TopBar", () => {
  it("has the two CTAs and no section links, Sign in or Pricing", () => {
    render(<TopBar />);
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/book");
    expect(screen.queryByRole("link", { name: "How it works" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Use cases" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Pricing" })).toBeNull();
  });
});

describe("Hero", () => {
  it("renders the spend headline, both CTAs and the five harnesses", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "See what every agent does with your money."
    );
    expect(screen.queryByText(/usage credits/)).toBeNull();
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/book");
    for (const h of ["Claude Code", "Codex", "Cursor", "OpenClaw", "OpenCode"]) expect(screen.getByText(h)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
  });

  it("has no demo under it", () => {
    render(<Hero />);
    expect(screen.queryByText(/Without the Ametyst Agent/)).toBeNull();
    expect(screen.queryByText(/With the Ametyst Agent/)).toBeNull();
  });

  it("does not list Hermes Agent", () => {
    render(<Hero />);
    expect(screen.queryByText(/Hermes/)).toBeNull();
  });

  it("never says wallet", () => {
    const { container } = render(<Hero />);
    expect(container.textContent?.toLowerCase()).not.toContain("wallet");
  });
});

describe("PlansTable (/pricing page)", () => {
  it("shows the three plans with their prices and credits", () => {
    render(<PlansTable />);
    for (const plan of ["Pay per use", "Pro", "Enterprise"]) {
      expect(screen.getByRole("columnheader", { name: plan })).toBeInTheDocument();
    }
    expect(screen.queryByRole("columnheader", { name: "Team" })).toBeNull();
    expect(screen.getByText("€20 per person per month")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.getByText(/2,400 credits every month per person/)).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Cheaper routes" })).toBeInTheDocument();
  });

  it("never uses wallet or stablecoin wording", () => {
    const { container } = render(<PlansTable />);
    expect(container.textContent).not.toMatch(/wallet|usdc|stablecoin/i);
  });
});

describe("Cta", () => {
  it("has no email form", () => {
    const { container } = render(<Cta />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});

describe("Pillars", () => {
  it("has two blocks, the spend dashboard first, then the cheaper route, with no step numbers in the titles", () => {
    render(<Pillars />);
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(["AI spend by agent.", "Same work, cheaper route."]);
    expect(screen.getByText(/spending policy/)).toBeInTheDocument();
    for (const view of ["Overview", "Agents", "People", "Policies"]) expect(screen.getByText(view)).toBeInTheDocument();
    for (const option of ["Exa", "Parallel", "Hunter", "Claude Haiku 4.5"]) expect(screen.getByText(option)).toBeInTheDocument();
    expect(screen.getAllByText("Cheaper route")).toHaveLength(1);
  });
});

describe("Faq", () => {
  it("names OpenCode, not Hermes Agent, and keeps the dashboard answer short", () => {
    const { container } = render(<Faq />);
    expect(container.textContent).toContain("OpenClaw, OpenCode and any MCP client");
    expect(container.textContent).not.toMatch(/Hermes/);
    expect(screen.getByText("What every person and agent spends, call by call.")).toBeInTheDocument();
  });
});

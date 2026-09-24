import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import { PlansTable } from "@/components/Pricing";
import Cta from "@/components/Cta";
import Pillars from "@/components/Pillars";
import RealTasks from "@/components/RealTasks";

afterEach(() => cleanup());

describe("TopBar", () => {
  it("has the two CTAs and no section links, Sign in or Pricing", () => {
    render(<TopBar />);
    expect(screen.getByRole("link", { name: "Create your workspace" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
    expect(screen.getByRole("link", { name: "Talk to the team" })).toHaveAttribute("href", "/book");
    expect(screen.queryByRole("link", { name: "How it works" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Use cases" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Pricing" })).toBeNull();
  });
});

describe("Hero", () => {
  it("renders the angle 3 headline, both CTAs and the three harnesses", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Your agent workflows break quietly."
    );
    expect(screen.queryByText(/usage credits/)).toBeNull();
    expect(screen.getByRole("link", { name: "Talk to the team" })).toHaveAttribute("href", "/book");
    for (const h of ["Claude Code", "Codex", "Cursor"]) expect(screen.getByText(h)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create your workspace" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
  });

  it("has no demo under it", () => {
    render(<Hero />);
    expect(screen.queryByText(/Without the Ametyst Agent/)).toBeNull();
    expect(screen.queryByText(/With the Ametyst Agent/)).toBeNull();
  });

  it("never says wallet", () => {
    const { container } = render(<Hero />);
    expect(container.textContent?.toLowerCase()).not.toContain("wallet");
  });
});

describe("PlansTable (/pricing page)", () => {
  it("shows the three plans with their prices and credits", () => {
    render(<PlansTable />);
    for (const plan of ["Pay per use", "Pro", "Team"]) {
      expect(screen.getByRole("columnheader", { name: plan })).toBeInTheDocument();
    }
    expect(screen.getByText("€20 per month")).toBeInTheDocument();
    expect(screen.getByText(/€25 per member per month/)).toBeInTheDocument();
    expect(screen.getByText(/2,400 credits every month/)).toBeInTheDocument();
    expect(screen.getByText(/3,000 credits every month per member/)).toBeInTheDocument();
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
  it("has two blocks, the Ametyst Agent first, then the workspace, with no step numbers and no policy card", () => {
    const { container } = render(<Pillars />);
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual([
      "The Ametyst Agent watches your workflows, all the time.",
      "One workspace: every tool, and a policy for each workflow.",
    ]);
    for (const n of ["01", "02", "03"]) expect(screen.queryByText(n)).toBeNull();
    expect(container.textContent).not.toMatch(/in every run/i);
    for (const app of ["Notion", "Google Drive", "Granola", "Slack", "GitHub"]) expect(screen.getByText(app)).toBeInTheDocument();
    expect(screen.getByText(/spending policy/)).toBeInTheDocument();
    expect(screen.queryByText("denied")).toBeNull();
  });
});

describe("RealTasks", () => {
  it("shows four workflows with one result line each and no In / Out labels", () => {
    const { container } = render(<RealTasks />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(container.querySelector("dt")).toBeNull();
    expect(screen.getByText("Sales team")).toBeInTheDocument();
  });
});

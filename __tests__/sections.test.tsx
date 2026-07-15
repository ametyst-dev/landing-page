import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Waitlist from "@/components/Waitlist";
import EndStrip from "@/components/EndStrip";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("TopBar", () => {
  it("renders Book a discovery call link to /book and no Skill.md", () => {
    render(<TopBar />);
    const cta = screen.getByRole("link", { name: "Book a discovery call" });
    expect(cta).toHaveAttribute("href", "/book");
    expect(screen.queryByText("Skill.md")).toBeNull();
  });
});

describe("Hero", () => {
  it("renders locked copy and CTAs", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Let your agents run on their own — spending only what you allow",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ametyst gives each agent its own wallet with the spending policies you set, then orchestrates across models and tools to pick the right one for each step."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a discovery call" })).toHaveAttribute(
      "href",
      "/book"
    );
    expect(screen.getByRole("button", { name: "Join the waiting list" })).toBeInTheDocument();
  });
});

describe("HowItWorks", () => {
  it("renders 3 steps with locked copy", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("heading", { name: "How it works" })).toBeInTheDocument();
    expect(screen.getByText("Create your workspace.")).toBeInTheDocument();
    expect(screen.getByText("Connect your agents.")).toBeInTheDocument();
    expect(screen.getByText("Start spending.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Set up your workspace in the Ametyst web app, fund your wallet, and set your spending limits."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Link your agents with one command using the Ametyst CLI.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your agents run skills and loops, paying per use within your limits.")
    ).toBeInTheDocument();
  });
});

describe("Waitlist", () => {
  it("renders locked copy and submits email to /api/waitlist", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<Waitlist />);
    expect(
      screen.getByRole("heading", { name: "Give your agents real autonomy." })
    ).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.submit(screen.getByRole("button", { name: "Join the waiting list" }).closest("form")!);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/waitlist",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("test@example.com"),
        })
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText("You're on the list! We'll be in touch soon.")
      ).toBeInTheDocument();
    });
  });
});

describe("EndStrip", () => {
  it("renders footer tagline", () => {
    render(<EndStrip />);
    expect(
      screen.getByText("Autonomy for your agents. Built in Europe. © 2026 Ametyst.")
    ).toBeInTheDocument();
  });
});

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
      screen.getByRole("heading", { name: "One key. Every AI service." })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use."
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
  it("renders 3 wallet steps with locked copy and no skill/setup-mode", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("heading", { name: "How it works" })).toBeInTheDocument();
    expect(screen.getByText("Create your wallet.")).toBeInTheDocument();
    expect(screen.getByText("Set the policies.")).toBeInTheDocument();
    expect(screen.getByText("Connect your agents to the wallet.")).toBeInTheDocument();
    expect(
      screen.getByText("Open your workspace and create a wallet for your agents.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Decide how much the wallet can spend, and on which services.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "One command links them. From there they pay for what they use, within policy."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/skill/i)).toBeNull();
    expect(screen.queryByText(/setup/i)).toBeNull();
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
      screen.getByRole("heading", { name: "Give your agents a wallet." })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a discovery call" })).toHaveAttribute(
      "href",
      "/book"
    );

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
      screen.getByText("Wallets for agents. Built in Europe. © 2026 Ametyst.")
    ).toBeInTheDocument();
  });
});

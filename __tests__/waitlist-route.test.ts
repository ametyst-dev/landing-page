// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/waitlist/route";

const makeReq = (body: unknown) =>
  new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.stubEnv("GOOGLE_SCRIPT_URL", "https://script.example/mock");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("ok", { status: 200 }))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("accepts a valid email", async () => {
    const res = await POST(makeReq({ email: "user@example.com" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith(
      "https://script.example/mock",
      expect.objectContaining({
        body: expect.stringContaining("user@example.com"),
      })
    );
  });

  it("rejects missing email", async () => {
    const res = await POST(makeReq({}));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid email" });
  });

  it("rejects invalid email", async () => {
    const res = await POST(makeReq({ email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("short-circuits when honeypot is filled", async () => {
    const res = await POST(
      makeReq({ email: "user@example.com", honeypot: "bot" })
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 500 when GOOGLE_SCRIPT_URL is missing", async () => {
    vi.stubEnv("GOOGLE_SCRIPT_URL", "");
    const res = await POST(makeReq({ email: "user@example.com" }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Missing server config" });
  });
});

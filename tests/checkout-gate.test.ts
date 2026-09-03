import { afterEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/checkout/setup/route";

const originalMode = process.env.OMNIARB_MODE;

afterEach(() => {
  if (originalMode === undefined) {
    delete process.env.OMNIARB_MODE;
  } else {
    process.env.OMNIARB_MODE = originalMode;
  }
});

describe("checkout setup gate", () => {
  it("rejects crafted checkout requests in PRE_LAUNCH", async () => {
    process.env.OMNIARB_MODE = "PRE_LAUNCH";

    const response = await POST();

    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "COMMERCIAL_DISABLED",
        message: "Le attivazioni non sono ancora disponibili.",
      },
    });
  });

  it("remains fail-closed if COMMERCIAL is set before OMNI-004 exists", async () => {
    process.env.OMNIARB_MODE = "COMMERCIAL";

    const response = await POST();

    expect(response.status).toBe(501);
    await expect(response.json()).resolves.toMatchObject({
      error: { code: "COMMERCIAL_NOT_IMPLEMENTED" },
    });
  });
});

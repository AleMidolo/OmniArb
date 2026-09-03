import { describe, expect, it, vi } from "vitest";
import { analyticsEvents, disabledAnalyticsAdapter } from "@/modules/analytics/analytics";

describe("privacy-safe analytics baseline", () => {
  it("exposes only the approved event allowlist", () => {
    expect(analyticsEvents).toEqual([
      "landing_view",
      "pricing_view",
      "trial_cta_clicked",
      "trial_started",
      "onboarding_completed",
    ]);
  });

  it("performs no external work before privacy approval", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await disabledAnalyticsAdapter.track("landing_view");

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

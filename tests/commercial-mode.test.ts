import { describe, expect, it } from "vitest";
import { getDeploymentMode, isCommercialMode } from "@/lib/config/commercial-mode";

describe("commercial deployment mode", () => {
  it("fails closed to PRE_LAUNCH when configuration is absent", () => {
    expect(getDeploymentMode({})).toBe("PRE_LAUNCH");
    expect(isCommercialMode({})).toBe(false);
  });

  it("accepts the two documented deployment modes", () => {
    expect(getDeploymentMode({ OMNIARB_MODE: "PRE_LAUNCH" })).toBe("PRE_LAUNCH");
    expect(getDeploymentMode({ OMNIARB_MODE: "COMMERCIAL" })).toBe("COMMERCIAL");
  });

  it("rejects unexpected values instead of enabling commerce", () => {
    expect(() => getDeploymentMode({ OMNIARB_MODE: "enabled" })).toThrow(
      "OMNIARB_MODE must be PRE_LAUNCH or COMMERCIAL",
    );
  });
});

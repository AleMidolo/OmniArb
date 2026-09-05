import { describe, expect, it } from "vitest";
import { findActionPinViolations } from "../scripts/check-action-pins.mjs";

const pinnedSha = "3d3c42e5aac5ba805825da76410c181273ba90b1";

describe("immutable GitHub Action pin guard", () => {
  it("rejects mutable mapping-style uses references", () => {
    const source = `steps:\n  uses: actions/checkout@v4\n`;

    expect(findActionPinViolations(source, "mapping.yml")).toEqual([
      "mapping.yml:2: actions/checkout@v4",
    ]);
  });

  it("rejects mutable inline list-entry uses references", () => {
    const source = `steps:\n  - uses: actions/checkout@v4\n`;

    expect(findActionPinViolations(source, "inline.yml")).toEqual([
      "inline.yml:2: actions/checkout@v4",
    ]);
  });

  it("accepts full immutable SHAs in both supported YAML forms", () => {
    const source = `steps:\n  uses: actions/checkout@${pinnedSha}\n  - uses: \"actions/setup-node@${pinnedSha}\"\n`;

    expect(findActionPinViolations(source)).toEqual([]);
  });

  it("ignores local and docker actions in both YAML forms", () => {
    const source = `steps:\n  uses: ./local-action\n  - uses: docker://alpine:3.22\n`;

    expect(findActionPinViolations(source)).toEqual([]);
  });

  it("rejects quoted mutable remote references", () => {
    const source = `steps:\n  - uses: 'actions/checkout@main' # mutable branch\n`;

    expect(findActionPinViolations(source, "quoted.yml")).toEqual([
      "quoted.yml:2: actions/checkout@main",
    ]);
  });
});

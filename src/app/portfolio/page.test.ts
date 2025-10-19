import { describe, expect, test } from "vitest";
import * as portfolioPage from "./page";
import type { Metadata } from "next";

describe("/portfolio page", () => {
  test("exports metadata with page-type portfolio", () => {
    const m = (
      portfolioPage as unknown as {
        metadata: Metadata;
      }
    ).metadata;
    expect(m).toBeDefined();
    expect(m.title).toBe("포트폴리오");
    expect(m.other?.["page-type"]).toBe("portfolio");
  });

  test("default export is a function component", () => {
    expect(typeof portfolioPage.default).toBe("function");
  });
});

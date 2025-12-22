import { describe, expect, it } from "vitest";

import { collectHeadingInfo } from "./FloatingToc";

describe("collectHeadingInfo", () => {
  it("extracts headings and filters out toc heading", () => {
    const root = document.createElement("article");

    const section1 = document.createElement("section");
    const heading1 = document.createElement("h2");
    heading1.id = "intro";
    heading1.textContent = "Introduction";
    section1.appendChild(heading1);
    root.appendChild(section1);

    const tocSection = document.createElement("section");
    const tocHeading = document.createElement("h2");
    tocHeading.id = "toc";
    tocHeading.textContent = "목차";
    tocSection.appendChild(tocHeading);
    root.appendChild(tocSection);

    const section2 = document.createElement("section");
    const heading2 = document.createElement("h3");
    heading2.id = "details";
    heading2.textContent = "Details";
    section2.appendChild(heading2);
    root.appendChild(section2);

    const headings = collectHeadingInfo(root);

    expect(headings.map((heading) => heading.id)).toEqual([
      "intro",
      "details",
    ]);
    expect(headings[0]?.level).toBe(2);
    expect(headings[1]?.section).toBe(section2);
  });

  it("falls back to heading element when no section exists", () => {
    const root = document.createElement("article");
    const heading = document.createElement("h4");
    heading.id = "standalone";
    heading.textContent = "Standalone";
    root.appendChild(heading);

    const headings = collectHeadingInfo(root);

    expect(headings).toHaveLength(1);
    expect(headings[0]?.section).toBe(heading);
  });
});

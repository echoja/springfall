import type { Node } from "slate";

import { getPendingImages } from "./upload-image-after-parse5";

describe("getPendingImages", () => {
  test("기본 동작", () => {
    const fixture: Node[] = [
      {
        children: [
          {
            text: "123",
            type: "TEXT",
          },
          {
            text: "h1",
            type: "TEXT",
          },
        ],
        type: "PARAGRAPH",
      },
      {
        children: [
          {
            text: "",
            type: "TEXT",
          },
        ],
        id: "1234",
        src: "ho",
        type: "IMAGE_UPLOAD_PLACEHOLDER",
      },
    ];
    const result = getPendingImages(fixture);

    expect(result).toMatchInlineSnapshot(`
      Map {
        "1234" => {
          "path": [
            1,
          ],
          "src": "ho",
        },
      }
    `);
  });
});

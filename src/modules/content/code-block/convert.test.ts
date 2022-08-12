import type { RefractorElement, RefractorRoot, Text } from "refractor";
import { describe } from "vitest";

import type { ICodeLine } from "../types";

import { getElement, getLines, getText, unifyLine } from "./convert";

describe("convert", () => {
  describe("getText", () => {
    test("\\n이 있을 때 잘 분리되어야 함", () => {
      const node: Text = {
        type: "text",
        value: "abc\ndef",
      };
      const result = getText(node);
      expect(result).toMatchSnapshot();
    });

    test("\\n이 앞에 있을 때 잘 분리되어야 함", () => {
      const node: Text = {
        type: "text",
        value: "\ndef",
      };
      const result = getText(node);
      expect(result).toMatchSnapshot();
    });

    test("\\n이 뒤에 있을 때 잘 분리되어야 함", () => {
      const node: Text = {
        type: "text",
        value: "abcdef\n",
      };
      const result = getText(node);
      expect(result).toMatchSnapshot();
    });

    test("\\n이 없을 때는 그대로 리턴되어야 함", () => {
      const node: Text = {
        type: "text",
        value: "abcdef",
      };
      const result = getText(node);
      expect(result).toMatchSnapshot();
    });
  });

  describe("getElement", () => {
    test("children 이 없을 떄", () => {
      const node: RefractorElement = {
        type: "element",
        tagName: "span",
        children: [],
      };
      const result = getElement(node);

      expect(result).toMatchSnapshot();
    });

    test("children 내에 \n이 없을 때", () => {
      const node: RefractorElement = {
        type: "element",
        tagName: "span",
        children: [
          {
            type: "text",
            value: "abc",
          },
          {
            type: "text",
            value: "dev",
          },
        ],
      };
      const result = getElement(node);
      expect(result).toMatchSnapshot();
    });

    test("element 안에 \\n 이 포함된 Text 가 있을 떄 제대로 동작해야 함", () => {
      const node: RefractorElement = {
        type: "element",
        tagName: "span",
        children: [
          {
            type: "text",
            value: "abc",
          },
          {
            type: "text",
            value: "def\nghi",
          },
          {
            type: "text",
            value: "jkl",
          },
        ],
      };
      const result = getElement(node);
      expect(result).toMatchSnapshot();
    });

    test("중첩된 경우", () => {
      const node: RefractorElement = {
        type: "element",
        tagName: "span1",
        children: [
          {
            type: "element",
            tagName: "span2",
            children: [
              {
                type: "element",
                tagName: "span3",
                children: [
                  {
                    type: "text",
                    value: "abc\ndef",
                  },
                ],
              },
            ],
          },
        ],
      };
      const result = getElement(node);
      expect(result).toMatchSnapshot();
    });

    test("중첩되었을 떄 마지막에 \\n이 있을 때", () => {
      const node: RefractorElement = {
        type: "element",
        tagName: "span1",
        children: [
          {
            type: "element",
            tagName: "span2",
            children: [
              {
                type: "element",
                tagName: "span3",
                children: [
                  {
                    type: "text",
                    value: "abcdef\n",
                  },
                ],
              },
            ],
          },
        ],
      };
      const result = getElement(node);
      expect(result).toMatchSnapshot();
    });

    test("\\n이 여러 개 있을 때", () => {
      const node: RefractorElement = {
        type: "element",
        tagName: "span1",
        children: [
          {
            type: "text",
            value: "abc\ndef",
          },
          {
            type: "element",
            tagName: "span2",
            children: [
              {
                type: "text",
                value: "ghi\njkl",
              },
            ],
          },
        ],
      };
      const result = getElement(node);
      expect(result).toMatchSnapshot();
    });
  });

  describe("getLines", () => {
    test("제대로 동작해야 함", () => {
      const root: RefractorRoot = {
        type: "root",
        children: [
          {
            type: "element",
            tagName: "span",
            properties: {
              className: ["token", "keyword"],
            },
            children: [
              {
                type: "text",
                value: "let",
              },
            ],
          },
          {
            type: "text",
            value: " a ",
          },
          {
            type: "element",
            tagName: "span",
            properties: {
              className: ["token", "operator"],
            },
            children: [
              {
                type: "text",
                value: "=",
              },
            ],
          },
          {
            type: "text",
            value: " ",
          },
          {
            type: "element",
            tagName: "span",
            properties: {
              className: ["token", "template-string"],
            },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: {
                  className: ["token", "template-punctuation", "string"],
                },
                children: [
                  {
                    type: "text",
                    value: "`",
                  },
                ],
              },
              {
                type: "element",
                tagName: "span",
                properties: {
                  className: ["token", "string"],
                },
                children: [
                  {
                    type: "text",
                    value: "\n   sdkfj\n",
                  },
                ],
              },
              {
                type: "element",
                tagName: "span",
                properties: {
                  className: ["token", "template-punctuation", "string"],
                },
                children: [
                  {
                    type: "text",
                    value: "`",
                  },
                ],
              },
            ],
          },
          {
            type: "element",
            tagName: "span",
            properties: {
              className: ["token", "punctuation"],
            },
            children: [
              {
                type: "text",
                value: ";",
              },
            ],
          },
        ],
      };

      expect(getLines(root)).toMatchSnapshot();
    });
  });

  describe("unifyLine", () => {
    test("text, element가 섞여 있을 경우 통일되어야 함", () => {
      const line: ICodeLine = {
        type: "CODE_LINE",
        children: [
          {
            type: "TEXT",
            text: "hi",
          },
          {
            type: "CODE_ELEMENT",
            tagName: "span",
            children: [{ type: "TEXT", text: "my name is" }],
          },
          {
            type: "TEXT",
            text: "taehoon",
          },
        ],
      };

      const result = unifyLine(line);
      expect(result).toMatchSnapshot();
    });
  });
});

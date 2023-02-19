import type { RefractorElement, RefractorRoot, Text } from "refractor";
import { refractor } from "refractor";
import shLang from "refractor/lang/bash";
import cppLang from "refractor/lang/cpp";
import cssLang from "refractor/lang/css";
import htmlLang from "refractor/lang/markup";
import pythonLang from "refractor/lang/python";
import rustLang from "refractor/lang/rust";
import tsxLang from "refractor/lang/tsx";

import type {
  ICodeBlock,
  ICodeElement,
  ICodeLine,
  IText,
  Language,
} from "../types";
import { deepclone } from "@common/util";

import codeNodeToString from "./code-node-to-string";

refractor.register(tsxLang);
refractor.register(rustLang);
refractor.register(pythonLang);
refractor.register(htmlLang);
refractor.register(shLang);
refractor.register(cppLang);
refractor.register(cssLang);

export function getText(node: Text):
  | {
      left: null | Text;
      reachedNewline: true;
      right: null | Text;
    }
  | { reachedNewline: false; node: null | Text } {
  const resultNode = deepclone(node);
  const newlineIndex = node.value.indexOf("\n");
  if (newlineIndex === -1) {
    return {
      node: resultNode,
      reachedNewline: false,
    };
  }
  const beforeNewline = resultNode.value.substring(0, newlineIndex);
  const afterNewline = resultNode.value.substring(newlineIndex + 1);
  resultNode.value = beforeNewline;
  const restNode = deepclone(node);
  restNode.value = afterNewline;
  return {
    left: beforeNewline === "" ? null : resultNode,
    reachedNewline: true,
    right: afterNewline === "" ? null : restNode,
  };
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function getElement(node: RefractorElement):
  | {
      left: RefractorElement | null;
      reachedNewline: true;
      right: RefractorElement | null;
    }
  | {
      node: RefractorElement | null;
      reachedNewline: false;
    } {
  const result: {
    left: RefractorElement | null;
    reachedNewline: true;
    right: RefractorElement | null;
  } = {
    left: null,
    reachedNewline: true,
    right: null,
  };

  result.left?.children.slice();

  const leftChildren: (RefractorElement | Text)[] = [];

  const noNewline = node.children.every((child, index) => {
    const childResult =
      child.type === "element" ? getElement(child) : getText(child);

    if (childResult.reachedNewline && childResult.left) {
      leftChildren.push(childResult.left);
    } else if (!childResult.reachedNewline && childResult.node) {
      leftChildren.push(childResult.node);
    }

    if (!childResult.reachedNewline) {
      return true;
    }

    const rightNode = deepclone(node);
    const leftNode = deepclone(node);
    const rightChildren = node.children.slice(index + 1);
    if (childResult.right) {
      rightChildren.unshift(childResult.right);
    }
    leftNode.children = leftChildren;
    rightNode.children = rightChildren;

    result.reachedNewline = true;
    result.left = leftNode.children.length !== 0 ? leftNode : null;
    result.right = rightNode.children.length !== 0 ? rightNode : null;

    return false;
  });

  if (noNewline) {
    return {
      reachedNewline: false,
      node: deepclone(node),
    };
  }

  return result;
}

export function convertElement(
  node: RefractorElement | Text
): ICodeElement | IText {
  if (node.type === "element") {
    return {
      type: "CODE_ELEMENT",
      tagName: "span",
      children: node.children.map(convertElement),
      properties: deepclone(node.properties),
    };
  }
  return {
    type: "TEXT",
    text: node.value,
  };
}

export function getLine(root: RefractorRoot): {
  children: (RefractorElement | Text)[];
  reachedNewline: boolean;
  restRoot: RefractorRoot | null;
} {
  const result: ReturnType<typeof getLine> = {
    children: [],
    reachedNewline: false,
    restRoot: deepclone(root),
  };

  const noNewline = root.children.every((child, index) => {
    const childResult =
      child.type === "element" ? getElement(child) : getText(child);

    if (childResult.reachedNewline && childResult.left) {
      result.children.push(childResult.left);
    } else if (!childResult.reachedNewline && childResult.node) {
      result.children.push(childResult.node);
    }

    if (!childResult.reachedNewline) {
      return true;
    }

    const newChildren = root.children.slice(index + 1);
    if (childResult.right) {
      newChildren.unshift(childResult.right);
    }
    if (result.restRoot) {
      result.restRoot.children = newChildren;
    }
    result.reachedNewline = true;

    return false;
  });

  if (noNewline) {
    return {
      children: deepclone(root.children),
      reachedNewline: false,
      restRoot: null,
    };
  }

  return result;
}

export function getLines(root: RefractorRoot) {
  const result: (RefractorElement | Text)[][] = [];

  let line: ReturnType<typeof getLine> = {
    children: [],
    reachedNewline: true,
    restRoot: root,
  };
  while (line.restRoot) {
    line = getLine(line.restRoot);
    result.push(line.children);
  }

  return result;
}

export function unifyChild(element: ICodeElement | IText): ICodeElement {
  if (element.type === "TEXT") {
    return {
      type: "CODE_ELEMENT",
      children: [deepclone(element)],
      tagName: "span",
      properties: {
        className: ["token text-wrapper"],
      },
    };
  }

  const isAllText = element.children.every((child) => child.type === "TEXT");
  if (isAllText) {
    return element;
  }
  return {
    ...element,
    children: element.children.map(unifyChild),
  };
}

export function unifyLine(line: ICodeLine): ICodeLine {
  return {
    ...line,
    children: line.children.map(unifyChild),
  };
}

export function unifyCodeBlock(codeBlock: ICodeBlock): ICodeBlock {
  return {
    ...codeBlock,
    children: codeBlock.children.map(unifyLine),
  };
}

export function convertRefactorToCodeBlock(
  root: RefractorRoot,
  lang: Language
): ICodeBlock {
  const lines = getLines(root);
  const codeLines: ICodeLine[] = lines.map((line) => {
    return {
      type: "CODE_LINE",
      children: line.map(convertElement),
    };
  });

  const codeBlock: ICodeBlock = {
    type: "CODE_BLOCK",
    children: codeLines,
    lang,
    showCopy: true,
    showLines: false,
  };

  return unifyCodeBlock(codeBlock);
}

export function createCodeBlock(value: string, language: Language) {
  let formatted: RefractorRoot;
  if (language === "plaintext") {
    formatted = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "span",
          properties: {
            className: ["token", "text-wrapper"],
          },
          children: [
            {
              type: "text",
              value,
            },
          ],
        },
      ],
    };
  } else {
    formatted = refractor.highlight(value, language);
  }
  return convertRefactorToCodeBlock(formatted, language);
}

export function convert(source: ICodeBlock, language: Language) {
  const content = codeNodeToString(source);
  return createCodeBlock(content, language);
}

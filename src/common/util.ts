import rfdc from "rfdc";

import type {
  ICodeBlock,
  ICodeBlockElement,
  ICodeBlockText,
  IText,
} from "../modules/content/types";

/**
 * query(`string | string[] | undefined`)를 number로 변환합니다.
 * 실패시 NaN을 반환합니다.
 */
export function parseQueryToNumber(
  queryVar: string | string[] | undefined
): number {
  return Number.parseInt(
    (Array.isArray(queryVar) ? queryVar[0] : queryVar) ?? "",
    10
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function noopFunction(..._args: any): any {
  // noop
}

export const deepclone = rfdc();

export function codeNodeToString(
  node: ICodeBlock | ICodeBlockElement | ICodeBlockText | IText,
  acc: string[]
) {
  if (node.type === "CODE_BLOCK_TEXT" || node.type === "TEXT") {
    acc.push(node.text);
  } else if (node.type === "CODE_BLOCK_ELEMENT" || node.type === "CODE_BLOCK") {
    // newline 일 경우
    if (
      node.children.length === 1 &&
      node.children[0]?.type === "CODE_BLOCK_TEXT" &&
      node.children[0]?.isNewline
    ) {
      acc.push("\n");
    } else {
      node.children.forEach((child) => codeNodeToString(child, acc));
    }
  }
}

export function convertCodeBlockToString(node: ICodeBlock) {
  const result: string[] = [];
  codeNodeToString(node, result);
  return result.join("");
}

import type {
  ICodeBlock,
  ICodeElement,
  ICodeBlockText,
  IText,
  CreatePostInput,
} from "@modules/content/types";
import { anonClient } from "@modules/supabase/supabase";
import type { Post } from "@modules/supabase/supabase";
import type { NextApiHandler } from "next";
import rfdc from "rfdc";
import type { Element } from "slate";

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
  node: ICodeBlock | ICodeElement | ICodeBlockText | IText,
  acc: string[]
) {
  if (node.type === "CODE_BLOCK_TEXT" || node.type === "TEXT") {
    acc.push(node.text);
  } else if (node.type === "CODE_ELEMENT" || node.type === "CODE_BLOCK") {
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

export const authGuard = (
  handler: NextApiHandler,
  message = "unauthorized"
): NextApiHandler => {
  return async (req, res) => {
    const { user } = await anonClient.auth.api.getUserByCookie(req);
    if (user) {
      return handler(req, res);
    }

    res.status(401);
    res.send(message);
    return undefined;
  };
};

export function getDefaultNodeProps(
  type: Element["type"]
): Omit<Partial<Element>, "type" | "children"> {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case "CODE_BLOCK": {
      const result: ICodeBlock = {
        type: "CODE_BLOCK",
        children: [],
        lang: "tsx",
        showCopy: true,
        showLines: true,
      };
      return result;
    }
    default:
      return {};
  }
}

export function getCreatePostInput(post: Post): CreatePostInput {
  return {
    title: post.title,
    content: post.content,
    published: post.published,
    summary: post.summary,
  };
}

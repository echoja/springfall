import type { NextApiRequest } from "next";
import rfdc from "rfdc";
import type { Element } from "slate";

import type { CreatePostInput, ICodeBlock } from "@modules/content/types";
import type { Post } from "@modules/supabase/supabase";

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

export async function getJsonFromBody<T>(
  req: NextApiRequest
): Promise<Partial<T>> {
  const reader = req.body?.getReader();
  if (!reader) {
    throw new Error("No reader");
  }

  const decoder = new TextDecoder();
  let body = "";
  const read = async () => {
    const result = await reader.read();
    if (result.done) {
      return;
    }
    body += decoder.decode(result.value, { stream: true });
    await read();
  };

  await read();
  body += decoder.decode();

  return JSON.parse(body) as T;
}

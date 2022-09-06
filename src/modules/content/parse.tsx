import type { Post } from "@modules/supabase/supabase";
import type { Element, Text } from "slate";

import type { ContentType } from "./types";

// TODO: Optional Element 타입 생성
// TODO: 각 element, text마다 parser 추가
export const parseNode = (node: Element | Text): Element | Text => {
  const { type } = node;
  if (!type) {
    return {
      text: "",
      ...(node as Text),
      type: "TEXT",
    };
  }

  if (type === "TEXT" || type === "ICON") {
    return node;
  }

  if (type === "IMAGE_CAPTION") {
    return {
      ...node,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: node.children.map((child) => parseNode(child)) as any,
      width: node.width || 3000,
    };
  }

  if (node.children) {
    return {
      ...node,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: node.children.map((child) => parseNode(child)) as any,
    };
  }

  return {
    type: "TEXT",
    text: "",
  };
};

// TODO: Optional Element 타입 생성
export const paseContent = (content: ContentType): ContentType => {
  return {
    data: content.data.map((element) => parseNode(element)),
  };
};

export const parsePost = (post: Post): Post => {
  return {
    ...post,
    content: paseContent(post.content),
  };
};

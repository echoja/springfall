import type { Post } from "@prisma/client";

import type { ContentType, SerializedPost } from "./types";

export function serializePost(post: Post): SerializedPost {
  return {
    ...post,
    updatedAt: post.updatedAt.toISOString(),
    createdAt: post.updatedAt.toISOString(),
    content: post.content as ContentType,
  };
}

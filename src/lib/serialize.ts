import type {
  SerializedPost,
  ContentType,
  CreatePostInput,
} from "@modules/content/types";
import type { Post } from "@prisma/client";

export function serializePost(post: Post): SerializedPost {
  return {
    ...post,
    updatedAt: post.updatedAt.toISOString(),
    createdAt: post.updatedAt.toISOString(),
    content: post.content as ContentType,
  };
}

export function convertPostSerializedToCreate(
  post: SerializedPost
): CreatePostInput {
  return {
    authorId: post.authorId,
    title: post.title,
    content: post.content,
    published: post.published,
    summary: post.summary,
  };
}

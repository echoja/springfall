import type { Post } from "./supabase";
import type { CreatePostInput } from "./types";

export function getCreatePostInput(post: Post): CreatePostInput {
  return {
    title: post.title,
    content: post.content,
    published: post.published,
    summary: post.summary,
  };
}

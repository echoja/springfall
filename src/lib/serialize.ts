import type { CreatePostInput } from "@modules/content/types";
import type { Post } from "@modules/supabase/supabase";

export function getCreatePostInput(post: Post): CreatePostInput {
  return {
    title: post.title,
    content: post.content,
    published: post.published,
    summary: post.summary,
  };
}

import { getCreatePostInput } from "@common/client-only-util";

import { requestWithAuth } from "./auth/request-with-auth";
import type { Post } from "./supabase/supabase";
import { getAnonClient } from "./supabase/supabase";

export const revalidate = async (id: number) => {
  return requestWithAuth("/api/revalidate", {
    body: JSON.stringify({
      revalidate_url: `/post/${id}`,
    }),
  });
};

export const updatePost = async (id: number, post: Post) => {
  return getAnonClient()
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();
};

export const saveNewPost = async (userId: string, post: Post) => {
  return getAnonClient()
    .from("posts")
    .insert({ ...getCreatePostInput(post), user_id: userId })
    .select()
    .single();
};

import { authGuard, parseQueryToNumber } from "@common/util";
import type { Post } from "@modules/supabase/supabase";
import { servicePosts } from "@modules/supabase/supabase-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const editPostInput = req.body as Post;
  const id = parseQueryToNumber(req.query.id);

  const { data: post } = await servicePosts()
    .update(editPostInput)
    .eq("id", id)
    .single();

  await res.revalidate(`/post/${id}`);
  res.statusCode = 200;
  res.json(post);
});

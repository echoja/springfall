import { parseQueryToNumber } from "@common/util";
import { authGuard } from "@lib/api-guard";
import type { Post } from "@lib/supabase";
import { servicePosts } from "@lib/supabase-service";
import { parseQueryToNumber } from "@lib/util";
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

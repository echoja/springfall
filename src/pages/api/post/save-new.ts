import { authGuard } from "@lib/api-guard";
import supabase from "@lib/supabase";
import type { CreatePostInput } from "@lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const createPostInput = req.body as CreatePostInput;
  const s = supabase.auth.session();

  const post = await prisma.post.create({
    data: {
      ...createPostInput,
      authorId: s?.user?.id,
    },
  });

  await res.revalidate(`/post/${post.id}`);
  res.statusCode = 200;
  res.json(post);
});

import type { Post } from "@lib/supabase";
import { serviceClient, servicePosts } from "@lib/supabase-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, token } = await serviceClient.auth.api.getUserByCookie(req);
  if (!user || !token) {
    res.status(401);
    res.send("Unauthorized!");
    return;
  }

  const createPostInput = req.body as Post;

  const result = await servicePosts().insert({
    ...createPostInput,
    user_id: user.id,
  });

  if (result.error) {
    res.status(400);
    res.send(result.error);
    return;
  }

  const id = result.body?.[0]?.id;
  if (id) {
    await res.revalidate(`/post/${id}`);
  }

  res.statusCode = 200;
  res.json(result.body);
};

import type { Post } from "@modules/supabase/supabase";
import {
  serviceClient,
  servicePosts,
} from "@modules/supabase/supabase-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, token } = await serviceClient.auth.api.getUserByCookie(req);
  if (!user || !token) {
    res.status(401);
    res.send("Unauthorized!");
    return;
  }

  const createPostInput = req.body as Post;

  const result = await servicePosts()
    .insert({
      ...createPostInput,
      user_id: user.id,
    })
    .single();

  if (result.error) {
    res.status(400);
    res.send(result.error);
    return;
  }

  const id = result.body?.id;
  if (id) {
    try {
      await res.revalidate(`/post/${id}`);
    } catch (e) {
      // TODO: 운영 환경에서 존재하지 않는 주소에 대해 발생하는 오류 처리해야함
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  res.statusCode = 200;
  res.json(result.body);
};

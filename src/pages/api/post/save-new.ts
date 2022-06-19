import { authGuard } from "@lib/api-guard";
import prisma from "@lib/prisma";
import type { CreatePostInput } from "@lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const createPostInput = req.body as CreatePostInput;
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("");
    return;
  }

  const post = await prisma.post.create({
    data: {
      ...createPostInput,
      authorId: session.user.id,
    },
  });

  await res.unstable_revalidate(`/post/${post.id}`);
  res.statusCode = 200;
  res.json(post);
});

import { authGuard } from "@lib/api-guard";
import prisma from "@lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });

  res.statusCode = 200;
  res.json(post);
});

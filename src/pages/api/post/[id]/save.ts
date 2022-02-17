import prisma from "@lib/prisma";
import { roughlyParseQueryToNumber } from "@lib/util";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function save(req: NextApiRequest, res: NextApiResponse) {
  const post = await prisma.post.update({
    where: {
      id: roughlyParseQueryToNumber(req.query.id),
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });

  res.statusCode = 200;
  res.json(post);
}

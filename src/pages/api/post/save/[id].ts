import { authGuard } from "@lib/api-guard";
import prisma from "@lib/prisma";
import type { SerializedPost } from "@lib/types";
import { parseQueryToNumber } from "@lib/util";
import type { NextApiRequest, NextApiResponse } from "next";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const editPostInput = req.body as SerializedPost;
  const result = await prisma.post.update({
    where: {
      id: parseQueryToNumber(req.query.id),
    },
    data: editPostInput,
  });

  res.statusCode = 200;
  res.json(result);
});

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { authGuard } from "@lib/api-guard";
import type { NextApiRequest, NextApiResponse } from "next";

const hello = authGuard((req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
});

export default hello;

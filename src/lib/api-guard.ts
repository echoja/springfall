import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

export const authGuard = (
  handler: NextApiHandler,
  message = "unauthorized"
): NextApiHandler => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (session) {
      return handler(req, res);
    }

    res.status(401);
    res.send(message);
    return undefined;
  };
};

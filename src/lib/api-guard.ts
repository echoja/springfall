import { anonClient } from "@lib/supabase";
import type { NextApiHandler } from "next";

export const authGuard = (
  handler: NextApiHandler,
  message = "unauthorized"
): NextApiHandler => {
  return async (req, res) => {
    const { user } = await anonClient.auth.api.getUserByCookie(req);
    if (user) {
      return handler(req, res);
    }

    res.status(401);
    res.send(message);
    return undefined;
  };
};

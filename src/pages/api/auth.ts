import { anonClient } from "@modules/supabase/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  anonClient.auth.api.setAuthCookie(req, res);
};

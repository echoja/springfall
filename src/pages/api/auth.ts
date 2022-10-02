import { getAnonClient } from "@modules/supabase/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  getAnonClient().auth.api.setAuthCookie(req, res);
};

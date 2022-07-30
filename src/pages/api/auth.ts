import supabase from "@lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the auth cookie.
  supabase.auth.api.setAuthCookie(req, res);
}

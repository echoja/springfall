import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default (req: NextApiRequest) => {
  return NextResponse.json({
    name: `Hello, from ${req.url} I'm now an Edge Function!`,
  });
};

export const config = {
  runtime: "edge",
};

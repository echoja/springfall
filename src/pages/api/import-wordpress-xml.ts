import { getJsonFromBody } from "@common/util";
import { XMLParser } from "fast-xml-parser";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async (req: NextApiRequest) => {
  const parser = new XMLParser();

  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  const json = await getJsonFromBody<{ xmlurl: string }>(req);
  const { xmlurl } = json;

  if (!xmlurl) {
    return NextResponse.json({ error: "No xmlurl provided" }, { status: 400 });
  }

  console.log(xmlurl);

  const xml = await fetch(xmlurl);
  const XMLdata = await xml.text();
  const jObj = parser.parse(XMLdata);

  console.dir(jObj, { depth: null });

  return NextResponse.json({
    name: `Hello, from ${req.url} I'm now an Edge Function!`,
  });
};

export const config = {
  runtime: "experimental-edge",
};

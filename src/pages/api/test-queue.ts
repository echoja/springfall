import { getQStashConfig } from "@common/config";
import { Client } from "@upstash/qstash";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

const config = getQStashConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * Import a fetch polyfill only if you are using node prior to v18.
   * This is not necessary for nextjs, deno or cloudflare workers.
   */

  if (!config.token) {
    throw new Error("No token provided");
  }

  const c = new Client({
    token: config.token,
  });

  const resFromQueue = await c.publishJSON({
    url: `https://monnomlog-alpha.vercel.app/api/edge-test?${nanoid()}`,
    // or topic: "the name or id of a topic"
    body: {
      hello: "world",
    },
    delay: 15000,
  });

  // eslint-disable-next-line no-console
  console.log(resFromQueue);

  // { messageId: "msg_xxxxxxxxxxxxxxxx" }

  res.status(200).json({ message: "OK" });
};

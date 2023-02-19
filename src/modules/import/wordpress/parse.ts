import { XMLParser } from "fast-xml-parser";

import type { WordpressJSON, WordpressPost } from "./type";

export async function parseXml(xmlData: string | Buffer) {
  const xmlParser = new XMLParser();
  const jObj = xmlParser.parse(xmlData);
  return jObj as WordpressJSON;
}

export function getPublishedPost(json: WordpressJSON): WordpressPost[] {
  const { rss } = json;

  if (!rss) {
    throw new Error("No rss");
  }

  const { channel } = rss;

  if (!channel) {
    throw new Error("No channel");
  }

  const { item } = channel;

  if (!item) {
    throw new Error("No item");
  }

  return item
    .filter((i) => {
      return i["wp:status"] === "publish" && i["wp:post_type"] === "post";
    })
    .map((i) => ({
      title: i.title ?? "",
      content: i["content:encoded"] ?? "",
      post_id: i["wp:post_id"] ?? "",
      pubDate: i.pubDate ?? "",
    }));
}

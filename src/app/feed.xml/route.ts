import { articleLocales } from "@modules/i18n/available";
import items from "@modules/article/items";

const BASE = process.env.BASE_URL!;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const feedUrl = `${BASE}/feed.xml`;

  const itemsXml = items
    .map((item) => {
      const locales = articleLocales[item.slug] ?? [];
      const url =
        locales.length > 0
          ? `${BASE}/ko/${item.slug}`
          : `${BASE}/${item.slug}`;

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <description>${escapeXml(item.summary)}</description>
      <pubDate>${new Date(item.createdAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>봄가을</title>
    <link>${escapeXml(BASE)}</link>
    <description>봄가을 블로그</description>
    <language>ko</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

import { getServiceClient } from "@modules/supabase/supabase-service";
import type { Database } from "@modules/supabase/supabase-types";

import type { WordpressPost, WordpressSource } from "./type";

export default async function insertQueue(items: WordpressPost[]) {
  const res = await getServiceClient()
    .from("import_queue")
    .insert(
      items.map(
        (item): Database["public"]["Tables"]["import_queue"]["Insert"] => {
          const sourceInfo: WordpressSource = {
            post_id: item.post_id,
            title: item.title,
          };
          return {
            published_at: item.pubDate,
            content: item.content,
            source_info: sourceInfo,
            title: item.title,
            updated_at: item.pubDate,
          };
        }
      )
    )
    .select(`id, title, source_info`);

  if (res.error) {
    // eslint-disable-next-line no-console
    console.error(
      `err: ${res.error.code} - ${res.error.details}, ${res.error.hint}`
    );
    throw new Error(res.error.message);
  }
  return { count: res.count, data: res.data };
}

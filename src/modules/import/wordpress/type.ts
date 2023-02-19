export type WordpressJSON = {
  rss?: {
    channel?: {
      item?: {
        title?: string;
        "wp:post_id"?: string;
        "wp:status"?: "publish" | "inherit";
        // "Tue, 26 Jan 2021 12:44:15 +0000",
        pubDate?: string;
        "content:encoded"?: string;
        "wp:post_type"?: "post" | "page" | "attachment";
      }[];
    };
  };
};

export type WordpressPost = {
  title: string;
  content: string;
  pubDate: string;
  post_id: string;
};

export type WordpressSource = {
  post_id: string;
  title: string;
};

export interface IParseHtmlResult {
  nodes: Node[];
  pendingImageUpload: {
    path: number[];
    src: string;
  }[];
}

import type { Metadata } from "next";

export function createMetadata(metadata: Metadata) {
  return metadata;
}

export const authorName = "김태훈";
export const authorUrl = "https://github.com/echoja";
export const authorList = [
  {
    name: authorName,
    url: authorUrl,
  },
];

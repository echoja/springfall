import type { Post } from "@prisma/client";
import type { GetStaticProps } from "next";

import prisma from "../lib/prisma";

interface PagesProps {
  feed: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

// eslint-disable-next-line import/prefer-default-export
export const getStaticProps: GetStaticProps<PagesProps> = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

export default function Pages({ feed }: PagesProps) {
  return feed.map((post) => (
    <div>
      <h2>{post.title}</h2>
      <span>{post.author?.name}</span>
      <p>{post.content}</p>
    </div>
  ));
}

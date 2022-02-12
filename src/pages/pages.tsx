import prisma from "@lib/prisma";
import type { Post } from "@prisma/client";
import type { GetStaticProps } from "next";

interface IPagesProps {
  feed: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

// eslint-disable-next-line import/prefer-default-export
export const getStaticProps: GetStaticProps<IPagesProps> = async () => {
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

export default function Pages({ feed }: IPagesProps) {
  return feed.map((post) => (
    <div>
      <h2>{post.title}</h2>
      <span>{post.author?.name}</span>
      <p>{post.content}</p>
    </div>
  ));
}

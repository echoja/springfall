import PostList from "@lib/components/PostList";
import { POSTS_PER_PAGE } from "@lib/config";
import prisma from "@lib/prisma";
import { serializePost } from "@lib/serialize";
import type { MonnomlogPage, SerializedPost } from "@lib/types";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

interface IListIndexProps {
  posts: SerializedPost[];
  count: number;
}

export const getServerSideProps: GetServerSideProps<
  IListIndexProps
> = async () => {
  const [posts, count] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
      },
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count(),
  ]);

  return {
    props: {
      posts: posts.map(serializePost),
      count,
    },
  };
};

const ListIndex: MonnomlogPage<IListIndexProps> = ({ posts, count }) => {
  return (
    <div>
      <NextSeo title="글 목록" />
      <PostList posts={posts} count={count} currentPage={1} />
    </div>
  );
};

export default ListIndex;

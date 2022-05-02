import PostList from "@lib/components/PostList";
import { POSTS_PER_PAGE } from "@lib/config";
import prisma from "@lib/prisma";
import { serializePost } from "@lib/serialize";
import type { MonnomlogPage, SerializedPost } from "@lib/types";
import Joi from "joi";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

interface IListPageProps {
  posts: SerializedPost[];
  pageNum: number;
  count: number;
}

export const getServerSideProps: GetServerSideProps<IListPageProps> = async ({
  query,
}) => {
  if (typeof query.page !== "string") {
    throw new Error("page is not string");
  }
  const pageNum = parseInt(query.page, 10);

  const schema = Joi.number().integer().min(1);
  const result = schema.validate(pageNum);
  if (result.error) {
    throw new Error("page number is not valid");
  }

  const [posts, count] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
      },
      skip: (pageNum - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count(),
  ]);

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return { props: { posts: posts.map(serializePost), pageNum, count } };
};

const ListPage: MonnomlogPage<IListPageProps> = ({ posts, pageNum, count }) => {
  return (
    <div>
      <NextSeo title={`#${pageNum} | 글 목록`} />
      <PostList posts={posts} count={count} currentPage={pageNum} />
    </div>
  );
};

export default ListPage;

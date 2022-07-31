import { POSTS_PER_PAGE } from "@common/config";
import PostList from "@lib/components/PostList";
import { POSTS_PER_PAGE } from "@lib/config";
import type { Post } from "@lib/supabase";
import { anonPosts } from "@lib/supabase";
import type { MonnomlogPage } from "@lib/types";
import Joi from "joi";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

interface IListPageProps {
  posts: Post[];
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
    return {
      notFound: true,
    };
  }
  const [{ count }, { data: posts, error }] = await Promise.all([
    anonPosts().select("*", {
      head: true,
      count: "exact",
    }),
    anonPosts()
      .select("*")
      .range(pageNum * POSTS_PER_PAGE, pageNum * (POSTS_PER_PAGE + 1) - 1),
  ]);

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      notFound: true,
    };
  }

  if (!posts || posts.length === 0 || !count) {
    return {
      notFound: true,
    };
  }

  return { props: { posts, pageNum, count } };
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

import { POSTS_PER_PAGE } from "@common/config";
import type { MonnomlogPage } from "@modules/content/types";
import PostList from "@modules/layout/PostList";
import type { Post } from "@modules/supabase/supabase";
import { anonPosts } from "@modules/supabase/supabase";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

interface IListIndexProps {
  posts: Post[];
  count: number;
}

export const getServerSideProps: GetServerSideProps<
  IListIndexProps
> = async () => {
  const [{ count }, { data: posts, error }] = await Promise.all([
    anonPosts().select("*", {
      head: true,
      count: "exact",
    }),
    anonPosts().select("*").limit(POSTS_PER_PAGE),
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

  return {
    props: { posts, count },
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

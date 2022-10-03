import { POSTS_PER_PAGE } from "@common/config";
import type { MonnomlogPage } from "@modules/content/types";
import PostList from "@modules/layout/PostList";
import { checkPageNumber } from "@modules/route";
import type { Post } from "@modules/supabase/supabase";
import { getAnonClient } from "@modules/supabase/supabase";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";

const ListPage: MonnomlogPage = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  const page = useMemo(() => {
    const result = checkPageNumber(router.query.page);
    if (result.type === "ERROR") {
      return null;
    }
    return result.value;
  }, [router.query.page]);

  useEffect(() => {
    if (!page) {
      return;
    }
    getAnonClient()
      .from("posts")
      .select("*", {
        head: true,
        count: "exact",
      })
      .then((result) => {
        if (result.count) {
          setCount(result.count);
        }
      });

    getAnonClient()
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("published", true)
      .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1)
      .then((result) => {
        if (result.data) {
          setPosts(result.data as Post[]);
        }
      });
  }, [page]);

  return (
    <div>
      <NextSeo title={`#${page} | 글 목록`} />
      {page ? (
        <PostList posts={posts} count={count} currentPage={page} />
      ) : null}
    </div>
  );
};

export default ListPage;

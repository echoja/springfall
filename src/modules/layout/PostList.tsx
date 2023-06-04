import Link from "next/link";
import { useMemo } from "react";

import {
  image as companyContestImage,
  summary as companyContestSummary,
  title as companyContestTitle,
  url as companyContestUrl,
} from "@app/article/2023-06/company-contest/page.mdx";
import { POSTS_PER_PAGE } from "@common/config";
import FaRegularCabinetFiling from "@modules/icons/FaRegularCabinetFiling";
import FaRegularSeedling from "@modules/icons/FaRegularSeedling";
import type { Post } from "@modules/supabase/supabase";

interface IPostListProps {
  posts: Post[];
  count: number;
  currentPage: number;
  loading: boolean;
}

const PostList: React.FC<IPostListProps> = ({
  count,
  posts,
  currentPage,
  loading,
}) => {
  const maxPage = useMemo(() => {
    return Math.ceil(count / POSTS_PER_PAGE);
  }, [count]);
  const minPage = 1;
  const paginationStart = Math.max(1, currentPage - 2);
  const paginationEnd = Math.min(maxPage, currentPage + 2);
  const endReached = useMemo(
    () => paginationEnd === maxPage,
    [maxPage, paginationEnd]
  );
  const startReached = useMemo(
    () => paginationStart === minPage,
    [minPage, paginationStart]
  );

  const pageArray = useMemo(() => {
    return Array.from(
      { length: paginationEnd - paginationStart + 1 },
      (_, i) => paginationStart + i
    );
  }, [paginationEnd, paginationStart]);

  const postArticlesArea = useMemo(() => {
    if (loading) {
      return <div>로딩중...</div>;
    }
    if (posts.length === 0) {
      return <div>글이 없습니다.</div>;
    }

    return posts.map((post) => {
      const link =
        post.id === 10 ? "/article/2023-02/puss-in-boots" : `/post/${post.id}`;

      return (
        <article key={post.id}>
          <Link
            className="inline-flex items-center gap-2 mb-2 font-sans text-lg font-bold group"
            href={link}
          >
            <span className="inline-block transition-colors duration-1000 group-hover:text-teal-600">
              <FaRegularSeedling className="w-4 h-4" />
            </span>
            <span>{post.title}</span>
          </Link>
          {post.summary ? (
            <p className="pl-6 m-0 text-sm text-gray-500">{post.summary}</p>
          ) : null}
        </article>
      );
    });
  }, [loading, posts]);

  return (
    <div>
      <h2 className="mb-5 text-2xl font-semibold">글 목록 (New ⚠️ 공사중)</h2>

      <div className="mb-40">
        {[
          {
            title: companyContestTitle,
            image: companyContestImage,
            url: companyContestUrl,
            summary: companyContestSummary,
          },
        ].map(({ summary, title, url }) => {
          const link = new URL(url || "https://example.com/").pathname;

          return (
            <article key={title}>
              <Link
                className="inline-flex items-center gap-2 mb-2 font-sans text-lg font-bold group"
                href={link}
              >
                <span className="inline-block transition-colors duration-1000 group-hover:text-teal-600">
                  <FaRegularSeedling className="w-4 h-4" />
                </span>
                <span>{title}</span>
              </Link>
              {summary ? (
                <p className="pl-6 m-0 text-sm text-gray-500">{summary}</p>
              ) : null}
            </article>
          );
        })}
      </div>

      <h2 className="mb-5 text-2xl font-semibold">글 목록</h2>
      <div className="flex flex-col gap-3 mb-5">{postArticlesArea}</div>
      <div className="flex items-center">
        <span className="inline-block mr-1">
          <FaRegularCabinetFiling className="w-4 h-4" />
        </span>
        {!startReached && <span>...</span>}
        {pageArray.map((page) => {
          return (
            <Link
              className={`${
                currentPage === page ? "font-bold" : ""
              } inline-block px-1`}
              href={`/post/list/${page}`}
              key={page}
            >
              {page}
            </Link>
          );
        })}
        {!endReached && <span>...</span>}
      </div>
    </div>
  );
};

export default PostList;

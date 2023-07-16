import { POSTS_PER_PAGE } from "@common/config";
import items from "@modules/article/items";
import FaRegularCabinetFiling from "@modules/icons/FaRegularCabinetFiling";
import FaRegularSeedling from "@modules/icons/FaRegularSeedling";
import type { Post } from "@modules/supabase/supabase";
import dayjs from "dayjs";
import Link from "next/link";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

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
    [maxPage, paginationEnd],
  );
  const startReached = useMemo(
    () => paginationStart === minPage,
    [minPage, paginationStart],
  );

  const pageArray = useMemo(() => {
    return Array.from(
      { length: paginationEnd - paginationStart + 1 },
      (_, i) => paginationStart + i,
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

      <ul role="list" className="mb-20 space-y-6">
        {items.map(({ summary, title, url, createdAt }, idx) => {
          const href = new URL(url).pathname;

          return (
            <li key={title} className="relative flex gap-x-4">
              <div
                className={twMerge(
                  idx === items.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center",
                )}
              >
                <div className="w-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <>
                <div className="relative flex items-center justify-center flex-none w-6 h-6 mt-3 bg-white rounded-full dark:bg-gray-900">
                  <div className="w-1.5 h-1.5 rounded-full ring-1 ring-inset ring-gray-300 dark:ring-gray-600"></div>
                </div>
                <div className="relative flex-auto p-3 ">
                  <div className="flex justify-between gap-x-4 mb-0.5">
                    <div className="py-0.5 text-sm leading-5 font-medium text-gray-900">
                      <Link href={href}>
                        <span className="absolute inset-0 transition rounded-md ring-1 ring-inset ring-gray-200 hover:ring-gray-400 dark:ring-gray-700 dark:hover:ring-gray-600"></span>
                        {title}
                      </Link>
                    </div>
                    <time
                      dateTime={createdAt}
                      className="flex-none py-0.5 text-xs leading-5 text-gray-400"
                    >
                      {dayjs(createdAt).format("YYYY.MM.DD.")}
                    </time>
                  </div>
                  <p className="text-sm leading-5 text-gray-500 dark:text-gray-300">
                    {summary}
                  </p>
                </div>
              </>
            </li>
          );
        })}
      </ul>

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

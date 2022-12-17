import { POSTS_PER_PAGE } from "@common/config";
import FaRegularCabinetFiling from "@modules/icons/FaRegularCabinetFiling";
import FaRegularSeedling from "@modules/icons/FaRegularSeedling";
import type { Post } from "@modules/supabase/supabase";
import Link from "next/link";
import { useMemo } from "react";

interface IPostListProps {
  posts: Post[];
  count: number;
  currentPage: number;
}

const PostList: React.FC<IPostListProps> = ({ count, posts, currentPage }) => {
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

  return (
    <div>
      <h1 className="mb-5 text-3xl font-semibold">글 목록</h1>
      <div className="mb-5">
        {posts.length === 0 ? <div>글이 없습니다.</div> : null}
        {posts.map((post) => (
          <article key={post.id}>
            <Link
              className="inline-flex items-center gap-2 font-bold group"
              href={`/post/${post.id}`}
            >
              <span className="inline-block transition-colors duration-1000 group-hover:text-teal-600">
                <FaRegularSeedling className="w-4 h-4" />
              </span>
              <span>{post.title}</span>
            </Link>
            {post.summary ? <p>{post.summary}</p> : null}
          </article>
        ))}
      </div>
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

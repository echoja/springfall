import { POSTS_PER_PAGE } from "@common/config";
import {
  faCabinetFiling,
  faSeedling,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { POSTS_PER_PAGE } from "@lib/config";
import type { Post } from "@lib/supabase";
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
        {posts.map((post) => (
          <article>
            <Link href={`/post/${post.id}`} passHref>
              <a className="font-bold group">
                <span className="inline-block mr-2 transition-colors duration-1000 group-hover:text-teal-600">
                  <FontAwesomeIcon icon={faSeedling} size="sm" />
                </span>
                {post.title}
              </a>
            </Link>
            {post.summary ? <p>{post.summary}</p> : null}
          </article>
        ))}
      </div>
      <div className="flex items-center">
        <span className="inline-block mr-1">
          <FontAwesomeIcon icon={faCabinetFiling} />
        </span>
        {!startReached && <span>...</span>}
        {pageArray.map((page) => {
          return (
            <Link href={`/list/${page}`}>
              <a
                className={`${
                  currentPage === page ? "font-bold" : ""
                } inline-block px-1`}
              >
                {page}
              </a>
            </Link>
          );
        })}
        {!endReached && <span>...</span>}
      </div>
    </div>
  );
};

export default PostList;

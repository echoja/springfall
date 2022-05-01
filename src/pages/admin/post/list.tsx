import { faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import prisma from "@lib/prisma";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";

interface IPostListProps {
  posts: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

export const getServerSideProps: GetServerSideProps<
  IPostListProps
> = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { posts }, // will be passed to the page component as props
  };
};

const PostList: MonnomlogPage<IPostListProps> = ({ posts }) => {
  return (
    <div>
      <table>
        <caption>Posts</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link href={`/admin/post/edit/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </td>
              <td>{post.author?.name}</td>
              <td>{post.published ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <p>
                <strong>{posts.length}</strong> posts
              </p>
            </td>
          </tr>
        </tfoot>
      </table>
      <Link href="/admin/post/new">
        <a>
          <div className="mr-2">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <span>새 글 쓰기</span>
        </a>
      </Link>
    </div>
  );
};

PostList.layoutWrapper = adminLayoutWrapper;

export default PostList;

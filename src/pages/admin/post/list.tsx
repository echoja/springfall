import { faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import { useAdminPageGuard } from "@lib/hooks";
import prisma from "@lib/prisma";
import { serializePost } from "@lib/serialize";
import type { MonnomlogPage, SerializedPost } from "@modules/content/types";
import type { GetServerSideProps } from "next";
import Link from "next/link";

interface IPostListProps {
  posts: SerializedPost[];
}

export const getServerSideProps: GetServerSideProps<
  IPostListProps
> = async () => {
  const posts = await prisma.post.findMany();
  return {
    props: { posts: posts.map((post) => serializePost(post)) }, // will be passed to the page component as props
  };
};

const PostList: MonnomlogPage<IPostListProps> = ({ posts }) => {
  useAdminPageGuard();
  return (
    <div>
      <table>
        <caption>Posts</caption>
        <thead>
          <tr>
            <th>Title</th>
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
              <td>{post.published ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
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

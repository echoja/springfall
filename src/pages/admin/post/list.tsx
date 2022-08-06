import { faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MonnomlogPage } from "@modules/content/types";
import AdminLayoutWrapper from "@modules/layout/AdminLayout";
import { anonClient } from "@modules/supabase/supabase";
import type { definitions } from "@modules/supabase/supabase-types";
import type { GetServerSideProps } from "next";
import Link from "next/link";

type Post = definitions["posts"];
interface IPostListProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<
  IPostListProps
> = async () => {
  const response = await anonClient
    .from<Post>("posts") // Message maps to the type of the row in your database.
    .select("*");

  if (response.error) {
    // eslint-disable-next-line no-console
    console.error(response.error);
    return {
      notFound: true,
    };
  }

  return {
    props: { posts: response.data ?? [] }, // will be passed to the page component as props
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

PostList.layoutWrapper = AdminLayoutWrapper;

export default PostList;

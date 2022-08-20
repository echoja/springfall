import type { MonnomlogPage } from "@modules/content/types";
import AdminLayoutWrapper from "@modules/layout/AdminLayout";
import type { definitions } from "@modules/supabase/supabase-types";
import type { GetServerSideProps } from "next";

type Post = definitions["posts"];
interface IPostListProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<
  IPostListProps
> = async () => {
  return {
    redirect: {
      destination: "/admin/post/list/1",
      permanent: true,
    },
  };
};

const PostList: MonnomlogPage<IPostListProps> = () => {
  return <div />;
};

PostList.layoutWrapper = AdminLayoutWrapper;

export default PostList;

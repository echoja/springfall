import type { MonnomlogPage } from "@modules/content/types";
import type { Post } from "@modules/supabase/supabase";
import type { GetStaticProps } from "next";

interface IListIndexProps {
  posts: Post[];
  count: number;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: "/list/1",
      permanent: true,
    },
  };
};

const ListIndex: MonnomlogPage<IListIndexProps> = () => {
  return <div />;
};

export default ListIndex;

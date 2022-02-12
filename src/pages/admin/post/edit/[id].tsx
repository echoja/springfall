import { useToast } from "@chakra-ui/react";
import { adminLayoutWrap } from "@lib/components/layout/AdminLayout";
import AdminPostEdit from "@lib/pages/AdminPostEdit";
import prisma from "@lib/prisma";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IPostEditProps {
  post: Post | null;
}

export const getServerSideProps: GetServerSideProps<IPostEditProps> = async (
  context
) => {
  const id = context?.params?.id;

  if (!id) {
    return {
      props: {
        post: null,
      },
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    props: { post }, // will be passed to the page component as props
  };
};

const PostEdit: MonnomlogPage<IPostEditProps> = (props) => {
  const { post } = props;
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!post) {
      router.push("/admin/post/list");
      toast({
        description: "존재하지 않는 포스트입니다",
        status: "error",
      });
    }
  }, [post, toast, router]);

  return post && <AdminPostEdit post={post} />;
};

PostEdit.wrap = adminLayoutWrap;

export default PostEdit;

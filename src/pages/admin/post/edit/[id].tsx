import { NoLayoutWrapper } from "@lib/components/layout/NoLayout";
import PostEditorWrapper from "@lib/components/PostEditorWrapper";
import { useAdminPageGuard } from "@lib/hooks";
import useToast from "@lib/hooks/use-toast";
import prisma from "@lib/prisma";
import { serializePost } from "@lib/serialize";
import { useMyStoreWithMemoizedSelector } from "@lib/store";
import type { MonnomlogPage, SerializedPost } from "@lib/types";
import type { Post } from "@prisma/client";
import axiosGlobal from "axios";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const axios = axiosGlobal.create();

interface IPostEditProps {
  post: SerializedPost;
}

export const getServerSideProps: GetServerSideProps<IPostEditProps> = async (
  context
) => {
  const id = context?.params?.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: serializePost(post) }, // will be passed to the page component as props
  };
};

const PostEdit: MonnomlogPage<IPostEditProps> = (props) => {
  useAdminPageGuard();
  const { post: postProp } = props;
  const router = useRouter();
  const toast = useToast();

  const { post, setPost } = useMyStoreWithMemoizedSelector((store) => {
    return {
      post: store.editingPost,
      setPost: store.setEditingPost,
    };
  }, []);

  // 최초 설정
  useEffect(() => {
    setPost(postProp);
  }, [postProp, setPost]);

  useEffect(() => {
    if (!postProp) {
      router.push("/admin/post/list");
      toast({
        description: "존재하지 않는 포스트입니다",
        status: "error",
      });
    }
  }, [postProp, toast, router]);

  const onSaveButtonClick = useCallback(async () => {
    try {
      const { data: result } = await axios.post<Post>(
        `/api/post/save/${postProp?.id}`,
        post
      );
      toast({
        status: "success",
        title: "포스팅이 성공적으로 저장었습니다.",
      });

      // eslint-disable-next-line no-console
      console.log("result", result);
    } catch (e: unknown) {
      toast({
        status: "error",
        title: "포스팅 저장이 실패했습니다.",
      });

      // eslint-disable-next-line no-console
      console.log("error", e);
    }
  }, [post, postProp, toast]);

  if (!postProp) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <PostEditorWrapper onSaveButtonClick={onSaveButtonClick} />;
};

PostEdit.layoutWrapper = NoLayoutWrapper;

export default PostEdit;

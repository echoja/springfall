import { useToast } from "@chakra-ui/react";
import { NoLayoutWrapper } from "@lib/components/layout/NoLayout";
import type { PostEditArgs } from "@lib/components/PostEditorWrapper";
import PostEditorWrapper from "@lib/components/PostEditorWrapper";
import prisma from "@lib/prisma";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import ky from "ky";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

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
  const { post: postProp } = props;
  const router = useRouter();
  const toast = useToast();

  const [postEditing, setPostEditing] = useState<PostEditArgs>({
    title: postProp?.title ?? "",
    content: postProp?.content ?? "",
  });

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
      const result = await ky
        .post(`/api/post/save/${postProp?.id}`, {
          json: postEditing,
        })
        .json<Post>();

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
  }, [postEditing, postProp, toast]);

  const onChangePost = useCallback((post: PostEditArgs) => {
    if (!post) {
      return;
    }
    setPostEditing(post);
  }, []);

  if (!postProp) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    postEditing && (
      <PostEditorWrapper
        onSaveButtonClick={onSaveButtonClick}
        post={postProp}
        onChangePost={onChangePost}
      />
    )
  );
};

PostEdit.layoutWrapper = NoLayoutWrapper;

export default PostEdit;

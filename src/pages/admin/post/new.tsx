import { useToast } from "@chakra-ui/react";
import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import type { PostEditArgs } from "@lib/components/PostEditorWrapper";
import PostEditorWrapper from "@lib/components/PostEditorWrapper";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import ky from "ky";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const PostEdit: MonnomlogPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [postEditing, setPostEditing] = useState<PostEditArgs>({
    title: "",
    content: {
      data: [
        {
          type: "PARAGRAPH",
          children: [
            {
              type: "TEXT",
              text: "",
            },
          ],
        },
      ],
    },
  });

  const onSaveButtonClick = useCallback(async () => {
    try {
      const result = await ky
        .post(`/api/post/save-new`, {
          json: postEditing,
        })
        .json<Post>();

      toast({
        status: "success",
        title: "포스팅이 성공적으로 저장었습니다.",
      });

      // eslint-disable-next-line no-console
      console.log("# result", result);
      router.push(`/admin/post/edit/${result.id}`);
    } catch (e: unknown) {
      toast({
        status: "error",
        title: "포스팅 저장이 실패했습니다.",
      });

      // eslint-disable-next-line no-console
      console.log("error", e);
    }
  }, [postEditing, router, toast]);

  const onChangePost = useCallback((post: PostEditArgs) => {
    if (!post) {
      return;
    }
    setPostEditing(post);
  }, []);

  return (
    postEditing && (
      <PostEditorWrapper
        onSaveButtonClick={onSaveButtonClick}
        post={postEditing}
        onChangePost={onChangePost}
      />
    )
  );
};

PostEdit.layoutWrapper = adminLayoutWrapper;

export default PostEdit;

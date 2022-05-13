import { NoLayoutWrapper } from "@lib/components/layout/NoLayout";
import PostEditorWrapper from "@lib/components/PostEditorWrapper";
import useToast from "@lib/hooks/use-toast";
import { convertPostSerializedToCreate } from "@lib/serialize";
import type { MonnomlogPage, SerializedPost } from "@lib/types";
import type { Post } from "@prisma/client";
import axiosGlobal from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const axios = axiosGlobal.create();

const PostEdit: MonnomlogPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [postEditing, setPostEditing] = useState<SerializedPost>({
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
    authorId: -1,
    published: false,
    createdAt: "",
    id: -1,
    summary: "",
    updatedAt: "",
  });

  const onSaveButtonClick = useCallback(async () => {
    try {
      const result = (await axios.post(`/api/post/save-new`, {
        json: convertPostSerializedToCreate(postEditing),
      })) as Post;

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

  const onChangePost = useCallback((post: SerializedPost) => {
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

PostEdit.layoutWrapper = NoLayoutWrapper;

export default PostEdit;

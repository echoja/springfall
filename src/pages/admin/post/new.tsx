import { NoLayoutWrapper } from "@lib/components/layout/NoLayout";
import PostEditorWrapper from "@lib/components/PostEditorWrapper";
import { useAdminPageGuard } from "@lib/hooks";
import useToast from "@lib/hooks/use-toast";
import { convertPostSerializedToCreate } from "@lib/serialize";
import { useMyStoreMemo } from "@lib/store";
import type { MonnomlogPage } from "@modules/content/types";
import type { Post } from "@prisma/client";
import axiosGlobal from "axios";
import { useRouter } from "next/router";
import { useCallback } from "react";

const axios = axiosGlobal.create();

const PostEdit: MonnomlogPage = () => {
  useAdminPageGuard();
  const router = useRouter();
  const toast = useToast();
  const post = useMyStoreMemo((store) => {
    return store.editingPost;
  }, []);

  const onSaveButtonClick = useCallback(async () => {
    try {
      const { data: result } = await axios.post<Post>(
        `/api/post/save-new`,
        convertPostSerializedToCreate(post)
      );

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
  }, [post, router, toast]);

  return <PostEditorWrapper onSaveButtonClick={onSaveButtonClick} />;
};

PostEdit.layoutWrapper = NoLayoutWrapper;

export default PostEdit;

import { NoLayoutWrapper } from "@lib/components/layout/NoLayout";
import PostEditorWrapper from "@lib/components/PostEditorWrapper";
import { useAdminPageGuard } from "@lib/hooks";
import useToast from "@lib/hooks/use-toast";
import { getCreatePostInput } from "@lib/serialize";
import { editingPostAtom } from "@lib/store";
import type { Post } from "@lib/supabase";
import type { MonnomlogPage } from "@lib/types";
import axiosGlobal from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback } from "react";

const axios = axiosGlobal.create();

const PostEdit: MonnomlogPage = () => {
  useAdminPageGuard();
  const router = useRouter();
  const toast = useToast();
  const [editingPost] = useAtom(editingPostAtom);

  const onSaveButtonClick = useCallback(async () => {
    try {
      const { data: result } = await axios.post<Post>(
        `/api/post/save-new`,
        getCreatePostInput(editingPost)
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
  }, [editingPost, router, toast]);

  return <PostEditorWrapper onSaveButtonClick={onSaveButtonClick} />;
};

PostEdit.layoutWrapper = NoLayoutWrapper;

export default PostEdit;

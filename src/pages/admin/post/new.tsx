import useToast from "@common/hooks/use-toast";
import { editingPostAtom } from "@common/store";
import { getCreatePostInput } from "@common/util";
import type { MonnomlogPage } from "@modules/content/types";
import PostEditorWrapper from "@modules/editor/components/PostEditorWrapper";
import AdminNoLayoutWrapper from "@modules/layout/AdminNoLayout";
import { getAnonClient } from "@modules/supabase/supabase";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback } from "react";

const PostEdit: MonnomlogPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [editingPost] = useAtom(editingPostAtom);

  const onSaveButtonClick = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await getAnonClient().auth.getUser();

      if (!user) {
        toast({ title: "no user!" });
        return;
      }

      const result = await getAnonClient()
        .from("posts")
        .insert({ ...getCreatePostInput(editingPost), user_id: user.id })
        .select()
        .single();

      if (result.error) {
        toast({ title: `에러가 발생했습니다: ${result.error.message}` });
        return;
      }

      // eslint-disable-next-line no-console
      console.log("# result", result);

      toast({
        status: "success",
        title: "포스팅이 성공적으로 저장되었습니다.",
      });

      router.push(`/admin/post/edit/${result.data.id}`);
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

PostEdit.layoutWrapper = AdminNoLayoutWrapper;

export default PostEdit;

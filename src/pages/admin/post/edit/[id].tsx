import useToast from "@common/hooks/use-toast";
import { editingPostAtom, useMyStoreMemo } from "@common/store";
import { parsePost } from "@modules/content/parse";
import type { MonnomlogPage } from "@modules/content/types";
import PostEditorWrapper from "@modules/editor/components/PostEditorWrapper";
import AdminNoLayoutWrapper from "@modules/layout/AdminNoLayout";
import type { Post } from "@modules/supabase/supabase";
import { getAnonClient } from "@modules/supabase/supabase";
import { getServiceClient } from "@modules/supabase/supabase-service";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { GetServerSideProps } from "next";
import { useCallback, useEffect } from "react";

function handleSave(id: number, post: Post) {
  return getAnonClient()
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();
}

interface IPostEditProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<IPostEditProps> = async (
  context
) => {
  let id = context.params?.id;
  if (Array.isArray(id)) {
    [id] = id;
  }

  if (!id) {
    return {
      notFound: true,
    };
  }

  const postResponse = await getServiceClient()
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!postResponse.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: postResponse.data as Post },
  };
};

const PostEdit: MonnomlogPage<IPostEditProps> = (props) => {
  const { post: postProp } = props;
  const toast = useToast();

  useHydrateAtoms([[editingPostAtom, postProp]]);
  const [editingPost, setEditingPost] = useAtom(editingPostAtom);
  const { setInitialized } = useMyStoreMemo((store) => {
    return {
      setInitialized: store.setEditingPostInitialized,
    };
  }, []);

  // 페이지가 바뀔 때마다 갱신해준다.
  useEffect(() => {
    setInitialized(false);
    setEditingPost(parsePost(postProp));
    setTimeout(() => {
      setInitialized(true);
    }, 1);
  }, [postProp, setEditingPost, setInitialized]);

  const onSaveButtonClick = useCallback(async () => {
    try {
      const result = await handleSave(postProp.id, editingPost);
      toast({
        status: "success",
        title: "포스팅이 성공적으로 저장되었습니다.",
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
  }, [editingPost, postProp, toast]);

  if (!postProp) {
    return null;
  }

  return <PostEditorWrapper onSaveButtonClick={onSaveButtonClick} />;
};

PostEdit.layoutWrapper = AdminNoLayoutWrapper;

export default PostEdit;

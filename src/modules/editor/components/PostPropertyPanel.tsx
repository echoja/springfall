import { useAtom } from "jotai";
import React, { useCallback } from "react";

import { editingPostAtom } from "@common/store";
import SwitchGroup from "@modules/admin-ui/components/SwitchGroup";
import TextareaGroup from "@modules/admin-ui/components/TextareaGroup";

const PostPropertyPanel: React.FC = () => {
  const [editingPost, setEditingPost] = useAtom(editingPostAtom);

  const onPublishedChange = useCallback(
    (published: boolean) => {
      setEditingPost({ ...editingPost, published });
    },
    [setEditingPost, editingPost]
  );

  const onSummaryChange = useCallback(
    (summary: string) => {
      setEditingPost({ ...editingPost, summary });
    },
    [setEditingPost, editingPost]
  );

  return (
    <>
      <SwitchGroup
        checked={editingPost.published}
        onChange={onPublishedChange}
        title="공개"
        className="mb-4"
      />
      <TextareaGroup
        title="요약"
        value={editingPost.summary}
        onChange={onSummaryChange}
      />
    </>
  );
};

export default React.memo(PostPropertyPanel);

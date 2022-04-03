import { Box, Input } from "@chakra-ui/react";
import type { Post } from "@prisma/client";
import type React from "react";
import { useEffect, useCallback, useState } from "react";
import type { Descendant } from "slate";

import { ContentEditor } from "./ContentEditor";

export type PostEditArgs = Pick<Post, "title" | "content">;

interface IAdminPostEditProps {
  post: PostEditArgs;
  onChangePost: (post: PostEditArgs) => void;
}

type ContentType = { data: Descendant[] };

const PostEditorWrapper: React.FC<IAdminPostEditProps> = ({
  post,
  onChangePost,
}) => {
  const [content, setContent] = useState<ContentType>(
    post.content as ContentType
  );
  const [title, setTitle] = useState(post.title);

  const onTitlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  useEffect(() => {
    onChangePost({
      content,
      title,
    });
  }, [content, onChangePost, title]);

  return (
    <Box>
      <Input value={title} onChange={onTitlechange} />
      <ContentEditor
        value={content.data}
        onChange={(value) => {
          setContent({ data: value });
        }}
      />
    </Box>
  );
};

export default PostEditorWrapper;

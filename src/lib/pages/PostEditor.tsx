import { Box, Input } from "@chakra-ui/react";
import type { Post } from "@prisma/client";
import MarkdownIt from "markdown-it";
import type React from "react";
import { useEffect, useCallback, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

export type PostEditArgs = Pick<Post, "title" | "content">;

interface IAdminPostEditProps {
  post: PostEditArgs;
  onChangePost: (post: PostEditArgs) => void;
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const PostEditor: React.FC<IAdminPostEditProps> = ({ post, onChangePost }) => {
  const [content, setContent] = useState(post.content ?? "");
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
      <MdEditor
        style={{ height: "500px" }}
        value={content}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => setContent(text)}
      />
    </Box>
  );
};

export default PostEditor;

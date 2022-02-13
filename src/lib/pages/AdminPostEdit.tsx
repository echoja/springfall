import { Box, Input } from "@chakra-ui/react";
import type { Post } from "@prisma/client";
import MarkdownIt from "markdown-it";
import type React from "react";
import { useCallback, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAdminPostEditProps {
  post: Post;
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const AdminPostEdit: React.FC<IAdminPostEditProps> = ({ post }) => {
  const [content, setContent] = useState(post.content ?? undefined);
  const [title, setTitle] = useState(post.title);

  const onTitlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

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

export default AdminPostEdit;

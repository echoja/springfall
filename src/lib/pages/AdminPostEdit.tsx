import { Box, Input } from "@chakra-ui/react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/router";
import type React from "react";
import { useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAdminPostEditProps {
  post: Post;
}

const AdminPostEdit: React.FC<IAdminPostEditProps> = ({ post }) => {
  const [_content, _setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const router = useRouter();

  const onTitlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  return (
    <Box>
      <Input value={title} onChange={onTitlechange} />
      {router.query.id}
    </Box>
  );
};

export default AdminPostEdit;

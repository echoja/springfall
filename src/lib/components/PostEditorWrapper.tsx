import { Box, Button, Input, Stack, Text, Tooltip } from "@chakra-ui/react";
import { faAngleLeft } from "@fortawesome/pro-regular-svg-icons";
import { faFloppyDisk } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Post } from "@prisma/client";
import Link from "next/link";
import type React from "react";
import { useEffect, useCallback, useState } from "react";
import type { Descendant } from "slate";

import { ContentEditor } from "./ContentEditor";

export type PostEditArgs = Pick<Post, "title" | "content">;

interface IPostEditorWrapperProps {
  post: PostEditArgs;
  onChangePost: (post: PostEditArgs) => void;
  onSaveButtonClick: () => void;
}

type ContentType = { data: Descendant[] };

const PostEditorWrapper: React.FC<IPostEditorWrapperProps> = ({
  post,
  onChangePost,
  onSaveButtonClick,
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
      <Box padding={2} shadow="sm" mb={10}>
        <Stack direction="row" align="center" justify="space-between">
          <Stack direction="row" align="center">
            <Link href="/admin/post/list" passHref>
              <Button as="a" variant="ghost">
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
            </Link>

            <Text fontWeight="bold">글 편집</Text>
          </Stack>

          <Tooltip label="저장">
            <Button size="sm" colorScheme="blue" onClick={onSaveButtonClick}>
              <Box>
                <FontAwesomeIcon icon={faFloppyDisk} />
              </Box>
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* 목차 사이드바 */}
      <Box />
      <Box>
        <Input
          value={title}
          onChange={onTitlechange}
          variant="solid"
          border={0}
          fontSize="xl"
          fontWeight="bold"
          mb={3}
        />
        <ContentEditor
          value={content.data}
          onChange={(value) => {
            setContent({ data: value });
          }}
        />
      </Box>
    </Box>
  );
};

export default PostEditorWrapper;

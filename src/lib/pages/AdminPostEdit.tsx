import { Box, Button, ButtonGroup, Flex, Input, Text } from "@chakra-ui/react";
import { faAngleLeft, faFloppyDisk } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <Flex justify="end">
        <ButtonGroup
          justifyContent="end"
          w="100%"
          colorScheme="blackAlpha"
          mt={4}
        >
          <Button variant="outline">
            <Box mr={2}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </Box>
            <Text>목록으로 돌아가기</Text>
          </Button>
          <Button>
            <Box mr={2}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Box>
            <Text>저장</Text>
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default AdminPostEdit;

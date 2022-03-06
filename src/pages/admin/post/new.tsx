import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import { faAngleLeft, faFloppyDisk } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import type { PostEditArgs } from "@lib/pages/PostEditor";
import PostEditor from "@lib/pages/PostEditor";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import ky from "ky";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const PostEdit: MonnomlogPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [postEditing, setPostEditing] = useState<PostEditArgs>({
    title: "",
    content: "",
  });

  const onSaveButtonClick = useCallback(async () => {
    try {
      const result = await ky
        .post(`/api/post/save-new`, {
          json: postEditing,
        })
        .json<Post>();

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
  }, [postEditing, router, toast]);

  const onChangePost = useCallback((post: PostEditArgs) => {
    if (!post) {
      return;
    }
    setPostEditing(post);
  }, []);

  return (
    <>
      {postEditing && (
        <PostEditor post={postEditing} onChangePost={onChangePost} />
      )}
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
          <Button onClick={onSaveButtonClick}>
            <Box mr={2}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Box>
            <Text>저장</Text>
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

PostEdit.layoutWrapper = adminLayoutWrapper;

export default PostEdit;

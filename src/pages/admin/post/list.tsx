import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import prisma from "@lib/prisma";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface IPostListProps {
  posts: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

export const getServerSideProps: GetServerSideProps<
  IPostListProps
> = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { posts }, // will be passed to the page component as props
  };
};

const PostList: MonnomlogPage<IPostListProps> = ({ posts }) => {
  return (
    <Box>
      <Table>
        <TableCaption>Posts</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Published</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <Tr key={post.id}>
              <Td>
                <Link href={`/admin/post/edit/${post.id}`} passHref>
                  <ChakraLink>{post.title}</ChakraLink>
                </Link>
              </Td>
              <Td>{post.author?.name}</Td>
              <Td>{post.published ? "Yes" : "No"}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>
              <p>
                <strong>{posts.length}</strong> posts
              </p>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
      <Link href="/admin/post/new" passHref>
        <Button as="a">
          <Box mr={2}>
            <FontAwesomeIcon icon={faPen} />
          </Box>
          <Text>새 글 쓰기</Text>
        </Button>
      </Link>
    </Box>
  );
};

PostList.layoutWrapper = adminLayoutWrapper;

export default PostList;

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import prisma from "@lib/prisma";
import type { Post } from "@prisma/client";
import type { GetServerSideProps } from "next";
import type React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPostListProps {
  posts: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

const PostList: React.FC<IPostListProps> = ({ posts }) => {
  return (
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
            <Td>{post.title}</Td>
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
  );
};

export default PostList;

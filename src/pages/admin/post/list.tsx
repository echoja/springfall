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
import { adminLayoutWrap } from "@lib/components/layout/AdminLayout";
import prisma from "@lib/prisma";
import type { MonnomlogPage } from "@lib/types";
import type { Post } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
              <Link href={`/admin/post/edit/${post.id}`}>
                <a>{post.title}</a>
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
  );
};

PostList.wrap = adminLayoutWrap;

export default PostList;

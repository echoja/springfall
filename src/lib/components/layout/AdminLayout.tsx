import { Box, Flex, Heading, Divider } from "@chakra-ui/react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: ILayoutProps) => {
  return (
    <Flex margin="0 auto" transition="0.5s ease-out">
      <Box padding={8} className="admin-sidebar" width={250}>
        <Heading as="h2" size="md">
          관리자
        </Heading>
        <Divider marginTop={3} marginBottom={4} />
        <Link href="/admin/post/list">
          <a>게시글 목록</a>
        </Link>
      </Box>
      <Box margin="8" as="main" flex="1">
        {children}
      </Box>
    </Flex>
  );
};

export default AdminLayout;

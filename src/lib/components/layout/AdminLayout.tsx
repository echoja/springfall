import { Box, Flex, Heading } from "@chakra-ui/react";
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
      </Box>
      <Box margin="8" as="main" flex="1">
        {children}
      </Box>
    </Flex>
  );
};

export default AdminLayout;

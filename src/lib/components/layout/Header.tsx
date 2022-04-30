import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Authenticating ...</div>;
  // }

  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Link href="/">봄가을</Link>
      </Heading>

      <Box marginLeft="auto" marginRight="3">
        <Link href="/list" passHref>
          <Button as="a" variant="ghost">
            글 목록
          </Button>
        </Link>
      </Box>
      <Box>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;

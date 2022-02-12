import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Link href="/">monnomlog</Link>
      </Heading>

      <Box marginLeft="auto" marginRight="3">
        {!session ? (
          <Button onClick={() => signIn("github")}>로그인</Button>
        ) : (
          <Button onClick={() => signOut()}>
            <a>로그아웃</a>
          </Button>
        )}
      </Box>
      <Box>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;

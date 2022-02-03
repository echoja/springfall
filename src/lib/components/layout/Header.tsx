import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Link href="/">nextarter-chakra</Link>
      </Heading>

      <Box marginLeft="auto">
        {!session ? (
          <Link href="/api/auth/signin">
            <a data-active={isActive("/signup")}>Log in</a>
          </Link>
        ) : (
          <Button onClick={() => signOut()}>
            <a>Log out</a>
          </Button>
        )}

        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;

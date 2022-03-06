import { Box, Grid, Heading, useColorMode } from "@chakra-ui/react";

const SomeText = () => {
  const { colorMode } = useColorMode();

  return (
    <Grid gap={2}>
      <Heading as="h2" fontSize={{ base: "lg", sm: "3xl" }}>
        Hello
      </Heading>

      <Box
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
        padding={4}
        borderRadius={4}
      >
        <Box
          fontSize={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
        >
          This is a Next.js app with Chakra-UI and TypeScript setup.
        </Box>
      </Box>
    </Grid>
  );
};

export default SomeText;

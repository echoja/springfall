import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

export const NoLayoutWrapper = (page: ReactNode) => {
  return <Box>{page}</Box>;
};

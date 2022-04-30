import { Link, Text, Box, Tooltip } from "@chakra-ui/react";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSmile } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import { memo } from "react";

const Footer = () => {
  return (
    <Box as="footer" textAlign="center">
      <Box mb={4}>
        <NextLink href="https://twitter.com/springfall_cc" passHref>
          <Tooltip hasArrow aria-label="트위터" label="트위터" placement="top">
            <Link display="inline-block">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </Link>
          </Tooltip>
        </NextLink>
      </Box>
      <Text fontSize="sm" mb={4}>
        오늘도 행복한 하루 되세요 # <FontAwesomeIcon icon={faSmile} />
        {" # "}
        {new Date().getFullYear()}
      </Text>
    </Box>
  );
};

export default memo(Footer);

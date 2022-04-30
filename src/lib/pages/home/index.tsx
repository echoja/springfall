import { Box, Image } from "@chakra-ui/react";
import MotionBox from "@lib/components/motion/MotionBox";

const Home = () => {
  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      <Box>
        <MotionBox
          animate={{ y: 20, scale: 0.97 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          marginY={8}
          maxWidth={[240, 320]}
          marginX="auto"
        >
          <Image
            src="/Launching-amico.svg"
            width={400}
            height={400}
            alt="Launching Illustration"
          />
        </MotionBox>
      </Box>
    </Box>
  );
};

export default Home;

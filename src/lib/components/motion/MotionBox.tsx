import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import type { Merge } from "@lib/types";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

export default MotionBox;

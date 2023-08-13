"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

const Box: React.FC<{
  text: "paragraph" | "image" | "quote";
  className?: string;
}> = ({ text, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const scrollVelocity = useVelocity(
    useTransform(scrollYProgress, [0, 1], [10, -10]),
  );

  const y = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 800,
    mass: 1,
  });

  switch (text) {
    case "paragraph":
      return (
        <motion.div
          style={{ y }}
          whileHover={{
            scale: 1.02,
            opacity: 0.8,
          }}
          whileTap={{ scale: 0.98, opacity: 1 }}
          transition={{ duration: 0.05 }}
          ref={ref}
          className={twMerge(
            "flex items-center justify-center w-full rounded shadow h-14 bg-slate-200 dark:bg-slate-700 select-none",
            className,
          )}
        >
          일반 문단
        </motion.div>
      );
    case "image":
      return (
        <motion.div
          style={{ y }}
          whileHover={{
            scale: 1.02,
            opacity: 0.8,
          }}
          whileTap={{ scale: 0.98, opacity: 1 }}
          transition={{ duration: 0.05 }}
          ref={ref}
          className={twMerge(
            "flex items-center justify-center w-full h-20 bg-yellow-200 rounded shadow dark:bg-yellow-700 select-none",
            className,
          )}
        >
          이미지
        </motion.div>
      );
    case "quote":
      return (
        <motion.div
          style={{ y }}
          whileHover={{
            scale: 1.02,
            opacity: 0.8,
          }}
          whileTap={{ scale: 0.98, opacity: 1 }}
          transition={{ duration: 0.05 }}
          ref={ref}
          className={twMerge(
            "flex items-center justify-center w-full h-20 bg-blue-200 rounded shadow dark:bg-blue-700 select-none",
            className,
          )}
        >
          인용구
        </motion.div>
      );
  }
};
const ContentGraph: React.FC = () => {
  // const y = useParallax(scrollYProgress, 300);/

  return (
    <div className="relative">
      <div className="flex flex-col max-w-lg gap-10 mx-auto">
        <div className="flex justify-between px-10 py-6 rounded-md shadow-inner bg-gray-50 dark:bg-gray-600">
          <div className="text-sm font-bold text-gray-400">
            제목, 생성일, 수정일 등등
          </div>
        </div>
        <div className="px-10 py-6 overflow-hidden rounded-md shadow-inner bg-gray-50 dark:bg-gray-600">
          <div className="mb-4 text-sm font-bold text-gray-400">콘텐츠</div>
          <div className="flex flex-col gap-5">
            <Box text="paragraph" className="h-14" />
            <Box text="image" className="h-20" />
            <Box text="quote" className="h-20" />
            <Box text="paragraph" className="h-32" />
            <Box text="image" className="h-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGraph;

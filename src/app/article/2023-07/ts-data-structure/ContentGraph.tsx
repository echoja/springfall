"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
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
            "flex h-14 w-full items-center justify-center rounded-sm bg-slate-200 shadow-sm select-none dark:bg-slate-700",
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
            "flex h-20 w-full items-center justify-center rounded-sm bg-yellow-200 shadow-sm select-none dark:bg-yellow-700",
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
            "flex h-20 w-full items-center justify-center rounded-sm bg-blue-200 shadow-sm select-none dark:bg-blue-700",
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
      <div className="mx-auto flex max-w-lg flex-col gap-10">
        <div className="flex justify-between rounded-md bg-gray-50 px-10 py-6 shadow-inner dark:bg-gray-600">
          <div className="text-sm font-bold text-gray-400">
            제목, 생성일, 수정일 등등
          </div>
        </div>
        <div className="overflow-hidden rounded-md bg-gray-50 px-10 py-6 shadow-inner dark:bg-gray-600">
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

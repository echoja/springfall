"use client";

import type { Ref } from "react";
import { motion } from "motion/react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  articleRef?: Ref<HTMLElement>;
}

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function ArticleFadeIn({
  children,
  className,
  articleRef,
}: IProps) {
  return (
    <motion.article
      ref={articleRef}
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={variants}
    >
      {children}
    </motion.article>
  );
}

"use client";

import { motion } from "motion/react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function ArticleFadeIn({ children, className }: IProps) {
  return (
    <motion.article
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={variants}
    >
      {children}
    </motion.article>
  );
}

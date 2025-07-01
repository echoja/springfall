"use client";

import type { ArticleItem } from "@modules/article/types";
import { metadataBase } from "@modules/metadata/constants";
import dayjs from "dayjs";
import { motion } from "motion/react";
import Link from "next/link";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    // transition: {
    //   staggerChildren: 0.03,
    // },
  },
};

const itemVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export function List({ children }: { children: React.ReactNode }) {
  return (
    <motion.ul
      role="list"
      className="mb-20 grid grid-cols-1 sm:grid-cols-2 -mx-4"
      initial="hidden"
      variants={listVariants}
      whileInView="visible"
    >
      {children}
    </motion.ul>
  );
}

export function ListItem({ item }: { item: ArticleItem }) {
  const { createdAt, summary, title, url, category } = item;

  const href = new URL(url, metadataBase).pathname;

  return (
    <motion.li
      key={title}
      data-slot="home-list-item"
      className="relative rounded-md py-6 px-4 sm:p-8 bg-background/0"
      data-gtm-id={`${href}_link`}
      whileTap={{ scale: 0.99 }}
      // whileHover={{ backgroundColor: "var(--color-background)" }}
      variants={itemVariants}
    >
      <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <time dateTime={createdAt}>{dayjs(createdAt).format("YYYY.MM")}</time>
        {category && (
          <>
            <span className="opacity-50"> | </span>
            <span>{category}</span>
          </>
        )}
      </div>

      <div className="mb-2 text-xl leading-7 font-bold  break-keep">
        <Link href={href} className="text-gray-900 dark:text-gray-100">
          <span className="absolute inset-0 transition rounded-md"></span>
          {title}
        </Link>
      </div>

      <p className="text-sm break-keep">{summary}</p>
    </motion.li>
  );
}

"use client";

import type { ArticleItem } from "@modules/article/types";
import { getCategoryLabel } from "@modules/category";
import dayjs from "dayjs";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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
      className="-mx-4 mb-20 grid grid-cols-1 sm:grid-cols-2"
      initial="hidden"
      variants={listVariants}
      whileInView="visible"
    >
      {children}
    </motion.ul>
  );
}

export function ListItem({
  item,
  basePathname,
}: {
  item: ArticleItem;
  basePathname: string;
}) {
  const { createdAt, summary, title, slug, category } = item;

  const href = new URL(slug, basePathname).pathname;
  const pathname = usePathname();
  const firstSeg = (pathname.split("/")[1] ?? "") as "ko" | "en" | "";
  const locale: "ko" | "en" =
    firstSeg === "ko" || firstSeg === "en" ? firstSeg : "ko";

  return (
    <motion.li
      key={title}
      data-slot="home-list-item"
      className="bg-background/0 relative rounded-md px-4 py-6 sm:p-8"
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
            <span>{getCategoryLabel(category, locale)}</span>
          </>
        )}
      </div>

      <div className="mb-2 text-xl leading-7 font-bold break-keep">
        <Link href={href} className="text-gray-900 dark:text-gray-100">
          <span className="absolute inset-0 rounded-md transition"></span>
          {title}
        </Link>
      </div>

      <p className="text-sm break-keep">{summary}</p>
    </motion.li>
  );
}

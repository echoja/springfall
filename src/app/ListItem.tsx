"use client";

import type { ArticleItem } from "@modules/article/types";
import { metadataBase } from "@modules/metadata/constants";
import dayjs from "dayjs";
import { motion } from "motion/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function ListItem({ item }: { item: ArticleItem }) {
  const { createdAt, summary, title, url } = item;

  const href = new URL(url, metadataBase).pathname;

  return (
    <motion.li key={title} className="relative flex gap-x-4">
      <div className={twMerge("absolute left-0 top-0 flex w-6 justify-center")}>
        <div className="w-px bg-gray-200 dark:bg-gray-700" />
      </div>

      <>
        {/* {category ? (
          <div
            className="relative flex items-center justify-center flex-none w-6 h-6 mt-3 bg-gray-200 rounded-full dark:bg-gray-900 outline outline-4 outline-white dark:outline-gray-900 dark:grayscale-[30%] transition"
            style={{ backgroundColor: getCategoryColor(category) }}
          >
            {renderCategoryIcon(getCategoryIcon(category))}
          </div>
        ) : (
          <div className="relative flex items-center justify-center flex-none w-6 h-6 mt-3 bg-white rounded-full dark:bg-gray-900">
            <div className="w-1.5 h-1.5 rounded-full ring-1 ring-inset ring-gray-300 dark:ring-gray-600"></div>
          </div>
        )} */}
        <div className="relative flex-auto py-5" data-gtm-id={`${href}_link`}>
          <div className="flex justify-between gap-x-4 mb-0.5">
            <div className="py-0.5 text-sm leading-5 font-medium text-gray-900 break-keep">
              <Link href={href}>
                <span className="absolute inset-0 transition rounded-md ring-1 ring-inset ring-gray-200 hover:ring-gray-400 dark:ring-gray-700 dark:hover:ring-gray-600"></span>
                {title}
              </Link>
            </div>
            <time
              dateTime={createdAt}
              className="flex-none py-0.5 text-xs leading-5 text-gray-400"
            >
              {dayjs(createdAt).format("YYYY.MM.DD.")}
            </time>
          </div>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-300">
            {summary}
          </p>
        </div>
      </>
    </motion.li>
  );
}

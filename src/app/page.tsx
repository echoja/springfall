import items from "@modules/article/items";
import {
  getCategoryColor,
  getCategoryIcon,
  renderCategoryIcon,
} from "@modules/category";
import Header from "@modules/layout/Header";
import { metadataBase } from "@modules/metadata/constants";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";
import { twMerge } from "tailwind-merge";

export const metadata: Metadata = {
  title: "홈 | 봄가을",
};

const Home = () => {
  return (
    <>
      <Header className="max-w-screen-md px-4 pt-4 mx-auto sm:pt-6 md:pt-8 sm:px-6 md:px-8" />
      <main className="max-w-screen-md px-4 mt-12 mb-24 sm:px-6 md:px-8">
        <ul role="list" className="mb-20 space-y-6">
          {items.map(({ summary, title, url, createdAt, category }, idx) => {
            const href = new URL(url, metadataBase).pathname;

            return (
              <li key={title} className="relative flex gap-x-4">
                <div
                  className={twMerge(
                    idx === items.length - 1 ? "h-6" : "-bottom-6",
                    "absolute left-0 top-0 flex w-6 justify-center",
                  )}
                >
                  <div className="w-px bg-gray-200 dark:bg-gray-700" />
                </div>

                <>
                  {category ? (
                    <div
                      className="relative flex items-center justify-center flex-none w-6 h-6 mt-3 bg-gray-200 rounded-full dark:bg-gray-900 outline outline-4 outline-white dark:outline-gray-900 dark:grayscale-[30%] transition"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    >
                      {/* <div className="w-1.5 h-1.5 rounded-full ring-1 ring-inset ring-gray-300 dark:ring-gray-600"></div> */}
                      {renderCategoryIcon(getCategoryIcon(category))}
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center flex-none w-6 h-6 mt-3 bg-white rounded-full dark:bg-gray-900">
                      <div className="w-1.5 h-1.5 rounded-full ring-1 ring-inset ring-gray-300 dark:ring-gray-600"></div>
                    </div>
                  )}
                  <div className="relative flex-auto p-3 ">
                    <div className="flex justify-between gap-x-4 mb-0.5">
                      <div className="py-0.5 text-sm leading-5 font-medium text-gray-900 break-keep">
                        <Link href={href}>
                          <span className="absolute inset-0 transition rounded-md ring-1 ring-inset ring-gray-200 hover:ring-gray-400 dark:ring-gray-700 dark:hover:ring-gray-600"></span>
                          <Balancer>{title}</Balancer>
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
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Home;

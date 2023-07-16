import items from "@modules/article/items";
import { metadataBase } from "@modules/metadata";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const metadata: Metadata = {
  title: "홈 | 봄가을",
};

const Home = () => {
  return (
    <>
      <ul role="list" className="mb-20 space-y-6">
        {items.map(({ summary, title, url, createdAt }, idx) => {
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
                <div className="relative flex items-center justify-center flex-none w-6 h-6 mt-3 bg-white rounded-full dark:bg-gray-900">
                  <div className="w-1.5 h-1.5 rounded-full ring-1 ring-inset ring-gray-300 dark:ring-gray-600"></div>
                </div>
                <div className="relative flex-auto p-3 ">
                  <div className="flex justify-between gap-x-4 mb-0.5">
                    <div className="py-0.5 text-sm leading-5 font-medium text-gray-900">
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
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;

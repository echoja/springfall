import type { Category } from "@modules/category";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { gray } from "tailwindcss/colors";
import ArticleCounter from "./ArticleCounter";
import style from "./ArticleHeader.module.css";

const customColor = {
  "--bgColor": `${gray[300]} 83.3333%`,
  "--darkBgColor": `${gray[700]} 83.3333%`,
};

export const HeaderSeparator: React.FC<React.ComponentProps<"div">> = (
  props,
) => (
  <div
    {...props}
    role="separator"
    className={twMerge(
      "border-none h-5 block",
      style["header-separator"],
      props.className,
    )}
    style={{
      ...customColor,
      ...props.style,
    }}
  >
    {props.children}
  </div>
);

export interface IArticleHeaderProps {
  title: string;
  updatedAt: string;
  summary?: string;
  category?: Category;
  url: string;
}

export default function ArticleHeader({
  title,
  updatedAt,
  summary,
  category,
  url,
}: IArticleHeaderProps) {
  return (
    <header className="mb-24">
      <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
        {category && (
          <>
            <span className="">{category}</span>
            <span className="block w-px h-2 bg-gray-300 rounded-full dark:bg-gray-700" />
          </>
        )}

        <span className="">{dayjs(updatedAt).format("YYYY년 MM월 DD일")}</span>
        <span className="block w-px h-2 bg-gray-300 rounded-full dark:bg-gray-700" />

        <ArticleCounter url={url} />
      </div>
      <h1
        className="mb-2 text-4xl font-extrabold break-keep dark:text-gray-100"
        style={{
          textShadow: `0 0.125rem 0.375rem rgb(0 0 0 / 0.05)`,
        }}
      >
        {/* <Balancer>{title}</Balancer> */}
        {title}
      </h1>
      <p className="text-sm break-keep">
        {/* <Balancer>{summary}</Balancer> */}
        {summary}
      </p>
    </header>
  );
}

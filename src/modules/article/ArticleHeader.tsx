import type { Category } from "@modules/category";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import style from "./ArticleHeader.module.css";

const customColor = {
  "--bgColor": `--color-gray-300 83.3333%`,
  "--darkBgColor": `--color-gray-700 83.3333%`,
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
  createdAt: string;
  summary?: string;
  category?: Category;
  url: string;
}

export default function ArticleHeader({
  title,
  createdAt,
  summary,
  category,
}: IArticleHeaderProps) {
  return (
    <header className="mb-24">
      <div className="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
        <time dateTime={createdAt}>{dayjs(createdAt).format("YYYY.MM")}</time>
        {category && (
          <>
            <span className="opacity-50"> | </span>
            <span>{category}</span>
          </>
        )}
      </div>
      <h1 className="mb-2 text-4xl font-extrabold break-keep dark:text-gray-100">
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

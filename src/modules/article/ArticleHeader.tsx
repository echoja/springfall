import dayjs from "dayjs";

import Balancer from "react-wrap-balancer";
import { twMerge } from "tailwind-merge";
import { gray } from "tailwindcss/colors";
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
  desc?: string;
}

export default function ArticleHeader({
  title,
  updatedAt,
  desc,
}: IArticleHeaderProps) {
  return (
    <header className="mb-24">
      <div className="mb-4 font-mono text-xs text-gray-500 dark:text-gray-400">
        {dayjs(updatedAt).format("YYYY.MM.DD.")}
      </div>
      <h1
        className="mb-2 text-4xl font-extrabold break-keep dark:text-gray-100"
        style={{
          textShadow: `0 0.125rem 0.375rem rgb(0 0 0 / 0.05)`,
          lineHeight: "1.3",
        }}
      >
        <Balancer>{title}</Balancer>
      </h1>
      <p className="text-sm leading-normal text-gray-500 dark:text-gray-400 break-keep">
        <Balancer>{desc}</Balancer>
      </p>
    </header>
  );
}

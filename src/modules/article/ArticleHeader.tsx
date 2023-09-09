import dayjs from "dayjs";

import { authorUrl } from "@modules/metadata";
import Link from "next/link";
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

export default function ArticleHeader({
  title,
  updatedAt,
  desc,
}: {
  title: string;
  updatedAt: string;
  desc?: string;
}) {
  return (
    <header className="mb-16">
      <HeaderSeparator className="mb-28" />
      <h1
        className="text-4xl font-extrabold break-keep dark:text-gray-100"
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
      <HeaderSeparator
        className="flex items-center justify-center w-full font-mono text-xs font-light text-white mt-28 dark:text-gray-950"
        style={{
          textShadow: `0 0 0.25rem rgb(0 0 0 / 0.25)`,
        }}
      >
        <div>
          {dayjs(updatedAt).format("YYYY.MM.DD.")} by{" "}
          <a
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline dark:text-gray-950"
          >
            @echoja
          </a>{" "}
          on{" "}
          <Link href="/" className="text-white underline dark:text-gray-950">
            springfall.cc
          </Link>
        </div>
      </HeaderSeparator>
    </header>
  );
}

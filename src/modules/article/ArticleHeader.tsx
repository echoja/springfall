import type { Category } from "@modules/category";
import { getCategoryLabel } from "@modules/category";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import style from "./ArticleHeader.module.css";
import { i18n, type Locale } from "@common/config";
import { getLocalesForSlug } from "@modules/i18n/available";
import { isLocale } from "@modules/i18n/util";

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
  url,
}: IArticleHeaderProps) {
  // Build language switch candidates from explicit manifest
  // Only show when at least two locales exist for this slug.
  let languageLinks: Array<{ locale: string; href: string }> = [];
  let currentLocale: Locale = i18n.defaultLocale;
  try {
    const u = new URL(url, "http://x");
    // pathname may be "/article/..." or "/<locale>/article/..."
    const parts = u.pathname.split("/").filter(Boolean);
    const first = parts[0];
    const isPrefixed = isLocale(first ?? "");
    const slugParts = isPrefixed ? parts.slice(1) : parts;
    const slug = slugParts.join("/"); // e.g., "article/2025-08/effective-burn-out-tips"
    currentLocale = isPrefixed ? (first as Locale) : i18n.defaultLocale;

    const available = getLocalesForSlug(slug);
    if (available.length >= 2) {
      languageLinks = available.map((l) => ({
        locale: l,
        href: `/set-locale?locale=${l}&to=/${l}/${slug}`,
      }));
    }
  } catch {
    // ignore URL parse errors
  }

  return (
    <header className="mb-24">
      <div className="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
        <time dateTime={createdAt}>{dayjs(createdAt).format("YYYY.MM")}</time>
        {category && (
          <>
            <span className="opacity-50"> | </span>
            <span>{getCategoryLabel(category, currentLocale)}</span>
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
      {languageLinks.length >= 2 ? (
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 flex gap-2 flex-wrap items-center">
          <span className="opacity-70">Available:</span>
          {languageLinks.map((l) =>
            l.locale === currentLocale ? (
              <span
                key={l.locale}
                aria-current="true"
                className="font-semibold text-gray-900 dark:text-gray-100"
              >
                {l.locale}
              </span>
            ) : (
              <a
                key={l.locale}
                href={l.href}
                className="underline decoration-dotted hover:opacity-80"
              >
                {l.locale}
              </a>
            ),
          )}
        </div>
      ) : null}
    </header>
  );
}

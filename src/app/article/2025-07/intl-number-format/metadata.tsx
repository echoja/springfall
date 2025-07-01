import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import currency from "./currency.jpg";

export const title = "Intl.NumberFormat 제대로 사용하기";
export const url = "https://springfall.cc/article/2025-07/intl-number-format";
export const summary =
  "글로벌 서비스에서는 언어 뿐만 아니라 숫자를 잘 보여줘야 합니다. `Intl.NumberFormat`을 사용하여 숫자를 잘 현지화하는 방법을 알아봅니다.";
export const createdAt = dayjs("2025-07-01").toISOString();
export const updatedAt = dayjs("2025-07-01").toISOString();
export const image = currency;
export const imageAlt = "각종 지폐";
export const category: Category = "기술";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  url,
  category,
  tags: [],
};

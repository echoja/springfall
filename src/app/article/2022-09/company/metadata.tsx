import type { ArticleItem } from "@modules/article/types";
import dayjs from "dayjs";
import i4 from "./i4.jpeg";

export const title = "개발자로서 회사에 들어와서 만 1년이 되기 직전 느낀 점";
const slug = "article/2022-09/company";
export const summary =
  "기록을 남겨두지 않으면 현재의 모습이 어디로부터 기원했는지를 알 방도가 없어집니다.";
export const createdAt = dayjs("2022-09-01").toISOString();
export const updatedAt = dayjs("2022-09-01").toISOString();
export const image = i4;
export const imageAlt = "도림천에서 달리고 있는 사람";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  slug,
  tags: [],
};

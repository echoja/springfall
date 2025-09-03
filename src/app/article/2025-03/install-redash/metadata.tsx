import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.png";

export const title = "운영 중인 서비스에 Redash 도입하기 (얕은 AWS 지식으로)";
const slug = "article/2025-03/install-redash";
export const summary =
  "AWS에 대한 지식 수준이 얕은 Frontend 개발자. 이미 잘 돌아가고 있는 서비스에 Redash를 도입해보며 겪은 어려움과 해결 방법을 공유합니다.";
export const createdAt = dayjs("2025-03-16").toISOString();
export const updatedAt = dayjs("2025-03-16").toISOString();
export const image = i1;
export const imageAlt = "여러 사람들이 데이터를 분석하는 모습";
export const category: Category = "기술";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  slug,
  category,
  tags: [],
};

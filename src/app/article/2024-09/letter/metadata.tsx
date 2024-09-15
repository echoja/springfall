import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./thumb.jpg";

export const title =
  "4년차 개발자(나)가 취직 전 프로젝트 열심히 하는 개발 꿈나무에게 전하는 메시지";
export const url = "https://springfall.cc/article/2024-09/letter";
export const summary =
  "IT연합동아리에 참여하는 대학생 친구들에게 현업자로서 피드백을 전달했어요";
export const createdAt = dayjs("2024-09-15").toISOString();
export const updatedAt = dayjs("2024-09-15").toISOString();
export const image = i1;
export const imageAlt = "따봉을 날리는 털수염 개발자 아저씨";
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

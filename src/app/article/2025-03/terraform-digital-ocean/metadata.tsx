import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import terraform from "./terraform.png";

export const title =
  "Terraform Cloud + DigitalOcean으로 웹앱 배포하기 (빈약한 k8s 지식과 월 7만 원으로)";
export const slug = "article/2025-03/terraform-digital-ocean";
export const summary =
  "인프라 지식이 빈약한 Frontend 개발자. Terraform Cloud로 멋있는 것들을 DigitalOcean에 성공적으로 배포하다.";
export const createdAt = dayjs("2025-03-26").toISOString();
export const updatedAt = dayjs("2025-03-26").toISOString();
export const image = terraform;
export const imageAlt =
  "테라폼으로 여러 리소스를 AWS와 같은 클라우드에 배포할 수 있어요";
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

import type { LucideIcon } from "lucide-react";
import { Coffee, Container, PenBox, Wand2 } from "lucide-react";
import type { Locale } from "@common/config";

export type Category = "회고" | "리뷰" | "기술" | "일상" | "기타" | "디자인";

export function getCategoryIcon(category: Category): LucideIcon {
  switch (category) {
    case "회고": {
      return Coffee;
    }
    case "리뷰": {
      return PenBox;
    }
    case "기술": {
      return Container;
    }
    case "일상": {
      throw new Error('Not implemented yet: "일상" case');
    }
    case "기타": {
      throw new Error('Not implemented yet: "기타" case');
    }
    case "디자인": {
      return Wand2;
    }
  }
}

export function getCategoryColor(category: Category): string {
  switch (category) {
    case "회고": {
      return "#e6ad4c";
    }
    case "리뷰": {
      return "#54bf26";
    }
    case "기술": {
      return "#a68ebf";
    }
    case "일상": {
      throw new Error('Not implemented yet: "일상" case');
    }
    case "기타": {
      throw new Error('Not implemented yet: "기타" case');
    }
    case "디자인": {
      return "#83c9e0";
    }
  }
}

export function renderCategoryIcon(Icon: LucideIcon) {
  return <Icon className="w-4 h-4 text-white" />;
}

export function getCategoryLabel(
  category: Category,
  locale: Locale,
): string {
  if (locale === "ko") return category;

  // English labels for categories
  switch (category) {
    case "회고":
      return "Retrospective";
    case "리뷰":
      return "Review";
    case "기술":
      return "Tech";
    case "일상":
      return "Life";
    case "기타":
      return "Misc";
    case "디자인":
      return "Design";
  }
}

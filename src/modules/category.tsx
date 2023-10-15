import type { LucideIcon } from "lucide-react";
import { Coffee } from "lucide-react";

export type Category = "회고" | "리뷰" | "기술" | "일상" | "기타";

export function getCategoryIcon(category: Category): LucideIcon {
  switch (category) {
    case "회고": {
      return Coffee;
    }
    case "리뷰": {
      throw new Error('Not implemented yet: "리뷰" case');
    }
    case "기술": {
      throw new Error('Not implemented yet: "기술" case');
    }
    case "일상": {
      throw new Error('Not implemented yet: "일상" case');
    }
    case "기타": {
      throw new Error('Not implemented yet: "기타" case');
    }
  }
}

export function getCategoryColor(category: Category): string {
  switch (category) {
    case "회고": {
      return "#e6ad4c";
    }
    case "리뷰": {
      throw new Error('Not implemented yet: "리뷰" case');
    }
    case "기술": {
      throw new Error('Not implemented yet: "기술" case');
    }
    case "일상": {
      throw new Error('Not implemented yet: "일상" case');
    }
    case "기타": {
      throw new Error('Not implemented yet: "기타" case');
    }
  }
}

export function renderCategoryIcon(Icon: LucideIcon) {
  return <Icon className="w-4 h-4 text-white" />;
}

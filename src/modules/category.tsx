import type { LucideIcon } from "lucide-react";
import { Coffee, Wand2, PenBox } from "lucide-react";

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
      throw new Error('Not implemented yet: "기술" case');
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
      throw new Error('Not implemented yet: "기술" case');
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

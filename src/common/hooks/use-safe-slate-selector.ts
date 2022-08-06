import type { Editor } from "slate";
import { useSlateSelector } from "slate-react";

export default function useSafeSlateSelector<T = Editor>(
  optionalSelector?: (editor: Editor) => T
) {
  const selector: (editor: Editor) => unknown = optionalSelector || ((e) => e);
  try {
    return useSlateSelector(selector) as T;
  } catch (e) {
    return null;
  }
}

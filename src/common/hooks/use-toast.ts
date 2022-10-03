import { useCallback } from "react";

export default function useToast() {
  return useCallback(
    ({
      description,
      status,
      title,
    }: {
      title?: string;
      description?: string;
      status?: "error" | "success" | "info";
    }) => {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-alert
        window.alert(`${status}: ${title} - ${description}`);
      }
    },
    []
  );
}

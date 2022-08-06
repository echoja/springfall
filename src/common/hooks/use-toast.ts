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
      // eslint-disable-next-line no-alert
      alert(`${status}: ${title} - ${description}`);
    },
    []
  );
}

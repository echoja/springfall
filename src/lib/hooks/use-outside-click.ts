// Hook
import { useCallback, useEffect, useState } from "react";

export default function useOnClickOutside(handler: () => void) {
  const [dom, setDom] = useState<HTMLElement | null>(null);

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { target } = e;

      if (!dom || !(target instanceof Element)) {
        return;
      }

      if (!dom.contains(target)) {
        handler();
      }
    },
    [handler, dom]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handleClick]);

  return { setDom };
}

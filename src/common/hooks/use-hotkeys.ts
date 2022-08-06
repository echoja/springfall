import type { HotkeysEvent, KeyHandler } from "hotkeys-js";
import hotkeys from "hotkeys-js";
import { useCallback, useEffect } from "react";

// 무조건 true로 간주.
hotkeys.filter = () => true;

export type Options = {
  element?: HTMLElement | null;
  enabled?: boolean;
  preventDefault?: boolean;
};

export function useHotkeys({
  callback,
  keys,
  element,
  enabled = true,
  preventDefault = true,
}: {
  keys: string;
  callback: KeyHandler;
  enabled?: boolean;
  element?: HTMLElement | null;
  preventDefault?: boolean;
}): void {
  const memoisedCallback = useCallback(
    (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (!element || document.activeElement === element) {
        callback(keyboardEvent, hotkeysEvent);
        return !preventDefault;
      }

      return !preventDefault;
    },
    [callback, element, preventDefault]
  );

  useEffect(() => {
    if (!enabled) {
      hotkeys.unbind(keys, memoisedCallback);
      return () => {};
    }

    hotkeys(keys, { element }, memoisedCallback);

    return () => hotkeys.unbind(keys, memoisedCallback);
  }, [memoisedCallback, keys, enabled, element]);
}

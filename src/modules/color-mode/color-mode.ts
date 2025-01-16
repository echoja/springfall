import { atom, createStore, useAtom, useStore } from "jotai";
import { useCallback } from "react";

type ColorMode = "dark" | "light";

const colorModeAtom = atom<ColorMode | null>(null);

export const store = createStore();

const getInitialColorMode = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const localStorageValue = window.localStorage.getItem(
    "colorMode",
  ) as ColorMode | null;

  if (localStorageValue) {
    return localStorageValue;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
};

const colorModeAtomWithStorage = atom(
  (get) => {
    const colorMode = get(colorModeAtom);
    if (colorMode) {
      return colorMode;
    }

    return getInitialColorMode();
  },

  (get, set, value: ColorMode) => {
    window.localStorage.setItem("colorMode", value);
    set(colorModeAtom, value);
  },
);

export const useColorMode = () => {
  const store = useStore();
  const [colorMode] = useAtom(colorModeAtomWithStorage, { store });

  return {
    colorMode,
    toggle: useCallback(() => {
      store.set(
        colorModeAtomWithStorage,
        colorMode === "light" ? "dark" : "light",
      );
    }, [colorMode, store]),
  };
};

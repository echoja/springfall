import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

export type ColorMode = "dark" | "light";

const colorModeAtom = atom<ColorMode | null>(null);

const colorModeAtomWithStorage = atom(
  (get) => {
    const colorMode = get(colorModeAtom);
    if (colorMode) {
      return colorMode;
    }

    if (typeof window !== "undefined") {
      const localStorageValue = window.localStorage.getItem(
        "colorMode"
      ) as ColorMode | null;
      if (localStorageValue) {
        return localStorageValue;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  },

  (get, set, value: ColorMode) => {
    window.localStorage.setItem("colorMode", value);
    set(colorModeAtom, value);
  }
);

/** 단 한번만 사용되어져야 합니다. */
export const useColorModeEffect = () => {
  const [colorMode] = useAtom(colorModeAtomWithStorage);

  useEffect(() => {
    if (colorMode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [colorMode]);
};

export const useColorMode = () => {
  const [colorMode, setColorMode] = useAtom(colorModeAtomWithStorage);

  return {
    colorMode,
    toggle: useCallback(() => {
      setColorMode(colorMode === "light" ? "dark" : "light");
    }, [colorMode, setColorMode]),
  };
};

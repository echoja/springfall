import { atom, createStore, useAtom, useStore } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";

export type ColorModeSetting = "light" | "dark" | "system";
/** @lintignore */
export type ResolvedColorMode = "light" | "dark";

const STORAGE_KEY = "colorMode";

// Stores the user-selected setting (light/dark/system).
const colorModeSettingAtom = atom<ColorModeSetting | null>(null);

export const store = createStore();

const getSystemPreference = (): ResolvedColorMode => {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialSetting = (): ColorModeSetting => {
  if (typeof window === "undefined") {
    return "system";
  }

  const raw = window.localStorage.getItem(
    STORAGE_KEY,
  ) as ColorModeSetting | null;
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }
  return "system";
};

// Derived atom that returns current setting, falling back to initial.
const colorModeSettingWithStorageAtom = atom(
  (get) => get(colorModeSettingAtom) ?? getInitialSetting(),
  (_get, set, value: ColorModeSetting) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    set(colorModeSettingAtom, value);
  },
);

export const useColorMode = () => {
  const jotaiStore = useStore();
  const [setting] = useAtom(colorModeSettingWithStorageAtom, {
    store: jotaiStore,
  });

  // Track system preference locally so components re-render on OS theme change.
  const [systemPref, setSystemPref] = useState<ResolvedColorMode>(() =>
    getSystemPreference(),
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (ev: MediaQueryListEvent) =>
      setSystemPref(ev.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    // Ensure state is accurate on mount.
    setSystemPref(mql.matches ? "dark" : "light");
    return () => mql.removeEventListener("change", handler);
  }, []);

  const resolved: ResolvedColorMode = useMemo(
    () => (setting === "system" ? systemPref : setting),
    [setting, systemPref],
  );

  const setMode = useCallback(
    (value: ColorModeSetting) => {
      jotaiStore.set(colorModeSettingWithStorageAtom, value);
    },
    [jotaiStore],
  );

  const toggle = useCallback(() => {
    // Cycle: light -> dark -> system -> light
    const next: ColorModeSetting =
      setting === "light" ? "dark" : setting === "dark" ? "system" : "light";
    jotaiStore.set(colorModeSettingWithStorageAtom, next);
  }, [jotaiStore, setting]);

  return { setting, resolved, setMode, toggle };
};

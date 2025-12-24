"use client";

import {
  useColorMode,
  type ColorModeSetting,
} from "@modules/color-mode/color-mode";
import { useCallback, useEffect, useRef, useState } from "react";
import { uiText } from "@modules/i18n/strings";
import { useLocale } from "@modules/i18n/useLocale";

function ThemeToggle(props: React.HTMLAttributes<HTMLDivElement>) {
  const { setting, setMode } = useColorMode();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const text = uiText[locale];

  useEffect(() => setMounted(true), []);

  const select = useCallback(
    (value: ColorModeSetting) => () => setMode(value),
    [setMode],
  );

  const selected = (value: ColorModeSetting) =>
    mounted ? setting === value : false;

  return (
    <div className="relative" ref={rootRef} {...props}>
      <div
        role="radiogroup"
        aria-label={text.themeLabel}
        className="inline-flex items-center overflow-hidden rounded-sm border border-gray-400/30 text-xs"
      >
        <SegButton
          label={text.themeSystem}
          checked={selected("system")}
          onClick={select("system")}
        />
        <SegButton
          label={text.themeLight}
          checked={selected("light")}
          onClick={select("light")}
        />
        <SegButton
          label={text.themeDark}
          checked={selected("dark")}
          onClick={select("dark")}
        />
      </div>
    </div>
  );
}

function SegButton({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!checked}
      onClick={onClick}
      className={
        "px-2.5 py-1 whitespace-nowrap transition " +
        (checked
          ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
          : "hover:bg-gray-400/10")
      }
    >
      {label}
    </button>
  );
}

export default ThemeToggle;

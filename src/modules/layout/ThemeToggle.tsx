"use client";

import { useColorMode } from "@modules/color-mode/color-mode";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";

const Icon = () => {
  const { colorMode } = useColorMode();

  const srOnly = useMemo(
    () => (
      <span className="sr-only">
        {colorMode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </span>
    ),
    [colorMode],
  );

  return (
    <>
      {colorMode === "light" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
      {srOnly}
    </>
  );
};

const DynamicIcon = dynamic(() => Promise.resolve(Icon), {
  ssr: false,
  loading: () => <Moon className="w-4 h-4" />,
});

const ThemeToggle = forwardRef<HTMLButtonElement>(
  function ThemeToggle(props, propRef) {
    const { toggle } = useColorMode();

    return (
      <button
        type="button"
        className="p-2 transition border rounded-sm shadow-xs hover:bg-gray-400/10 hover:opacity-90 border-gray-400/30"
        aria-label="theme toggle"
        onClick={toggle}
        ref={propRef}
        {...props}
      >
        <DynamicIcon />
      </button>
    );
  },
);

export default ThemeToggle;

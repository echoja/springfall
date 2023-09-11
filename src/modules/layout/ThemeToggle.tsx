import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

import { useColorMode } from "@modules/color-mode/color-mode";

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
        <RiMoonFill className="w-4 h-4" />
      ) : (
        <RiSunLine className="w-4 h-4" />
      )}
      {srOnly}
    </>
  );
};

const DynamicIcon = dynamic(() => Promise.resolve(Icon), {
  ssr: false,
  loading: () => <div style={{ width: "16px" }} />,
});

const ThemeToggle = forwardRef<HTMLButtonElement>(
  function ThemeToggle(props, propRef) {
    const { toggle } = useColorMode();

    return (
      <button
        type="button"
        className="p-2 transition border rounded shadow-sm hover:bg-gray-400/10 hover:opacity-90 border-gray-400/30"
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

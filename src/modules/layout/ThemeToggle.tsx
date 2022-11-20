import { useColorMode } from "@modules/color-mode/color-mode";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const Icon = () => {
  const { colorMode } = useColorMode();

  return colorMode === "light" ? (
    <RiMoonFill className="w-4 h-4" />
  ) : (
    <RiSunLine className="w-4 h-4" />
  );
};

const DynamicIcon = dynamic(() => Promise.resolve(Icon), {
  ssr: false,
  loading: () => <div style={{ width: "16px" }} />,
});

const ThemeToggle = forwardRef<HTMLButtonElement>(function ThemeToggle(
  props,
  propRef
) {
  const { toggle, colorMode } = useColorMode();

  return (
    <button
      type="button"
      className="p-4 transition rounded-full hover:bg-gray-400/10 hover:opacity-90"
      aria-label="theme toggle"
      onClick={toggle}
      ref={propRef}
      {...props}
    >
      <DynamicIcon />
      <span className="sr-only">
        {colorMode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </span>
    </button>
  );
});

export default ThemeToggle;

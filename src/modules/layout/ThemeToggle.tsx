import { useColorMode } from "@modules/color-mode/color-mode";
import { useMemo } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggle } = useColorMode();

  const Icon = useMemo(
    () => (colorMode === "light" ? RiMoonFill : RiSunLine),
    [colorMode]
  );

  return (
    <button type="button" aria-label="theme toggle" onClick={toggle}>
      <Icon />
    </button>
  );
};

export default ThemeToggle;

import { useMyStore } from "@common/store";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useMyStore();

  return (
    <button type="button" aria-label="theme toggle" onClick={toggleColorMode}>
      {colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
    </button>
  );
};

export default ThemeToggle;

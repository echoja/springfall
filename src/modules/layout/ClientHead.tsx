"use client";

import { useColorMode } from "@modules/color-mode/color-mode";

const ClientHead: React.FC = () => {
  const { colorMode } = useColorMode();
  return (
    <meta
      name="theme-color"
      content={colorMode === "light" ? "#ffffff" : "#1e293b"}
    />
  );
};

export default ClientHead;

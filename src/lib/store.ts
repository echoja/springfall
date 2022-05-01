import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create<{
  colorMode: "dark" | "light";
  toggleColorMode: () => void;
}>()(
  devtools((set) => ({
    colorMode: "light",
    toggleColorMode: () =>
      set((state) => ({
        colorMode: state.colorMode === "dark" ? "light" : "dark",
      })),
  }))
);

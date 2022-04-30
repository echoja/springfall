import type { DeepPartial, Theme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

export const Button: DeepPartial<Theme["components"]["Button"]> = {
  baseStyle: {
    fontFamily: "heading",
  },
};

export const customTheme = extendTheme({
  fonts: {
    body: "'Iropke Batang', Lexend, sans-serif",
    heading: "Lexend, serif",
  },
  colors: {
    brand: {
      100: "",
      200: "",
      300: "",
      400: "",
      500: "",
      600: "",
      700: "",
      800: "",
      900: "",
    },
  },
  components: {
    Button,
  },
});

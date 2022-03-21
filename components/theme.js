import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const fonts = {
  heading: "Raleway",
  body: "Inter",
};

const colors = {
  black: "#111",
};

const theme = extendTheme({
  breakpoints,
  colors,
  fonts,
});

export default theme;
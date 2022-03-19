import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Raleway",
  body: "Inter",
};

const colors = {
  black: "#111",
};

const theme = extendTheme({
  colors,
  fonts,
});

export default theme;

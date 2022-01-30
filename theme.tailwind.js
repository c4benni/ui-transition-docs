const colors = require("tailwindcss/colors");

module.exports = {
  screens: {
    xxs: "0",
    xs: "349px",
    sm: "599px",
    md: "959px",
    lg: "1279px",
    xl: "1919px",
  },
  colors: {
    transparent: "transparent",
    current: "currentColor",
    inherit: "inherit",
    "surface-dark": "#16161a",
    "card-dark": "#242629",
    "card-heading-dark": "#fffffe",
    "card-paragraph-dark": "#94a1b2",
    card: "#d1d1e9",
    "card-heading": "#2b2c34",
    "card-paragraph": "#2b2c34",
    surface: "#fffffe",
    "headline-dark": "#fffffe",
    headline: "#2b2c34",
    "paragraph-dark": "#94a1b2",
    paragraph: "#2b2c34",
    "primary-dark": "#7f5af0",
    primary: "#6246ea",
    "primary-text-dark": "#fffffe",
    "primary-text": "#fffffe",
    "secondary-dark": "#72757e",
    secondary: "#d1d1e9",
    "tertiary-dark": "#2cb67d",
    tertiary: "#e45858",
    "highlight-dark": "#7f5af0",
    hightlight: "#6246ea",
    white: colors.white,
    black: colors.black,
    red: colors.red,
    blue: colors.blue,
    green: colors.green,
    gray: colors.neutral
  },
  extend: {
    zIndex: {
      1: "1",
    },
    gridTemplateRows: {
      "[auto,auto,1fr]": "auto auto 1fr",
    },
    spacing: {
      128: "32rem",
      144: "36rem",
    },
    borderRadius: {
      xs: "2px",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "28px",
    },
  },
};

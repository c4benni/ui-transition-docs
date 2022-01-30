const theme = require("./theme.tailwind");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "class",
  theme,
  variants: {
    extend: {
      textOpacity: ["dark"],
      backgroundOpacity: ["dark"],
      borderOpacity: ["dark"],
      ringOpacity: ["dark"],
    },
  },
  plugins: [],
  important: true,
};

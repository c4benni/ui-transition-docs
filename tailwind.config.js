const theme = require("./theme.tailwind");
const plugin = require("tailwindcss/plugin");

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
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("can-hover", ["@media (pointer: fine) and (hover: hover)"]);
    }),
  ],
  important: true,
};

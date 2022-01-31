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
      addVariant("supports-blur", ["@supports (backdrop-filter: blur(1px))"]);
      addVariant("not-supports-blur", [
        "@supports not (backdrop-filter: blur(1px))",
      ]);
    }),
  ],
  important: true,
};

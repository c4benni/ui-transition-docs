import { ref, watch } from "vue";
import { mediaListener } from "./main";

export type ThemeIs = "light" | "dark";

interface Theme {
  current: ThemeIs;
  is: ThemeIs;
  dark: boolean;
  light: boolean;
}

const addHTMLClass = (val: ThemeIs, old: ThemeIs) => {
  const html = document.documentElement;

  html.classList.add(old);

  html.classList.replace(old, val);
};

const theme = ref<Theme>({
  current: "dark",
  get is() {
    return this.current;
  },
  set is(val) {
    if (/^light$|^dark$/.test(val)) {
      this.current = val;

      addHTMLClass(val, val === "dark" ? "light" : "dark");
    }
  },
  get dark() {
    return this.is === "dark";
  },
  set dark(val) {
    if (typeof val == "boolean") {
      this.current = val ? "dark" : "light";
      addHTMLClass(this.current, val ? "light" : "dark");
    }
  },
  get light() {
    return this.is === "light";
  },
  set light(val) {
    if (typeof val == "boolean") {
      this.current = val ? "light" : "dark";
      addHTMLClass(this.current, val ? "dark" : "light");
    }
  },
});

export function themeMediaListener() {
  const currentTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const callback = (isDark: boolean) => {
    if (isDark) {
      theme.value.is = "dark";
    } else {
      theme.value.is = "light";
    }
  };

  callback(currentTheme.matches);

  mediaListener({
    media: currentTheme,
    callback: (e) => {
      callback(e.matches);
    },
  });
}

export default theme;

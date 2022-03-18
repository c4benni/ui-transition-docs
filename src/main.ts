import { createApp } from "vue";
import App from "./App.vue";

import uiTransition from "ui-transition";

import "./assets/main.css";
import { InstallOptions } from "ui-transition/dist/src/types";

const app = createApp(App);

app.use(uiTransition, {
  props: {
    appear: false,
    spring: "default",
  },
  transitions: {
    scale: (from = 0, to = 1) => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `scale3d(${step(from, to)}, ${step(from, to)}, 1)`,
          },

          leave: {
            transform: `scale3d(${step(to, from)}, ${step(to, from)}, 1)`,
          },
        };

        return build[phase];
      },
    }),

    rotate: (from = 360, to = 0) => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `rotate(${step(from, to)}deg)`,
            willChange: "transform",
          },

          leave: {
            transform: `rotate(${step(to, from)}deg)`,
            willChange: "transform",
          },
        };

        return build[phase];
      },
    }),

    rotateX: (from: number = 0, to: number = 180) => {
      return {
        frame: (step, phase) => {
          const build = {
            enter: {
              transform: `rotateX(${step(from, to)}deg)`,
            },
            leave: {
              transform: `rotateX(${step(to, from)}deg)`,
            },
          };

          return build[phase];
        },
      };
    },

    slideY: (from = 100, to = 0) => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `translate3d(0, ${step(from, to)}%, 0)`,
          },

          leave: {
            transform: `translate3d(0, ${step(to, from)}%, 0)`,
          },
        };

        return build[phase];
      },
    }),

    drawer: () => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `translate3d(0, calc(${step(100, 0)}% - ${step(
              96,
              -16
            )}px), 0)`,
          },
          leave: {
            transform: `translate3d(0, calc(${step(0, 100)}% - ${step(
              -16,
              96
            )}px), 0)`,
          },
        };

        return build[phase];
      },
    }),

    slideX: (from = 100, to = 0, unit = "%") => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `translate3d(${step(from, to)}${unit}, 0, 0)`,
          },

          leave: {
            transform: `translate3d(${step(to, from)}${unit}, 0, 0)`,
          },
        };

        return build[phase];
      },
    }),
  },
} as InstallOptions);

app.mount("body");

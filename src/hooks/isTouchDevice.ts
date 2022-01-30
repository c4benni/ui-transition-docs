import { ref } from "vue";
import { mediaListener } from "../utils/main";

let installed = false;

const state = ref({
  touchDevice: false,
  strictTouch: false,
});

export default function isTouchDevice() {
  if (installed) return state;

  const touchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0;

  state.value = {
    ...state.value,
    touchDevice,
  };

  const strictTouch = (value: boolean) => {
    state.value = {
      ...state.value,
      strictTouch: value,
    };
  };

  const media = window.matchMedia("(pointer: coarse)");

  strictTouch(media.matches);

  mediaListener({
    media,
    callback: (e) => {
      strictTouch(e.matches);
    },
  });

  installed = true;

  return state;
}

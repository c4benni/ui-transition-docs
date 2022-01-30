import { ref } from "vue";
import Breakpoint, { BreakpointOutput } from "../utils/breakpoints";

export interface BreakpointHook extends BreakpointOutput {
  isMobile?: boolean;
}

const state = ref<BreakpointHook>({});

let installed = false;

const screenSizes = {
  xxs: "0",
  xs: "349px",
  sm: "599px",
  md: "959px",
  lg: "1279px",
  xl: "1919px",
};

export default function useBreakpoint() {
  if (!installed) {
    const updateBreakpoint = (br: BreakpointOutput) =>
      (state.value = {
        ...state.value,
        ...br,
        isMobile: /xxs|xs|sm/.test(br.is||'')
      });

    const breakpoint: BreakpointOutput = new Breakpoint({
      config: screenSizes,
      useOrientation: true,
      onChange: (evt: BreakpointOutput) => {
        updateBreakpoint(evt);
      },
    });

    updateBreakpoint({
      is: breakpoint.is,
      orientation: breakpoint.orientation,
    });

    installed = true;
  }

  return state;
}

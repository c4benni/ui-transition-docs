<template>
  <div
    :class="[
      'w-full overflow-hidden relative',
      {
        'h-full': !breakpoint.isMobile,
        [`h-[min(320px,85vh)] xxs:landscape:h-[min(320px,85vh)] xs:h-[min(500px,70vh)] max-w-[424px] mx-auto mt-2 mb-9 rounded-lg border ${classNames.divideColor}`]:
          breakpoint.isMobile,
      },
    ]"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBreakpoint from "../../../../../../../hooks/useBreakpoints";
import classNames from "../../../../../../../utils/classNames";

export default defineComponent({
  name: "CustomizableWireframe",
  setup() {
    const breakpoint = useBreakpoint();
    return { breakpoint, classNames };
  },
});
</script>

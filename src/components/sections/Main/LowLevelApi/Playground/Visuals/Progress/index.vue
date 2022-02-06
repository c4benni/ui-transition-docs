<template>
  <Wireframe class="flex flex-col isolate">
    <p
      class="mt-[24px] pb-[8px] mb-[32px] border-b border-gray-200 dark:border-gray-700 mx-[12px] font-bold text-[1.25em]"
    >
      Progress
    </p>

    <div class="px-[16px] grid items-center h-full content-center gap-y-[24px] -mt-[44px]">
      <div
        class="h-[32px] w-full rounded-full relative isolate grid justify-center items-center font-medium text-white bg-green-700/10 dark:bg-green-500/5 border-[2px] border-gray-200 dark:border-gray-700/30"
      >
        <div
          class="absolute bg-green-700 dark:bg-green-500 h-full -z-1 rounded-full w-[75%] origin-left"
        />
        75%
      </div>

      <Button
        tag="div"
        tabindex="-1"
        size="sm"
        class="text-[14px] w-fit justify-self-center px-4 scale-100 translate-y-0"
      >
        Start
      </Button>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent, h, ref } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Button from "../../../../../../Inputs/Button.vue";

type FabStyle = "Custom" | "Android";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    Button
},

  setup() {
    
  },
});
</script>

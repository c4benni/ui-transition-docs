<template>
  <Wireframe>
    <p
      class="mt-[24px] pb-[8px] border-b border-gray-200 dark:border-gray-700 mx-[12px] font-bold text-[1.25em]"
    >
      Switch
    </p>

    <div
      class="flex items-center justify-center h-full mt-[-48px]"
    >
      <label for="check" class="mr-[8px] cursor-pointer text-paragraph dark:text-paragraph-dark"> Toggle </label>
      <Switch id="check" />
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Wireframe from "../Wireframe/index.vue";
import { visualsState } from "../../Snippet/state";
import Switch from "../../../../../../Inputs/Switch.vue";

export default defineComponent({
  name: "CustomizableScaleVisuals",
  components: { Wireframe, Switch },

  setup() {},
});
</script>

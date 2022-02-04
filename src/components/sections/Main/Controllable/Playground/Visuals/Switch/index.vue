<template>
  <Wireframe>
    <div
      class="flex items-center justify-center h-full"
    >
      <label for="check" class="mr-[8px] text-paragraph dark:text-paragraph-dark"> Toggle </label>
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

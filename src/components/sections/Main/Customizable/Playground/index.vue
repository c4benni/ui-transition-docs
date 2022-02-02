<template>
  <div
    class="grid md:grid-flow-col md:gap-x-6 pt-6 md:pt-12 w-full md:grid-cols-[400px,1fr]"
  >
    <Mockup
      v-if="!breakpoint.isMobile"
      class="h-[calc(100vh-56px)] max-h-[600px] w-[312px]"
    >
      <Visuals />
    </Mockup>

    <Snippet>
      <Visuals v-if="breakpoint.isMobile" />
    </Snippet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBreakpoint from "../../../../../hooks/useBreakpoints";
import Mockup from "./Mockup.vue";
import Visuals from "./Visuals/index.vue";
import Snippet from "./Snippet/index.vue";

export default defineComponent({
  name: "CustomizablePlayground",
  components: { Mockup, Visuals, Snippet },
  setup() {
    const breakpoint = useBreakpoint();

    return {
      breakpoint,
    };
  },
});
</script>

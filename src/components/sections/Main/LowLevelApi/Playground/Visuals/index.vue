<template>
  <Component :is="render"/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { activeSnippet } from "../Snippet/state";
import Tabs from "../Snippet/Tabs.vue";
import Path from "./Path/index.vue";
import Scroll from "./Scroll/index.vue";
import Accordion from "./Accordion/index.vue";
import Progress from "./Progress/index.vue";

export default defineComponent({
  name: "CustomizableVisuals",
  components: { Tabs, Progress, Scroll, Path, Accordion  },
  setup() {
    const render = computed(()=>{
      return activeSnippet.value
    })

    return {
      render
    }
  },
});
</script>

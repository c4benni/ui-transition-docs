<template>
  <Component :is="render"/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Scale from "./Scale/index.vue";
import TranslateX from "./TranslateX/index.vue";
import TranslateY from "./TranslateY/index.vue";
import Rotate from "./Rotate/index.vue";
import { activeSnippet } from "../Snippet/state";

export default defineComponent({
  name: "CustomizableVisuals",
  components: { Scale, TranslateX, TranslateY, Rotate },
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

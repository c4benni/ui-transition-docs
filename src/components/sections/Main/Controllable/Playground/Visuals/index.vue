<template>
  <Component :is="render"/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Switch from "./Switch/index.vue";
import BottomSheet from "./BottomSheet/index.vue";
import { activeSnippet } from "../Snippet/state";
import FlipCard from "./FlipCard/index.vue";

export default defineComponent({
  name: "CustomizableVisuals",
  components: { Switch, BottomSheet, FlipCard },
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

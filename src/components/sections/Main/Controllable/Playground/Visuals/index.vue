<template>
  <Component :is="render"/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Switch from "./Switch/index.vue";
import BottomSheet from "./BottomSheet/index.vue";
import { activeSnippet } from "../Snippet/state";
import Tabs from "../Snippet/Tabs.vue";

export default defineComponent({
  name: "CustomizableVisuals",
  components: { Switch, BottomSheet, Tabs },
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

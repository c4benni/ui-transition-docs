<template>
  <Component :is="render"/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Fabs from "./Fabs/index.vue";
import NavMenu from "./NavMenu/index.vue";
import ShareDialog from "./ShareDialog/index.vue";
import { activeSnippet } from "../Snippet/state";
import Tabs from "../Snippet/Tabs.vue";

export default defineComponent({
  name: "CustomizableVisuals",
  components: { Fabs, NavMenu, Tabs, ShareDialog },
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

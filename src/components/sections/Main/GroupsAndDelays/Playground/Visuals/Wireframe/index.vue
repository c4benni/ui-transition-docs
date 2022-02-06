<template>
  <Wireframe>
    <slot/>
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Wireframe from "../../../../Wireframe.vue";

export default defineComponent({
    name: "CustomizableWireframe",
    components: { Wireframe }
});
</script>

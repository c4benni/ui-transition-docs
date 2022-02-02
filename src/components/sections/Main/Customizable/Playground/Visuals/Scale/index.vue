<template>
  <Wireframe>
    <GenericWireframe action-text="Open dialog" />
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Wireframe from "../Wireframe/index.vue";
import GenericWireframe from "../Wireframe/Generic.vue";

export default defineComponent({
    name: "CustomizableScaleVisuals",
    components: { Wireframe, GenericWireframe }
});
</script>

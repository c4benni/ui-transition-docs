<template>
  <IconWrapper tag="div" class="Loader">
    <Spinner />
  </IconWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconWrapper from "./icons/IconWrapper.vue";
import Spinner from "./icons/Spinner.vue";

export default defineComponent({
  name: "Loader",
  components: { IconWrapper, Spinner },
});
</script>

<style scoped>
@keyframes spin-loader {
  to {
    transform: rotate(1turn) translateZ(0);
  }
}

.Loader {
  opacity: 0.7;
  animation: spin-loader var(--duration, 0.75s) linear infinite;
}
</style>

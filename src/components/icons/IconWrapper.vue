<template>
  <span class="IconWrapper">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconWrapper",
});
</script>

<style scoped>
.IconWrapper {
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
}

.IconWrapper > svg {
  height: 1em;
  width: 1em;
  fill: currentColor;
  position: absolute;
  bottom: -0.125em;
}
</style>

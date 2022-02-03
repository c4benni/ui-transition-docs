<template>
  <ul
    class="pb-3 overflow-x-auto hide-scrollbar flex items-center h-[56px] fill-after after:h-[72px] after:w-[32px] after:left-auto after:right-[-12px] after:top-auto after-gradient pr-[34px] max-w-[calc(100vw-3rem)]"
  >
    <slot/>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Tabs",
  emits: ["tab-changed"],
});
</script>

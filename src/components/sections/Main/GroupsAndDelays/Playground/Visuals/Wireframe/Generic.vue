<template>
  <!-- header -->
  <slot name="header">
    <div
      v-if="showHeader"
      class="bg-white dark:bg-card-dark/50 h-[42px] w-full border-b border-gray-200 dark:border-gray-600/20 flex justify-between items-center px-[12px]"
    >
      <slot name="headerAction" />

      <div class="font-bold">App</div>

      <div class="w-[44px] h-[24px] rounded bg-current opacity-[0.07]" />
    </div>
  </slot>

  <!-- body -->
  <div class="p-[12px] w-full h-full">
    <div class="h-[35%] w-full rounded bg-current opacity-[0.08]" />

    <div
      class="w-[40%] h-[12px] mt-[8px] rounded-full bg-current opacity-[0.07]"
    />

    <div
      class="w-[70%] h-[10px] mt-[6px] rounded-full bg-current opacity-[0.07]"
    />

    <!-- grid -->
    <ul
      class="w-full grid grid-cols-2 gap-[12px] mt-[24px] fill-after after:z-1 gradient-after after:h-[42px] after:bottom-0 after:top-auto"
    >
      <li v-for="i in 4" :key="i" class="w-full">
        <div class="h-[96px] w-full bg-current opacity-[0.08] rounded" />
        <div
          class="w-[80%] h-[10px] rounded-full bg-current opacity-[0.07] mt-[6px]"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomizableGenericWireframes",
  emits: ["open-visual"],
  props: {
    showHeader: Boolean,
  },
  setup() {
  },
});
</script>

<style scoped lang="postcss">
.gradient-after::after {
  background-image: linear-gradient(
    to bottom,
    rgb(255, 255, 254, 0),
    rgb(255, 255, 254)
  );
}

.dark .gradient-after::after {
  background-image: linear-gradient(to bottom, rgb(0, 0, 0, 0), rgb(0 0 0));
}
</style>


<template>
  <div class="p-6 md:p-8 rounded bg-card dark:bg-card-dark">
      <h2
        class="text-card-heading dark:text-card-heading-dark font-extrabold text-2xl mb-3 leading-none"
      >
          {{title}}
      </h2>

      <div
        class="text-card-paragraph dark:text-card-paragraph-dark"
      >
          <slot/>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { requiredStringProp } from "../../../../utils/main";

export default defineComponent({
  name: "Card",
  props: {
    title: requiredStringProp,
  },
});
</script>

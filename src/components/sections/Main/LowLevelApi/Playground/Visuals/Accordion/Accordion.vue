<template>
  <Accordion
    v-model="active"
    :model-value="modelValue"
    :class="[
      'rounded-[12px] bg-card dark:bg-card-dark',
      {
        'border border-gray-400/30 dark:border-gray-600/20': modelValue,
      },
    ]"
    @update:modelValue="toggleModel"
  >
    <template #header>
      <button
        :class="[
          'outline-none grid w-full text-headline dark:text-headline-dark',
          { 'font-bold': modelValue, 'font-medium': !modelValue },
        ]"
      >
        <slot name="header" />
      </button>
    </template>

    <div>
      <slot />
    </div>
  </Accordion>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Accordion from "../../../../../../Accordion/index.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      default: undefined,
    },
  },
  components: {
    Accordion,
  },

  setup(_, { emit }) {
    const active = ref(false);

    const toggleModel = (e: boolean) => emit("update:modelValue", e);

    return {
      active,
      toggleModel,
    };
  },
});
</script>

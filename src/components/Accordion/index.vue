<template>
  <div>
    <slot name="header">
      <button @click="toggle(!getActive)">
        {{ summary }}
      </button>
    </slot>

    <div v-if="getActive">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { undefinedStringProp } from "../../utils/main";

export default defineComponent({
  name: "Accordion",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    summary: undefinedStringProp,
  },
  setup(p, { emit }) {
    const props = computed(() => p);

    const manualActive = ref(props.value.modelValue);

    const getActive = computed(() => {
      if (typeof props.value.modelValue === "boolean") {
        return props.value.modelValue;
      }

      return manualActive.value;
    }) as unknown as boolean;

    const toggle = (value: boolean) => {
      if (typeof props.value.modelValue === "boolean") {
        emit("update:modelValue", value);
      }

      manualActive.value = value;
    };

    return {
      toggle,
      getActive,
    };
  },
});
</script>

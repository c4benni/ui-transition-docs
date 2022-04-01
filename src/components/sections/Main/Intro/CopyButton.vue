<template>
  <Button
    :primary="false"
    size="lg"
    class="shrink-0 bg-primary/5 dark:bg-primary-dark/5 border-2 border-primary/5 dark:border-primary-dark/5 before:hidden font-mono text-lg text-headline/90 dark:text-headline-dark/90"
    @click="copyText"
  >
    {{ text }}
    <UiTransition
      :config="copyIcon.icon === 'CopyIcon' ? 'fade' : ['scale(0.75)', 'fade']"
    >
      <IconWrapper :key="copyIcon.icon" :class="copyIcon.class">
        <Component :is="copyIcon.icon" />
      </IconWrapper>
    </UiTransition>
  </Button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { copy } from "../../../../utils/main";
import Button from "../../../Inputs/Button.vue";
import IconWrapper from "../../../icons/IconWrapper.vue";
import CloseIcon from "../../../icons/Close.vue";
import CheckIcon from "../../../icons/Check.vue";
import CopyIcon from "../../../icons/Copy.vue";

interface CopyState {
  icon: "CloseIcon" | "CheckIcon" | "CopyIcon";
  class: "text-red-600" | "text-green-500" | "";
}

let timeout: number;

export default defineComponent({
  name: "CopyButton",
  setup() {
    const text = "npm i ui-transition";
    const _copyState = ref<"success" | "error" | "">("");

    const copyIcon = computed<CopyState>(() => {
      const copyState = _copyState.value;

      switch (copyState) {
        case "error":
          return {
            icon: "CloseIcon",
            class: "text-red-600",
          };
        case "success":
          return {
            icon: "CheckIcon",
            class: "text-green-500",
          };
        default:
          return {
            class: "",
            icon: "CopyIcon",
          };
      }
    });

    const copyText = async () => {
      if (_copyState.value) {
        return;
      }

      const reset = () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          _copyState.value = "";
          clearTimeout(timeout);
        }, 3000);
      };

      await copy({
        text,
        onSuccess: () => {
          _copyState.value = "success";
          reset();
        },
        onError: () => {
          _copyState.value = "error";
          reset();
        },
      });
    };

    return { text, copyIcon, copyText };
  },
  components: { Button, IconWrapper, CheckIcon, CloseIcon, CopyIcon },
});
</script>

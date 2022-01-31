<template>
  <li
    :class="[
      'p-6 md:p-8 rounded bg-card dark:bg-card-dark border-[0.75px] border-gray-400/30 dark:border-gray-700/20 relative fill-before before:bg-current before:transition-opacity before:opacity-0 can-hover:hover:before:opacity-[0.025]',
    ]"
  >
    <h3
      class="text-card-heading dark:text-card-heading-dark font-extrabold text-2xl mb-3 xs:mb-4 leading-none grid grid-flow-col xs:gap-x-3 sm:gap-x-4 justify-start items-center"
    >
      <IconWrapper v-if="breakpoint.is !== 'xxs'" class="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-surface dark:bg-surface-dark rounded-md border border-primary/30 dark:border-primary-dark/[0.15] text-2xl text-primary/80 dark:text-primary-dark/90 justify-center items-center">
        <slot name="icon" />
      </IconWrapper>
      {{ title }}
    </h3>

    <div
      class="text-card-paragraph dark:text-card-paragraph-dark sm:text-[0.875em] md:text-base leading-normal"
    >
      <slot />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBreakpoint from "../../../../hooks/useBreakpoints";
import classNames from "../../../../utils/classNames";
import { requiredStringProp } from "../../../../utils/main";
import IconWrapper from "../../../icons/IconWrapper.vue";

export default defineComponent({
  name: "Card",
  props: {
    title: requiredStringProp,
  },
  setup() {
    const breakpoint = useBreakpoint();

    return {
      classNames,
      breakpoint,
    };
  },
  components: { IconWrapper },
});
</script>

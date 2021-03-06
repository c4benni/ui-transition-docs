<template></template>

<script lang="ts">
import { computed, defineComponent, h, PropType } from "@vue/runtime-core";
import classNames from "../../utils/classNames";
import { eventKey } from "../../utils/eventKey";

type Size = "sm" | "md" | "lg";

export default defineComponent({
  name: "Button",

  props: {
    text: Boolean,
    icon: Boolean,
    disabled: Boolean,
    primary: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: "button",
    },
    href: {
      type: String,
      default: undefined,
    },
    size: {
      type: String as PropType<Size>,
      default: "md",
    },
  },

  setup(p, { slots, attrs }) {
    const props = computed(() => p);

    const getTag = computed(() => {
      if (props.value.href) {
        return "a";
      }
      return props.value.tag;
    });

    // const runEvent = (event: string, payload: any) => {
    //   if (typeof attrs[event] == "function") {
    //     // @ts-ignore
    //     attrs[event](payload);
    //   }
    // };

    const isButtonEl = getTag.value === "button";    

    return function () {
      return h(
        getTag.value,
        {
          ...attrs,
          role: isButtonEl ? undefined : "button",
          disabled: props.value.disabled || undefined,
          tabindex: props.value.disabled
            ? "-1"
            : attrs.tabindex
            ? attrs.tabindex
            : isButtonEl
            ? undefined
            : "0",
          class: [
            "Button fill-before",
            props.value.size,
            {
              primary: props.value.primary,
              text: props.value.text,
              [`${classNames.headline} icon before:bg-current before-interact`]:
                props.value.icon,
              "disabled grayscale opacity-60": props.value.disabled,
            },
          ],
          onKeydown: (e: KeyboardEvent) => {
            if (
              /space|enter/.test(eventKey(e)) &&
              !props.value.disabled &&
              !isButtonEl
            ) {
              e.preventDefault();
            }
          },
          onKeyup: (e: KeyboardEvent) => {
            if (
              /space|enter/.test(eventKey(e)) &&
              !props.value.disabled &&
              !isButtonEl
            ) {
              const self = e.target as unknown as HTMLElement;              

              self?.click?.();
            }
          },
        },
        [slots.default?.()]
      );
    };
  },
});
</script>

<style scoped lang="postcss">
.Button {
  @apply font-medium outline-none transform-gpu inline-grid justify-center items-center select-none transition-[opacity,transform,box-shadow] relative grid-flow-col gap-x-[0.5em] before:opacity-0 before:transition-opacity before:bg-current isolate before:-z-1;
}

.Button:not(.disabled) {
  @apply focus-visible:bg-opacity-70 active:scale-[0.95] md:active:scale-[0.985] active:opacity-90 active:before:opacity-20 can-hover:active:before:opacity-20 cursor-pointer;
}

.Button:not(.text){
  @apply can-hover:hover:before:opacity-5 can-hover:hover:bg-opacity-80;
}

.Button.disabled {
  @apply cursor-not-allowed;
}

.Button:focus-visible {
  clip-path: none !important;
}

.Button:not(.text) {
  @apply can-hover:hover:translate-y-[-1px] can-hover:active:translate-y-0;
}

.Button.primary:not(.text):not(.icon) {
  @apply bg-primary dark:bg-primary-dark text-primary-text dark:text-primary-text-dark;
}

.Button.primary.text {
  @apply text-primary dark:text-[hsl(250,85%,70%)];
}

.Button:not(.icon) {
  @apply focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent;
}

.Button {
  @apply active:bg-opacity-60;
}

.Button.sm {
  @apply px-3 h-[36px] rounded-sm text-[0.95rem];
  clip-path: inset(0 0 0 0 round 4px);
}

.Button.text.sm {
  @apply text-sm;
}

.Button.md {
  @apply px-4 h-[44px] rounded-md text-[1.05rem];
  clip-path: inset(0 0 0 0 round 8px);
}

.Button.text.sm {
  @apply text-base;
}

.Button.lg {
  @apply px-6 h-[56px] rounded-lg text-[1.25rem];
  clip-path: inset(0 0 0 0 round 12px);
}

.Button.text.sm {
  @apply text-lg;
}

.Button.text {
  @apply h-fit px-0 rounded-none can-hover:hover:opacity-80 active:opacity-70 w-fit;
  clip-path: none;
}

.Button.icon {
  @apply px-0 h-[36px] w-[36px] text-base rounded-full before:opacity-5 dark:before:opacity-[0.025] active:before:opacity-20 opacity-95 dark:opacity-80 active:opacity-100 bg-transparent;
}
</style>

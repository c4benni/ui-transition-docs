<script lang="ts">
import {
  h,
  computed,
  ref,
  nextTick,
  watch,
  PropType,
  resolveComponent,
} from "@vue/runtime-core";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-twilight.css";
import { defineComponent } from "@vue/runtime-core";
import { copy, requiredStringProp } from "../../utils/main";
import Intersection, { Entry } from "../Intersection.vue";
import { DynamicObject } from "../../types";
import useBreakpoint from "../../hooks/useBreakpoints";
import IconWrapper from "../icons/IconWrapper.vue";
import CopyIcon from "../icons/Copy.vue";
import CloseIcon from "../icons/Close.vue";
import CheckIcon from "../icons/Check.vue";

type Language = "css" | "js" | "html";

type CopyState = "" | "waiting" | "success" | "error";

export default defineComponent({
  components: {
    PrismEditor,
    Intersection,
    CheckIcon,
    CloseIcon,
    CopyIcon,
  },
  props: {
    code: requiredStringProp,
    maxHeight: requiredStringProp,
    lang: {
      type: String as PropType<Language>,
      default: "js",
    },
    tabs: {
      type: Array,
      default: undefined,
    },
  },
  setup(p) {
    const props = computed(() => p);
    const highlighted: DynamicObject<string> = {};
    const minHeight = ref();

    const breakpoint = useBreakpoint();

    const copyState = ref<CopyState>("");

    const getCopyIcon = computed(() => {
      if (copyState.value === "error") {
        return CloseIcon;
      }

      if (copyState.value === "success") {
        return CheckIcon;
      }

      return CopyIcon;
    });

    const formatCode = computed(() =>
      props.value.code
        .replace(
          /~\d+/g,
          (str: string) => `${" ".repeat(parseFloat(str.replace(/~/g, "")))}`
        )
    );

    function highlighter(code: string): string {
      if (highlighted[code]) return highlighted[code];

      return (highlighted[code] = highlight(
        formatCode.value,
        languages[props.value.lang]
      ));
    }

    const resetMinHeight = () => {
      minHeight.value = "";
    };

    watch(() => props.value.code, resetMinHeight);

    watch(() => props.value.lang, resetMinHeight);

    watch(() => breakpoint.value.is, resetMinHeight);

    return () => {
      return h(
        Intersection,
        {
          config: {
            rootMargin: "56px",
          },
        },
        {
          default: ({ isIntersecting, inactive, target }: Entry) => {
            if (!inactive && target && !minHeight.value && isIntersecting) {
              nextTick(() => {
                minHeight.value = `${target.getBoundingClientRect().height}px`;
              });
            }

            return h(
              "div",
              {
                class: "CodeSnippet",
                style: {
                  "--min-height": minHeight.value || undefined,
                  "--max-height": props.value.maxHeight || undefined,
                },
              },
              [
                h(
                  "div",
                  {
                    class: [
                      "h-8 flex items-center pl-[10px] border-b border-gray-600/50 dark:border-gray-700/60 fill-before-after relative before:w-2.5 before:h-2.5 after:w-2.5 after:h-2.5 before:rounded-full after:rounded-full before:bg-current before:opacity-20 after:bg-current after:opacity-20 before:top-auto after:top-auto after:translate-x-[calc(100%+0.3125rem)] before:left-[10px] after:left-[10px] pointer-events-none",
                    ],
                  },
                  [
                    h("span", {
                      class:
                        "rounded-full h-2.5 w-2.5 bg-current opacity-20 absolute translate-x-[calc(200%+0.625rem)]",
                    }),

                    h(
                      "div",
                      {
                        class:
                          "uppercase grid absolute right-[10px] gap-x-[6px] grid-flow-col items-center",
                      },
                      [
                        h(
                          "span",
                          {
                            class: "opacity-70",
                          },
                          [props.value.lang]
                        ),

                        h(
                          IconWrapper,
                          {
                            tag: "button",
                            title: "Copy",
                            class: [
                              "rounded-full h-[16px] w-[16px] pointer-events-auto",
                              {
                                "text-green-500": copyState.value === "success",
                                "text-red-500": copyState.value === "error",
                              },
                            ],
                            onClick: () => {
                              if (copyState.value) return;

                              copyState.value = "waiting";

                              copy({
                                text: formatCode.value,
                                onSuccess: () => {
                                  copyState.value = "success";
                                },
                                onError: () => {
                                  copyState.value = "error";
                                },
                                done: () => {
                                  const timeout = setTimeout(() => {
                                    copyState.value = "";
                                    clearTimeout(timeout);
                                  }, 3000);
                                },
                              });
                            },
                          },
                          {
                            default: () => h(getCopyIcon.value),
                          }
                        ),
                      ]
                    ),
                  ]
                ),
                isIntersecting
                  ? h(PrismEditor, {
                      highlight: highlighter,
                      modelValue: props.value.code,
                      lineNumbers: true,
                      readonly: true,
                      class: "content",
                    })
                  : null,
              ]
            );
          },
        }
      );
    };
  },
});
</script>

<style scoped lang="postcss">
.CodeSnippet {
  max-height: var(--max-height);
  min-height: var(--min-height);
  clip-path: inset(0 0 0 0 round 8px);
  @apply bg-[#222] dark:bg-card-dark font-mono rounded-md border border-gray-600/50 dark:border-gray-700/40;
  /* color: #ccc; */
  color: rgb(228, 227, 227);
  font-size: 14px;
}

.content {
  @apply p-[5px] pt-[7.5px];
  line-height: 1.5;
}

.content :deep(textarea) {
  outline: none;
}
</style>

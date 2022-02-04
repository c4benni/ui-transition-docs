<script lang="ts">
import { h, computed, ref, nextTick, watch, PropType } from "@vue/runtime-core";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
// import "prismjs/components/prism-markup-templating";
import "./main.css";
import { defineComponent } from "@vue/runtime-core";
import {
  copy,
  requiredStringProp,
  undefinedStringProp,
} from "../../utils/main";
import Intersection, { Entry } from "../Intersection.vue";
import { DynamicObject } from "../../types";
import useBreakpoint from "../../hooks/useBreakpoints";
import IconWrapper from "../icons/IconWrapper.vue";
import CopyIcon from "../icons/Copy.vue";
import CloseIcon from "../icons/Close.vue";
import CheckIcon from "../icons/Check.vue";
import Button from "../Inputs/Button.vue";

type Language = "css" | "js" | "html";

type CopyState = "" | "waiting" | "success" | "error";

type Tab = {
  title: string;
  active?: boolean;
};

export default defineComponent({
  emits: ["snippet-mounted", "tab-changed"],
  components: {
    PrismEditor,
    Intersection,
  },
  props: {
    code: requiredStringProp,
    maxHeight: requiredStringProp,
    minHeight: undefinedStringProp,
    snippetClass: undefinedStringProp,
    lang: {
      type: String as PropType<Language>,
      default: "js",
    },
    displayLang: undefinedStringProp,
    tabs: {
      type: Array as PropType<Tab[]>,
      default: undefined,
    },
  },
  setup(p, { emit }) {
    const props = computed(() => p);
    const highlighted: DynamicObject<string> = {};
    const minHeight = ref(props.value.minHeight || "");

    const breakpoint = useBreakpoint();

    const copyState = ref<CopyState>("");

    const copyStateValue = (
      waiting: any,
      error: any,
      success: any,
      initial: any
    ): any => {
      switch (copyState.value) {
        case "waiting" && waiting:
          return waiting;
        case "error":
          return error;
        case "success":
          return success;
        default:
          return initial;
      }
    };

    const getCopyIcon = computed(() => {
      return copyStateValue(null, CloseIcon, CheckIcon, CopyIcon);
    });

    const copyTitle = computed(() => {
      return copyStateValue("Processing", "Error copying", "Copied", "Copy");
    });

    const formatCode = computed(() =>
      props.value.code.replace(
        /~\d+/g,
        (str: string) => `\n${" ".repeat(parseFloat(str.replace(/~/g, "")))}`
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
      if (props.value.minHeight) return;
      minHeight.value = "";
    };

    const resetCopyState = () => (copyState.value = "");

    watch(
      () => props.value.code,
      () => {
        resetMinHeight();
        resetCopyState();
      }
    );

    watch(
      () => props.value.lang,
      () => {
        resetMinHeight();
        resetCopyState();
      }
    );

    watch(() => breakpoint.value.is, resetMinHeight);

    const divideColor = "border-b border-gray-600/50 dark:border-gray-700/60";

    const editorHeight = `calc(${props.value.maxHeight} - ${
      32 + (props.value.tabs ? 38 : 0)
    }px)`;

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
            const canSetMinHeight =
              !props.value.minHeight &&
              !inactive &&
              target &&
              !minHeight.value &&
              isIntersecting;

            if (canSetMinHeight) {
              nextTick(() => {
                minHeight.value = `${target.getBoundingClientRect().height}px`;
              });
            }

            return h(
              "div",
              {
                class: "CodeSnippet group",
                style: {
                  "--min-height": minHeight.value || undefined,
                  "--max-height": props.value.maxHeight || undefined,
                },
              },
              [
                h("div", {
                  class: 'relative fill-before before:opacity-0 before:transition-opacity before:duration-300 before:bg-current isolate before:-z-1 can-hover:group-hover:before:opacity-[0.035] rounded-t-[inherit]'
                }, [
                  h(
                    "div",
                    {
                      class: [
                        "h-[32px] flex items-center pl-[10px] fill-before-after relative before:w-2.5 before:h-2.5 after:w-2.5 after:h-2.5 before:rounded-full after:rounded-full before:bg-current before:opacity-20 after:bg-current after:opacity-20 before:top-auto after:top-auto after:translate-x-[calc(100%+0.3125rem)] before:left-[10px] after:left-[10px] pointer-events-none",
                        {
                          [divideColor]: !props.value.tabs,
                        },
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
                            [props.value.displayLang || props.value.lang]
                          ),

                          h(
                            IconWrapper,
                            {
                              tag: "button",
                              title: copyTitle.value,
                              class: [
                                "rounded-full h-[16px] w-[16px] pointer-events-auto",
                                {
                                  "text-green-500":
                                    copyState.value === "success",
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

                  props.value.tabs
                    ? h(
                        "ul",
                        {
                          class: [
                            "flex items-end px-[10px] overflow-x-auto h-[38px]",
                            divideColor,
                          ],
                        },
                        [
                          props.value.tabs.map((tab, index, arr) => {
                            return h(
                              Button,
                              {
                                key: tab.title,
                                primary: false,
                                size: "sm",
                                class: [
                                  "py-0 px-2 mr-1 h-[36px] rounded-none rounded-t-md clip-none translate-y-0",
                                  {
                                    "opacity-60": !tab.active,
                                    "border-b-[1.5px] font-bold before:opacity-[0.035] pointer-events-none": tab.active,
                                  },
                                ],
                                onClick: () => {
                                  emit("tab-changed", tab.title);

                                  resetCopyState();
                                },
                              },
                              {
                                default: () => tab.title,
                              }
                            );
                          }),
                        ]
                      )
                    : null,
                ]),
                true
                  ? h(PrismEditor, {
                      highlight: highlighter,
                      modelValue: props.value.code,
                      // lineNumbers: true,
                      readonly: true,
                      insertSpaces: false,
                      placeholder: "Code snippet",
                      class: [
                        "content",
                        {
                          "pt-3": props.value.tabs,
                        },
                        props.value.snippetClass,
                      ],
                      style: {
                        minHeight: editorHeight,
                        maxHeight: editorHeight,
                      },
                      tabindex: "-1",
                      onVnodeMounted: () => {
                        emit("snippet-mounted");
                      },
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
  @apply bg-[#222] dark:bg-[hsl(0,0%,10%)] font-mono rounded-md border border-gray-600/50 dark:border-gray-700/40;
  /* color: #ccc; */
  color: rgb(228, 227, 227);
  font-size: 14px;
}

.content {
  @apply p-[5px] pt-[7.5px] pl-[15px] select-auto;
  line-height: 1.5;
  overflow-y: auto;
}

.content :deep(textarea) {
  outline: none;
  pointer-events: none;
  visibility: hidden;
}

.content :deep(.prism-editor__container) {
  min-width: max-content;
}

.content :deep(pre) {
  white-space: pre;
}
</style>

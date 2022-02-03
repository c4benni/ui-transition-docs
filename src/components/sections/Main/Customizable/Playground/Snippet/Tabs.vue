<template>
  <ul
    class="pb-3 overflow-x-auto hide-scrollbar flex items-center h-[56px] fill-after after:h-[72px] after:w-[32px] after:left-auto after:right-[-12px] after:top-auto after-gradient pr-[34px]"
  >
    <Button
      v-for="(snippet, i) in snippets"
      :key="snippet.title"
      :primary="false"
      size="sm"
      tag="li"
      :class="[
        'grid-flow-row justify-items-center text-sm gap-y-1 translate-y-0 py-1 flex-shrink-0 scale-100 rounded-full mr-2',
        {
          'text-paragraph/60 dark:text-paragraph-dark/60 can-hover:hover:text-paragraph/100 dark:can-hover:hover:text-paragraph-dark/100':
            activeSnippet !== snippet.icon,
          [classNames.activeTab]: activeSnippet === snippet.icon,
        },
      ]"
      @click="changeSnippet(snippet.icon)"
    >
      {{ snippet.title }}
    </Button>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Scale from "../../../../../icons/Scale.vue";
import TranslateX from "../../../../../icons/TranslateX.vue";
import TranslateY from "../../../../../icons/TranslateY.vue";
import Rotate from "../../../../../icons/Rotate.vue";
import Button from "../../../../../Inputs/Button.vue";
import IconWrapper from "../../../../../icons/IconWrapper.vue";
import { activeSnippet, activeTab, Snippet } from "./state";
import classNames from "../../../../../../utils/classNames";

export default defineComponent({
  name: "Tabs",
  emits: ["tab-changed"],
  components: { Scale, TranslateX, TranslateY, Rotate, Button, IconWrapper },

  setup(_, { emit }) {
    const snippet = (icon: string, title?: string) =>
      ({
        icon,
        title: title || icon,
      } as { icon: Snippet; title: string });

    const snippets = [
      snippet("Scale"),
      snippet("TranslateX", "Translate X"),
      snippet("TranslateY", "Translate Y"),
      snippet("Rotate"),
    ];

    const changeSnippet = (tab: Snippet) => {
      activeSnippet.value = tab;

      activeTab.value = "App.vue";

      emit("tab-changed", tab);
    };

    return {
      classNames,
      snippets,
      activeSnippet,
      changeSnippet,
    };
  },
});
</script>

<style scoped lang="postcss">
.after-gradient::after {
  background-image: linear-gradient(
    to right,
    hsl(0, 0%, 100%, 0),
    hsl(0, 0%, 100%)
  );
}

.dark .after-gradient::after {
  background-image: linear-gradient(
    to right,
    hsl(180, 5%, 4%, 0),
    hsl(180, 5%, 4%)
  );
}
</style>

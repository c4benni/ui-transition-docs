<template>
  <ul class="pb-3 overflow-x-auto hide-scrollbar flex items-center h-[72px] fill-after after:h-[72px] after:w-[32px] after:left-auto after:right-[-12px] after:top-auto after-gradient">
    <template v-for="(snippet, i) in snippets" :key="snippet.title">
      <Button
        :primary="false"
        tag="li"
        :class="[
          'grid-flow-row justify-items-center text-sm gap-y-1 translate-y-0 h-[56px] py-1 flex-grow flex-shrink-0',
          {
            'text-paragraph dark:text-paragraph-dark opacity-70 dark:opacity-60 can-hover:hover:opacity-80':
              activeSnippet !== snippet.icon,
            'opacity-100':
              activeSnippet === snippet.icon,
          },
        ]"
        @click="changeSnippet(snippet.icon)"
      >
        <IconWrapper class="text-2xl">
          <Component :is="snippet.icon" />
        </IconWrapper>

        {{ snippet.title }}
      </Button>

      <li
        v-if="i <= snippets.length - 2"
        class="h-[65%] rounded-full w-[2px] bg-current opacity-20 pointer-events-none flex-shrink-0"
        aria-hidden="true"
      />
    </template>
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

export default defineComponent({
  name: "Tabs",
  emits: ["tab-changed"],
  components: { Scale, TranslateX, TranslateY, Rotate, Button, IconWrapper },

  setup(_, { emit }) {
    const snippet = (icon: string, title?: string) => ({
      icon,
      title: title || icon,
    } as  {icon: Snippet, title: string});

    const snippets = [
      snippet("Scale"),
      snippet("TranslateX", "Translate X"),
      snippet("TranslateY", "Translate Y"),
      snippet("Rotate"),
    ];

    const changeSnippet = (tab: Snippet) => {
      activeSnippet.value = tab;

      activeTab.value = 'App.vue'

      emit("tab-changed", tab);
    };

    return {
      snippets,
      activeSnippet,
      changeSnippet,
    };
  },
});
</script>

<style scoped lang="postcss">
  .after-gradient::after{
    background-image: linear-gradient(to right, hsl(240,20%,99%,0), hsl(240,20%,99%) 30%);
  }

  .dark .after-gradient::after{
    background-image: linear-gradient(to right, hsl(216,6%,10%,0), hsl(216,6%,10%) 30%);
  }
</style>

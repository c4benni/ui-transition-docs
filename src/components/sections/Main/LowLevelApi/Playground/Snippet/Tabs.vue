<template>
  <SnippetTabsWrapper>
    <Button
      v-for="(snippet, i) in snippets"
      :key="snippet"
      tag="li"
      :class="[
        'grid-flow-row justify-items-center text-sm gap-y-1 translate-y-0 py-1 flex-shrink-0 scale-100 rounded-full mr-2',
        {
          'text-paragraph dark:text-paragraph-dark opacity-70 dark:opacity-60 can-hover:hover:opacity-80':
            activeSnippet !== snippet,
          [classNames.activeTab]: activeSnippet === snippet,
        },
      ]"
      size="sm"
      :primary="false"
      @click="changeSnippet(snippet)"
    >
      {{ snippet }}
    </Button>
  </SnippetTabsWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import classNames from "../../../../../../utils/classNames";
import Button from "../../../../../Inputs/Button.vue";
import { activeSnippet, activeTab, Snippet } from "./state";
import SnippetTabsWrapper from "../../../SnippetTabsWrapper.vue";

export default defineComponent({
  name: "Tabs",
  emits: ["tab-changed"],
  components: { Button, SnippetTabsWrapper },

  setup(_, { emit }) {
    const snippets = ["Accordion", "Progress", "Scroll", "Path"] as Snippet[];

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
    hsl(0, 0%, 98%, 0),
    hsl(0, 0%, 98%) 30%
  );
}

.dark .after-gradient::after {
  background-image: linear-gradient(
    to right,
    hsl(180,5%,7%,0%),
    hsl(180,5%,7%) 30%
  );
}
</style>

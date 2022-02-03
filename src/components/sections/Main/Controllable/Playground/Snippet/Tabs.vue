<template>
  <ul
    class="pb-3 overflow-x-auto hide-scrollbar flex items-center h-[56px] fill-after after:h-[72px] after:w-[32px] after:left-auto after:right-[-12px] after:top-auto after-gradient pr-[34px]"
  >
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
      {{ snippet.replace(/BottomSheet/,'Bottom sheet') }}
    </Button>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import classNames from "../../../../../../utils/classNames";
import Button from "../../../../../Inputs/Button.vue";
import { activeSnippet, activeTab, Snippet } from "./state";

export default defineComponent({
  name: "Tabs",
  emits: ["tab-changed"],
  components: { Button },

  setup(_, { emit }) {
    const snippets = ["BottomSheet", "Switch", "Tabs"] as Snippet[];

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
    hsl(240, 20%, 99%, 0),
    hsl(240, 20%, 99%) 30%
  );
}

.dark .after-gradient::after {
  background-image: linear-gradient(
    to right,
    hsl(216, 6%, 10%, 0),
    hsl(216, 6%, 10%) 30%
  );
}
</style>

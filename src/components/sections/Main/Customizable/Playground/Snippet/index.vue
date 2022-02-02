<template>
  <div
    :class="[
      'w-full md:-mt-[64px]',
      {
        invisible: !snippetMounted,
      },
    ]"
  >
    <Tabs />
    <slot/>
    <CodeSnippet
      :code="getSnippet"
      min-height="400px"
      max-height="400px"
      snippet-class="max-w-[calc(100vw-2.75rem)] md:max-w-[600px]"
      class="max-w-[calc(100vw-1.5rem)] md:max-w-[600px]"
      :tabs="tabs"
      :lang="displayLang === 'Vue' ? 'html' : 'js'"
      :display-lang="displayLang"
      @tab-changed="changeTab"
      @snippet-mounted="onSnippetMounted"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CodeSnippet from "../../../../../CodeSnippet/index.vue";
import { activeSnippet, snippets, activeTab, Tab } from "./state";
import Tabs from "./Tabs.vue";

export default defineComponent({
  name: "Snippet",
  components: { CodeSnippet, Tabs },

  setup() {
    const snippetMounted = ref(false);

    const onSnippetMounted = () => (snippetMounted.value = true);

    const getSnippet = computed(() => {
      return snippets[activeSnippet.value][activeTab.value];
    });

    const changeTab = (tab: Tab) => {
      activeTab.value = tab;
    };

    const tabs = computed(() => {
      const tab = (title: Tab) => ({
        title,
        active: activeTab.value === title,
      });

      return [tab("App.vue"), tab("config.js")];
    });

    const displayLang = computed(() => {
      if (/^App/.test(activeTab.value)) return "Vue";
      return "Js";
    });

    return {
      snippetMounted,
      onSnippetMounted,
      getSnippet,
      changeTab,
      tabs,
      displayLang,
    };
  },
});
</script>

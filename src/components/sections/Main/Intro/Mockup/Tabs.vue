<template>
  <ul
    :class="[
      'h-[64px] absolute bottom-0 w-full border-t-[0.75px] flex justify-around bg-white dark:bg-surface-dark pb-[16px]  border-t-gray-200 dark:border-t-gray-800',
      'transform-gpu transition-transform',
      {
        'translate-y-[100%]':expanded
      }
    ]"
  >
    <IconWrapper
      v-for="(icon, i) in navIcons"
      :key="icon"
      tag="li"
      :class="[
        'text-[19px]',
        {
          'opacity-70': i !== 0,
          [primaryColor]: i === 0,
        },
      ]"
    >
      <Component :is="icon" />
    </IconWrapper>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PlayFilledIcon from "../../../../icons/PlayFilled.vue";
import CollectionsIcon from "../../../../icons/Collections.vue";
import SearchIcon from "../../../../icons/Search.vue";
import IconWrapper from "../../../../icons/IconWrapper.vue";

export default defineComponent({
  name: "Tabs",

  components: {
    IconWrapper,
    PlayFilledIcon,
    CollectionsIcon,
    SearchIcon,
  },

  props: {
    expanded:Boolean,
    primaryColor: {
      type: String,
      required: true,
    },
    classNames: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const navIcons = ["PlayFilledIcon", "CollectionsIcon", "SearchIcon"];

    return {
      navIcons,
    };
  },
});
</script>

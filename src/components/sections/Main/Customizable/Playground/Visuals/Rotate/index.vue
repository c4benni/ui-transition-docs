<template>
  <Wireframe class="flex flex-col">
    <ul
      class="flex border-y border-gray-200 dark:border-gray-800 h-fit rounded-t-sm"
    >
      <Button
        v-for="(tab, i) in tabs"
        :key="tab"
        tag="li"
        tabindex="-1"
        size="sm"
        :class="[
          'scale-100 translate-y-0 w-full flex-grow px-0 rounded-none clip-none text-[14px] h-[42px] md:h-[36px]',
          {
            'rounded-tl-[inherit]': i === 0,
            'border-l border-l-gray-200 dark:border-l-gray-800 rounded-tr-[inherit]':
              i === 1,
            'font-bold border-b-[1.5px] border-primary text-primary dark:border-primary-dark dark:text-primary-dark':
              i === rotateState,
            'opacity-60 can-hover:hover:opacity-80': rotateState !== i,
          },
        ]"
        :primary="false"
        @click="changeTab(i)"
      >
        {{ tab }}
      </Button>
    </ul>

    <p class="text-paragraph dark:text-paragraph-dark px-[16px] mt-[24px]">
      Switch tabs and watch Fab below for effect.
    </p>

    <Button
      class="w-[56px] h-[56px] rounded-[16px] text-2xl absolute right-[20px] bottom-[20px] md:bottom-[42px] md:right-[16px] translate-y-0 scale-100 shadow-xl clip-none bg-green-600 dark:bg-green-500 text-white"
      :primary="false"
    >
      <IconWrapper>
        <Component :is="rotateState === 0 ? 'Phone' : 'NewMessage'" />
      </IconWrapper>
    </Button>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Wireframe from "../Wireframe/index.vue";
import GenericWireframe from "../Wireframe/Generic.vue";
import { visualsState } from "../../Snippet/state";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Check from "../../../../../../icons/Check.vue";
import Close from "../../../../../../icons/Close.vue";
import Button from "../../../../../../Inputs/Button.vue";
import NewMessage from "../../../../../../icons/NewMessage.vue";
import Phone from "../../../../../../icons/Phone.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    GenericWireframe,
    IconWrapper,
    Check,
    Close,
    Button,
    NewMessage,
    Phone
},

  setup() {
    const rotateState = computed(() => visualsState.value.Rotate);

    const tabs = ["Call", "Message"];

    const changeTab = (tab: number) =>
      (visualsState.value = {
        ...visualsState.value,
        Rotate: tab,
      });

    return {
      rotateState,
      tabs,
      changeTab,
    };
  },
});
</script>

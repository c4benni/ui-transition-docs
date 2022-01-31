<template>
  <div
    :class="[
      'h-[calc(100%-1rem)] bottom-[16px] absolute w-full pointer-events-none',
      'transform-gpu transition-transform bg-white dark:bg-surface-dark border',
      classNames.divideColor,
      {
        'translate-y-[calc(100%-96px)]': !expanded,
        'rounded-t-[16px] translate-y-[16px] shadow-t': expanded
      }
    ]"
  >
    <div :class="[
      'flex justify-between items-center h-[48px] px-[12px] pointer-events-auto',
      {
        invisible: expanded
      }
    ]"
      @click="$emit('toggle-expand', true)"
    >
      <Img
        :public-id="artwork"
        quality="50"
        class="h-[38px] w-[38px] rounded-[4px]"
      />

      <p class="truncate mx-[8px] text-[0.8em]">
        {{ title }}
      </p>

      <div class="grid grid-flow-col gap-x-[8px] text-[1.2em]">
        <IconWrapper 
            v-for="icon in collapsedIcons" 
            :key="icon.title"
            :tag="icon.onClick ? 'button' : 'span'"
            tabindex="-1"
            @click="icon.onClick"
        >
          <Component :is="icon.title" />
        </IconWrapper>
      </div>
    </div>

    <!-- drawer content -->
    <Content
        :src="artwork"
        :expanded="expanded"
        :class-names="classNames"
        :title="title"
        :primary-color="primaryColor"
        :playing="playing"
        @is-playing="e => playing = e"
    />

    <!-- after enter show close icon -->
    <IconWrapper
      v-if="expanded"
      tag="button"
      tabindex="-1"
      :class="[
        'text-[1.25em] absolute top-[6px] right-[10px] pointer-events-auto',
        classNames.paragraph
      ]"
      @click="$emit('toggle-expand', false)"
    >
      <CloseFilled/>
    </IconWrapper>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Img from "../../../../../Img.vue";
import IconWrapper from "../../../../../icons/IconWrapper.vue";
import PlayIcon from "../../../../../icons/Play.vue";
import PauseIcon from "../../../../../icons/Paused.vue";
import Forward from "../../../../../icons/Forward.vue";
import CloseFilled from "../../../../../icons/CloseFilled.vue";
import Content from "./Content.vue";
import { requiredProp, requiredStringProp } from "../../../../../../utils/main";

export default defineComponent({
  name: "Drawer",
  components: { Img, IconWrapper, PlayIcon, 
  Forward, CloseFilled, Content, PauseIcon },
  emits:['toggle-expand'],

  props:{
    expanded:Boolean,
    classNames: requiredProp(Object),
    primaryColor: requiredStringProp
  },

  setup() {
      const playing = ref(false);

    const title = "The Move to End Congressional Stock trading";

    const collapsedIcons = computed(()=> [{
        title: playing.value ? "PauseIcon": "PlayIcon",
        onClick: (e: Event)=> {
            e.stopPropagation();

            playing.value = !playing.value
        }
    }, {
        title: "Forward"
    }]);

    const artwork = 'intro-mockup/podcast/daily-show_y01a50.jpg'

    return { title, collapsedIcons, artwork, playing };
  },
});
</script>

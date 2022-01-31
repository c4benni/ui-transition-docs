<template>
  <div
    :class="[
      'mt-[-32px] pointer-events-auto isolate',
      {
        invisible: !expanded,
      },
    ]"
  >
    <Img
      :public-id="src"
      :class="[
        'w-[calc(100%-32px)] h-[224px] mt-[16px] mx-auto rounded-[6px] shadow-xl object-cover',
        'transform-gpu transition-transform',
        {
            'scale-75':!playing
        }
      ]"
    />

    <div
      :class="[
        'w-[calc(100%-32px)] mx-auto text-[0.65em] grid justify-between grid-rows-2 gap-y-[4px] mt-[4px]',
        classNames.paragraph,
      ]"
    >
      <div class="elapsed-time fill-before" />

      <span class="row-start-2"> 3:42 </span>

      <span class="row-start-2"> -13:05 </span>
    </div>

    <div
      :class="[
        'whitespace-nowrap pl-[16px] mt-[8px] fill-after after:z-10 after:left-auto after:right-0 relative after:w-[32px] gradient-after',
      ]"
    >
      <p :class="['font-medium']">
        {{ title }}
      </p>

      <p :class="[primaryColor]">
        The Daily Show With Trevor Noah: Ears Edition - 31st January 2022
      </p>
    </div>

    <div
      :class="[
        'grid grid-flow-col justify-between px-[16px] my-[32px] w-[75%] mx-auto',
        classNames.headline,
      ]"
    >
      <IconWrapper
        v-for="action in actionIcons"
        :key="action.icon"
        :tag="action.onClick ? 'button' : 'span'"
        :tabindex="action.onClick ? '-1' : undefined"
        :class="[
          {
            'text-[2em] opacity-90': !action.onClick,
            'text-[2.5em]': action.onClick,
          },
        ]"
        @click="action.onClick"
      >
        <Component :is="action.icon" />
      </IconWrapper>
    </div>

    <div
      :class="[
        'text-[0.75em] grid grid-flow-col gap-x-[8px] px-[16px] w-full grid-cols-[auto,1fr,auto] items-center',
        classNames.paragraph,
      ]"
    >
      <IconWrapper>
        <VolumeMute />
      </IconWrapper>

      <div :class="['volume fill-before']" />

      <IconWrapper>
        <VolumeFull />
      </IconWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import PlayIcon from "../../../../../icons/Play.vue";
import PauseIcon from "../../../../../icons/Paused.vue";
import ForwardIcon from "../../../../../icons/Forward.vue";
import RewindIcon from "../../../../../icons/Rewind.vue";

import { requiredProp, requiredStringProp } from "../../../../../../utils/main";
import Img from "../../../../../Img.vue";
import IconWrapper from "../../../../../icons/IconWrapper.vue";
import VolumeMute from "../../../../../icons/VolumeMute.vue";
import VolumeFull from "../../../../../icons/VolumeFull.vue";

export default defineComponent({
  name: "DrawerContent",
  emits: ["is-playing"],
  components: {
    Img,
    PlayIcon,
    ForwardIcon,
    RewindIcon,
    PauseIcon,
    IconWrapper,
    VolumeMute,
    VolumeFull,
  },

  props: {
    expanded: Boolean,
    playing: Boolean,
    src: requiredStringProp,
    classNames: requiredProp(Object),
    title: requiredStringProp,
    primaryColor: requiredStringProp,
  },
  setup(p, { emit }) {
    const props = computed(() => p);

    const actionIcons = computed(() => [
      { icon: "RewindIcon" },
      {
        icon: props.value.playing ? "PauseIcon" : "PlayIcon",
        onClick: () => emit("is-playing", !props.value.playing),
      },
      {
        icon: "ForwardIcon",
      },
    ]);

    return {
      actionIcons,
    };
  },
});
</script>

<style scoped lang="postcss">
.elapsed-time,
.volume {
  @apply w-full h-[2px] rounded-full bg-paragraph/40 dark:bg-paragraph-dark/30 relative before:bg-paragraph dark:before:bg-paragraph-dark after:absolute after:rounded-full after:z-10 after:top-[50%] after:translate-y-[-50%] after:left-[calc(28.28%-3px)] before:rounded-full;
}

.elapsed-time {
  @apply col-start-1 col-end-3 self-end before:w-[28.28%] after:w-[6px] after:h-[6px] after:rounded-full after:shadow after:left-[calc(28.28%-3px)] after:bg-paragraph dark:after:bg-paragraph-dark;
}

.gradient-after::after {
  background-image: linear-gradient(to right, #ffffff00, #fff 70%);
}

.dark .gradient-after::after {
  background-image: linear-gradient(to right, #16161a00, #16161a 70%);
}

.volume {
  @apply before:w-[70%] after:w-[18px] after:h-[18px] after:shadow-md after:left-[calc(70%-3px)] after:bg-headline dark:after:bg-headline-dark ;
}
</style>

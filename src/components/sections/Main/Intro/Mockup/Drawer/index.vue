<template>
  <UiTransition
    :config="{
      enter: expanded ? 'drawer' : false,
      leave: expanded ? false : 'drawer',
    }"
    spring="stiff"
    retain-final-style
    #default="{ inProgress, animate }"
  >
    <div
      ref="drawerRoot"
      :style="
        !inProgress && !expanded
          ? {
              transform: 'translateY(calc(100% - 96px))',
            }
          : undefined
      "
      :class="[
        'h-[calc(100%-1rem)] bottom-[16px] absolute w-full pointer-events-none',
        'bg-white dark:bg-surface-dark border',
        classNames.divideColor,
        {
          'rounded-t-[16px] shadow-t': expanded,
        },
      ]"
    >
      <UiTransition
        :config="{
          enter: ['fade', 'slideY(10)'],
          leave: false,
        }"
      >
        <div
          v-if="!expanded && !inProgress"
          :class="[
            'flex justify-between items-center h-[48px] px-[12px] pointer-events-auto transition-[opacity,transform]',
            {
              'opacity-0 translate-y-2': inProgress || expanded,
            },
          ]"
          @click="$emit('toggle-expand', true), animate(drawerRoot, 'drawer')"
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
      </UiTransition>

      <!-- drawer content -->
      <UiTransition
        :config="['slideY(10)', 'fade']"
        :delay="250"
        spring="wobbly"
      >
        <Content
          v-if="expanded"
          :src="artwork"
          :expanded="expanded"
          :class-names="classNames"
          :title="title"
          :primary-color="primaryColor"
          :playing="state.playing"
          class="mt-[32px]"
          @is-playing="(e) => (state.playing = e)"
        />
      </UiTransition>

      <!-- after enter show close icon -->
      <UiTransition>
        <IconWrapper
          v-if="expanded"
          tag="button"
          tabindex="-1"
          :class="[
            'text-[1.25em] absolute top-[6px] right-[10px] pointer-events-auto cursor-pointer',
            classNames.paragraph,
          ]"
          @click="
            $emit('toggle-expand', false),
              animate(drawerRoot, `drawer('leave')`)
          "
        >
          <CloseFilled />
        </IconWrapper>
      </UiTransition>
    </div>
  </UiTransition>
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
import state from "./state";

export default defineComponent({
  name: "Drawer",
  components: {
    Img,
    IconWrapper,
    PlayIcon,
    Forward,
    CloseFilled,
    Content,
    PauseIcon,
  },
  emits: ["toggle-expand"],

  props: {
    expanded: Boolean,
    classNames: requiredProp(Object),
    primaryColor: requiredStringProp,
  },

  setup() {
    const title = "The Move to End Congressional Stock trading";

    const collapsedIcons = computed(() => [
      {
        title: state.value.playing ? "PauseIcon" : "PlayIcon",
        onClick: (e: Event) => {
          e.stopPropagation();

          state.value.playing = !state.value.playing;
        },
      },
      {
        title: "Forward",
      },
    ]);

    const artwork = "intro-mockup/podcast/daily-show_y01a50.jpg";

    const drawerRoot = ref(null);

    return { title, collapsedIcons, artwork, state, drawerRoot };
  },
});
</script>

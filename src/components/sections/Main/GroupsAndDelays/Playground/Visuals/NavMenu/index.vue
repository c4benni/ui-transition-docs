<template>
  <Wireframe class="flex flex-col isolate">
    <Generic showHeader>
      <template #headerAction>
        <UiTransition :duration="250">
          <Button
            :key="`${state}`"
            tag="div"
            tabindex="-1"
            class="w-[30px] translate-y-0 scale-100 px-0 h-[30px] rounded-full bg-white dark:bg-card-dark shadow-lg dark:shadow-none z-10 clip-none text-headline dark:text-headline-dark"
            :title="`${state ? 'Close' : 'Open'} nav`"
            @click="state ? close() : (state = true)"
          >
            <IconWrapper>
              <Component :is="state ? 'Close' : 'Menu'" />
            </IconWrapper>
          </Button>
        </UiTransition>
      </template>
    </Generic>

    <!-- nav menu -->
    <UiTransition :delay="{ leave: 400 }">
      <ul
        v-if="state"
        class="bg-white dark:bg-black absolute w-h-full top-0 left-0 z-1 flex flex-col pt-[48px]"
      >
        <UiTransition group :config="['slideY(-100, 0,`px`)', 'fade']">
          <Button
            v-if="showButtons"
            v-for="(item, i) in navItems"
            :key="item"
            tag="li"
            :data-uit-delay="`${i * 50}ms`"
            tabindex="-1"
            :primary="false"
            size="md"
            class="translate-y-0 scale-100 text-[16px] w-full mt-[12px]"
            @click="close"
          >
            {{ item }}
          </Button>
        </UiTransition>
      </ul>
    </UiTransition>
  </Wireframe>
</template>

<script lang="ts">
import { nextTick, defineComponent, ref, watch } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Button from "../../../../../../Inputs/Button.vue";
import Menu from "../../../../../../icons/Menu.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Close from "../../../../../../icons/Close.vue";
import Generic from "../Wireframe/Generic.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    Button,
    Menu,
    IconWrapper,
    Close,
    Generic,
  },

  setup() {
    const navItems = Array(4)
      .fill(true)
      .map((_, i) => `Option ${i + 1}`);

    const state = ref(false);

    const showButtons = ref(false);

    watch(
      () => state.value,
      (newVal) => {
        if (newVal) {
          nextTick(() => (showButtons.value = state.value));
        }
      }
    );

    const close = () => {
      (showButtons.value = false), nextTick(() => (state.value = false));
    };

    return {
      navItems,
      state,
      showButtons,
      close,
    };
  },
});
</script>

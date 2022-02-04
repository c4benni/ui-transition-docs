<template>
  <Wireframe class="flex flex-col isolate">
    <Generic showHeader>
      <template #headerAction>
        <Button
          tag="div"
          tabindex="-1"
          class="w-[30px] translate-y-0 scale-100 px-0 h-[30px] rounded-full bg-white dark:bg-card-dark shadow-lg dark:shadow-none z-10 clip-none text-headline dark:text-headline-dark"
          title="Open nav"
          @click="state = !state"
        >
          <IconWrapper>
            <Component :is="state ? 'Close' : 'Menu'" />
          </IconWrapper>
        </Button>
      </template>
    </Generic>

    <!-- nav menu -->
    <ul
      v-if="state"
      class="bg-white dark:bg-black absolute w-h-full top-0 left-0 z-1 flex flex-col pt-[48px]"
    >
      <Button
        v-for="item in navItems"
        :key="item"
        tag="li"
        tabindex="-1"
        :primary="false"
        size="md"
        class="translate-y-0 scale-100 text-[16px] w-full mt-[12px]"
      >
        {{ item }}
      </Button>
    </ul>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
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

    return {
      navItems,
      state,
    };
  },
});
</script>

<style scoped lang="postcss">
.gradient-after::after {
  background-image: linear-gradient(
    to bottom,
    rgb(255, 255, 254, 0),
    rgb(255, 255, 254)
  );
}

.dark .gradient-after::after {
  background-image: linear-gradient(to bottom, rgb(0, 0, 0, 0), rgb(0 0 0));
}
</style>

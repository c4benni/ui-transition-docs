<template>
  <header
    :class="[
      'h-[48px] md:h-[56px] mx-auto w-full px-3 flex items-center justify-between mt:1 xs:mt-2 sm:mt-3 border-b sm:border-b-0',
      classNames.appMaxWidth,
      classNames.containerPadding,
      classNames.headline,
      classNames.divideColor
    ]"
  >
    <h1
      class="grid gap-x-3 grid-flow-col items-center justify-start font-bold text-xl"
    >
      <IconWrapper
        class="text-xl"
      >
        <Logo />
      </IconWrapper>
      UiTransition
    </h1>

    <div>
      <Button
        icon
        title="Toggle theme"
        @click="theme.dark = !theme.dark"
      >
        <IconWrapper
          class="text-xl"
        >
          <Component
            :is="theme.dark ? 'MoonIcon' : 'SunIcon'"
          />
        </IconWrapper>
      </Button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import classNames from "../../../utils/classNames";
import Logo from "../../icons/Logo.vue";
import IconWrapper from "../../icons/IconWrapper.vue";
import SunIcon from "../../icons/Sun.vue";
import MoonIcon from "../../icons/Moon.vue";
import Button from "../../Inputs/Button.vue";

import useTheme from '../../../utils/theme'


export default defineComponent({
  name: "Header",
  components: { Logo, IconWrapper,Button, SunIcon, MoonIcon },

  setup() {

    const theme = computed(()=> useTheme.value);

    return {
      classNames,
      theme
    };
  },
});
</script>

<template>
  <section
    class="mt-6 xs:mt-12 sm:mt-12 grid md:grid-cols-[1fr,400px] md:gap-x-3 lg:gap-x-6"
  >
    <div class="grid md:grid-rows-[164px,140px,auto] items-start">
      <h2
        :class="[
          'font-extrabold text-3xl xs:text-4xl sm:text-5xl leading-normal xs:leading-normal sm:leading-normal mb-6 md:mb-3 col-start-1 justify-self-center md:justify-self-start',
        ]"
      >
        Create Dynamic <br />CSS Springs.
      </h2>

      <div
        :class="[
          'text-[0.95rem] leading-relaxed xs:text-base xs:leading-relaxed sm:text-lg sm:leading-loose lg:text-lg lg:leading-loose col-start-1',
          classNames.paragraph,
          centerHeadlines,
          {
            [classNames.innerContainerMaxWidth]: breakpoint.is === 'sm',
          },
        ]"
      >
        <p class="mb-1">
          Tired of <span class="opacity-80">janky animations</span>, or
          <span class="font-mono">mechanical easings</span>?
        </p>

        <p>
          UiTransition provides an easy way to create
          <strong><em>CSS powered</em></strong> spring animations that can be
          easily setup, tweaked, and extended to create butter smooth
          transitions between states.
        </p>
      </div>

      <Button
        :size="'lg'"
        class="col-start-1 mx-3 xs:mx-6 md:ml-0 md:mr-12 mt-12"
        @click="theme.dark = !theme.dark"
      >
        Get Started
      </Button>
    </div>

    <div
      v-if="!breakpoint.isMobile"
      class="col-start-2 row-start-1 w-[312px] -mt-12 justify-self-end mr-2 grid gap-y-5 justify-items-center"
    >
      <Mockup class="h-[calc(100vh-56px)] max-h-[600px] w-full" />

      <Button text>
        Source code

        <IconWrapper class="text-[0.9em] mb-[-2px]">
          <Code />
        </IconWrapper>
      </Button>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useBreakpoint from "../../../../hooks/useBreakpoints";
import classNames from "../../../../utils/classNames";
import useTheme from "../../../../utils/theme";
import Button from "../../../Inputs/Button.vue";
import Mockup from "./Mockup/index.vue";
import IconWrapper from "../../../icons/IconWrapper.vue";
import Code from "../../../icons/Code.vue";

export default defineComponent({
  name: "Intro",
  components: { Button, Mockup, IconWrapper, Code },

  setup() {
    const theme = computed(() => useTheme.value);
    const breakpoint = computed(() => useBreakpoint().value);
    const centerHeadlines = "text-center md:text-left";

    return {
      theme,
      classNames,
      breakpoint,
      centerHeadlines,
    };
  },
});
</script>

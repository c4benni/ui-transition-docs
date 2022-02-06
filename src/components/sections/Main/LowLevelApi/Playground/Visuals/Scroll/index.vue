<template>
  <Wireframe class="flex flex-col isolate pb-[8px] md:pb-[32px]">
    <p
      class="mt-[24px] pb-[8px] border-b border-gray-200 dark:border-gray-700 mx-[12px] font-bold text-[1.25em]"
    >
      Click button
    </p>

    <div ref="wrapper" class="grid h-full max-h-full overflow-y-auto relative" style="--scrollbar-width: 4px;">
      <div
        v-for="i in 4"
        :key="i"
        :id="`section-${i}`"
        :class="[{ 'mt-[12px]': i === 1 }]"
      >
        <div
          class="flex font-semibold justify-between items-center text-headline dark:text-headline-dark px-[12px] h-[48px] bg-surface dark:bg-black sticky top-0 z-1"
        >
          Section {{ i }}

          <Button
            v-if="i !== 4"
            icon
            tabindex="-1"
            tag="div"
            class="w-[32px] h-[32px] translate-y-0 scale-100 before:opacity-10 can-hover:hover:before:opacity-[0.15] active:before:opacity-20"
            @click="jumpTo(i + 1)"
          >
            <IconWrapper>
              <JumpDown />
            </IconWrapper>
          </Button>
        </div>

        <div
          class="text-paragraph dark:text-paragraph-dark mx-[12px] border-b pb-[16px] border-gray-200/70 dark:border-gray-700/70 border-dashed"
        >
          <p class="mb-[12px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            harum id nemo earum accusamus vel. Sed harum consequuntur cum fugit
            deserunt fuga omnis nostrum similique, rerum assumenda voluptates
            itaque culpa?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            cumque doloremque corrupti voluptas, corporis eligendi aspernatur
            fuga praesentium consequuntur commodi, molestias, unde maiores.
            Magni, cum! Dolorum aliquam nulla molestias expedita!
          </p>
        </div>
      </div>

      <Button
        text
        tag="div"
        tabindex="-1"
        size="sm"
        class="w-full h-[32px] text-[14px] mt-[16px]"
        @click="scrollToTop"
      >
        Scroll to top

        <IconWrapper>
          <ScrollTop />
        </IconWrapper>
      </Button>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Wireframe from "../Wireframe/index.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import JumpDown from "../../../../../../icons/JumpDown.vue";
import Button from "../../../../../../Inputs/Button.vue";
import ScrollTop from "../../../../../../icons/ScrollTop.vue";

export default defineComponent({
  name: "LowLevelApiScroll",
  components: {
    Wireframe,
    IconWrapper,
    JumpDown,
    Button,
    ScrollTop,
  },

  setup() {
    const wrapper = ref<HTMLElement | null>(null);

    const scrollWrapper = (scrollY: number) => {
      if (wrapper.value instanceof HTMLElement) {
        wrapper.value.scrollTo(0, scrollY);
      }
    };

    const jumpTo = (id: number) => {
      if (wrapper.value instanceof HTMLElement) {
        const nextEl = wrapper.value.querySelector(
          `#section-${id}`
        ) as unknown as HTMLElement;

        if (nextEl) {
          const offsetTop = nextEl.offsetTop;

          scrollWrapper(offsetTop)
        }
      }
    };

    const scrollToTop = ()=> {
      scrollWrapper(0)
    }

    return {
      wrapper,
      jumpTo,
      scrollToTop
    };
  },
});
</script>

<template>
  <Wireframe class="flex flex-col isolate pb-[8px] md:pb-[32px]">
    <p
      class="mt-[24px] pb-[8px] border-b border-gray-200 dark:border-gray-700 mx-[12px] font-bold text-[1.25em]"
    >
      Scroll
    </p>

    <div class="pt-[16px] grid gap-y-[16px] h-full max-h-full overflow-y-auto">
      <div v-for="i in 4" :key="i">
        <div
          class="flex font-semibold justify-between items-center text-headline dark:text-headline-dark px-[12px] h-[32px]"
        >
          Section {{ i }}

          <Button v-if="i !== 4" icon class="w-[32px] h-[32px] translate-y-0 scale-100">
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
        class="w-full h-[32px] text-[14px]"
      >
        Scroll to top

        <IconWrapper>
          <ScrollTop/>
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
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    IconWrapper,
    JumpDown,
    Button,
    ScrollTop
},

  setup() {},
});
</script>

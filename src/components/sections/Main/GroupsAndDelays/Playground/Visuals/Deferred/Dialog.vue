<template>
  <div
    :class="[
      'absolute w-full h-full top-0 left-0 bg-black/80 overflow-hidden rounded-[inherit]',
      { invisible: !image },
    ]"
  >
    <figure class="block h-full w-full relative">
      <div class="h-w-full">
        <Img
          v-if="image"
          :public-id="image.src"
          :alt="`Splash Image by ${image.owner}`"
          quality="50"
          class="h-full w-full object-cover"
          loading-background="none"
          decoding="auto"
        />
      </div>

      <figcaption
        class="text-[1.25em] px-[8px] mt-[24px] absolute bottom-0 pb-[24px] pt-[16px] bg-gradient-to-b from-black/5 via-black/70 to-black/90 w-full text-white"
      >
        By <strong>{{ image?.owner }}</strong>
      </figcaption>
    </figure>

    <Button
      icon
      tag="div"
      tabindex="-1"
      class="absolute top-[12px] right-[12px] w-[28px] h-[28px] bg-white dark:bg-card-dark shadow-xl dark:shadow-md border border-gray-200 dark:border-gray-700 translate-y-0"
      @click="closeDialog"
    >
      <IconWrapper>
        <Close />
      </IconWrapper>
    </Button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import Img from "../../../../../../Img.vue";
import Button from "../../../../../../Inputs/Button.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Close from "../../../../../../icons/Close.vue";
import { selected, splashImages } from "./state";

export default defineComponent({
  name: "Dialog",
  components: { Img, Button, IconWrapper, Close },
  setup() {
    const closeDialog = () => (selected.value = null);

    const image = computed(() => {
      if (selected.value !== null) {
        return splashImages[selected.value];
      }
      return null;
    });

    return {
      closeDialog,
      image,
    };
  },
});
</script>

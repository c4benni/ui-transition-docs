<template>
  <div
    :class="[
      'absolute w-full h-full top-0 left-0 bg-white dark:bg-card-dark overflow-hidden md:pb-[42px]',
      { invisible: !image },
    ]"
  >
    <Img
      v-if="image"
      :public-id="image.src"
      :alt="`Splash Image by ${image.owner}`"
      quality="50"
      class="h-[40%] md:h-[45%] w-full object-cover"
    />

    <p class="font-bold text-[1.25em] px-[8px] mb-[8px] mt-[12px]">
      {{ image?.owner }}
    </p>

    <template
        v-for="i in 3"
        :key="i"
    >
      <p class="px-[8px] text-[0.9em] text-paragraph dark:text-paragraph-dark">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae fuga
        dignissimos dolor ex corrupti quam vitae, accusamus blanditiis, quo
        expedita perferendis reiciendis ab necessitatibus adipisci sunt aperiam
        sit non dolorum!
      </p>

      <br v-if="i !== 3"/>
    </template>

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

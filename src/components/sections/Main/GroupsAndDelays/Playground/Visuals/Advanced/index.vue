<template>
  <div>
    <p
      class="font-bold mx-[8px] mt-[24px] pb-[4px] mb-[24px] border-b text-[1.15em] text-headline dark:text-headline-dark border-gray-200 dark:border-gray-700"
    >
      Click an image
    </p>

    <div
      class="grid grid-rows-3 grid-cols-2 gap-x-[8px] gap-y-[12px] px-[8px] max-h-full"
    >
      <picture
        v-for="(image, i) in splashImages"
        :key="image.id"
        :id="image.id"
        class="cursor-pointer transition-opacity duration-75 active:opacity-70"
        @click="selected = i"
      >
        <Img
          :public-id="image.src"
          :alt="`Splash Image by ${image.owner}`"
          quality="50"
          class="rounded h-[96px] w-full object-cover border border-gray-300/40 dark:border-gray-700/60"
        />

        <figcaption
          class="text-[0.8em] text-paragraph dark:text-paragraph-dark truncate max-w-full overflow-hidden"
        >
          By
          <strong>
            {{ image.owner }}
          </strong>
        </figcaption>
      </picture>
    </div>

    <Dialog/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Img from "../../../../../../Img.vue";
import { splashImages, selected } from "./state";
import Dialog from "./Dialog.vue";

export default defineComponent({
  name: "Advanced",
  components: { Img, Dialog },
  setup() {

    return {
      splashImages,
      selected
    };
  },
});
</script>

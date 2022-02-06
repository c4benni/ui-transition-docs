<template>
  <Wireframe>
    <div
      class="h-full grid content-start"
    >
      <div
        class="mx-[8px] mt-[16px] pb-[4px] border-b border-gray-200 dark:border-gray-700"
      >
        <p
          class="font-bold text-[1.15em] text-headline dark:text-headline-dark"
        >
          Unsplash images
        </p>

        <p
          class="text-[0.85em] font-medium text-paragraph dark:text-paragraph-dark mt-[2px]"
        >
          Click to expand
        </p>
      </div>

      <div
        class="grid grid-cols-2 gap-x-[8px] gap-y-[12px] px-[8px] max-h-full overflow-y-auto py-[24px]"
      >
        <figure
          v-for="(image, i) in splashImages"
          :key="image.id"
          :id="image.id"
          class="cursor-pointer transition-opacity duration-75 active:opacity-70 group h-full"
          @click="selected = i"
        >
          <Img
            :public-id="image.src"
            :alt="`Splash Image by ${image.owner}`"
            quality="5"
            height="96"
            class="rounded h-[124px] md:h-[96px] w-full object-cover border border-gray-300/40 dark:border-gray-700/60 can-hover:group-hover:opacity-90 transition-opacity"
          />

          <figcaption
            class="text-[0.8em] text-paragraph dark:text-paragraph-dark truncate max-w-full overflow-hidden block"
          >
            By
            <strong>
              {{ image.owner }}
            </strong>
          </figcaption>
        </figure>
      </div>
    </div>

    <Dialog />
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Img from "../../../../../../Img.vue";
import { splashImages, selected } from "./state";
import Dialog from "./Dialog.vue";
import Wireframe from "../Wireframe/index.vue";

export default defineComponent({
  name: "Deferred",
  components: { Img, Dialog, Wireframe },
  setup() {
    return {
      splashImages,
      selected,
    };
  },
});
</script>

<template>
  <Wireframe class="flex flex-col isolate">
    <p
      class="mt-[24px] pb-[8px] mb-[32px] border-b border-gray-200 dark:border-gray-700 mx-[12px] font-bold text-[1.25em]"
    >
      FAQ
    </p>
    <div
      class="px-[12px] grid gap-y-[12px]"
    >
      <Accordion
        v-for="item in 3"
        :key="item"
        :model-value="activeIndex === item"
      >
        <template #header> 
          <div
            class="p-[16px] w-full text-left cursor-pointer"
            @click.stop="toggleActiveIndex(item)"
          >
            Hello  
          </div>  
        </template>

        <div
          class="p-[12px] rounded-[12px] rounded-t-none border-t bg-surface dark:bg-surface-dark border-gray-400/60 dark:border-gray-600/50 text-paragraph dark:text-paragraph-dark text-[0.9em] leading-relaxed"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quos commodi maiores nisi quo. Saepe culpa voluptates excepturi repudiandae sunt ea accusamus tenetur? Ab alias suscipit aspernatur rem voluptatum tempora.
        </div>
      </Accordion>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Accordion from "./Accordion.vue";

export default defineComponent({
  name: "LowLevelApiAccordion",
  components: {
    Wireframe,
    Accordion,
  },

  setup() {
    const activeIndex = ref<number | null>(null);

    const toggleActiveIndex = (arg: number)=>{
      if(activeIndex.value === arg){
        activeIndex.value = null
      }else{
        activeIndex.value = arg;
      }
    }

    return {
      activeIndex,
      toggleActiveIndex
    };
  },
});
</script>

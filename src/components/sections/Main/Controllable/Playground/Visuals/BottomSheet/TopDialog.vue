<template>
  <!-- top dialog -->
  <div class="bg-white dark:bg-card-dark shadow-xl">
    <!-- header -->
    <div class="flex py-[8px] px-[14px]">
      <IconWrapper
        tag="button"
        tabindex="-1"
        title="Close"
        class="text-lg justify-self-start w-[18px] h-[18px]"
      >
        <Close />
      </IconWrapper>

      <span class="font-semibold w-full flex justify-center">
        Select destination
      </span>
    </div>

    <!-- inputs -->

    <div
      class="grid items-center gap-x-[8px] grid-flow-col grid-cols-[18px,1fr] px-[14px] pb-[8px]"
    >
      <!-- markers -->
      <div class="w-full h-[calc(100%-6px)] grid justify-center grid-rows-3 relative isolate">
        <template v-for="(icon, i) in locationIcons" :key="icon">
          <IconWrapper
            :class="[
              'z-1 relative',
              {
                'text-green-600 dark:text-green-500': i === 0,
                'text-blue-600 dark:text-blue-500': i === 1,
              },
            ]"
          >
            <Component :is="icon" />
          </IconWrapper>

          <div
            v-if="i === 0"
            class="h-[calc(100%+10px)] -mt-[5px] -z-1 relative w-[1.5px] bg-card justify-self-center bg-gradient-to-b from-green-600 dark:from-green-500 via-blue-600 dark:via-blue-500 to-blue-700 dark:to-blue-600"
          />
        </template>
      </div>

      <!-- text fields -->
      <div>
        <div
          class="h-[28px] flex items-center px-[8px] text-headline dark:text-headline-dark relative fill-before before:bg-current before:opacity-5 rounded w-[calc(100%-26px)] text-[13px]"
        >
          Current location
        </div>

        <div class="flex items-center w-full mt-[6px]">
          <div
            class="flex-grow relative fill-before before:bg-current before:opacity-5 rounded h-[28px]"
          >
            <input
              placeholder="Search destination"
              v-model="searchDestination"
              class="h-w-full rounded-[inherit] px-[8px] text-[13px] focus:text-base bg-[transparent] outline-none focus:border border-headline/20 dark:border-headline-dark/20 placeholder:text-[13px] py-[3px]"
            />
          </div>

          <IconWrapper
            class="w-[18px] h-[18px] text-lg flex-shrink-0 ml-[8px]"
          >
            <Plus />
          </IconWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, VNode } from "vue";
import LocationTo from "../../../../../../icons/LocationTo.vue";
import LocationFrom from "../../../../../../icons/LocationFrom.vue";
import Plus from "../../../../../../icons/Plus.vue";
import Close from "../../../../../../icons/Close.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";

export default defineComponent({
    name: "TopDialog",
    components: { LocationTo, LocationFrom, Plus, Close, IconWrapper },

    setup() {
        const locationIcons = ["LocationFrom", "LocationTo"];

        const searchDestination = ref("");
        return {
            locationIcons,
            searchDestination,
        };
    },
});
</script>

<template>
  <div
    :class="[
      'h-[calc(100%-106px)] absolute bottom-0 left-0 w-full bg-[hsl(0,0%,99%)] dark:bg-[hsl(216,6%,12%)] px-[12px] pointer-events-auto',
      {
        'transition-all': bottomSheetState,
        'translate-y-[calc(100%-195px)] rounded-t-md shadow-[0_-10px_30px_-14px_rgb(0,0,0,0.75)]': !bottomSheetState,
      },
    ]"
  >
    <template v-if="!bottomSheetState">
      <!-- notch -->
      <div
        class="h-[16px] w-full flex items-center relative fill-before before:bg-current before:opacity-10 before:h-[4px] before:w-[min(42px,25%)] before:rounded-full before:left-auto before:top-auto justify-center"
      />

      <!-- action button -->
      <div
        role="button"
        class="h-[36px] w-full rounded fill-before before:bg-current before:opacity-10 relative grid grid-flow-col grid-cols-[auto,1fr] gap-x-[6px] items-center px-[8px] text-headline dark:text-headline-dark font-semibold can-hover:hover:before:opacity-[0.15] can-hover:active:before:opacity-20 active:before:opacity-20"
      >
        <IconWrapper
          class="fill-before relative w-[24px] h-[24px] rounded-full before:bg-current before:opacity-[0.025]"
        >
          <Search />
        </IconWrapper>

        Where to?
      </div>

      <!-- locations -->

      <ul class="divide-y pl-[12px] pr-[6px] mt-[4px]">
        <li
          v-for="(suggestion, i) in suggestions"
          :key="suggestion.title"
          class="border-gray-200 dark:border-gray-600/40 flex items-center py-[4px]"
        >
          <IconWrapper
            :class="[
              'opacity-70 w-[16px] h-[16px]',
              {
                'text-[16px]': i !== 2,
                'text-[12px]': i === 2,
              },
            ]"
          >
            <Component :is="i === 2 ? 'History' : 'LocationToOutline'" />
          </IconWrapper>

          <div class="grid text-[12px] ml-[8px]">
            {{ suggestion.title }}

            <span class="text-[9px] opacity-60">
              {{ suggestion.subtitle }}
            </span>
          </div>
        </li>
      </ul>
    </template>

    <template v-else>
      <ul class="w-full mt-[16px] px-[4px] grid gap-y-[16px]">
        <li
          v-for="items in 3"
          :key="items"
          class="grid items-center grid-flow-col grid-cols-[16px,1fr] gap-x-[12px]"
        >
          <span class="h-[16px] w-[16px] rounded-[6px] bg-current opacity-5" />

          <div class="w-full grid gap-y-[6px] opacity-50">
            <div
              v-for="i in 2"
              :key="i"
              :class="[
                'bg-current opacity-10 rounded-full',
                {
                  'h-[12px] w-[80%]': i === 1,
                  'h-[8px] w-[60%]': i === 2,
                },
              ]"
            />
          </div>
        </li>
      </ul>

      <Button
        tag="div"
        tabindex="-1"
        class="w-full rounded-none left-0 h-[42px] md:h-[36px] absolute bottom-0 md:bottom-[32px] text-[14px] translate-y-0 scale-100"
        size="sm"
        text
      >
        <IconWrapper>
          <MapPin />
        </IconWrapper>

        Choose on map
      </Button>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Search from "../../../../../../icons/Search.vue";
import LocationToOutline from "../../../../../../icons/LocationToOutline.vue";
import History from "../../../../../../icons/History.vue";
import Button from "../../../../../../Inputs/Button.vue";
import MapPin from "../../../../../../icons/MapPin.vue";
import { visualsState } from "../../Snippet/state";


export default defineComponent({
  name: "BottomDialog",
  components: {
    IconWrapper,
    Search,
    LocationToOutline,
    History,
    Button,
    MapPin,
  },
  setup() {
    const suggestion = (title: string, subtitle: string) => ({
      title,
      subtitle,
    });

    const suggestions = [
      suggestion("Maryland mall", "Lagos, Nigeria"),
      suggestion("Kalakuta museum", "Gbemisola St, Ikeja, Nigeria"),
      suggestion("New Afrika Shrine", "NERDC Road, Ikeja, Nigeria"),
    ];

    const bottomSheetState = computed(()=> visualsState.value.BottomSheet);

    return {
      suggestions,
      bottomSheetState
    };
  },
});
</script>

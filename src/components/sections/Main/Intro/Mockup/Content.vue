<template>
  <div class="w-full h-full relative max-w-full overflow-hidden">
    <!-- body -->
    <div class="pt-[24px] px-[12px] w-full pointer-events-none">
      <strong :class="['font-bold text-[1.5em]', classNames.headline]">Browse</strong>

      <ul
        class="hide-scrollbar max-w-full w-full grid grid-flow-col grid-cols-[repeat(2,100%)] gap-x-[6px]"
      >
        <LargeCard
          v-for="item in firstSection"
          :key="item.title"
          :class-names="classNames"
          :badge="item.badge"
          :primary-color="primaryColor"
          :title="item.title"
          :subtitle="item.subtitle"
          :src="item.src"
        />
      </ul>

      <strong
        :class="[
            'flex justify-between items-end border-t font-bold pt-[8px]',
            classNames.divideColor
        ]"
      >
          Top Shows

          <span
            :class="[
            'font-normal text-[0.75em]',
                primaryColor
            ]"
          >
              See All
          </span>
      </strong>

      <ul
        class="hide-scrollbar max-w-full w-full grid grid-flow-col grid-cols-[repeat(2,calc(50%-3px))] gap-x-[6px]"
      >
        <MiniCard
          v-for="item in secondSection"
          :key="item.title"
          :class-names="classNames"
          :primary-color="primaryColor"
          :title="item.title"
          :subtitle="item.subtitle"
          :src="item.src"
        />
      </ul>
    </div>

    <!-- overlay -->

    <div class="absolute bottom-0 w-full h-full">
      <!-- drawer -->
      <Drawer
        :class-names="classNames"
        :primary-color="primaryColor"
        :expanded="expanded"
        @toggle-expand="e => expanded = e"
      />

      <!-- tabs -->
      <Tabs
        :class-names="classNames"
        :primary-color="primaryColor"
        :expanded="expanded"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import classNames from "../../../../../utils/classNames";
import LargeCard from "./LargeCard.vue";
import MiniCard from "./MiniCard.vue";
import Tabs from "./Tabs.vue";
import Drawer from "./Drawer/index.vue";

export default defineComponent({
  name: "MockupContent",
  components: {
    LargeCard,
    MiniCard,
    Tabs,
    Drawer
},

  setup() {
    const primaryColor = "text-blue-700 dark:text-blue-500";

    const expanded = ref(false);

    const firstSection = [
      {
        badge: "Featured",
        title: "Sneakernomics",
        subtitle: "The cost of clean kicks",
        src: "intro-mockup/podcast/sneakernomics_xepupg.jpg",
      },
      {
        badge: "New Show",
        title: "Dear Daughter",
        src: "intro-mockup/podcast/dear-daughter_jizxah.jpg",
      },
    ];

    const secondSection = [
        {
            title: 'AMPD Creative Industry Podcast with Nasty C',
            subtitle: 'AMPD STUDIOS by Old Mutual',
            src:'intro-mockup/podcast/nasty-c_gyhh64.jpg'
        },

        {
            title: 'The Midnight Miracle',
            subtitle: 'Dave Chapelle, Talib Kweli, Yasiin Bey',
            src:'intro-mockup/podcast/midnight-miracle_ywhj4p.jpg'
        },

        {
            title: 'Culture Crave',
            subtitle: 'Culture Crave',
            src:'intro-mockup/podcast/culture-crave_z2ftsu.jpg'
        }
    ]

    return {
      primaryColor,
      classNames,
      firstSection,
      secondSection,
      expanded
    };
  },
});
</script>

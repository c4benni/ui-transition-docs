<template>
  <section
    class="xs:px-[0.375rem] sm:px-0 max-w-lg sm:max-w-full mx-auto my-[72px] xs:my-[108px] md:my-[124px]"
  >
    <h2 class="sr-only">
        Features
    </h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card
        v-for="feature in features"
        :key="feature.title"
        :title="feature.title"
      >
        <template #icon>
          <Component :is="feature.icon" />
        </template>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
        molestiae nisi fugiat ex quam eveniet commodi ad reprehenderit non
        accusamus. Error consequuntur, beatae voluptatem sed illo voluptatibus
        distinctio atque quisquam.
      </Card>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "./Card.vue";
import Css from "../../../icons/Css.vue";
import Optimized from "../../../icons/Optimized.vue";
import OpenSource from "../../../icons/OpenSource.vue";
import Shapes from "../../../icons/Shapes.vue";

export default defineComponent({
  name: "Features",
  components: { Card, Css, Optimized, OpenSource, Shapes },

  setup() {
    const feature = (title: string, icon: string, body: string) => ({
      title,
      icon,
      body,
    });

    const features = [
      feature("CSS Powered", "Css", ""),
      feature("Dynamic", "Shapes", ""),
      feature("Optimized", "Optimized", ""),
      feature("Open Sourced", "OpenSource", ""),
    ];

    return {
      features,
    };
  },
});
</script>

<template>
  <li
    :class="[
      'max-w-full w-full text-[0.75em]',
    ]"
  >
    
    <Img
      :public-id="src"
      :class="[
        'h-[124px] w-full rounded-[4px] mt-[8px] object-cover border',
        classNames.divideColor
      ]"
    />

    <p :class="['truncate max-w-full mt-[4px]', classNames.headline]">
      {{ title }}
    </p>

    <!-- subtitle -->

    <p :class="['truncate max-w-full h-[18px] opacity-80 dark:opacity-95', classNames.paragraph]">
      {{ subtitle || "" }}
    </p>

  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { undefinedStringProp } from "../../../../../utils/main";
import Img from "../../../../Img.vue";

export default defineComponent({
  name: "MiniCard",
  components: { Img },
  props: {
    classNames: {
      type: Object,
      required: true,
    },
    title: undefinedStringProp,
    subtitle: undefinedStringProp,
    src: undefinedStringProp,
  },
});
</script>

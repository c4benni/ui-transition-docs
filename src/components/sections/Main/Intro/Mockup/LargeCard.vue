<template>
  <li
    :class="[
      'mt-[6px] pt-[8px] pb-[20px] border-t max-w-full w-full',
      classNames.divideColor,
    ]"
  >
    <p :class="['uppercase text-[0.55em] truncate', primaryColor]">
      {{ badge }}
    </p>

    <p :class="['truncate max-w-full', classNames.headline]">
      {{ title }}
    </p>

    <!-- subtitle -->

    <p :class="['truncate max-w-full h-[18px] opacity-80 dark:opacity-95', classNames.paragraph]">
      {{ subtitle || "" }}
    </p>

    <Img
      :public-id="src"
      :class="[
        'h-[144px] w-full rounded-[4px] mt-[8px] object-cover border',
        classNames.divideColor
      ]"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { undefinedStringProp } from "../../../../../utils/main";
import Img from "../../../../Img.vue";

export default defineComponent({
  name: "LargeCard",
  components: { Img },
  props: {
    primaryColor: {
      type: String,
      required: true,
    },
    classNames: {
      type: Object,
      required: true,
    },
    badge: undefinedStringProp,
    title: undefinedStringProp,
    subtitle: undefinedStringProp,
    src: undefinedStringProp,
  },
});
</script>

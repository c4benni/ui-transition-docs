<template>
  <h2
    class="text-primary dark:text-primary-dark/90 text-[0.8rem] sm:text-sm font-medium mb-1 sm:mb-2"
  >
    {{ badge }}
  </h2>

  <h3
    class="font-extrabold text-xl xs:text-2xl md:text-4xl mb-2 sm:mb-3 text-card-heading dark:text-headline-dark"
  >
    {{ title }}
  </h3>

  <h4
    class="text-sm sm:text-base leading-normal max-w-lg text-card-paragraph dark:text-paragraph-dark mb-7"
  >
    {{ subtitle }}
  </h4>

  <RoundActionBtn :title="actionTitle" class="mb-12"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { requiredStringProp, undefinedStringProp } from "../../../utils/main";
import RoundActionBtn from "../../Inputs/RoundActionBtn.vue";

export default defineComponent({
    name: "FeatureIntro",
    props: {
        badge: requiredStringProp,
        title: requiredStringProp,
        subtitle: requiredStringProp,
        actionTitle: undefinedStringProp,
    },
    components: { RoundActionBtn }
});
</script>

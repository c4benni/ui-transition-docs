<template>
  <Button size="sm" class="gap-x-1 rounded-full">
    {{ title }}
    <IconWrapper>
      <ChevronRight />
    </IconWrapper>
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./Button.vue";
import IconWrapper from "../icons/IconWrapper.vue";
import ChevronRight from "../icons/ChevronRight.vue";

export default defineComponent({
  name: "RoundActionBtn",
  components: { Button, IconWrapper, ChevronRight },
  props: {
    title: {
      type: String,
      default: "Get started",
    },
  },
});
</script>

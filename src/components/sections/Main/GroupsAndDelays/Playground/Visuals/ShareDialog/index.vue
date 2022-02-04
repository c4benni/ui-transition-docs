<template>
  <Wireframe class="flex flex-col isolate">
    <Generic showHeader>
      <template #headerAction>
        <div
          tag="div"
          tabindex="-1"
          class="w-[30px] h-[30px] rounded-full bg-white dark:bg-card-dark shadow-lg dark:shadow-none"
        />
      </template>
    </Generic>

    <Button size="sm" class="text-[14px] rounded-full absolute bottom-[8px] md:bottom-[42px]">
      <IconWrapper>
        <Share />
      </IconWrapper>

      Share
    </Button>
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Generic from "../Wireframe/Generic.vue";
import Button from "../../../../../../Inputs/Button.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Share from "../../../../../../icons/Share.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    Generic,
    Button,
    IconWrapper,
    Share,
  },

  setup() {
    return {};
  },
});
</script>

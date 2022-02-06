<template>
  <Wireframe>
    <p
      class="mt-[24px] pb-[8px] border-b border-gray-200 dark:border-gray-700 mx-[12px] font-bold text-[1.25em]"
    >
      Animate path
    </p>

    <div class="grid h-full justify-items-center -mt-[48px] content-center">
      <IconWrapper class="text-[72px]">
        <Azure />
      </IconWrapper>

      <Button
        tag="div"
        tabindex="-1"
        class="translate-y-0 scale-100 opacity-100 text-[14px] mt-[24px]"
        size="sm"
        text
      >
        Reset
        <IconWrapper>
          <Reset />
        </IconWrapper>
      </Button>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Wireframe from "../../../../Wireframe.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Azure from "../../../../../../icons/Azure.vue";
import Button from "../../../../../../Inputs/Button.vue";
import Reset from "../../../../../../icons/Reset.vue";

export default defineComponent({
  name: "LowLevelApiPath",
  components: { Wireframe, IconWrapper, Azure, Button, Reset },
  setup() {
    return {};
  },
});
</script>

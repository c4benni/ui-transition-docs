<template>
  <Wireframe class="flex flex-col">
    <Img
      public-id="ControllableMockup/google_street_view_uq1tpc.png"
      class="absolute h-[calc(100%-186px)] w-full rounded-[inherit] top-0 left-0 object-cover object-center scale-125 origin-bottom"
    />
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Wireframe from "../Wireframe/index.vue";
import GenericWireframe from "../Wireframe/Generic.vue";
import { visualsState } from "../../Snippet/state";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Check from "../../../../../../icons/Check.vue";
import Close from "../../../../../../icons/Close.vue";
import Button from "../../../../../../Inputs/Button.vue";
import NewMessage from "../../../../../../icons/NewMessage.vue";
import Phone from "../../../../../../icons/Phone.vue";
import Img from "../../../../../../Img.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    GenericWireframe,
    IconWrapper,
    Check,
    Close,
    Button,
    NewMessage,
    Phone,
    Img
},

  setup() {
    const rotateState = computed(() => visualsState.value.Rotate);

    const tabs = ["Tab 1", "Tab 2"];

    const changeTab = (tab: number) =>
      (visualsState.value = {
        ...visualsState.value,
        Rotate: tab,
      });

    return {
      rotateState,
      tabs,
      changeTab,
    };
  },
});
</script>

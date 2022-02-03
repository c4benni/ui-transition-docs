<template>
  <Wireframe class="flex flex-col isolate">
    <Img
      public-id="ControllableMockup/google_street_view_uq1tpc.png"
      class="absolute h-[calc(100%-186px)] w-full rounded-[inherit] top-0 left-0 object-cover object-center scale-125 origin-bottom"
    />

    <Button
      tag="span"
      tabindex="-1"
      class="text-black dark:text-white w-[32px] h-[32px] rounded-full shadow-xl translate-y-0 scale-100 pointer-events-none absolute z-1 top-[8px] left-[8px] clip-none bg-white dark:bg-card-dark"
    >
      <IconWrapper>
        <Menu />
      </IconWrapper>
    </Button>

    <div
      :class="[
        'absolute top-0 left-0 w-h-full z-1 rounded-[inherit]',
        {
          'pointer-events-none': true,
        },
      ]"
    >
      <TopDialog/>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref, VNode } from "vue";
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
import Menu from "../../../../../../icons/Menu.vue";
import TopDialog from "./TopDialog.vue";

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
    Img,
    Menu,
    TopDialog
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

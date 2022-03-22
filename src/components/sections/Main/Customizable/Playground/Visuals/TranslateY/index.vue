<template>
  <Wireframe class="grid">
    <GenericWireframe
      :disable-action="toastState"
      action-text="Show toast"
      @open-visual="openToast"
    />

    <UiTransition :config="['slideY(-100)', 'fade']" spring="wobbly">
      <div
        v-if="toastState"
        :class="[
          'grid justify-self-center bg-white dark:bg-card-dark w-[calc(100%-16px)] md:w-[calc(100%-12px)] border border-gray-300/50 dark:border-gray-600/30 isolate absolute w-h-full top-[8px] md:top-[20px] shadow-2xl dark:shadow-xl rounded-[8px] p-[12px] md:px-[10px] h-[56px] md:h-fit grid-flow-col grid-cols-[20px,1fr] font-medium gap-x-[8px] items-center',
        ]"
      >
        <IconWrapper
          class="w-[20px] h-[20px] rounded-full bg-green-200/40 dark:bg-surface-dark text-green-700 dark:text-green-500"
        >
          <Check />
        </IconWrapper>

        Item saved!

        <Button
          tag="div"
          icon
          title="Close toast"
          class="w-[28px] h-[28px] md:w-[24px] md:h-[24px] text-sm translate-y-0 scale-100"
          @click="closeToast"
        >
          <Close />
        </Button>
      </div>
    </UiTransition>
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

export default defineComponent({
  name: "CustomizableTranslateYVisuals",
  components: {
    Wireframe,
    GenericWireframe,
    IconWrapper,
    Check,
    Close,
    Button,
  },

  setup() {
    const toastState = computed(
      () => visualsState.value.TranslateY
    ) as unknown as boolean;

    const toggleToast = (val: boolean) => {
      visualsState.value = {
        ...visualsState.value,
        TranslateY: val,
      };
    };

    const closeToast = () => toggleToast(false);

    const openToast = () => toggleToast(true);

    return {
      toastState,
      closeToast,
      openToast,
    };
  },
});
</script>

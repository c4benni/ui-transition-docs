<template>
  <Wireframe>
    <GenericWireframe :disable-action="drawerState" action-text="Open drawer" @open-visual="openDrawer" />

    <div
      :class="[
        'grid justify-items-end items-center isolate absolute w-h-full top-0 left-0 rounded-[inherit]',
        {
          'pointer-events-none': !drawerState,
        },
      ]"
    >
      <div
        v-if="drawerState"
        class="bg-black/60 w-h-full absolute top-0 left-0 rounded-[inherit]"
        @click="closeDialog"
      />

      <div
        v-if="drawerState"
        :class="[
          'bg-white dark:bg-card-dark border-l md:border-t dark:border-t-0 relative z-1 border-gray-300 shadow-2xl dark:shadow-none dark:border-gray-600/30 text-center w-[80%] h-full px-[8px] pb-[32px] items-center md:pb-[42px] pt-[16px] flex flex-col',
        ]"
      >
        <div
          :class="[
            'h-[64px] w-[64px] md:w-[95%] md:h-[35%] rounded-full md:rounded-sm bg-current opacity-[0.12] mx-auto mt-[8px] md:mt-[20px] mb-[24px]',
          ]"
        />

        <div
          class="h-[16px] rounded-full w-[65%] bg-current opacity-10 mx-auto mb-[16px]"
        />
        <div
          class="h-[10px] rounded-full w-[85%] bg-current opacity-10 mx-auto mb-[8px]"
        />
        <div
          class="h-[10px] rounded-full w-[85%] bg-current opacity-10 mx-auto mb-[8px]"
        />
        <div
          class="h-[10px] rounded-full w-[45%] bg-current opacity-10 mx-auto"
        />

        <div class="flex-grow flex-shrink-0" />

        <Button
          tabindex="-1"
          tag="div"
          size="sm"
          :class="['text-[14px] translate-y-0 w-full max-w-[80%]']"
          @click="closeDialog"
        >
          Done
        </Button>
      </div>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Wireframe from "../Wireframe/index.vue";
import GenericWireframe from "../Wireframe/Generic.vue";
import classNames from "../../../../../../../utils/classNames";
import Button from "../../../../../../Inputs/Button.vue";
import { visualsState } from "../../Snippet/state";

export default defineComponent({
  name: "CustomizableTranslateXVisuals",
  components: { Wireframe, GenericWireframe, Button },

  setup() {
    const drawerState = computed(() => visualsState.value.TranslateX);

    const toggleDialog = (val: boolean) => {
      visualsState.value = {
        ...visualsState.value,
        TranslateX: val,
      };
    };

    const closeDialog = () => toggleDialog(false);

    const openDrawer = () => toggleDialog(true);

    return {
      drawerState,
      closeDialog,
      openDrawer,
    };
  },
});
</script>

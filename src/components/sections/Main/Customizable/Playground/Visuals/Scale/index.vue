<template>
  <Wireframe>
    <GenericWireframe
      :disable-action="dialogState"
      action-text="Open dialog"
      @open-visual="openDialog"
    />

    <div
      :class="[
        'grid justify-items-center items-center isolate absolute w-h-full top-0 left-0 rounded-[inherit]',
        {
          'pointer-events-none': !dialogState,
        },
      ]"
    >
      <div
        v-if="dialogState"
        class="bg-black/60 w-h-full absolute top-0 left-0 rounded-[inherit]"
        @click="closeDialog"
      />

      <div
        v-if="dialogState"
        :class="[
          'rounded-[6px] bg-white dark:bg-card-dark border relative z-1 border-gray-300 shadow-2xl dark:shadow-none dark:border-gray-600/[0.25] text-center',
        ]"
      >
        <div
          :class="[
            'px-[10px] pt-[12px] pb-[16px] text-[12px]',
            classNames.paragraph,
          ]"
        >
          <div :class="['font-bold text-[16px] mb-[4px]', classNames.headline]">
            Alert
          </div>

          Are you sure about this?
          <br />
          This action cannot be reversed.
        </div>

        <div :class="['flex border-t border-gray-200 dark:border-gray-600/50']">
          <Button
            v-for="(action, i) in actions"
            :key="action"
            tabindex="-1"
            :primary="false"
            tag="div"
            size="sm"
            :class="[
              'text-[14px] active:scale-100 scale-100 px-0 flex-grow translate-y-0 clip-none rounded-none',
              {
                'rounded-bl border-r border-gray-200 dark:border-gray-600/50':
                  i === 0,
                'rounded-br text-primary dark:text-primary-dark': i === 1,
              },
            ]"
            @click="closeDialog"
          >
            {{ action }}
          </Button>
        </div>
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
  name: "CustomizableScaleVisuals",
  components: { Wireframe, GenericWireframe, Button },

  setup() {
    const actions = ["Cancel", "Continue"];

    const dialogState = computed(
      () => visualsState.value.Scale
    ) as unknown as boolean;

    const toggleDialog = (val: boolean) => {
      visualsState.value = {
        ...visualsState.value,
        Scale: val,
      };
    };

    const closeDialog = () => toggleDialog(false);

    const openDialog = () => toggleDialog(true);

    return {
      classNames,
      actions,
      dialogState,
      closeDialog,
      openDialog,
    };
  },
});
</script>

<template>
    <div
      :class="[
        'h-full w-full grid',
        {
          'items-center': breakpoint.isMobile,
          'grid-rows-[40%,auto] pt-6 px-2': !breakpoint.isMobile,
        },
      ]"
    >
      <!-- image -->
      <div
        v-if="!breakpoint.isMobile"
        class="h-full w-full rounded-md bg-current opacity-[0.125]"
      />

      <div class="flex flex-col">
        <template v-if="!breakpoint.isMobile">
          <!-- price -->
          <div
            class="rounded-full h-[12px] w-[30%] mt-[10px] bg-current opacity-10"
          />

          <!-- title -->
          <div
            class="rounded-full h-[18px] w-[68%] mt-[10px] bg-current opacity-10"
          />

          <!-- desc -->
          <div
            v-for="i in 4"
            :key="i"
            :class="[
              'rounded-full h-[10px] bg-current opacity-10',
              {
                'w-[38%] mt-[32px]': i === 1,
                'mt-[12px] w-[82%]': i === 2,
                'mt-[8px] w-[80%]': i === 3,
                'mt-[8px] w-[52%]': i === 4,
              },
            ]"
          />

          <div class="flex-grow" />
        </template>

        <!-- action -->
        <Button
          size="sm"
          :class="[
            'translate-y-0 justify-self-center mx-[12px]',
            {
              'mb-[42px] text-[14px]': !breakpoint.isMobile,
              'self-center px-6': breakpoint.isMobile,
            },
          ]"
        >
          {{actionText}}
        </Button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBreakpoint from "../../../../../../../hooks/useBreakpoints";
import classNames from "../../../../../../../utils/classNames";
import { requiredStringProp } from "../../../../../../../utils/main";
import Button from "../../../../../../Inputs/Button.vue";

export default defineComponent({
  name: "CustomizableGenericWireframes",
  props:{
    actionText: requiredStringProp
  },
  setup() {
    const breakpoint = useBreakpoint()

    return { breakpoint, classNames };
  },
  components: { Button },
});
</script>

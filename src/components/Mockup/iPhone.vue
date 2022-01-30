<template>
  <div role="presentation" aria-hidden="true" class="Mockup">
    <Intersection #default="{ isIntersecting }">
      <div class="frame">
        <div v-if="isIntersecting" class="screen">
          <div class="status-bar">
            <span class="pl-2"> 9:41 </span>

            <div class="grid grid-flow-col gap-x-2 pr-1 pb-[2px]">
              <IconWrapper v-for="icon in statusBarIcons" :key="icon">
                <Component :is="icon" />
              </IconWrapper>
            </div>
          </div>

          <div class="content">
            <slot />

            <div
              class="rounded-full h-[4px] w-[min(35%,200px)] absolute bottom-2 pointer-events-none bg-current opacity-[0.15]"
            />
          </div>
        </div>
      </div>
    </Intersection>
    <img src="iphone_large_2x.png" class="image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BatteryIcon from "../icons/Battery.vue";
import WifiIcon from "../icons/Wifi.vue";
import IconWrapper from "../icons/IconWrapper.vue";
import Intersection from "../Intersection.vue";

export default defineComponent({
  name: "IPhoneMockup",
  components: {
    BatteryIcon,
    WifiIcon,
    IconWrapper,
    Intersection,
  },
  setup() {
    const statusBarIcons = ["WifiIcon", "BatteryIcon"];

    return { statusBarIcons };
  },
});
</script>

<style scoped lang="postcss">
.Mockup {
  @apply relative grid justify-items-center items-center pointer-events-none isolate;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
}

.image {
  @apply w-full h-full max-h-full absolute top-[1px] left-0;
}
.frame,
.screen {
  @apply overflow-hidden;
  border-radius: var(--corner);
  clip-path: inset(0 0 0 0 round var(--corner));
}
.frame {
  @apply h-[calc(100%-19px)] w-[calc(100%-22px)] py-2 px-[9px];
  --corner: 56px;
}

.screen {
  @apply h-full w-full bg-surface dark:bg-[#0e0e0e];
  --corner: 32px;
}

.status-bar {
  @apply h-[24px] w-full px-3 flex items-end justify-between text-[0.75rem] text-headline dark:text-headline-dark font-medium opacity-95;
}

.content {
  @apply pointer-events-auto h-[calc(100%-24px)] w-full grid justify-items-center items-start relative;
}
</style>

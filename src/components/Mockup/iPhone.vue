 <template>
  <Intersection
    :config="{
      rootMargin: '72px 0px',
    }"
    #default="{ isIntersecting }"
    :disabled="!useIntersection"
  >
    <div role="presentation" aria-hidden="true" class="Mockup">
      <div class="frame">
        <!-- v-if="isIntersecting && mockupLoaded" -->

        <div 
        v-if="mockupLoaded && (useIntersection ? isIntersecting : true)"
        class="screen">
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
              class="rounded-full h-[4px] w-[min(35%,200px)] absolute bottom-2 pointer-events-none bg-current opacity-[0.15] z-50"
            />
          </div>
        </div>

        <div
          v-if="!mockupLoaded"
          :class="[
            'screen grid justify-center justify-items-center gap-y-2 items-center content-center border group pointer-events-auto',
            classNames.divideColor,
          ]"
        >
          <Loader class="text-5xl" />

          <p
            :class="[
              'opacity-0 can-hover:group-hover:opacity-100 transition-opacity duration-300 can-hover:group-hover:duration-[600ms] can-hover:group-hover:ease-linear',
              classNames.headline
            ]"
          >
            Starting up
          </p>
        </div>
      </div>

      <Img
        public-id="mockup/iphone_large_2x_pw8fnw.png"
        loading-background="bg-transparent"
        :class="['image']"
        @load-success="mockupLoadSuccess"
      />
    </div>
  </Intersection>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import BatteryIcon from "../icons/Battery.vue";
import WifiIcon from "../icons/Wifi.vue";
import IconWrapper from "../icons/IconWrapper.vue";
import Intersection from "../Intersection.vue";
import Img from "../Img.vue";
import Loader from "../Loader.vue";
import classNames from "../../utils/classNames";

export default defineComponent({
  name: "IPhoneMockup",
  components: {
    BatteryIcon,
    WifiIcon,
    IconWrapper,
    Intersection,
    Img,
    Loader,
  },
  props:{
    useIntersection: Boolean
  },
  setup() {
    const statusBarIcons = ["WifiIcon", "BatteryIcon"];

    const mockupLoaded = ref(false);

    const mockupLoadSuccess = () => (mockupLoaded.value = true);

    return { statusBarIcons, mockupLoaded, mockupLoadSuccess, classNames };
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
  @apply h-[calc(100%-19px)] w-[calc(100%-22px)] py-2 px-[9px] relative max-w-full;
  --corner: 56px;
}

.screen {
  @apply h-full w-full bg-surface dark:bg-[#000] max-w-full isolate;
  --corner: 32px;
}

.status-bar {
  @apply h-[23.275px] w-full px-3 flex items-end justify-between text-[0.75rem] text-headline dark:text-headline-dark font-medium opacity-95;
}

.content {
  @apply pointer-events-auto h-[calc(100%-24.75px)] w-full grid justify-items-center items-start relative max-w-full;
}
</style>

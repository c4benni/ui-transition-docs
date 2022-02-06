<template>
  <Wireframe class="flex flex-col isolate">
    <Generic showHeader>
      <template #headerAction>
        <div
          tag="div"
          tabindex="-1"
          class="w-[30px] h-[30px] rounded-full bg-current opacity-[0.07]"
        />
      </template>
    </Generic>

    <Button
      tag="div"
      tabindex="-1"
      size="sm"
      :class="[
        'text-[14px] rounded-full absolute bottom-[8px] md:bottom-[42px] left-[50%] translate-x-[-50%] translate-y-0 scale-100 px-[16px]',
        {
          invisible: showDialog
        }
      ]"
      :disabled="showDialog"
      @click="showDialog = true"
    >
      <IconWrapper>
        <Share />
      </IconWrapper>

      Share
    </Button>

    <div
      :class="[
        'absolute w-h-full top-0 left-0 grid items-center justify-center z-1',
        {
          'pointer-events-none': !showDialog,
        },
      ]"
    >
      <template v-if="showDialog">
        <div
          class="w-h-full bg-black/50 absolute top-0 left-0"
          @click="showDialog = false"
        />

        <div
          class="bg-white dark:bg-card-dark shadow-2xl dark:shadow-none rounded-lg px-[32px] pt-[12px] pb-[16px] relative z-1 border border-gray-200 dark:border-gray-600/20"
        >
          <div class="font-bold text-center mb-[8px] opacity-70 text-[0.85em]">
            Share
          </div>

          <ul class="grid grid-cols-2 gap-[16px]">
            <Button
              v-for="action in shareActions"
              :key="action.icon"
              tag="li"
              tabindex="-1"
              class="w-[36px] h-[36px] rounded-full translate-y-0 scale-100 opacity-100"
              icon
              @click="showDialog = false"
            >
              <IconWrapper class="text-[18px]">
                <Component :is="action.icon" />
              </IconWrapper>
            </Button>
          </ul>
        </div>
      </template>
    </div>
  </Wireframe>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Generic from "../Wireframe/Generic.vue";
import Button from "../../../../../../Inputs/Button.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Share from "../../../../../../icons/Share.vue";
import Twitter from "../../../../../../icons/Twitter.vue";
import Copy from "../../../../../../icons/Copy.vue";
import Whatsapp from "../../../../../../icons/Whatsapp.vue";
import Telegram from "../../../../../../icons/Telegram.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    Generic,
    Button,
    IconWrapper,
    Share,
    Twitter,
    Copy,
    Whatsapp,
    Telegram,
  },

  setup() {
    const showDialog = ref(false);

    const share = (icon: string, color: string) => ({ icon, color });

    const shareActions = [
      share("Twitter", ""),
      share("Telegram", ""),
      share("Whatsapp", ""),
      share("Copy", ""),
    ];
    return {
      shareActions,
      showDialog,
    };
  },
});
</script>

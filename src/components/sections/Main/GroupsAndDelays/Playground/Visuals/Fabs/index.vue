<template>
  <Wireframe class="flex flex-col isolate">
    <Generic showHeader>
      <template #header>
        <ul
          class="grid grid-cols-2 border-y border-gray-200 dark:border-gray-600/30"
        >
          <Button
            v-for="(item, i) in fabStyles"
            :primary="false"
            size="sm"
            tag="div"
            tabindex="-1"
            :class="[
              'text-[14px] h-[48px] md:h-[42px] translate-y-0 scale-100 rounded-none clip-none',
              {
                'border-r border-r-gray-200 dark:border-r-gray-600/30': i === 0,
                'text-primary dark:text-primary-dark border-b-[1.5px] border-primary dark:border-primary-dark':
                  item === activeState,
                'text-paragraph dark:text-paragraph-dark': item !== activeState,
              },
            ]"
            @click="changeStyle(item)"
          >
            {{ item }}
          </Button>
        </ul>
      </template>
    </Generic>

    <!-- custom style -->
    <div
      v-if="activeState === 'Custom'"
      class="absolute w-full h-[48px] bottom-0 md:bottom-[42px]"
    >
      <!-- content -->
      <div class="h-w-full absolute">
        <ul
          :class="[
            'bg-white shadow-lg border border-gray-200/50 dark:border-gray-600/20 dark:shadow-none dark:bg-card-dark h-full w-fit rounded-l right-0 absolute transition-transform flex items-center justify-between pr-[calc(20px+48px)] pl-[12px]',
            {
              'translate-x-[100%]': !fabActive,
            },
          ]"
        >
          <Button
            v-for="(item, i) in fabItems"
            :key="item.title"
            tag="li"
            tabindex="-1"
            :class="[
              'w-[38px] h-[38px] rounded-full translate-y-0 scale-100',
              item.color,
              {
                'ml-[12px]': i > 0,
              },
            ]"
            :primary="false"
            @click="fabActive = !fabActive"
          >
            <IconWrapper class="text-xl">
              <Component :is="item.title" />
            </IconWrapper>
          </Button>
        </ul>
      </div>

      <Fab
        :class="[
          'rounded-[14px] absolute right-[8px]',
          {
            'shadow-xl dark:shadow-md translate-y-[-50%] after:bg-primary dark:after:bg-primary-dark fill-after after:-z-1 after:transition-opacity':
              !fabActive,
            'before:opacity-0 active:before:opacity-[0.025] translate-y-0':
              fabActive,
          },
        ]"
        :icon-class="[
          {
            'rotate-45 opacity-60': fabActive,
            'text-white': !fabActive,
          },
        ]"
        @click="fabActive = !fabActive"
      />
    </div>

    <ul
      v-else
      class="absolute right-[8px] bottom-[12px] md:bottom-[42px] grid justify-center justify-items-center gap-y-[8px]"
    >
      <template v-for="item in fabItems" :key="item.title">
        <Button
          v-if="fabActive"
          tag="li"
          tabindex="-1"
          :class="[
            'w-[38px] h-[38px] rounded-full translate-y-0 scale-100 before:opacity-20',
            item.color,
          ]"
          :primary="false"
          @click="fabActive = !fabActive"
        >
          <IconWrapper class="text-xl">
            <Component :is="item.title" />
          </IconWrapper>
        </Button>
      </template>

      <Fab
        tag="li"
        class="shadow-xl dark:shadow-md translate-y-0 mt-[12px] rounded-full"
        primary
        :icon-class="[
          {
            'rotate-45': fabActive,
          },
        ]"
        @click="fabActive = !fabActive"
      />
    </ul>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent, h, ref, watch } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Button from "../../../../../../Inputs/Button.vue";
import Menu from "../../../../../../icons/Menu.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Close from "../../../../../../icons/Close.vue";
import Generic from "../Wireframe/Generic.vue";
import Edit from "../../../../../../icons/Edit.vue";
import Update from "../../../../../../icons/Update.vue";
import Delete from "../../../../../../icons/Delete.vue";
import Fab from "./Fab.vue";

type FabStyle = "Custom" | "Android";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    Button,
    Menu,
    IconWrapper,
    Close,
    Generic,
    Edit,
    Update,
    Delete,
    Fab,
  },

  setup() {
    const fabStyles: FabStyle[] = ["Custom", "Android"];

    const activeState = ref<FabStyle>("Custom");

    const changeStyle = (style: FabStyle) => (activeState.value = style);

    const fabActive = ref(false);

    watch(
      () => activeState.value,
      () => {
        fabActive.value = false;
      }
    );

    const fab = (title: string, color: string) => ({ title, color });

    const fabItems = [
      fab("Edit", "text-green-600 dark:text-green-500"),
      fab("Update", "text-blue-600 dark:text-blue-500"),
      fab("Delete", "text-red-600 dark:text-red-500"),
    ];

    return {
      fabStyles,
      changeStyle,
      activeState,
      fabActive,
      fabItems,
    };
  },
});
</script>

<template>
  <Wireframe class="flex flex-col isolate">
    <Generic showHeader>
      <template #header>
        <ul
          class="grid grid-cols-2 border-y border-gray-200 dark:border-gray-600/30"
        >
          <Button
            v-for="(item,i) in fabStyles"
            :primary="false"
            size="sm"
            :class="[
              'text-[14px] translate-y-0 scale-100 rounded-none clip-none',
              {
                'border-r border-gray-200 dark:border-gray-600/30':i===0
              }
            ]"
          >
            {{item}}
          </Button>
        </ul>
      </template>
    </Generic>

    
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Wireframe from "../Wireframe/index.vue";
import Button from "../../../../../../Inputs/Button.vue";
import Menu from "../../../../../../icons/Menu.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Close from "../../../../../../icons/Close.vue";
import Generic from "../Wireframe/Generic.vue";

export default defineComponent({
  name: "CustomizableRotateVisuals",
  components: {
    Wireframe,
    Button,
    Menu,
    IconWrapper,
    Close,
    Generic,
  },

  setup() {
    const fabStyles = ['IOS', 'Android']

    const state = ref(false);

    return {
      fabStyles,
      state,
    };
  },
});
</script>

<style scoped lang="postcss">
.gradient-after::after {
  background-image: linear-gradient(
    to bottom,
    rgb(255, 255, 254, 0),
    rgb(255, 255, 254)
  );
}

.dark .gradient-after::after {
  background-image: linear-gradient(to bottom, rgb(0, 0, 0, 0), rgb(0 0 0));
}
</style>

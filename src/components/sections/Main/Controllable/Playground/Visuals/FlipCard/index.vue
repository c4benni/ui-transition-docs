<template>
  <Wireframe class="py-[12px] flex flex-col justify-center">
    <div class="card" @click="flipped = !flipped">
      <UiTransition
        :config="{
          leave: false,
          enter: flipped ? 'rotateX' : 'rotateX(180,0)',
        }"
        :spring="flipped ? 'gentle' : 'wobbly'"
        :appear="false"
        retain-final-style
      >
        <div :key="`${flipped}`" class="content" :class="{ active: flipped }">
          <div class="front bg-green-500">Front</div>
          <div class="back bg-red-500">Back!</div>
        </div>
      </UiTransition>
    </div>

    <Button
      tag="div"
      tabindex="-1"
      class="translate-y-0 w-fit self-center mt-[16px] text-[14px] scale-100 px-[16px]"
      size="sm"
      @click="flipped = !flipped"
    >
      Flip card
    </Button>
  </Wireframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Wireframe from "../Wireframe/index.vue";
import GenericWireframe from "../Wireframe/Generic.vue";
import Button from "../../../../../../Inputs/Button.vue";
import { visualsState } from "../../Snippet/state";

export default defineComponent({
  name: "ControllableFlipCardVisuals",
  components: { Wireframe, GenericWireframe, Button },

  setup() {
    const flipped = ref(true);

    return {
      flipped,
    };
  },
});
</script>

<style scoped lang="postcss">
.card {
  position: relative;
  width: calc(100% - 1rem);
  height: 50%;
  margin: 0 auto;
  perspective: 500px;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition-duration: 500ms;
}

.active.content {
  transform: rotateX(180deg);
}

.front,
.back {
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  backface-visibility: hidden;
}

.back {
  transform: rotateX(180deg);
}
</style>

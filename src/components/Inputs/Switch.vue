<template>
  <div
    role="checkbox"
    :aria-checked="isChecked ? 'true' : 'false'"
    class="w-[44px] h-[28px] cursor-pointer rounded-full relative fill-before before:bg-current before:opacity-20 isolate before:-z-1 flex items-center can-hover:focus-within:ring-2"
    @click="toggle(!isChecked)"
  >
    <!-- track -->
    <div 
      v-if="isChecked"
      class="bg-primary dark:bg-primary-dark absolute rounded-[inherit] w-full h-full"
    />

    <!-- thumb -->

    <div
      :class="[
        'w-[25px] h-[25px] rounded-full bg-white dark:bg-gray-100 z-1 mx-[1.5px] shadow-md',
        {
          'translate-x-[17px]': isChecked
        }
      ]"
    >
      <input
        ref="input"
        v-bind="inputAttrs"
        type="checkbox"
        class="sr-only"
        :id="id"
        :checked="isChecked"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "Switch",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      default: undefined
    },
    id: {
      type:String,
      default: undefined
    },
    inputAttrs:{
      type:Object,
      default:()=>({})
    }
  },
  setup(p, { emit }) {
    const props = computed(() => p);

    const state = ref(false);

    const input = ref(null);

    const isChecked = computed(() => {
      if (typeof props.value.modelValue == "boolean") {
        return props.value.modelValue;
      }
      return state.value;
    });

    const toggle = (val?: boolean) => {
      const value = typeof val === "boolean" ? val : !isChecked.value;

      if (typeof props.value.modelValue !== "undefined") {
        emit("update:modelValue", value);
      }

      state.value = value;  
      
      if(input.value){
        const inputEl = input.value as unknown as HTMLInputElement;

        inputEl.focus?.()
      }
    };

    const onInput = (e: Event) => {
      const target = e.target as unknown as HTMLInputElement;

      toggle(target.checked)
    };

    return {
      toggle,
      onInput,
      isChecked,
      input
    };
  },
});
</script>

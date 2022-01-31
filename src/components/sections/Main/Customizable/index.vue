<template>
    <section
        class="h-[400px] w-full relative fill-before before:bg-card/20 dark:before:bg-card-dark/20 before:w-screen before:left-[50%] before:translate-x-[-50%] before:border-y before:border-gray-300/40 dark:before:border-gray-700/20 py-6 sm:py-12 xs:px-[0.375rem] sm:px-0  "
    >
        
        <h2
            class="text-primary dark:text-primary-dark/90 text-[0.8rem] sm:text-sm font-medium mb-1 sm:mb-2"
        >
            Customizable
        </h2>

        <h3
            class="font-extrabold text-xl xs:text-2xl md:text-3xl mb-2 sm:mb-3 text-card-heading dark:text-headline-dark"
        >
            Build unique transitions
        </h3>

        <h4
            class="text-sm leading-normal max-w-lg text-card-paragraph dark:text-paragraph-dark"
        >
            UiTransition provides a low level API to enable you customize and save a preset, or build a spring animation on the fly!
        </h4>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'Customizable',
    setup() {
        
    },
})
</script>
